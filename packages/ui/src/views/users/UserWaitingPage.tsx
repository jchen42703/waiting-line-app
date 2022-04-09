import { Box, Flex, Heading, Spacer, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { config } from "../../lib/config";
import { useParams } from "react-router-dom";
import UserWaitingStatus from "../../components/UserWaitingStatus";
import { join } from "path";

export default function UserWaitingPage() {
  const { queueId, userId } = useParams();
  const urlParams = new URLSearchParams(window.location.search);

  const joinInfo = {
    name: urlParams.get("name"),
    email: urlParams.get("email"),
    phone: urlParams.get("phone"),
    joinTime: new Date(urlParams.get("joint")),
  };
  console.log("queueId: " + queueId + "\nuserId: " + userId);

  return (
    <>
      <Flex
        direction="column"
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        gap={6}
        bg={"brand.light"}
        textColor="white"
        minW="35ch"
      >
        <UserWaitingStatus joint={joinInfo.joinTime} />
        <Box
          maxW="60ch"
          minW="35ch"
          backgroundColor="brand.blue"
          p={6}
          rounded="lg"
          shadow="lg"
          w="90%"
        >
          {/* <Heading align={"center"} fontSize="xl"> */}
          <Heading fontSize="xl" textColor={"brand.light"}>
            Registration Information
          </Heading>
          <Flex mt={4} direction={{ base: "column", md: "row" }}>
            <Text>Name: {joinInfo.name}</Text>
            <Spacer />
            <Text>Email: {joinInfo.email}</Text>
            <Spacer />
            <Text>Phone number: {joinInfo.phone}</Text>
          </Flex>
        </Box>
      </Flex>
    </>
  );
}
