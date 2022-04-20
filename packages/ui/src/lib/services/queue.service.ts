import {
  DELETEQueueReq,
  GETQueueRes,
  GETSingleQueueReq,
  GETSingleQueueRes,
  POSTCreateReq,
  POSTCreateRes,
} from "@lyne/shared-dto";
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
    headers: {
      "content-type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  if (resp.status !== 200) {
    throw new Error((await resp.json()).message);
  }

  const { queueId } = (await resp.json()) as POSTCreateRes;
  return queueId;
}

export async function deleteQueue(payload: DELETEQueueReq) {
  const { hostUrl } = config;
  const resp = await fetch(`${hostUrl}/api/queue/delete`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  if (resp.status !== 200) {
    throw new Error((await resp.json()).message);
  }

  return 200;
}

export async function getQueue(query: GETSingleQueueReq) {
  const { hostUrl } = config;
  const resp = await fetch(
    `${hostUrl}/api/admin/singleQueue?queueId=${query.queueId}`,
    {
      method: "GET",
      credentials: "include",
    },
  );
  if (resp.status !== 200) {
    throw new Error((await resp.json()).message);
  }
  const { queue } = (await resp.json()) as GETSingleQueueRes;
  return queue;
}
