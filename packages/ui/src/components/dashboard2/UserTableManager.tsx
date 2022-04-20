import {
  Button,
  Flex,
  TableContainer,
  useBoolean,
  Heading,
} from "@chakra-ui/react";
import { IQueue } from "@lyne/shared-dto";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getQueue } from "../../lib/services/queue.service";
import { popUser } from "../../lib/services/user.service";
import BackButton from "../BackButton";
import UserTable from "./UserTable";

const UserTableManager = () => {
  let { queueId } = useParams();

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

  // The callback used to delete a user
  const onDelete = () => {
    console.log("debug onDelete");
  };

  const refreshQueue = async () => {
    const fetchedQ = await getQueue({ queueId });
    setQueue(fetchedQ);
  };

  const nextUser = async () => {
    try {
      const popped = await popUser({ queueId, userId: undefined });
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
      <TableContainer minHeight={"80vh"} marginX={"16"} marginBottom="16">
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
          queueId={queueId}
          userList={queue.queue}
          canDelete={canDelete}
          onDelete={onDelete}
        ></UserTable>
      </TableContainer>
    </>
  );
};

export default UserTableManager;
