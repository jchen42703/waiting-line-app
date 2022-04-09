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
        <TableContainer minHeight={"80vh"}>
          <Table>
            <Thead>
              <Tr>
                <Th>Queue Name</Th>
                <Th>Number of Users</Th>
                <Th>Date Created</Th>
                <Th>Queue Live Time</Th>
                <Th>Queue Close Time</Th>
                <Th>Cycle</Th>
                <Th>Queue Status</Th>
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
