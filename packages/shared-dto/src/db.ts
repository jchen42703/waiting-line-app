export type UserInQueueStatus =
  | "banned"
  | "notified"
  | "popped"
  | "deleted"
  | "waiting";

export interface IUser {
  userId: string;
  // user metadata
  name: string;
  email: string;
  phoneNumber: string;
  joinQTime: number;
  status: UserInQueueStatus;
}

export enum RepeatCycle {
  DAILY = "daily",
  WEEKLY = "weekly",
  MONTHLY = "monthly",
}

/**
 * Each admin encapsulates a list of queues.
 *
 * Each queue encapsulates a list of users.
 */
export interface IQueue {
  queueId: string;
  adminId: string;
  // metadata
  queueName: string;
  description: string;
  timeCreated: number;
  liveTime: number;
  closeTime: number;
  // whether to repeat this queue daily, weekly, monthly, or not at all
  repeatCycle: RepeatCycle | null;
  // users in queue
  queue: IUser[];
  poppedUsers: IUser[];
  bannedUsers: IUser[];
  advanceNotice: number;
}

export interface IAdmin {
  adminId: string;
  email: string;
  profilePhoto: string;
  refreshToken: string;
  // stores a list of queueIds of queues managed by this admin
  queues: string[];
}
