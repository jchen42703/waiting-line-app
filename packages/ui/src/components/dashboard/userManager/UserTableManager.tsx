import {
  Button,
  Flex,
  TableContainer,
  useBoolean,
  Heading,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { IQueue } from "@lyne/shared-dto";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getQueue } from "../../../lib/services/queue.service";
import { notifyUser, popUser } from "../../../lib/services/user.service";
import BackButton from "../../BackButton";
import DeleteUserModal from "./DeleteUserModal";
import UserTable from "./UserTable";

const UserTableManager = () => {
  let { queueId } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const [queue, setQueue] = useState<IQueue>({
    queueId,
    adminId: undefined,
    queueName: undefined,
    description: undefined,
    timeCreated: undefined,
    liveTime: undefined,
    closeTime: undefined,
    repeatCycle: undefined,
    queue: [],
  });

  const [canDelete, toggleCanDelete] = useBoolean(false);
  const toDeleteUserId = useRef("");
  const toDeleteUserName = useRef("");

  // The callback used to open the modal to delete the user
  const onDelete = (userId: string, userName: string) => {
    console.log("debug onDelete");
    toDeleteUserId.current = userId;
    toDeleteUserName.current = userName;
    onOpen();
  };

  const onNotify = async (userId: string) => {
    const success = await notifyUser({ queueId, userId });
    if (!success) {
      toast({
        position: "top",
        status: "error",
        description:
          "Woops! Looks like something went wrong with our servers. Please try again.",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const refreshQueue = async () => {
    const fetchedQ = await getQueue({ queueId });
    if (!fetchedQ.queue) {
      fetchedQ.queue = [];
    }
    setQueue(fetchedQ);
  };

  const nextUser = async () => {
    try {
      await popUser({ queueId, userId: undefined });
      await refreshQueue();
    } catch (err) {
      console.log("Error:", err);
    }
  };

  useEffect(() => {
    refreshQueue();
  }, []);

  return (
    <>
      <DeleteUserModal
        isOpen={isOpen}
        onClose={onClose}
        queueId={queueId}
        userId={toDeleteUserId.current}
        name={toDeleteUserName.current}
      ></DeleteUserModal>
      <TableContainer
        minHeight={"80vh"}
        marginX={"16"}
        marginBottom="16"
        marginTop={"3"}
      >
        <Flex flexDir={"row"} justifyContent={"center"} alignItems={"center"}>
          <BackButton></BackButton>

          <Flex
            flexDir={"row"}
            justifyContent={"center"}
            my="2"
            // This makes the heading centered while the back button is left
            margin={"0 auto"}
          >
            <Heading>{queue.queueName}</Heading>
          </Flex>
        </Flex>
        <Flex
          flexDir={"row"}
          justifyContent={"space-between"}
          alignItems="center"
          marginBottom={"5"}
        >
          <Heading size="md">Users in Queue</Heading>
          <Flex flexDir={"row"} justifyContent={"right"} width={"100%"}>
            <Button onClick={() => nextUser()}>Next User</Button>
            <Button onClick={toggleCanDelete.toggle} marginLeft="5">
              {canDelete ? "Cancel" : "Delete User"}
            </Button>
          </Flex>
        </Flex>
        <UserTable
          userList={queue.queue}
          canDelete={canDelete}
          onDelete={onDelete}
          onNotify={onNotify}
        ></UserTable>
      </TableContainer>
    </>
  );
};

export default UserTableManager;
