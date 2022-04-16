import { GETQueueRes } from "@lyne/shared-dto";
import { config } from "../config";

export async function getAllQueues() {
  const { hostUrl } = config;
  const resp = await fetch(`${hostUrl}/api/admin/queues`, {
    method: "GET",
    credentials: "include",
  });
  if (resp.status !== 200) {
    throw new Error((await resp.json()).message);
  }
  const { queues } = (await resp.json()) as GETQueueRes;
  return queues;
}
