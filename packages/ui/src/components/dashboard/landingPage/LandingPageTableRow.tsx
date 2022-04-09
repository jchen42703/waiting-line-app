import { Tr, Td } from "@chakra-ui/react";
import StatusCircle from "./StatusCircle";

interface LandingPageTableRowProps {
  queueName: string;
  numUsers: string;
  status: boolean;
}

const LandingPageTableRow = ({
  queueName,
  numUsers,
  status,
}: LandingPageTableRowProps) => {
  return (
    <>
      <Tr>
        <Td textAlign={"center"}>{queueName}</Td>
        <Td textAlign={"center"}>{numUsers}</Td>
        <Td>
          <StatusCircle status={status}></StatusCircle>
        </Td>
      </Tr>
    </>
  );
};

export default LandingPageTableRow;
