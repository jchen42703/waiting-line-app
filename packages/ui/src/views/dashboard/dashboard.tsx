import { Flex, Heading } from "@chakra-ui/react";
import { Fragment } from "react";
import AdminNavBar from "../../components/AdminNavBar";
import QueueTableManager from "../../components/dashboard/landingPage/QueueTableManager";

export default function Dashboard() {
  return (
    <Fragment>
      <AdminNavBar />
      <Flex
        bg={"brand.light"}
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"column"}
        paddingTop={"8"}
      >
        <Heading as="h1" marginBottom={"5"}>
          Queue Manager Dashboard
        </Heading>
        <QueueTableManager></QueueTableManager>
      </Flex>
    </Fragment>
  );
}
