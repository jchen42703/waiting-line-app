import { Box, TableContainer, Table, Thead, Tr, Tbody } from "@chakra-ui/react";
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
        queueId: "test-q-id-1",
        queueName: "dab",
        numUsers: "5",
        timeCreated: 100,
        liveTime: 200,
        closeTim: 300,
        repeatCycle: RepeatCycle.DAILY,
        status: true,
      },
      {
        queueId: "test-q-id-2",
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
        <Box border="2px solid" borderColor="gray.100" borderRadius="md">
          <Table
            variant="striped"
            colorScheme={"blackAlpha"}
            size="md"
            border={"8px black"}
          >
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
                return (
                  <LandingPageTableRow
                    key={opts.queueId}
                    {...opts}
                  ></LandingPageTableRow>
                );
              })}
            </Tbody>
          </Table>
        </Box>
      </TableContainer>
    </>
  );
};

export default AllQueuesTable;
