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
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { config } from "../../lib/config";
import { Navigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import validator from "validator";

export default function UserSignupPage() {
  const { queueId } = useParams();
  console.log(queueId);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);

  const [redirectState, setRedirectState] = useState({
    shouldRedirect: false,
    userId: "",
  });
  const toast = useToast(); // A toast to show some errors

  const onSubmit = async () => {
    setLoading(true);
    // console.log(
    //   "name: ",
    //   // @ts-ignore
    //   document.getElementById("name").value,
    //   "\nemail: ",
    //   document.getElementById("email").value,
    //   "\nphone number: ",
    //   document.getElementById("phone").value.match(/\d/g).join(""),
    // );

    const data = {
      queueId,
    };
    console.log(data);
    // Default options are marked with *
    try {
      const resp = await fetch(`${config.hostUrl}/api/queue/join`, {
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
      setRedirectState({
        shouldRedirect: true,
        userId: respBody.userId,
      });
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
  };

  if (redirectState.shouldRedirect) {
    console.log("redirects!");
    const redirectPath = `/users/${queueId}/${redirectState.userId}`;
    return <Navigate to={redirectPath} />;
  }

  return (
    <>
      <Flex minH={"100vh"} align={"center"} justify={"center"} bg={"gray.100"}>
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Sign up to join the line</Heading>
            <Text align={"center"} fontSize={"xl"} color={"gray.600"}>
              Please fill out this form to join queue {queueId}
            </Text>
          </Stack>
          <Box rounded={"lg"} bg={"white"} boxShadow={"lg"} p={8}>
            <form id="userform" onSubmit={handleSubmit(onSubmit)}>
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
                      validate: (v) =>
                        validator.isEmail(v) === true ||
                        "Please enter a valid email address",
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
                        validate: (v) =>
                          validator.isMobilePhone(v) === true ||
                          "Please enter a valid phone number",
                      })}
                    />
                  </InputGroup>

                  <FormErrorMessage>{errors.phone?.message}</FormErrorMessage>
                </FormControl>

                <Button
                  isLoading={loading}
                  loadingText="Joining"
                  mt={3}
                  colorScheme="teal"
                  type="submit"
                >
                  Join
                </Button>
              </Stack>
            </form>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}
