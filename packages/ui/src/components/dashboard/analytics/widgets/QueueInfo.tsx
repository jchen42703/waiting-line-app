import { VStack, Heading, Text } from "@chakra-ui/react";

const QueueInfo = ({ queueInfo }) => {
  return (
    <>
      <VStack>
        <Heading size="md">Queue Name</Heading>
        <Text>{queueInfo.queueName}</Text>
        <Heading size="md">Description</Heading>
        <Text>{queueInfo.description}</Text>
        <Heading size="md">Live Time</Heading>
        <Text>{new Date(queueInfo.liveTime).toLocaleDateString()}</Text>
        <Heading size="md">Close Time</Heading>
        <Text>{new Date(queueInfo.closeTime).toLocaleDateString()}</Text>
        <Heading size="md">Repeat Cycle</Heading>
        <Text>{queueInfo.repeatCycle}</Text>
      </VStack>
    </>
  );
};

export default QueueInfo;
