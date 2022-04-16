import { Box, TableContainer, Table, Thead, Tr, Tbody } from "@chakra-ui/react";
import {
  LandingPageTableRow,
  LandingPageTableRowProps,
} from "./LandingPageTableRow";
import TableHeader from "../../tables/TableHeader";
import { IQueue } from "@lyne/shared-dto";

const AllQueuesTable = ({ queueList }: { queueList: IQueue[] }) => {
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
              {queueList.map(
                ({
                  queueId,
                  queueName,
                  queue,
                  timeCreated,
                  repeatCycle,
                  liveTime,
                  closeTime,
                }: IQueue) => {
                  let status = false;
                  if (!closeTime) {
                    status = Date.now() >= liveTime;
                  } else {
                    status = Date.now() >= liveTime && Date.now() < closeTime;
                  }
                  const opts: LandingPageTableRowProps = {
                    queueId,
                    queueName,
                    numUsers: queue.length.toString(),
                    timeCreated,
                    liveTime,
                    closeTime,
                    repeatCycle,
                    status,
                  };

                  return (
                    <LandingPageTableRow
                      key={opts.queueId}
                      {...opts}
                    ></LandingPageTableRow>
                  );
                },
              )}
            </Tbody>
          </Table>
        </Box>
      </TableContainer>
    </>
  );
};

export default AllQueuesTable;
