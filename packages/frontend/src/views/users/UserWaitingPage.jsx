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
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { useParams } from "react-router-dom";
import UserWaitingStatus from "../../../src/components/UserWaitingStatus";

export default function UserWaitingPage(props) {
  let { queueId, userId } = useParams();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const exitRef = React.useRef();

  console.log("queueId: " + queueId + "\n" + "userId: " + userId);

  const userRegInfo = {
    name: "name",
    email: "email@email.com",
    phone: "1234567890",
  };

  const exitQueue = async () => {
    console.log("Exit the queue");
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
        <UserWaitingStatus props={props} />

        <Box
          maxW="60ch"
          minW="35ch"
          backgroundColor="white"
          p={4}
          rounded="lg"
          shadow="lg"
          w="90%"
        >
          <Heading align="center" fontSize="xl">
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
            w="100%"
            onClick={onOpen}
            mt={4}
            colorScheme="red"
            variant="outline"
          >
            Exit
          </Button>
        </Box>

        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={exitRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Exit the Queue?
              </AlertDialogHeader>

              <AlertDialogBody>
                If you click "Yes", you'll exit the queue. This action cannot be
                undone.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={exitRef} onClick={exitQueue}>
                  Exit
                </Button>
                <Button colorScheme="teal" onClick={onClose} ml={3}>
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
