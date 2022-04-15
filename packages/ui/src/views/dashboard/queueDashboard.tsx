import { useParams } from "react-router-dom";
import { useState } from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
import QueueTable from "../../components/dashboard2/QueueTable";
import JsonData from "../../components/dashboard2/testData.json";
import AdminNavBar from "../../components/AdminNavBar";

export default function QueueDashboard() {
  let { queueId } = useParams();
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

  return (
    <>
      <AdminNavBar />
      <Flex flexDirection={"column"} justifyContent={"center"} my="3" mx="16">
        {/* Header + Buttons */}
        <Flex flexDirection={"row"} justifyContent={"space-between"}>
          {/* <Box>
            <h1>Queue Dashboard</h1>
          </Box> */}
          <Flex flexDirection={"column"} align={"center"}>
            <Flex flexDirection={"row"} align={"left"}>
              <Button>&lt;-</Button>
              <Box>Queue Name</Box>
            </Flex>
            <Box>Users</Box>
          </Flex>

          <Flex flexDirection={"row"}>
            <Button onClick={() => handleNextUser()}>Next User</Button>
            <Button onClick={() => handleToggle()}>
              {deleteToggleState ? "Cancel" : "Delete User"}
            </Button>
          </Flex>
        </Flex>
        {/* Queue table goes here */}
        <QueueTable
          deleteUserEnabled={deleteToggleState}
          deleteQueueId={queueId}
        />
      </Flex>
    </>
  );
}
