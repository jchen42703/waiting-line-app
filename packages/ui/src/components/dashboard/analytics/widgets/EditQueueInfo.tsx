import {
  FormControl,
  Input,
  Textarea,
  Box,
  FormHelperText,
  useToast,
  Center,
  Stack,
  Radio,
  Heading,
  RadioGroup,
} from "@chakra-ui/react";
import { config } from "../../../../lib/config";
import { useState } from "react";

const EditQueueInfo = ({ queueInfo }) => {
  const toast = useToast();

  // store user changes
  const [inputs, setInputs] = useState({
    queueName: "",
    description: "",
    liveTime: "",
    repeatCycle: "",
    closeTime: "",
    advanceNotice: "",
  });

  // update the inputs
  const onChange = (e) => {
    if (e == "Daily" || e == "Monthly" || e == "Weekly") {
      setInputs({ ...inputs, ["repeatCycle"]: e });
    } else {
      setInputs({ ...inputs, [e.target.name]: e.target.value });
    }
  };

  // parse inputs
  const {
    queueName,
    description,
    liveTime,
    repeatCycle,
    closeTime,
    advanceNotice,
  } = inputs;

  // update info
  const onSubmitForm = async (e) => {
    try {
      // check that live time is less than closeTime
      if (new Date(closeTime).getTime() < new Date(liveTime).getTime()) {
        e.preventDefault();
        toast({
          title: "Invalid changes!",
          description: "Live time can't be greater than close time",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
      if (Number(advanceNotice) > queueInfo.queue.length) {
        toast({
          title: "Invalid changes!",
          description: "Advance notice is greater than number of users",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      } else {
        const newQueue = {
          queueId: queueInfo.queueId,
          queueName: queueName || queueInfo.queueName,
          description: description || queueInfo.description,
          liveTime:
            new Date(liveTime.replace("-", "/")).getTime() ||
            queueInfo.liveTime,
          repeatCycle: repeatCycle || queueInfo.repeatCycle,
          closeTime:
            new Date(closeTime.replace("-", "/")).getTime() ||
            queueInfo.closeTime,
          advanceNotice: Number(advanceNotice),
        };

        console.log(newQueue);
        const res = await fetch(`${config.hostUrl}/api/queue/edit`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newQueue),
        });
        console.log(res);
        return res.json();
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Box>
      <form onSubmit={onSubmitForm}>
        <FormControl>
          <Heading fontSize="lg" textAlign="center" fontWeight="bold">
            {" "}
            Queue Name
          </Heading>
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
          <Heading fontSize="lg" fontWeight="bold" textAlign="center">
            {" "}
            Description{" "}
          </Heading>
          <Textarea
            fontWeight="bold"
            textAlign="center"
            variant="unstyled"
            defaultValue={queueInfo.description}
            name="description"
            onChange={onChange}
            pb="2%"
          />
          <Heading fontSize="lg" fontWeight="bold" textAlign="center">
            {" "}
            Live Time{" "}
          </Heading>
          <Input
            fontWeight="bold"
            textAlign="center"
            variant="unstyled"
            type="date"
            name="liveTime"
            onChange={(e) => onChange(e)}
            pb="2%"
          />
          <Heading fontSize="lg" fontWeight="bold" textAlign="center">
            {" "}
            Close Time
          </Heading>
          <Input
            textAlign="center"
            variant="unstyled"
            fontWeight="bold"
            pb="2%"
            type="date"
            name="closeTime"
            onChange={(e) => onChange(e)}
          />
          <Heading fontSize="lg" fontWeight="bold" textAlign="center">
            {" "}
            Advance Notice
          </Heading>
          <Input
            textAlign="center"
            variant="unstyled"
            fontWeight="bold"
            pb="2%"
            type="number"
            name="advanceNotice"
            onChange={(e) => onChange(e)}
          />
          <Heading fontSize="lg" fontWeight="bold" textAlign="center">
            {" "}
            repeatCycle : {queueInfo.repeatCycle}
          </Heading>
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
    </Box>
  );
};

export default EditQueueInfo;
