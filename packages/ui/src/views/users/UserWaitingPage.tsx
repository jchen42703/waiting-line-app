import { Box, Flex, Heading, Spacer, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { config } from "../../lib/config";
import { useParams } from "react-router-dom";
import UserWaitingStatus from "../../components/UserWaitingStatus";

export default function UserWaitingPage() {
  const { queueId, userId } = useParams();

  console.log("queueId: " + queueId + "\nuserId: " + userId);

  const userRegInfo = {
    name: "name",
    email: "email@email.com",
    phone: "1234567890",
  };

  return (
    <>
      <Flex
        direction="column"
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        gap={6}
        bg={"gray.100"}
        minW="35ch"
      >
        <UserWaitingStatus />
        <Box
          maxW="60ch"
          minW="35ch"
          backgroundColor="white"
          p={6}
          rounded="lg"
          shadow="lg"
          w="90%"
        >
          {/* <Heading align={"center"} fontSize="xl"> */}
          <Heading fontSize="xl" className="items-center">
            Registration Information
          </Heading>
          <Flex mt={4} direction={{ base: "column", md: "row" }}>
            <Text>Name: {userRegInfo.name}</Text>
            <Spacer />
            <Text>Email: {userRegInfo.email}</Text>
            <Spacer />
            <Text>Phone #: {userRegInfo.phone}</Text>
          </Flex>
        </Box>
      </Flex>
    </>
  );
}
