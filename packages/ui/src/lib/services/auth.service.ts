/**
 *
 * @returns true if admin is logged in, false if not
 */
export async function adminIsLoggedIn() {
  try {
    const resp = await fetch("http://localhost:5000/api/session/verify", {
      credentials: "include",
    });
    return resp.status === 200;
  } catch {
    //   If there's a server, error, just default to not logged in
    return false;
  }
}
