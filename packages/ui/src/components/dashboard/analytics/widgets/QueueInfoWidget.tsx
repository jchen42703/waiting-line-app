import { Box, VStack, Heading, Text, Stack, Image } from "@chakra-ui/react";
import { useState } from "react";
// @ts-ignore
import queueinfo from "../../../media/analytics/queueinfo.svg";

const QueueInfoWidget = () => {
  const [info, setInfo] = useState([]);

  return (
    <Box boxShadow="xs" rounded="lg" bg="white" height="100%" w="90%">
      <VStack>
        <Heading fontSize={"2xl"}>Queue Name</Heading>
        {info.length == 0 ? <Image boxSize="150" src={queueinfo} /> : null}
        <Stack w="70%">
          <Text textAlign="center">description</Text>
        </Stack>
      </VStack>
    </Box>
  );
};

export default QueueInfoWidget;
