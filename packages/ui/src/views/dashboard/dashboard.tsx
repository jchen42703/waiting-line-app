import {
  Flex,
  Heading,
  TableContainer,
  Table,
  Thead,
  Tr,
  Tbody,
} from "@chakra-ui/react";
import { RepeatCycle } from "@lyne/shared-dto";
import { Fragment, useEffect, useState } from "react";
import AdminNavBar from "../../components/AdminNavBar";
import {
  LandingPageTableRow,
  LandingPageTableRowProps,
} from "../../components/dashboard/landingPage/LandingPageTableRow";
import TableHeader from "../../components/tables/TableHeader";

export default function Dashboard() {
  const [queueList, setQueueList] = useState([]);

  useEffect(() => {
    // Test data
    setQueueList([
      {
        queueName: "dab",
        numUsers: "5",
        timeCreated: 100,
        liveTime: 200,
        closeTim: 300,
        repeatCycle: RepeatCycle.DAILY,
        status: true,
      },
      {
        queueName: "dab2",
        numUsers: "100",
        timeCreated: 100,
        liveTime: 200,
        closeTim: 300,
        repeatCycle: RepeatCycle.WEEKLY,
        status: false,
      },
    ]);
  }, []);

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
              {queueList.map((opts: LandingPageTableRowProps) => {
                return <LandingPageTableRow {...opts}></LandingPageTableRow>;
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </Fragment>
  );
}
