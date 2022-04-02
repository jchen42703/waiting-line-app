import { useParams, Navigate } from "react-router-dom";
import { Box, Button, Flex } from "@chakra-ui/react";

export default function QueueDashboard({user}) {
  let { queueId } = useParams();

  if (!user){
    return <Navigate to="/login" />
  }

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
