import {
  Button,
  Flex,
  TableContainer,
  Text,
  useDisclosure,
  useBoolean,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import AllQueuesTable from "./AllQueuesTable";
import CreateQueueModal from "./CreateQueueModal";
import { getAllQueues } from "../../../lib/services/queue.service";
import { getCurrentFormattedTime } from "../../../lib/time";
import DeleteQueueModal from "./DeleteQueueModal";

const QueueTableManager = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenDeleteQModal,
    onOpen: onOpenDeleteQModal,
    onClose: onCloseDeleteQModal,
  } = useDisclosure();

  const [queueList, setQueueList] = useState([]);

  const toDeleteQueueId = useRef("");
  const [canDelete, toggleCanDelete] = useBoolean(false);

  useEffect(() => {
    (async () => {
      const queues = await getAllQueues();
      console.log(queues);
      setQueueList(queues);
    })();
  }, []);

  const onDelete = (queueId: string) => {
    toDeleteQueueId.current = queueId;
    onOpenDeleteQModal();
  };

  return (
    <>
      <CreateQueueModal isOpen={isOpen} onClose={onClose}></CreateQueueModal>
      <DeleteQueueModal
        isOpen={isOpenDeleteQModal}
        onClose={onCloseDeleteQModal}
        queueId={toDeleteQueueId.current}
      ></DeleteQueueModal>
      <TableContainer minHeight={"80vh"} marginX={"16"} marginBottom="16">
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
            <Button onClick={toggleCanDelete.toggle}>
              {canDelete ? "Cancel" : "Delete Queue"}
            </Button>
          </Flex>
        </Flex>
        <AllQueuesTable
          queueList={queueList}
          canDelete={canDelete}
          onDelete={onDelete}
        ></AllQueuesTable>
      </TableContainer>
    </>
  );
};

export default QueueTableManager;
