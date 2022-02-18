import { useParams } from "react-router-dom";
import { Box, Button, Center, Flex, Spacer } from "@chakra-ui/react";

export default function QueueDashboard() {
  let { queueId } = useParams();
  console.log(queueId);

  return (
    <>
      <Flex flexDirection={"column"} justifyContent={"center"} my="3" mx="16">
        {/* Header + Buttons */}
        <Flex flexDirection={"row"} justifyContent={"space-between"}>
          {/* <Box>
            <h1>Queue Dashboard</h1>
          </Box> */}
          <Flex flexDirection={"column"}>
            <Box>Queue Name</Box>
            <Box>Users</Box>
          </Flex>

          <Flex flexDirection={"row"}>
            <Button>Next User</Button>
            <Button>Delete User</Button>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
