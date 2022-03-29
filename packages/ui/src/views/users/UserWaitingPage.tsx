import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Flex,
  Heading,
  Spacer,
  Text,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { config } from "../../lib/config";
import { useParams } from "react-router-dom";
import UserWaitingStatus from "../../../src/components/UserWaitingStatus";

export default function UserWaitingPage() {
  let { queueId, userId } = useParams();
  const toast = useToast(); // A toast to show some errors
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const exitRef = React.useRef();

  console.log("queueId: " + queueId + "\nuserId: " + userId);

  const userRegInfo = {
    name: "name",
    email: "email@email.com",
    phone: "1234567890",
  };

  const exitQueue = async (userId: string, queueId: string) => {
    setLoading(true);
    const data = {
      userId,
      queueId,
    };
    //Default options are marked with *
    try {
      const resp = await fetch(`${config.hostUrl}/api/queue/deleteUser`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
      });
      const respBody = await resp.json();
      console.log("respbody: ", respBody);
    } catch (e) {
      setLoading(false);
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
        title:
          "Woops! Looks like something went wrong with our servers. Please try again.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }

    console.log("Exited");
  };

  return (
    <>
      <Flex
        direction="column"
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        gap={6}
        bg={"gray.100"}
        minW="35ch"
      >
        <UserWaitingStatus />
        <Box
          maxW="60ch"
          minW="35ch"
          backgroundColor="white"
          p={6}
          rounded="lg"
          shadow="lg"
          w="90%"
        >
          {/* <Heading align={"center"} fontSize="xl"> */}
          <Heading fontSize="xl" className="items-center">
            Registration Information
          </Heading>
          <Flex mt={4} direction={{ base: "column", md: "row" }}>
            <Text>Name: {userRegInfo.name}</Text>
            <Spacer />
            <Text>Email: {userRegInfo.email}</Text>
            <Spacer />
            <Text>Phone #: {userRegInfo.phone}</Text>
          </Flex>

          <Button
            w="50%"
            alignItems={"center"}
            onClick={onOpen}
            mt={4}
            ml="25%"
            colorScheme="red"
            variant="outline"
          >
            Exit
          </Button>
        </Box>

        <AlertDialog
          size="xs"
          isOpen={isOpen}
          isCentered
          leastDestructiveRef={exitRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Exit the Queue?
              </AlertDialogHeader>

              <AlertDialogBody>
                If you click "Exit", you'll exit the queue. This action cannot
                be undone.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button
                  isLoading={loading}
                  loadingText="Exiting"
                  w={20}
                  ref={exitRef}
                  onClick={() => exitQueue(this.userId, this.queueId)}
                >
                  Exit
                </Button>
                <Button w={20} colorScheme="teal" onClick={onClose} ml={3}>
                  Stay
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </Flex>
    </>
  );
}
