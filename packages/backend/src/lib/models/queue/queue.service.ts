import { IQueue, IUser } from "@lyne/shared-dto";
import { Queue } from "./queue.model";

/**
 * Gets a Queue document associated with a queueId
 * @param queueId
 * @returns the queue
 */
async function getQueue(queueId: string) {
  const qDoc: IQueue = await Queue.findOne({
    queueId,
  });

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
async function getAllUsers(queueId: string) {
  const qDoc: IQueue = await getQueue(queueId);
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
  const qDoc: IQueue = await getQueue(queueId);
  const qLength: number = qDoc.queue.length;
  let currPlace = -1;
  // Get the user's current spot in line
  for (let i = 0; i < qLength; i++) {
    const qDocUser: IUser = qDoc.queue[i];
    if (qDocUser.userId === userId) {
      currPlace = i + 1; // + 1 because i is 0 indexed
      break;
    }
  }

  return {
    currPlace,
    qLength,
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

export {
  addUserToQueue,
  getQueue,
  getUserProgress,
  popFirstFromQueue,
  getAllUsers,
};
