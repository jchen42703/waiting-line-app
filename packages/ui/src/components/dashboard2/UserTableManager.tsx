import {
  Button,
  Flex,
  TableContainer,
  Text,
  useDisclosure,
  useBoolean,
  Heading,
} from "@chakra-ui/react";
import { IQueue, IUser } from "@lyne/shared-dto";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getQueue } from "../../lib/services/queue.service";
import { getAllUsers, popUser } from "../../lib/services/user.service";
import BackButton from "../BackButton";
import UserTable from "./UserTable";

const UserTableManager = () => {
  let { queueId } = useParams();

  const navigate = useNavigate();

  const [queue, setQueue] = useState<IQueue>({
    queueId,
    adminId: undefined,
    queueName: undefined,
    description: undefined,
    timeCreated: undefined,
    liveTime: undefined,
    closeTime: undefined,
    repeatCycle: undefined,
    queue: undefined,
  });

  const [poppedUser, setPoppedUser] = useState({});
  const [canDelete, toggleCanDelete] = useBoolean(false);

  // The callback used to delete a user
  const onDelete = () => {
    console.log("debug onDelete");
  };

  useEffect(() => {
    const initializeQueue = async () => {
      const fetchedQ = await getQueue({ queueId });
      setQueue(fetchedQ);
    };
    initializeQueue();
  }, [poppedUser]);

  const [userList, setUserList] = useState<IUser[]>([]);

  const nextUser = async () => {
    try {
      const popped = await popUser({ queueId, userId: undefined });
      setPoppedUser(popped);
      navigate(0);
    } catch (err) {
      console.log("Error:", err);
    }
    // navigate
  };

  const setAllUsers = async () => {
    try {
      const users = await getAllUsers({ queueId });
      setUserList(users.users);
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  useEffect(() => {
    setAllUsers();
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
          userList={userList}
          canDelete={canDelete}
          onDelete={onDelete}
        ></UserTable>
      </TableContainer>
    </>
  );
};

export default UserTableManager;
