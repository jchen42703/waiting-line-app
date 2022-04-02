import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import JsonData from "./testData.json";
export default function QueueTable() {
  // console.log(queueId);
  //   TODO: get list of all users for specific queue
  //   POST /api/queue/all <- double check this later
  //   - requires queueId in the body
  //   - adminId from auth cookie
  const DisplayData = JsonData.map((info) => {
    return (
      <Tr>
        <Td>{info.place}</Td>
        <Td>{info.name}</Td>
        <Td>{info.phoneNumber}</Td>
        <Td>{info.timeJoined}</Td>
        <Td></Td>
      </Tr>
    );
  });

  return (
    <div>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Place</Th>
            <Th>Name</Th>
            <Th>Phone Number</Th>
            <Th>Time Joined</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>{DisplayData}</Tbody>
      </Table>
    </div>
  );
}
