import { RepeatCycle } from "@lyne/shared-dto";
import supertest from "supertest";
import mongoose from "mongoose";
import { randomUUID } from "crypto";
import { before } from "mocha";
import { createMainServer } from "../src/app";
import { initMongoConnection } from "../src/lib/db/mongodb";

describe("POST /api/queue/create", () => {
  before(async () => {
    await initMongoConnection();
  });

  console.log(mongoose.connection.readyState);

  const app = createMainServer();
  const serverListener = app.listen(5000, () => {});

  // eslint-disable-next-line jest/no-done-callback
  it("should require authentication", async () => {
    const queue = {
      queueName: "test",
      description: "test",
      liveTime: 123123,
      closeTime: 21312321,
      repeatCycle: "Daily",
      advanceNotice: 2,
    };

    await supertest(app).post(`/api/queue/create`).send(queue).expect(401);
  });

  // eslint-disable-next-line jest/no-done-callback
  it("should create a queue", async () => {
    const queue = {
      queueName: `mocha-${randomUUID()}`,
      description: "test",
      liveTime: 123123,
      closeTime: 21312321,
      repeatCycle: RepeatCycle.DAILY,
      advanceNotice: 2,
    };

    await supertest(app)
      .post(`/api/queue/create`)
      .set("Accept", "application/json")
      .set("Cookie", [`connect.sid=${process.env.SESSION_COOKIE}`])
      .send(queue)
      .expect(200);
  });

  // eslint-disable-next-line jest/no-done-callback
  it("should delete a queue", async () => {
    // First, create a queue
    const queue = {
      queueName: `mocha-${randomUUID()}`,
      description: "test",
      liveTime: 123123,
      closeTime: 21312321,
      repeatCycle: RepeatCycle.DAILY,
      advanceNotice: 2,
    };

    const result = await supertest(app)
      .post(`/api/queue/create`)
      .set("Accept", "application/json")
      .set("Cookie", [`connect.sid=${process.env.SESSION_COOKIE}`])
      .send(queue)
      .expect(200);

    const { queueId } = result.body;
    // Then delete it
    await supertest(app)
      .delete(`/api/queue/delete`)
      .set("Accept", "application/json")
      .set("Cookie", [`connect.sid=${process.env.SESSION_COOKIE}`])
      .send({
        queueId,
      })
      .expect(200);
  });

  // afterEach(() => {
  //   mongoose.connection.close();
  // });

  after(() => {
    serverListener.close();
  });
});
