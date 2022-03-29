import { IQueue } from "@waiting-line-app/shared-dto/db";
interface GETQueueReq {
  adminId: string;
}
interface GETQueueRes {
  queue: IQueue;
}

export { GETQueueReq, GETQueueRes };
