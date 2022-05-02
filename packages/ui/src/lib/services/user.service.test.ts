import { DELETEDeleteUserReq, POSTPopReq } from "@lyne/shared-dto";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { config } from "../config";
import { deleteUser, getAllUsers, popUser } from "./user.service";

describe("User Service", () => {
  const { hostUrl } = config;

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should properly get all users in a queue", async () => {
    const server = setupServer(
      rest.get(`${hostUrl}/api/queue/all`, (req, res, ctx) => {
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
            users: [
              {
                userId: "u-6ec3cb71-1394-4549-ba84-58f153fd0865",
                joinQTime: 1650470621294,
                name: "Test ",
                phoneNumber: "(718) 675-0724",
                _id: "62602edd7000413814e313c5",
              },
            ],
          }),
        );
      }),
    );

    server.listen();
    const { users } = await getAllUsers({
      queueId: "q-test",
    });

    expect(users).toHaveLength(1);

    // await expect(
    //   getAllUsers({
    //     queueId: "bad-q-id",
    //   }),
    // ).resolves.toThrow("could not find queue");

    server.close();
  });

  it("should properly pop a user in a queue", async () => {
    const server = setupServer(
      rest.post<POSTPopReq>(`${hostUrl}/api/queue/pop`, (req, res, ctx) => {
        if (req.body.queueId !== "q-test") {
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
            userId: "u-test",
          }),
        );
      }),
    );

    server.listen();
    const { userId } = await popUser({
      queueId: "q-test",
    });

    expect(userId).toBe("u-test");

    server.close();
  });

  it("should properly delete a user in a queue", async () => {
    const server = setupServer(
      rest.delete<DELETEDeleteUserReq>(
        `${hostUrl}/api/queue/deleteUser`,
        (req, res, ctx) => {
          if (req.body.queueId !== "q-test") {
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
              queue: [],
            }),
          );
        },
      ),
    );

    server.listen();
    const { queue } = await deleteUser({
      queueId: "q-test",
      userId: "u-test",
    });

    expect(queue).toHaveLength(0);

    server.close();
  });
});
