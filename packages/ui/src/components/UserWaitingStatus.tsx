import {
  Flex,
  Heading,
  Progress,
  Spacer,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { config } from "../lib/config";

export default function UserWaitingStatus(props: { joinTime: Date }) {
  const { queueId, userId } = useParams();
  const data = {
    queueId,
    userId,
  };

  const [waitingStatus, setStatus] = useState({
    placeInQ: 1,
    totPeopleInQ: 1,
    estWaitingTime: 15,
    waitingTimeJoined: props.joinTime.toLocaleString("en-US"),
  });

  var lastUpdated = new Date();

  const timeElapsedMs = lastUpdated.getTime() - props.joinTime.getTime();
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

  const toast = useToast();

  const getStatus = async () => {
    var url = new URL(`${config.hostUrl}/api/queue/progress`),
      params = { queueId: data.queueId, userId: data.userId };
    Object.keys(params).forEach((key) =>
      url.searchParams.append(key, params[key]),
    );
    // Default options are marked with *
    try {
      const resp = await fetch(`${url}`, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
        },
      });
      const respBody = await resp.json();

      setStatus({
        placeInQ: respBody.currPlace,
        totPeopleInQ: respBody.total,
        estWaitingTime: 15,
        waitingTimeJoined: props.joinTime.toLocaleString("en-US"),
      });

      console.log("respbody: ", respBody);
    } catch (e) {
      let message; // string
      if (e instanceof Error) {
        message = e.message;
      } else if (typeof e === "string") {
        message = e;
      } else {
        message = "unknown error";
      }

      // use logger to log error: console.log is temp
      console.log(message);

      // Show error message on 400 (operational errors)
      // Don't show error messages on 500 (server)
      toast({
        position: "top",
        status: "error",
        description:
          "Woops! Looks like something went wrong with our servers. Please try again.",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  // update the state every minutes
  const fiveSec = 60000;
  var updateCount = 1;
  useEffect(() => {
    getStatus();
    const interval = setInterval(() => {
      getStatus();
      console.log("Update status, count: " + updateCount);
      updateCount++;
    }, fiveSec);

    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, []);

  return (
    <Stack
      display={"flex"}
      backgroundColor="brand.primary-light"
      p={6}
      rounded="lg"
      shadow="lg"
      w="90%"
      maxW="60ch"
      minW="35ch"
      direction={"column"}
      textAlign="center"
    >
      <Heading fontSize="2xl">Your place in the line</Heading>
      <Flex justifyContent={"center"}>
        <Heading fontSize="5xl" textColor={"brand.secondary"}>
          {waitingStatus.placeInQ}
        </Heading>
        <Heading mt={5} fontSize="3xl">
          /{waitingStatus.totPeopleInQ}
        </Heading>
      </Flex>
      <Spacer />
      <Progress
        bg="brand.grey"
        sx={{
          "& > div": {
            background: "brand.secondary",
          },
        }}
        // colorScheme="teal"
        w="100%"
        mt={4}
        height="24px"
        value={
          0.5 + 100 * (1 - waitingStatus.placeInQ / waitingStatus.totPeopleInQ)
        }
      />
      <Spacer />
      <Text>Estimated waiting waitingTime </Text>
      <Text fontSize={"2xl"}>{waitingStatus.estWaitingTime} min</Text>
      <Text>You have waited for </Text>
      <Text fontSize={"xl"}> {timeElapsed}</Text>
      <Text>You joined this queue at </Text>
      <Text fontSize={"xl"}> {waitingStatus.waitingTimeJoined}</Text>
      <Spacer />
      <Text fontSize={"sm"} color="brand.navy">
        Last updated: {lastUpdated.toLocaleString("en-US")}
      </Text>
    </Stack>
  );
}
