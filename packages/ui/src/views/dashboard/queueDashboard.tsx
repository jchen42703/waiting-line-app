import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Flex, Heading } from "@chakra-ui/react";
import AdminNavBar from "../../components/AdminNavBar";
import { getQueue } from "../../lib/services/queue.service";
import { IQueue } from "@lyne/shared-dto";
import BackButton from "../../components/BackButton";
import { popUser } from "../../lib/services/user.service";
import UserTableManager from "../../components/dashboard2/UserTableManager";

export default function QueueDashboard() {
  return (
    <>
      <AdminNavBar></AdminNavBar>

      <Flex flexDirection={"column"} justifyContent={"center"} my="3" mx="16">
        <UserTableManager></UserTableManager>
        {/* <QueueTable deleteUserEnabled={deleteToggleState} queueId={queueId} /> */}
      </Flex>
    </>
  );
}
