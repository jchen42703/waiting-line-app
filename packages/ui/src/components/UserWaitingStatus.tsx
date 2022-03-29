import { Heading, Progress, Stack, Text } from "@chakra-ui/react";

export default function UserWaitingwaitingStatus() {
  const tjoined = new Date("2022-03-10T10:02:00");

  const waitingStatus = {
    queueName: "QueueA",
    placeInQ: 5,
    totPeopleInQ: 30,
    estimatedwaitingTime: 15,
    waitingTimeJoined: tjoined.toLocaleString("en-US"),
  };

  var lastUpdated = new Date();

  const timeElapsedMs = lastUpdated.getTime() - tjoined.getTime();
  var waitingTime = {
    dayElapsed: Math.floor(timeElapsedMs / 86400000),
    hrElapsed: Math.floor((timeElapsedMs % 86400000) / 3600000),
    minElapsed: Math.floor(((timeElapsedMs % 86400000) % 3600000) / 60000),
  };

  let timeElapsed = waitingTime.minElapsed + " min";
  if (waitingTime.hrElapsed !== 0) {
    timeElapsed = waitingTime.hrElapsed + " h " + timeElapsed;
  }
  if (waitingTime.dayElapsed === 1) {
    timeElapsed = waitingTime.dayElapsed + " day " + timeElapsed;
  } else if (waitingTime.dayElapsed > 1) {
    timeElapsed = waitingTime.dayElapsed + " days " + timeElapsed;
  }

  return (
    <Stack
      display={"flex"}
      backgroundColor="white"
      p={6}
      rounded="lg"
      shadow="lg"
      w="90%"
      maxW="60ch"
      minW="35ch"
      direction={"column"}
      textAlign="center"
    >
      <Heading fontSize="2xl">Your place in {waitingStatus.queueName}</Heading>
      <Text fontSize="5xl">
        {waitingStatus.placeInQ}/{waitingStatus.totPeopleInQ}
      </Text>
      <Progress
        colorScheme="teal"
        w="100%"
        mt={4}
        height="24px"
        value={(100 * waitingStatus.placeInQ) / waitingStatus.totPeopleInQ}
      />

      <Text mt={8}>Estimated waiting waitingTime </Text>
      <Text fontSize={"2xl"}>{waitingStatus.estimatedwaitingTime} min</Text>
      <Text mt={4}>You have waited for </Text>
      <Text fontSize={"xl"}> {timeElapsed}</Text>
      <Text mt={4}>You joined this queue at </Text>
      <Text fontSize={"xl"}> {waitingStatus.waitingTimeJoined}</Text>
      <Text mt={8} fontSize={"sm"} color="gray.500">
        Last updated: {lastUpdated.toLocaleString("en-US")}
      </Text>
    </Stack>
  );
}
