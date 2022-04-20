import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import QueueTable from "../../components/dashboard2/QueueTable";
import JsonData from "../../components/dashboard2/testData.json";
import DeleteButton from "../../components/dashboard2/DeleteButton";
import AdminNavBar from "../../components/AdminNavBar";
import { getQueue } from "../../lib/services/queue.service";
import { IQueue } from "@lyne/shared-dto";
import BackButton from "../../components/BackButton";

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

  // let queueData = JsonData;
  // let firstUser = queueData[0]["userId"]; // needs to be changed, prob unnecessary
  console.log(queueId);

  const [deleteToggleState, setToggle] = useState(false);
  const handleToggle = () => {
    return setToggle(!deleteToggleState);
  };

  const handleNextUser = async () => {
    try {
      await postData("http://localhost:5000/api/queue/pop", queueId);
    } catch (err) {
      console.log("Error:", err);
    }
  };

  const postData = async (url = "", data = {}) => {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  };

  useEffect(() => {
    const initializeQueue = async () => {
      const fetchedQ = await getQueue({ queueId });
      console.log(fetchedQ);
      setQueue(fetchedQ);
    };
    initializeQueue();
  }, []);

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
        <QueueTable
          deleteUserEnabled={deleteToggleState}
          deleteQueueId={queueId}
        />
      </Flex>
    </>
  );
}
