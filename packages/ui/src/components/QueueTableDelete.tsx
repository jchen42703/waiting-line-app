import { Button, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import JsonData from "./testData.json";
export default function QueueTableDelete() {
  const DisplayData = JsonData.map((info) => {
    return (
      <Tr>
        <Td>{info.place}</Td>
        <Td>{info.name}</Td>
        <Td>{info.phoneNumber}</Td>
        <Td>{info.timeJoined}</Td>
        <Td>
          {" "}
          <Button> Delete </Button>
        </Td>
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
            <Th>Delete User?</Th>
          </Tr>
        </Thead>
        <Tbody>{DisplayData}</Tbody>
      </Table>
    </div>
  );
}
