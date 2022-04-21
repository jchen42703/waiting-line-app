import {
  IQueue,
  IUser,
  RepeatCycle,
  UserInQueueStatus,
} from "@lyne/shared-dto";
import { Queue } from "./queue.model";

/**
 * Gets a Queue document associated with a queueId
 * @param queueId
 * @returns the queue
 */
async function getQueue(query: { queueId: string; adminId?: string }) {
  const qDoc: IQueue = await Queue.findOne(query);

  if (!qDoc) {
    throw new Error("queue not found");
  }

  return qDoc;
}

async function deleteQueue(query: { queueId: string; adminId?: string }) {
  const qDoc = await Queue.deleteOne(query);

  if (!qDoc) {
    throw new Error("queue not found");
  }

  return qDoc;
}

async function editQueueMetadata(
  query: { queueId: string; adminId?: string },
  updateParams: {
    queueName?: string;
    description?: number;
    liveTime?: number;
    closeTime?: number;
    repeatCycle?: RepeatCycle;
  },
) {
  const qDoc = await Queue.findOneAndUpdate(query, updateParams, { new: true });

  if (!qDoc) {
    throw new Error("queue not found");
  }

  return qDoc;
}

/**
 * Gets all users from a speciifc queue through its queueId
 * @param queueId
 * @returns queue that contains IUsers
 */
async function getAllUsers(queueId: string, adminId: string) {
  const qDoc: IQueue = await getQueue({ queueId, adminId });
  if (qDoc === null) {
    throw new Error("invalid queueId");
  }

  return qDoc.queue;
}

/**
 * Gets the user's place in line
 * @param queueId
 * @param userId
 * @returns -1 if could not find user in queue, otherwise returns
 * correct place in line
 */
async function getUserProgress(queueId: string, userId: string) {
  const qDoc: IQueue = await getQueue({ queueId });
  // Check ban list
  let currPlace = -1;
  let userStatus: UserInQueueStatus;
  const banListLength = qDoc.bannedUsers.length;
  for (let i = 0; i < banListLength; i++) {
    const qDocUser: IUser = qDoc.bannedUsers[i];
    if (qDocUser.userId === userId) {
      currPlace = i + 1; // + 1 because i is 0 indexed
      userStatus = qDocUser.status;
      break;
    }
  }

  if (userStatus === "banned") {
    return {
      currPlace: -1,
      qLength: qDoc.queue.length,
      userStatus,
    };
  }

  // Check popped list
  const popListLength = qDoc.poppedUsers.length;
  for (let i = 0; i < popListLength; i++) {
    const qDocUser: IUser = qDoc.poppedUsers[i];
    if (qDocUser.userId === userId) {
      currPlace = i + 1; // + 1 because i is 0 indexed
      userStatus = qDocUser.status;
      break;
    }
  }

  if (userStatus === "popped") {
    return {
      currPlace: -1,
      qLength: qDoc.queue.length,
      userStatus,
    };
  }

  // Check queue
  const qLength: number = qDoc.queue.length;
  // Get the user's current spot in line
  for (let i = 0; i < qLength; i++) {
    const qDocUser: IUser = qDoc.queue[i];
    if (qDocUser.userId === userId) {
      currPlace = i + 1; // + 1 because i is 0 indexed
      userStatus = qDocUser.status;
      break;
    }
  }

  return {
    currPlace,
    qLength,
    userStatus,
  };
}

interface AddUserToQueueOpts {
  queueId: string;
  user: IUser;
}

/**
 * Simple wrapper to add a user to a queue (not a protected endpoint)
 * @param opts
 * @returns the queue
 */
async function addUserToQueue({ queueId, user }: AddUserToQueueOpts) {
  if (typeof user.userId !== "string") {
    throw new Error("userId must be a string");
  }

  if (user.userId.length === 0) {
    throw new Error("userId must not be an empty string");
  }

  const qDoc: IQueue = await Queue.findOneAndUpdate(
    { queueId },
    { $push: { queue: user } },
  );

  return qDoc;
}

/**
 * Pops the first element in the queue and returns it
 * @param queueId
 * @param adminId
 * @returns the first element in the queue
 */
async function popFirstFromQueue(queueId: string, adminId: string) {
  const firstInQ: IQueue = await Queue.findOneAndUpdate(
    { queueId, adminId },
    { $pop: { queue: -1 } },
  );
  return firstInQ;
}

/**
 * Pops the first element in the queue and returns it
 * @param adminId
 * @returns the all queues for the admin
 */
const getAllQueuesForAdmin = async (adminId: string) => {
  const admin: IQueue[] = await Queue.find({ adminId });
  if (!admin) {
    throw new Error("admin not found");
  }
  return admin;
};

const addToPoppedList = async (
  queueId: string,
  adminId: string,
  user: IUser,
) => {
  const outDoc = await Queue.findOneAndUpdate(
    {
      queueId,
      adminId,
    },
    {
      $push: {
        poppedUsers: user,
      },
    },
  );
  return outDoc;
};

export {
  addToPoppedList,
  addUserToQueue,
  deleteQueue,
  editQueueMetadata,
  getQueue,
  getUserProgress,
  popFirstFromQueue,
  getAllUsers,
  getAllQueuesForAdmin,
};
