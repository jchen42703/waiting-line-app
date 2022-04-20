import { Flex } from "@chakra-ui/react";
import AdminNavBar from "../../components/AdminNavBar";
import UserTableManager from "../../components/dashboard/userManager/UserTableManager";

export default function QueueDashboard() {
  return (
    <>
      <AdminNavBar></AdminNavBar>
      <Flex flexDirection={"column"} justifyContent={"center"} my="3" mx="16">
        <UserTableManager></UserTableManager>
      </Flex>
    </>
  );
}
