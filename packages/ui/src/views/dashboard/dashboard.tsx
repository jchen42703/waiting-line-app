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
import { Fragment } from "react";
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
        <TableContainer>
          <Table>
            <Thead>
              <Tr>
                <Th>Queue Name</Th>
                <Th>Users</Th>
                <Th>Queue Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              <LandingPageTableRow
                queueName="dab"
                numUsers="5"
                status={true}
              ></LandingPageTableRow>
              <LandingPageTableRow
                queueName="dab"
                numUsers="5"
                status={false}
              ></LandingPageTableRow>
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
      {/* <main style={{ padding: "1rem 0" }}>
      <h2>Dashboard</h2>
      <button className="btn btn-primary">daisyUI Button</button>{" "}
    </main> */}
    </Fragment>
  );
}
