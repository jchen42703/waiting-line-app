import {
  DELETEDeleteUserReq,
  DELETEDeleteUserRes,
  GETAllReq,
  GETAllRes,
  POSTNotifyUserReq,
  POSTPopReq,
  POSTPopRes,
} from "@lyne/shared-dto";
import { config } from "../config";

export const getAllUsers = async (payload: GETAllReq) => {
  const { hostUrl } = config;
  const resp = await fetch(
    `${hostUrl}/api/queue/all?queueId=${payload.queueId}`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    },
  );
  const respBody = await resp.json();
  return respBody as GETAllRes;
};

export const popUser = async (payload: POSTPopReq) => {
  const { hostUrl } = config;
  const resp = await fetch(`${hostUrl}/api/queue/pop`, {
    method: "POST",
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const respBody = await resp.json();
  return respBody as POSTPopRes;
};

export const deleteUser = async (payload: DELETEDeleteUserReq) => {
  const { hostUrl } = config;
  const resp = await fetch(`${hostUrl}/api/queue/deleteUser`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const respBody = await resp.json();
  return respBody as DELETEDeleteUserRes;
};

export const notifyUser = async (payload: POSTNotifyUserReq) => {
  const { hostUrl } = config;
  const resp = await fetch(`${hostUrl}/api/admin/notifyUser`, {
    method: "POST",
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  return resp.status === 200;
};

export const banUser = async (payload: DELETEDeleteUserReq) => {
  const { hostUrl } = config;
  const resp = await fetch(`${hostUrl}/api/queue/banUser`, {
    method: "POST",
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return resp.status === 200;
};
