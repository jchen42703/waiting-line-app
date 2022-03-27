import { IQueue, IUser } from "@waiting-line-app/shared-dto/db";
import { Queue } from "../queue";

/**
 * Gets a Queue document associated with a queueId
 * @param queueId
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
 * Gets the user's place in line
 * @param queueId
 * @param userId
 * @returns -1 if could not find user in queue, otherwise returns
 * correct place in line
 */
async function getUserProgress(queueId: string, userId: string) {
  const qDoc = await getQueue(queueId);
  const qLength: number = qDoc.queue.length;
  let currPlace: number = -1;
  // Get the user's current spot in line
  for (let i: number = 0; i < qLength; i++) {
    const qDocUser = qDoc.queue[i];
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

async function addUserToQueue({
  adminId,
  queueId,
  user,
}: {
  adminId: string;
  queueId: string;
  user: IUser;
}) {
  const qDoc: IQueue = await Queue.findOneAndUpdate(
    { queueId, adminId },
    { $push: { queue: user } },
  );

  return qDoc;
}

export { addUserToQueue, getQueue, getUserProgress };
