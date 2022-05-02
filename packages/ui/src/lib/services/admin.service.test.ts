import { rest } from "msw";
import { setupServer } from "msw/node";
import { config } from "../config";
import { getAdminMetadata } from "./admin.service";

describe("Admin Service", () => {
  const { hostUrl } = config;

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should get admin info properly", async () => {
    const server = setupServer(
      rest.get(`${hostUrl}/api/admin/info`, (_, res, ctx) => {
        // respond using a mocked JSON body
        return res(
          ctx.json({
            name: "Trevor Mcgregor",
            email: "lyneapp776@gmail.com",
          }),
        );
      }),
    );

    server.listen();

    const adminInfo = await getAdminMetadata();
    expect(adminInfo.name).toEqual("Trevor Mcgregor");
    expect(adminInfo.email).toEqual("lyneapp776@gmail.com");
    server.close();
  });

  it("should handle errors gracefully when getting admin info", async () => {
    const server = setupServer(
      rest.get(`${hostUrl}/api/admin/info`, (_, res, ctx) => {
        // respond using a mocked JSON body
        return res(
          ctx.status(401),
          ctx.json({
            message: "Bad sessionId",
          }),
        );
      }),
    );

    server.listen();
    await expect(getAdminMetadata()).rejects.toThrow("Bad sessionId");
    server.close();
  });
});
