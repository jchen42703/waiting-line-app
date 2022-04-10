import { IQueue } from "./db";

interface GETQueueReq {
  adminId: string;
}
interface GETQueueRes {
  queues: IQueue[];
}

export { GETQueueReq, GETQueueRes };
