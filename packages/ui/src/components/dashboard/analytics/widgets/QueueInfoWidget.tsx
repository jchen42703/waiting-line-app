<<<<<<< HEAD
import { Box } from "@chakra-ui/react";
import QueueInfo from "./QueueInfo";
import EditQueueInfo from "./EditQueueInfo";

const QueueInfoWidget = ({ queueInfo, canEdit }) => {
=======
import {
  FormControl,
  Input,
  Textarea,
  Box,
  FormHelperText,
  FormLabel,
  useToast,
  Center,
  Stack,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";

import { config } from "../../../../lib/config";
import { useState } from "react";

const QueueInfoWidget = ({ queueInfo }) => {
  // errors
  const toast = useToast();

  const [inputs, setInputs] = useState({
    queueName: "",
    description: "",
    liveTime: "",
    repeatCycle: "",
    closeTime: "",
  });

  // add to our state
  const onChange = (e) => {
    if (e == "Daily" || e == "Monthly" || e == "Weekly") {
      setInputs({ ...inputs, ["repeatCycle"]: e });
    } else {
      setInputs({ ...inputs, [e.target.name]: e.target.value });
    }
  };

  // parse information
  const { queueName, description, liveTime, repeatCycle, closeTime } = inputs;

  // update info
  const onSubmitForm = async () => {
    try {
      // check that live time is less than closeTime
      if (Number(closeTime) < Number(liveTime)) {
        toast({
          title: "Invalid changes!",
          description: "Live time can't be greater than close time",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      } else {
        const newQueue = {
          queueId: queueInfo.queueId,
          queueName: queueName || queueInfo.queueName,
          description: description || queueInfo.description,
          liveTime: Number(liveTime) || queueInfo.liveTime,
          repeatCycle: repeatCycle || queueInfo.repeatCycle,
          closeTime: Number(closeTime) || queueInfo.closeTime,
        };
        const res = await fetch(`${config.hostUrl}/api/queue/edit`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newQueue),
        });
      }
    } catch (err) {
      console.error(err.message);
    }
  };

>>>>>>> origin/main
  return (
    <Box
      boxShadow="xs"
      rounded="lg"
      bg="white"
      height="100%"
<<<<<<< HEAD
      w="100%"
      justifyItems="center"
      fontWeight="bold"
    >
      {canEdit ? (
        <EditQueueInfo queueInfo={queueInfo} />
      ) : (
        <QueueInfo queueInfo={queueInfo} />
      )}
=======
      w="90%"
      justifyItems="center"
      fontWeight="bold"
    >
      <form onSubmit={onSubmitForm}>
        <FormControl>
          <FormLabel fontSize="lg" textAlign="center" fontWeight="bold">
            {" "}
            Queue Name
          </FormLabel>
          <Input
            textAlign="center"
            fontWeight="bold"
            variant="unstyled"
            isRequired
            defaultValue={queueInfo.queueName}
            name="queueName"
            onChange={(e) => onChange(e)}
            pb="2%"
          />
          <FormLabel fontSize="lg" fontWeight="bold" textAlign="center">
            {" "}
            Description{" "}
          </FormLabel>
          <Textarea
            fontWeight="bold"
            isRequired
            textAlign="center"
            variant="unstyled"
            defaultValue={queueInfo.description}
            name="description"
            onChange={onChange}
            pb="2%"
          />
          <FormLabel fontSize="lg" fontWeight="bold" textAlign="center">
            {" "}
            Live Time{" "}
          </FormLabel>
          <Input
            fontWeight="bold"
            isRequired
            textAlign="center"
            variant="unstyled"
            type="number"
            defaultValue={queueInfo.liveTime}
            name="liveTime"
            onChange={(e) => onChange(e)}
            pb="2%"
          />
          <FormLabel fontSize="lg" fontWeight="bold" textAlign="center">
            {" "}
            Close Time
          </FormLabel>
          <Input
            textAlign="center"
            variant="unstyled"
            isRequired
            fontWeight="bold"
            pb="2%"
            name="closeTime"
            defaultValue={queueInfo.closeTime}
            onChange={(e) => onChange(e)}
          />
          <FormLabel fontSize="lg" fontWeight="bold" textAlign="center">
            {" "}
            repeatCycle : {queueInfo.repeatCycle}
          </FormLabel>
          <RadioGroup name="repeatCycle" onChange={(e) => onChange(e)}>
            <Stack direction="row" justifyContent="center">
              <Radio value="Daily">Daily</Radio>
              <Radio value="Weekly">Weekly</Radio>
              <Radio value="Monthly">Monthly</Radio>
            </Stack>
          </RadioGroup>

          <FormHelperText textAlign="center">
            Click and edit the information.{" "}
          </FormHelperText>
          <Center pt="2%" pb="2%">
            <button>Submit changes...</button>
          </Center>
        </FormControl>
      </form>
>>>>>>> origin/main
    </Box>
  );
};

export default QueueInfoWidget;
