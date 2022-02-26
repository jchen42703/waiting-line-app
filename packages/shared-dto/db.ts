interface IUser {
  userId: string;
  // user metadata
  name: string;
  email: string;
  phoneNumber: string;
  joinQTime: Date;
}

enum RepeatCycle {
  DAILY = "daily",
  WEEKLY = "weekly",
  MONTHLY = "monthly",
}

/**
 * Each admin encapsulates a list of queues.
 *
 * Each queue encapsulates a list of users.
 */
interface IQueue {
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
  users: IUser[];
}

interface IAdmin {
  adminId: string;
  email: string;
  profilePhoto: string;
  refreshToken: string;
  // stores a list of queueIds of queues managed by this admin
  queues: string[];
}
