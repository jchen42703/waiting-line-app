import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  //   ModalBody,
  ModalCloseButton,
  //   useDisclosure,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Select,
  //   InputLeftAddon,
  //   InputGroup,
  FormErrorMessage,
  Spacer,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import validator from "validator";
// import InputMask from "react-input-mask";

type FormValues = {
  name: string;
  description: string;
  //   liveTime: Date;
  repeatCycle: string;
};

const CreateQueueModal = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = (data) => console.log(data);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Queue</ModalHeader>
          <ModalCloseButton />

          <Box px="8">
            <form id="userform" onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={4}>
                <FormControl isRequired isInvalid={errors.name != null}>
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <Input
                    id="name"
                    placeholder="Name"
                    {...register("name", {
                      validate: (v: string) => v.length <= 30,
                    })}
                  />
                  <FormErrorMessage>
                    Name must be less than 30 characters.
                  </FormErrorMessage>
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor="description">Description</FormLabel>
                  <Input
                    id="description"
                    placeholder="Description of queue."
                    {...register("description", {})}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor="repeatCycle">
                    Queue Repeat Cycle
                  </FormLabel>
                  <Select
                    id="repeatCycle"
                    placeholder="None"
                    {...register("repeatCycle", {})}
                  >
                    <option>Daily</option>
                    <option>Weekly</option>
                    <option>Monthly</option>
                  </Select>
                </FormControl>

                <Spacer />
                <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={onClose}>
                    Close
                  </Button>
                  <Button
                    isLoading={loading}
                    loadingText="Creating queue..."
                    bg={"brand.secondary"}
                    textColor={"white"}
                    _hover={{ textColor: "black", bg: "brand.secondary" }}
                    type="submit"
                  >
                    Create
                  </Button>
                </ModalFooter>
              </Stack>
            </form>
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateQueueModal;
