import hero from "./media/login.svg";
import {
  Box,
  Stack,
  Heading,
  Text,
  Container,
  SimpleGrid,
  useBreakpointValue,
  Image,
} from "@chakra-ui/react";
import GoogleButton from "./buttons/GoogleButton";
import FacebookButton from "./buttons/FacebookButton";
import "../../styles/pages/login.scss";

const Login = () => {
  const google = () => {
    window.open("http://localhost:5000/api/auth/google", "_self");
  };

  const facebook = () => {
    window.open("http://localhost:5000/api/auth/facebook", "_self");
  };

  return (
    <Box position={"relative"}>
      <Container
        as={SimpleGrid}
        maxW={"7xl"}
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 10, lg: 32 }}
        py={{ base: 10, sm: 20, lg: 32 }}
      >
        <Stack spacing={{ base: 10, md: 20 }}>
          <Stack direction={"row"} spacing={4} align={"center"}>
            <Image
              boxSize={{ base: "300px", md: "400px", lg: "560px" }}
              alignItems={{ sm: "center" }}
              position="relative"
              src={hero}
            ></Image>
            <Heading position="absolute" left="10%" top="25%">
              <Text
                fontSize={{ base: "15px", md: "20px", lg: "35px" }}
                textTransform="uppercase"
                bgGradient="linear(to-r, blue.400,blue.400)"
                bgClip="text"
              >
                Build your business
                <br></br>one Lyne at a time.
              </Text>
            </Heading>
          </Stack>
        </Stack>
        <Stack
          bg={"gray.50"}
          rounded={"xl"}
          p={{ base: 4, sm: 6, md: 8 }}
          spacing={{ base: 8 }}
          h="75%"
          maxW={{ lg: "lg" }}
        >
          <Stack spacing={4}>
            <Heading
              color={"gray.800"}
              lineHeight={1.1}
              fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
            >
              Sign in
            </Heading>
            <Text color={"gray.500"} fontSize={{ base: "sm", sm: "md" }}>
              to your Lyne account.
            </Text>
          </Stack>
          <Box>
            <Stack spacing={4}>
              <div onClick={google}>
                <GoogleButton></GoogleButton>
              </div>
              <div onClick={facebook}>
                <FacebookButton></FacebookButton>
              </div>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default Login;
