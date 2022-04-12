import {
  Box,
  Heading,
  VStack,
  Table,
  TableContainer,
  Tr,
  Thead,
  Td,
  Tbody,
  Th,
  Image,
} from "@chakra-ui/react";
import { useState } from "react";

// @ts-ignore
import queuelist from "../../../media/analytics/queuelist.svg";

const UsersTable = () => {
  const [queuedUsers, setQueuedUsers] = useState([]);

  if (queuedUsers.length == 0) {
    return <Image boxSize="150" pb="5%" src={queuelist}></Image>;
  }

  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Phone Number</Th>
            <Th isNumeric>Email</Th>
          </Tr>
        </Thead>
        <Tbody>
          {queuedUsers.map((user) => (
            <Tr>
              <Td>{user.name}</Td>
              <Td>{user.phone} </Td>
              <Td>{user.email}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

const QueueListWidget = () => {
  return (
    <Box boxShadow="xs" rounded="lg" bg="white" height="100%" w="90%">
      <VStack>
        <Heading pt="5%" pb="5%" fontSize={"2xl"}>
          Users
        </Heading>
        <UsersTable></UsersTable>
      </VStack>
    </Box>
  );
};

export default QueueListWidget;
