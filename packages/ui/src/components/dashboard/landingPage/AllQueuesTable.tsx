import { TableContainer, Table, Thead, Tr, Tbody } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { RepeatCycle } from "@lyne/shared-dto";
import {
  LandingPageTableRow,
  LandingPageTableRowProps,
} from "./LandingPageTableRow";
import TableHeader from "../../tables/TableHeader";

const AllQueuesTable = () => {
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
    <>
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
    </>
  );
};

export default AllQueuesTable;
