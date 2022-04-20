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

export { GETQueueRes, GETSingleQueueReq, GETSingleQueueRes, GETAdminInfoRes };
