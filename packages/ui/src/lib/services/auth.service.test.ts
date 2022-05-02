import { rest } from "msw";
import { setupServer } from "msw/node";
import { config } from "../config";
import { adminIsLoggedIn, logout } from "./auth.service";

describe("Auth Service", () => {
  const { hostUrl } = config;

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should properly handle session verification success", async () => {
    const server = setupServer(
      rest.get(`${hostUrl}/api/session/verify`, (_, res, ctx) => {
        return res(ctx.status(200));
      }),
    );
    server.listen();
    const isLoggedIn = await adminIsLoggedIn();
    expect(isLoggedIn).toBeTruthy();
    server.close();
  });

  it("should properly handle session verification failure", async () => {
    const server = setupServer(
      rest.get(`${hostUrl}/api/session/verify`, (_, res, ctx) => {
        return res(ctx.status(401));
      }),
    );
    server.listen();
    const isLoggedIn = await adminIsLoggedIn();
    expect(isLoggedIn).toBeFalsy();
    server.close();
  });

  it("should logout properly", async () => {
    const server = setupServer(
      rest.get(`${hostUrl}/api/auth/logout`, (_, res, ctx) => {
        // respond using a mocked JSON body
        return res(ctx.status(200));
      }),
    );

    server.listen();
    const logoutResp = await logout();
    expect(logoutResp.status).toBe(200);
    server.close();
  });
});
