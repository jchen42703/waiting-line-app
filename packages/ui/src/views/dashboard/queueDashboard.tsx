import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Flex, Heading } from "@chakra-ui/react";
import QueueTable from "../../components/dashboard2/QueueTable";
import AdminNavBar from "../../components/AdminNavBar";
import { getQueue } from "../../lib/services/queue.service";
import { IQueue } from "@lyne/shared-dto";
import BackButton from "../../components/BackButton";
import { popUser } from "../../lib/services/user.service";

export default function QueueDashboard() {
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
    queue: undefined,
  });

  const [poppedUser, setPoppedUser] = useState({});

  // let queueData = JsonData;
  // let firstUser = queueData[0]["userId"]; // needs to be changed, prob unnecessary
  console.log(queueId);

  const [deleteToggleState, setToggle] = useState(false);
  const handleToggle = () => {
    return setToggle(!deleteToggleState);
  };

  const handleNextUser = async () => {
    try {
      const popped = await popUser({ queueId, userId: undefined });
      setPoppedUser(popped);
    } catch (err) {
      console.log("Error:", err);
    }
  };

  useEffect(() => {
    const initializeQueue = async () => {
      const fetchedQ = await getQueue({ queueId });
      setQueue(fetchedQ);
    };
    initializeQueue();
  }, [poppedUser]);

  return (
    <>
      <AdminNavBar></AdminNavBar>

      <Flex flexDirection={"column"} justifyContent={"center"} my="3" mx="16">
        {/* Header + Buttons */}
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
          alignItems={"center"}
          my="2"
        >
          <Heading size="md">Users in Queue</Heading>
          <Flex flexDir={"row"}>
            <Button onClick={() => handleNextUser()}>Next User</Button>
            <Button onClick={() => handleToggle()} marginLeft="5">
              {deleteToggleState ? "Cancel" : "Delete User"}
            </Button>
          </Flex>
        </Flex>
        <QueueTable deleteUserEnabled={deleteToggleState} queueId={queueId} />
      </Flex>
    </>
  );
}
