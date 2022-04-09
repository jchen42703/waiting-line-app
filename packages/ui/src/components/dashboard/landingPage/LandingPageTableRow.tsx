import { Tr, Td } from "@chakra-ui/react";
import StatusCircle from "./StatusCircle";
import { RepeatCycle } from "@lyne/shared-dto";

interface LandingPageTableRowProps {
  queueName: string;
  numUsers: string;
  status: boolean;
  timeCreated: number;
  liveTime: number;
  closeTime?: number;
  repeatCycle?: RepeatCycle | null;
}

const LandingPageTableRow = ({
  queueName,
  numUsers,
  timeCreated,
  liveTime,
  closeTime,
  repeatCycle,
  status,
}: LandingPageTableRowProps) => {
  const createDate = new Date(timeCreated).toLocaleDateString();
  const liveDate = new Date(liveTime).toLocaleDateString();
  const closeDate = closeTime
    ? new Date(closeTime).toLocaleDateString()
    : "N/A";
  const cycleMode = repeatCycle ? repeatCycle : "N/A";

  return (
    <>
      <Tr>
        <Td textAlign={"center"}>{queueName}</Td>
        <Td textAlign={"center"}>{numUsers}</Td>
        <Td textAlign={"center"}>{createDate}</Td>
        <Td textAlign={"center"}>{liveDate}</Td>
        <Td textAlign={"center"}>{closeDate}</Td>
        <Td textAlign={"center"}>{cycleMode}</Td>
        <Td>
          <StatusCircle status={status}></StatusCircle>
        </Td>
      </Tr>
    </>
  );
};

export default LandingPageTableRow;
