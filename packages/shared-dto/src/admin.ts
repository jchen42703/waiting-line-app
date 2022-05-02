import { IQueue } from "./db";

interface GETSingleQueueReq {
  queueId: string;
}

interface GETSingleQueueRes {
  queue: IQueue;
}

interface GETQueueRes {
  queues: IQueue[];
}

interface GETAdminInfoRes {
  name: string;
  email: string;
}

interface POSTNotifyUserReq {
  userId: string;
  queueId: string;
}

export type {
  GETQueueRes,
  GETSingleQueueReq,
  GETSingleQueueRes,
  GETAdminInfoRes,
  POSTNotifyUserReq,
};
