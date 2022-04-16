import { RepeatCycle } from "@lyne/shared-dto";
import { useEffect, useState } from "react";
import AllQueuesTable from "./AllQueuesTable";
import { getAllQueues } from "../../../lib/services/queue.service";

const QueueTableManager = () => {
  const [queueList, setQueueList] = useState([]);
  useEffect(() => {
    (async () => {
      const queues = await getAllQueues();
      console.log(queues);
      setQueueList(queues);
    })();
  }, []);

  return (
    <>
      <AllQueuesTable queueList={queueList}></AllQueuesTable>
    </>
  );
};

export default QueueTableManager;
