import { IQueue, IUser, RepeatCycle, UserInQueueStatus } from "./db";

interface POSTCreateReq {
  queueName: string;
  description: string;
  liveTime: number;
  closeTime?: number;
  repeatCycle?: RepeatCycle;
}

interface POSTCreateRes {
  queueId: string;
}

interface DELETEQueueReq {
  queueId: string;
}

interface POSTJoinReq {
  queueId: string;
  name: string;
  email: string;
  phoneNumber: string;
}

interface POSTJoinRes {
  userId: string;
}

interface POSTPopReq {
  queueId: string;
  userId?: string;
}

interface POSTPopRes {
  userId: string;
}

interface GETProgressReq {
  queueId: string;
  userId: string;
}

interface GETProgressRes {
  queueId: string;
  userId: string;
  currPlace: number;
  total: number;
  status: UserInQueueStatus;
}

interface GETAllReq {
  queueId: string;
}
interface GETAllRes {
  users: IUser[];
}

interface DELETEDeleteUserReq {
  userId: string;
  queueId: string;
}

interface DELETEDeleteUserRes {
  queue: IQueue;
}

interface POSTEditQueueReq {
  queueId: string;
  queueName?: string;
  description?: number;
  liveTime?: number;
  closeTime?: number;
  repeatCycle?: RepeatCycle;
}

interface POSTEditQueueRes {
  queue: IQueue;
}

export {
  POSTCreateReq,
  POSTCreateRes,
  POSTEditQueueReq,
  POSTEditQueueRes,
  POSTJoinReq,
  POSTJoinRes,
  POSTPopReq,
  POSTPopRes,
  GETProgressReq,
  GETProgressRes,
  GETAllReq,
  GETAllRes,
  DELETEQueueReq,
  DELETEDeleteUserReq,
  DELETEDeleteUserRes,
};
