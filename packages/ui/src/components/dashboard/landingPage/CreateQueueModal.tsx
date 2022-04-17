import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Select,
  FormErrorMessage,
  Spacer,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { createQueue } from "../../../lib/services/queue.service";
import { RepeatCycle } from "@lyne/shared-dto";

type CreateQueueFormValues = {
  name: string;
  description: string;
  liveDate: string;
  liveTime: string;
  closeDate: string;
  closeTime: string;
  repeatCycle: string;
};

const CreateQueueModal = ({ isOpen, onClose, onCreate }) => {
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<CreateQueueFormValues>();

  const onSubmit = async ({
    name,
    description,
    liveDate,
    liveTime,
    closeDate,
    closeTime,
    repeatCycle,
  }: CreateQueueFormValues) => {
    setLoading(true);

    // TODO: This might not work on some browsers. Test later
    const liveTimestamp = new Date(`${liveDate} ${liveTime}`).getTime();
    let closeTimestamp: number;
    if (closeDate !== "") {
      closeTimestamp = new Date(closeDate).getTime();
    }

    if (closeDate !== "" && closeTime !== "") {
      closeTimestamp = new Date(`${closeDate} ${closeTime}`).getTime();
    }

    // Parse repeat cycle
    const validRepeatCycles: string[] = [
      RepeatCycle.DAILY,
      RepeatCycle.MONTHLY,
      RepeatCycle.WEEKLY,
    ];
    let parsedRepeatCycle = repeatCycle.trim().toLowerCase();

    parsedRepeatCycle = validRepeatCycles.includes(parsedRepeatCycle)
      ? repeatCycle
      : undefined;

    const createdQueueId = await createQueue({
      queueName: name,
      description,
      liveTime: liveTimestamp,
      closeTime: closeTimestamp,
      repeatCycle: parsedRepeatCycle as RepeatCycle,
    });
    setLoading(false);
    console.log("createdQ: ", createdQueueId);
    onCreate();
  };

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
                <FormControl isRequired>
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <Input
                    id="name"
                    placeholder="Name"
                    {...register("name", {
                      required: true,
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

                <FormControl isRequired>
                  <FormLabel htmlFor="liveDate">Date Queue Goes Live</FormLabel>
                  <Input
                    id="liveDate"
                    type={"date"}
                    {...register("liveDate", {})}
                  />
                  <FormErrorMessage>
                    The date the queue goes live must be specified.
                  </FormErrorMessage>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel htmlFor="liveTime">Time Queue Goes Live</FormLabel>
                  <Input
                    id="liveTime"
                    type={"time"}
                    {...register("liveTime", {})}
                  />
                  <FormErrorMessage>
                    The time the queue goes live must be specified.
                  </FormErrorMessage>
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor="closeDate">
                    Date Queue Closes (Optional)
                  </FormLabel>
                  <Input
                    id="closeDate"
                    type={"date"}
                    {...register("closeDate", {})}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor="closeTime">
                    Time Queue Closes (Optional)
                  </FormLabel>
                  <Input
                    id="closeTime"
                    type={"time"}
                    {...register("closeTime", {})}
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
