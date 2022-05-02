import request from "supertest";
import mongoose from "mongoose";
import express from "express";
import createQueueRouter from "../src/controllers/queue";

describe("queueRouter", () => {
  it("valid request ", function (done) {
    const app = express();
    app.use("/api/queue/create", createQueueRouter);
    app.listen(5000, () => {
      console.log("listening on 5000");
    });

    const queue = {
      queueName: "test",
      description: "test",
      liveTime: 123123,
      closeTime: 21312321,
      repeatCycle: "Daily",
      advanceNotice: 2,
    };
    const result = request(app)
      .post("/api/queue/create")
      .send(queue)
      .expect(200)
      .end((err, res) => {
        if (!err) {
          done();
        } else {
          done(err);
        }
      });
  });

  afterEach(() => {
    mongoose.connection.close();
  });
});
