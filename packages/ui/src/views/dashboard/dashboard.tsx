import { Flex, Heading } from "@chakra-ui/react";
import { Fragment } from "react";
import AdminNavBar from "../../components/AdminNavBar";
import AllQueuesTable from "../../components/dashboard/landingPage/AllQueuesTable";

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
        <AllQueuesTable></AllQueuesTable>
      </Flex>
    </Fragment>
  );
}
