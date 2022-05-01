import {
  Avatar,
  Box,
  chakra,
  Flex,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";

import "../../styles/pages/login.scss";

const members = [
  {
    name: "Benson Jin",
    role: "Chief Marketing Officer",
    content:
      "Some day, some day Some day I'll, I wanna wear a starry crownSome day, some day Some day I wanna lay down, like God did, on Sunday Hold up, hold up Somedays, some days",
    avatar:
      "https://i.pinimg.com/564x/35/58/0b/35580b1445f692acc580938debc68ed8.jpg",
  },
  {
    name: "Joseph Chen",
    role: "Entrepreneur",
    content:
      "Some day, some day Some day I'll, I wanna wear a starry crownSome day, some day Some day I wanna lay down, like God did, on Sunday Hold up, hold up Somedays, some days",
    avatar:
      "https://i.pinimg.com/564x/35/58/0b/35580b1445f692acc580938debc68ed8.jpg",
  },
  {
    name: "Daniel Lee",
    role: "Movie star",
    content:
      "Some day, some day Some day I'll, I wanna wear a starry crownSome day, some day Some day I wanna lay down, like God did, on Sunday Hold up, hold up Somedays, some days",
    avatar:
      "https://i.pinimg.com/564x/35/58/0b/35580b1445f692acc580938debc68ed8.jpg",
  },
  {
    name: "Jody Zhou",
    role: "Musician",
    content:
      "Some day, some day Some day I'll, I wanna wear a starry crownSome day, some day Some day I wanna lay down, like God did, on Sunday Hold up, hold up Somedays, some days",
    avatar:
      "https://i.pinimg.com/564x/35/58/0b/35580b1445f692acc580938debc68ed8.jpg",
  },
  {
    name: "David Tang",
    role: "Musician",
    content:
      "Some day, some day Some day I'll, I wanna wear a starry crownSome day, some day Some day I wanna lay down, like God did, on Sunday Hold up, hold up Somedays, some days",
    avatar:
      "https://i.pinimg.com/564x/35/58/0b/35580b1445f692acc580938debc68ed8.jpg",
  },
  {
    name: "Jalen Xu",
    role: "Musician",
    content:
      "Some day, some day Some day I'll, I wanna wear a starry crownSome day, some day Some day I wanna lay down, like God did, on Sunday Hold up, hold up Somedays, some days",
    avatar:
      "https://i.pinimg.com/564x/35/58/0b/35580b1445f692acc580938debc68ed8.jpg",
  },
];

interface MemberCardProps {
  name: string;
  role: string;
  content: string;
  avatar: string;
  index: number;
}

function MemberCard(props: MemberCardProps) {
  const { name, role, content, avatar } = props;
  return (
    <Flex
      boxShadow={"lg"}
      maxW={"500px"}
      direction={{ base: "column-reverse", md: "row" }}
      width={"full"}
      rounded={"xl"}
      p={10}
      justifyContent={"space-between"}
      position={"relative"}
      bg={useColorModeValue("white", "gray.800")}
      _after={{
        content: '""',
        position: "absolute",
        height: "21px",
        width: "29px",
        left: "35px",
        top: "-10px",
        backgroundSize: "cover",
      }}
      _before={{
        content: '""',
        position: "absolute",
        zIndex: "-1",
        height: "full",
        maxW: "640px",
        width: "full",
        filter: "blur(40px)",
        transform: "scale(0.98)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        top: 0,
        left: 0,
      }}
    >
      <Flex
        direction={"column"}
        textAlign={"left"}
        justifyContent={"space-between"}
      >
        <chakra.p fontSize={"15px"} pb={4}>
          {content}
        </chakra.p>
        <chakra.p fontWeight={"bold"} fontSize={14}>
          {name}
          <chakra.span color={"gray.500"}> - {role}</chakra.span>
        </chakra.p>
      </Flex>
      <Avatar
        src={avatar}
        height={"80px"}
        width={"80px"}
        alignSelf={"center"}
        m={{ base: "0 0 35px 0", md: "0 0 0 50px" }}
      />
    </Flex>
  );
}

export default function Team() {
  return (
    <Flex
      textAlign={"center"}
      pt={10}
      pb="10%"
      justifyContent={"center"}
      direction={"column"}
      width={"full"}
    >
      <Box width={{ base: "full", sm: "lg", lg: "xl" }} margin={"auto"}>
        <chakra.h3
          fontWeight={"bold"}
          fontSize={20}
          textTransform={"uppercase"}
          color={"blue.400"}
        >
          Meet the team!
        </chakra.h3>
      </Box>
      <SimpleGrid
        columns={{ base: 1, xl: 2 }}
        spacing={"20"}
        mt={16}
        mx={"auto"}
      >
        {members.map((cardInfo, index) => (
          <MemberCard {...cardInfo} index={index} />
        ))}
      </SimpleGrid>
      <Box></Box>
    </Flex>
  );
}
