import {
  Button,
  Flex,
  TableContainer,
  Heading,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { IQueue } from "@lyne/shared-dto";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getQueue } from "../../../lib/services/queue.service";
import {
  banUser,
  notifyUser,
  popUser,
} from "../../../lib/services/user.service";
import BackButton from "../../BackButton";
import { ActionModes } from "./AdminAction";
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
    poppedUsers: [],
    bannedUsers: [],
    advanceNotice: 1,
  });

  // const [canDelete, toggleCanDelete] = useBoolean(false);
  const [actionMode, setActionMode] = useState<ActionModes>("notify");
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

  const onBan = async (userId: string) => {
    const success = await banUser({ queueId, userId });
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

    await refreshQueue();
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
      <Flex flexDir="column" minHeight={"80vh"}>
        <TableContainer marginX={"16"} marginBottom="16" marginTop={"3"}>
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
              <Button
                onClick={() =>
                  actionMode === "delete"
                    ? setActionMode("notify")
                    : setActionMode("delete")
                }
                marginLeft="5"
              >
                {actionMode === "delete" ? "Cancel" : "Delete User"}
              </Button>
              <Button
                onClick={() =>
                  actionMode === "ban"
                    ? setActionMode("notify")
                    : setActionMode("ban")
                }
                marginLeft="5"
              >
                {actionMode === "ban" ? "Cancel" : "Ban User"}
              </Button>
            </Flex>
          </Flex>
          <UserTable
            userList={queue.queue}
            mode={actionMode}
            onDelete={onDelete}
            onNotify={onNotify}
            onBan={onBan}
          ></UserTable>
        </TableContainer>
        <TableContainer marginX={"16"} marginBottom="16" marginTop={"3"}>
          <Flex
            flexDir={"row"}
            justifyContent={"space-between"}
            alignItems="center"
            marginBottom={"5"}
          >
            <Heading size="md">Previous Users</Heading>
          </Flex>
          <UserTable userList={queue.poppedUsers} mode={undefined}></UserTable>
        </TableContainer>
        <TableContainer marginX={"16"} marginBottom="16" marginTop={"3"}>
          <Flex
            flexDir={"row"}
            justifyContent={"space-between"}
            alignItems="center"
            marginBottom={"5"}
          >
            <Heading size="md">Banned Users</Heading>
          </Flex>
          <UserTable userList={queue.bannedUsers} mode={undefined}></UserTable>
        </TableContainer>
      </Flex>
    </>
  );
};

export default UserTableManager;
