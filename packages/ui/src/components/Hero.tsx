import { Image, Stack, Heading, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
//@ts-ignore
import hero from "./media/login.svg";

export default function HeroImage() {
  const [isDesktop, setDesktop] = useState(window.innerWidth < 768);

  const updateMedia = () => {
    setDesktop(window.innerWidth < 768);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  // dont render when too small
  if (isDesktop) {
    return null;
  }

  return (
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
  );
}
