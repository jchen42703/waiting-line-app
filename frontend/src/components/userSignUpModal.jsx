import {
  FormControl,
  FormLabel,
  Button,
  Input,
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  FormErrorMessage,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";
import React from "react";
import { config } from "../lib/config";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";

export default function SignUpWindow(props) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const [redirectState, setRedirectState] = React.useState({
    shouldRedirect: false,
    userId: "",
  });

  const onSubmit = async () => {
    console.log(
      "name: ",
      document.getElementById("name").value,
      "\nemail: ",
      document.getElementById("email").value,
      "\nphone number: ",
      document.getElementById("phone").value.match(/[0-9]/g).join("")
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
    <Flex minH={"100vh"} align={"center"} justify={"center"} bg={"gray.100"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign up to join the queue</Heading>
          <Text fontSize={"xl"} color={"gray.600"}>
            description ... e.g. queue name
          </Text>
        </Stack>
        <Box rounded={"lg"} bg={"white"} boxShadow={"lg"} p={8}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4}>
              <FormControl isRequired>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input id="name" placeholder="Name" />
              </FormControl>
              <FormControl isRequired isInvalid={errors.email}>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  id="email"
                  placeholder="Email"
                  {...register("email", {
                    pattern: {
                      value: /.[@]./,
                      message: <p>Please enter a valid email address</p>,
                    },
                  })}
                />
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isRequired isInvalid={errors.phone}>
                <FormLabel htmlFor="phone">Phone Number</FormLabel>

                <InputGroup>
                  <InputLeftAddon children="+1" />
                  <Input
                    id="phone"
                    placeholder="Phone Number"
                    as={InputMask}
                    mask="(***) ***-****"
                    maskChar={null}
                    {...register("phone", {
                      pattern: {
                        value: /\d{4}/g,
                        message: <p>Please enter a valid phone number</p>,
                      },
                    })}
                  />
                </InputGroup>

                <FormErrorMessage>{errors.phone?.message}</FormErrorMessage>
              </FormControl>

              <Button mt={3} colorScheme="teal" type="submit">
                Join
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
