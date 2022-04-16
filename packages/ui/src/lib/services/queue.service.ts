import { GETQueueRes, POSTCreateReq, POSTCreateRes } from "@lyne/shared-dto";
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

export async function createQueue(payload: POSTCreateReq) {
  const { hostUrl } = config;
  const resp = await fetch(`${hostUrl}/api/queue/create`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(payload),
  });

  if (resp.status !== 200) {
    throw new Error((await resp.json()).message);
  }

  const { queueId } = (await resp.json()) as POSTCreateRes;
  return queueId;
}
