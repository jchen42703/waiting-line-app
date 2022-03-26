import React from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  Spacer,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";
import JsonData from "./testData.json";
export default function QueueTable() {
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