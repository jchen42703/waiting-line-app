import {
  Flex,
  Container,
  Heading,
  Stack,
  Text,
  Image,
  Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

//@ts-ignore
import hero from "../media/home_hero.svg";
import "../../styles/pages/login.scss";

export default function Hero() {
  return (
    <Container maxW={"5xl"}>
      <Stack
        textAlign={"center"}
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
      >
        <Heading
          fontWeight={600}
          fontSize={{ lg: "5xl", sm: "2xl", md: "4xl" }}
          lineHeight={"110%"}
        >
          Building waiting lines{" "}
          <Text as={"span"} color={"blue.400"}>
            made easy
          </Text>
        </Heading>
        <Text
          fontSize={{ lg: "lg", sm: "sm", md: "md" }}
          fontWeight="bold"
          color={"blue.500"}
          maxW={"3xl"}
        >
          Start your business with one Lyne at a time.
        </Text>
        <Link to="/login">
          <Button bg="#0b3075" color="white" rounded="lg">
            Start now
          </Button>
        </Link>

        <Flex w={"full"}>
          <Image
            height={{ sm: "12rem", md: "20rem", lg: "25rem" }}
            pl={{ base: 30, sm: 20 }}
            mt={{ sm: 5 }}
            ml={{ sm: 30, md: 100, lg: 150 }}
            src={hero}
            alt={"hero"}
          ></Image>
        </Flex>
      </Stack>
    </Container>
  );
}
