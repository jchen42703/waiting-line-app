import { RepeatCycle } from "@lyne/shared-dto";
import {
  Button,
  Flex,
  TableContainer,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import AllQueuesTable from "./AllQueuesTable";
import CreateQueueModal from "./CreateQueueModal";
import { getAllQueues } from "../../../lib/services/queue.service";
import { getCurrentFormattedTime } from "../../../lib/time";

const QueueTableManager = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
      <CreateQueueModal isOpen={isOpen} onClose={onClose}></CreateQueueModal>
      <TableContainer minHeight={"80vh"} marginX={"16"}>
        <Flex
          flexDir={"row"}
          justifyContent={"space-between"}
          alignItems="center"
          marginBottom={"5"}
        >
          <Text color="black" fontSize={"lg"}>
            Last Checked: {getCurrentFormattedTime()}
          </Text>
          <Flex flexDir={"row"} justifyContent={"right"} width={"100%"}>
            <Button marginRight={"5"} onClick={onOpen}>
              Create Queue
            </Button>
            <Button>Delete Queue</Button>
          </Flex>
        </Flex>
        <AllQueuesTable queueList={queueList}></AllQueuesTable>
      </TableContainer>
    </>
  );
};

export default QueueTableManager;
