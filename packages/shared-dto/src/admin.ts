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

export { GETQueueRes, GETSingleQueueReq, GETSingleQueueRes };
