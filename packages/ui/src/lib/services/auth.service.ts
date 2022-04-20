import { config } from "../config";

/**
 *
 * @returns true if admin is logged in, false if not
 */
export async function adminIsLoggedIn() {
  try {
    const { hostUrl } = config;

    const resp = await fetch(`${hostUrl}/api/session/verify`, {
      credentials: "include",
    });
    return resp.status === 200;
  } catch {
    //   If there's a server, error, just default to not logged in
    return false;
  }
}

export async function logout() {
  const { hostUrl } = config;
  const resp = await fetch(`${hostUrl}/api/auth/logout`, {
    credentials: "include",
  });
  return resp;
}
