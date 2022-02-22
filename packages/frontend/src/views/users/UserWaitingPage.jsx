import { Box, Center, Flex, Spacer, Square, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

export default function UserWaitingPage(props) {
  let { queueId, userId } = useParams();
  console.log(queueId + userId);

  return (
    <>
      <Flex
        direction="column"
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={"gray.100"}
      >
        <Square size="150px">
          <Text>place in the queue</Text>
        </Square>
        <Square size="150px">
          <Text>Queue ID: {queueId}</Text>
        </Square>
        <Square size="150px">
          <Text>User ID: {userId}</Text>
        </Square>
      </Flex>
    </>
  );
}
