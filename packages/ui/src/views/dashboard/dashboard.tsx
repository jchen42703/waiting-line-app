import {
  Flex,
  Heading,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
} from "@chakra-ui/react";
import { RepeatCycle } from "@lyne/shared-dto";
import { Fragment } from "react";
import Footer from "../../components/home/Footer";
import AdminNavBar from "../../components/AdminNavBar";
import LandingPageTableRow from "../../components/dashboard/landingPage/LandingPageTableRow";
import TableHeader from "../../components/tables/TableHeader";

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
        <Heading as="h1">Queue Manager Dashboard</Heading>
        <TableContainer minHeight={"80vh"} marginX={"16"}>
          <Table variant="striped" colorScheme={"blackAlpha"} size="md">
            <Thead>
              <Tr>
                <TableHeader text="Queue Name"></TableHeader>
                <TableHeader text="Number of Users"></TableHeader>
                <TableHeader text="Date Created"></TableHeader>
                <TableHeader text="Live Date"></TableHeader>
                <TableHeader text="Close Date"></TableHeader>
                <TableHeader text="Cycle"></TableHeader>
                <TableHeader text="Status"></TableHeader>
              </Tr>
            </Thead>
            <Tbody>
              <LandingPageTableRow
                queueName="dab"
                numUsers="5"
                timeCreated={100}
                liveTime={200}
                closeTime={300}
                repeatCycle={"daily" as RepeatCycle}
                status={true}
              ></LandingPageTableRow>
              <LandingPageTableRow
                queueName="dab"
                numUsers="5"
                timeCreated={100}
                liveTime={200}
                closeTime={300}
                repeatCycle={"daily" as RepeatCycle}
                status={false}
              ></LandingPageTableRow>
            </Tbody>
          </Table>
        </TableContainer>
        <Footer></Footer>
      </Flex>
    </Fragment>
  );
}
