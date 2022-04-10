import { IQueue } from "@lyne/shared-dto";
interface GETQueueReq {
  adminId: string;
}
interface GETQueueRes {
  queues: IQueue;
}

export { GETQueueReq, GETQueueRes };
