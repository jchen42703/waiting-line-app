import { GETAdminInfoRes } from "@lyne/shared-dto";
import { config } from "../config";

/**
 * Gets the logged-in administrator name and email.
 *
 * @returns
 */
export async function getAdminMetadata() {
  const { hostUrl } = config;
  const resp = await fetch(`${hostUrl}/api/admin/info`, {
    method: "GET",
    credentials: "include",
  });

  if (resp.status !== 200) {
    throw new Error((await resp.json()).message);
  }

  const { name, email } = (await resp.json()) as GETAdminInfoRes;
  return { name, email };
}
