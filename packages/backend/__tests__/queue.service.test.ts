import { expect } from "chai";
import {
  IQueue,
  IUser,
  RepeatCycle,
  UserInQueueStatus,
} from "@lyne/shared-dto";
import {
  addToPoppedList,
  addUserToQueue,
  banUser,
  deleteQueue,
  editQueueMetadata,
  getQueue,
  getUserProgress,
  popFirstFromQueue,
  getAllUsers,
  getAllQueuesForAdmin,
  notifyUser,
} from "../src/lib/models/queue/queue.service";
import { initMongoConnection } from "../src/lib/db/mongodb";
import { createMainServer } from "../src/app";

describe("Queue Service", async () => {
  before(() => {
    initMongoConnection();
    const app = createMainServer();
    app.listen(5000);
  });

  it("getQueue should fail because not found", async () => {
    try {
      const result = await getQueue({ queueId: "123213" });
    } catch (error) {
      expect(error.message).equal("queue not found");
    }
  });

  it("deleteQueue should fail because not found", async () => {
    try {
      const result = await deleteQueue({ queueId: "123213" });
    } catch (error) {
      expect(error.message).equal("queue not found");
    }
  });

  it("editQueueMetaData should fail because not valid", async () => {
    try {
      const result = await editQueueMetadata(
        { queueId: "123213" },
        { queueName: "asdasd" },
      );
    } catch (error) {
      expect(error.message).equal("queue not found");
    }
  });

  it("getAllUsers should fail because not valid", async () => {
    try {
      const result = await getAllUsers("123213", "213123");
    } catch (error) {
      expect(error.message).equal("queue not found");
    }
  });

  it("getUserProgress should fail because not valid", async () => {
    try {
      const result = await getUserProgress("123213", "213123");
    } catch (error) {
      expect(error.message).equal("queue not found");
    }
  });

  it("addUserToQueue should fail because not valid", async () => {
    try {
      const result = await addUserToQueue({ queueId: "1231", user: null });
    } catch (error) {
      expect(error.message).equal(
        "Cannot read properties of null (reading 'userId')",
      );
    }
  });

  it("popFirstFromQueue should fail because not valid", async () => {
    try {
      const result = await popFirstFromQueue("123213", "213123");
    } catch (error) {
      expect(error.message).equal("queue not found");
    }
  });

  it("addToPoppedList  should fail because not valid", async () => {
    try {
      const result = await addToPoppedList("123123", "qweqwe", null);
    } catch (error) {
      expect(error.message).equal("admin not found");
    }
  });

  it("addToPoppedList  should fail because not valid", async () => {
    try {
      const result = await addToPoppedList("123123", "qweqwe", null);
    } catch (error) {
      expect(error.message).equal("admin not found");
    }
  });
});
