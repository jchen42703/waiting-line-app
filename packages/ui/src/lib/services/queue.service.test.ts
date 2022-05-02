import { rest } from "msw";
import { setupServer } from "msw/node";
import { config } from "../config";
import { createQueue, deleteQueue, getQueue } from "./queue.service";

describe("Queue Service", () => {
  const { hostUrl } = config;

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should properly create a queue", async () => {
    const server = setupServer(
      rest.post(`${hostUrl}/api/queue/create`, (_, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            queueId: "q-test",
          }),
        );
      }),
    );
    server.listen();
    const queueId = await createQueue({
      queueName: "test queue",
      description: "",
      liveTime: 0,
    });
    expect(queueId).toBe("q-test");
    server.close();
  });

  it("should properly handle a failed create queue operation", async () => {
    const server = setupServer(
      rest.post(`${hostUrl}/api/queue/create`, (_, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.json({
            message: "failed to create queue",
          }),
        );
      }),
    );
    server.listen();
    await expect(
      createQueue({
        queueName: "test queue",
        description: "",
        liveTime: 0,
      }),
    ).rejects.toThrow("failed to create queue");
    server.close();
  });

  it("should properly delete a queue", async () => {
    const server = setupServer(
      rest.delete(`${hostUrl}/api/queue/delete`, (_, res, ctx) => {
        return res(ctx.status(200));
      }),
    );
    server.listen();
    const status = await deleteQueue({
      queueId: "q-test",
    });
    expect(status).toBe(200);
    server.close();
  });

  it("should properly handle a failed delete queue operation", async () => {
    const server = setupServer(
      rest.delete(`${hostUrl}/api/queue/delete`, (_, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.json({
            message: "failed to delete queue",
          }),
        );
      }),
    );
    server.listen();
    await expect(
      deleteQueue({
        queueId: "q-test",
      }),
    ).rejects.toThrow("failed to delete queue");
    server.close();
  });

  it("should properly get a queue", async () => {
    const server = setupServer(
      rest.get(`${hostUrl}/api/admin/singleQueue`, (req, res, ctx) => {
        console.log("queue id: ", req.url.searchParams.get("queueId"));
        if (req.url.searchParams.get("queueId") !== "q-test") {
          return res(
            ctx.status(500),
            ctx.json({
              message: "could not find queue",
            }),
          );
        }

        return res(
          ctx.status(200),
          ctx.json({
            queue: {
              queueId: "q-test",
              queueName: "test queue",
              description: "",
              liveTime: 0,
              queue: [],
            },
          }),
        );
      }),
    );
    server.listen();
    const queue = await getQueue({
      queueId: "q-test",
    });
    expect(queue.queueId).toBe("q-test");
    server.close();
  });
});
