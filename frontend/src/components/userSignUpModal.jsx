import {
  FormControl,
  FormLabel,
  Button,
  Input,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { config } from "../lib/config";
import { Navigate } from "react-router-dom";

export default function SignUpWindow(props) {
  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });
  const finalRef = React.useRef();

  const [redirectState, setRedirectState] = React.useState({
    shouldRedirect: false,
    userId: "",
  });

  const handleSubmit = async () => {
    console.log(
      "name: ",
      document.getElementById("name").value,
      "\nemail: ",
      document.getElementById("email").value,
      "\nphone number: ",
      document.getElementById("phone-num").value
    );

    const data = {
      queueId: props.queueId,
    };
    // Default options are marked with *
    const response = await fetch(`${config.hostUrl}/api/queue/join`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    const value = await response.json(); // parses JSON response into native JavaScript objects
    console.log(value);

    setRedirectState({
      shouldRedirect: true,
      userId: value.userId,
    });
  };

  if (redirectState.shouldRedirect) {
    console.log("redirects!");
    const redirectPath = `/users/${props.queueId}/${redirectState.userId}`;
    return <Navigate to={redirectPath} />;
  }
  return (
    <>
      <Modal
        closeOnOverlayClick={false}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size="sm"
      >
        <ModalOverlay />
        <ModalContent>
          {/*<ModalHeader textAlign="Center">User Information</ModalHeader>*/}
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <FormLabel mt={10} htmlFor="name">
                Name
              </FormLabel>
              <Input id="name" placeholder="Name" />
              <FormLabel mt={3} htmlFor="email">
                Email
              </FormLabel>
              <Input id="email" placeholder="Email" htmlSize={20} />
              <FormLabel mt={3} htmlFor="phone-num">
                Phone Number
              </FormLabel>
              <Input id="phone-num" placeholder="Phone Number" />
            </FormControl>
          </ModalBody>

          <ModalFooter alignSelf="Center">
            <Button mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="teal" type="submit" onClick={handleSubmit}>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
