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
import { NotAllowedIcon } from "@chakra-ui/icons";
import { useState } from "react";

// @ts-ignore
import ban from "../../../media/analytics/ban.svg";

const BanWidget = () => {
  // banned users
  const [bannedUsers, setBannedUsers] = useState([]);

  // get all banner users
  const getBannedUsers = () => {};

  const BannedTable = () => {
    if (bannedUsers.length == 0) {
      return <Image boxSize="150" src={ban}></Image>;
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
            {bannedUsers.map((user) => (
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

  return (
    <Box boxShadow="xs" rounded="lg" bg="white" height="max-content" w="80%">
      <VStack>
        <Box>
          <Heading pt="10%" fontSize="20">
            Ban List <NotAllowedIcon />
          </Heading>
        </Box>
        <BannedTable></BannedTable>
      </VStack>
    </Box>
  );
};

export default BanWidget;
