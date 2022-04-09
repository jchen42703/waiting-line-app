import {
  Box,
  Stack,
  Heading,
  Text,
  Container,
  SimpleGrid,
} from "@chakra-ui/react";
import GoogleButton from "../../components/GoogleButton"
import FacebookButton from "../../components/FacebookButton"

import HeroImage from "../../components/HeroImage"

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
        <HeroImage></HeroImage>
        <Stack
          bg={"gray.50"}
          rounded={"xl"}
          p={{ base: 4, sm: 6, md: 8 }}
          spacing={{ base: 8 }}
          height={{
            base: "125%",
            md: "75%",
            xl: "75%",
          }}
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
