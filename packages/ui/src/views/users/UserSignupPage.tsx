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
  Spacer,
} from "@chakra-ui/react";
import { useState } from "react";
import { config } from "../../lib/config";
import { Navigate, useParams } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import validator from "validator";

type FormValues = {
  name: string;
  email: string;
  phone: string;
};

export default function UserSignupPage() {
  const { queueId } = useParams();
  console.log(queueId);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValues>();

  const [loading, setLoading] = useState(false);

  const [redirectState, setRedirectState] = useState({
    shouldRedirect: false,
    userId: "",
    name: "",
    mail: "",
    phone: "",
  });
  const toast = useToast(); // A toast to show some errors

  const onSubmit: SubmitHandler<FormValues> = async (formData) => {
    setLoading(true);

    const data = {
      queueId,
      name: formData.name,
      mail: formData.email,
      phoneNumber: formData.phone,
    };

    console.log(data);
    console.log(formData.name);
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

      // need to check if the user is in the cban list

      setRedirectState({
        shouldRedirect: true,
        userId: respBody.userId,
        name: data.name,
        mail: data.mail,
        phone: data.phoneNumber,
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
        status: "error",
        description:
          "Woops! Looks like something went wrong with our servers. Please try again.",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  if (redirectState.shouldRedirect) {
    console.log("redirects!");
    const date = new Date();
    const redirectPath = `/users/${queueId}/${redirectState.userId}?name=${
      redirectState.name
    }&email=${redirectState.mail}&phone=${
      redirectState.phone
    }&joinTime=${date.toISOString()} `;
    return <Navigate to={redirectPath} />;
  }

  return (
    <>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={"brand.grey"}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Sign up to join the line</Heading>
            <Text align={"center"} fontSize={"xl"} color={"gray.600"}>
              Please fill out this form to join queue {queueId}
            </Text>
          </Stack>
          <Box rounded={"lg"} bg={"brand.primary-light"} boxShadow={"lg"} p={8}>
            <form id="userform" onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={4}>
                <FormControl isRequired>
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <Input
                    id="name"
                    placeholder="Name"
                    {...register("name", {})}
                  />
                </FormControl>

                <FormControl isRequired isInvalid={errors.email != null}>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                    id="email"
                    placeholder="Email address"
                    {...register("email", {
                      validate: (v) =>
                        validator.isEmail(v) === true ||
                        "Please enter a valid email address",
                    })}
                  />
                  <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                </FormControl>

                <FormControl isRequired isInvalid={errors.phone != null}>
                  <FormLabel htmlFor="phone">Phone Number</FormLabel>

                  <InputGroup>
                    <InputLeftAddon children="+1" bg={"brand.grey"} />
                    <Input
                      id="phone"
                      placeholder="Phone number"
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
                <Spacer />
                <Button
                  isLoading={loading}
                  loadingText="Joining"
                  bg={"brand.secondary"}
                  textColor={"white"}
                  _hover={{ textColor: "black", bg: "brand.secondary" }}
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
