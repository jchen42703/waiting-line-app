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

export default function SignUpWindow() {
  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });
  const finalRef = React.useRef();

  const handleSubmit = async () => {
    console.log(
      "name: ",
      document.getElementById("name").value,
      "\nemail: ",
      document.getElementById("email").value,
      "\nphone number: ",
      document.getElementById("phone-num").value
    );
  };

  return (
    <>
      <p>scan code</p>
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
