import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Progress,
  Spacer,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";

export default function UserWaitingPage(props) {
  let { queueId, userId } = useParams();
  console.log(queueId + userId);
  const userRegInfo = {
    name: "name",
    email: "email@email.com",
    phone: "1234567890",
  };

  const exitQueue = async () => {
    console.log("Exit the queue");
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box>
        <Progress colorScheme="teal" w="100%" height="28px" value={80} />
      </Box>
      <Flex
        direction="column"
        minH={"70vh"}
        align={"center"}
        justify={"center"}
        gap={6}
        bg={"white"}
      >
        <Text>Queue name</Text>
        <Flex size="150px">
          <Text fontSize="6xl">Place/Total ppl</Text>
        </Flex>
        <Stack>
          <Text>Estimated time: </Text>
          <Text>Time joined: </Text>
          <Text>Time elapsed: </Text>
        </Stack>
      </Flex>

      <Center>
        <Box
          pos="fixed"
          bottom={0}
          backgroundColor="white"
          p={4}
          shadow="md"
          borderWidth="1px"
          length="10px"
          w="70%"
        >
          <Heading fontSize="2xl">Registered Information</Heading>
          <Flex mt={4} direction={{ base: "column", md: "row" }}>
            <Text>Name: {userRegInfo.name}</Text>
            <Spacer />
            <Text>Email: {userRegInfo.email}</Text>
            <Spacer />
            <Text>Phone #: {userRegInfo.phone}</Text>
          </Flex>
          <Stack>
            <Button onClick={onOpen} mt={4} colorScheme="red" variant="outline">
              Exit
            </Button>
          </Stack>
        </Box>
      </Center>

      <Modal
        size="md"
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Are you sure you want to exit?</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={2}>place in the queue/eta</ModalBody>
          <ModalFooter>
            <Button
              colorScheme="red"
              variant="outline"
              mr={3}
              onClick={exitQueue}
            >
              Yes, exit the queue
            </Button>
            <Button colorScheme="teal" onClick={onClose}>
              Stay
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
