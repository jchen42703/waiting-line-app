import { Tr, Td } from "@chakra-ui/react";
import { RepeatCycle } from "@lyne/shared-dto";
import StatusCircle from "./StatusCircle";
import CenteredTableCell from "../../tables/CenteredTableCell";

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
        <CenteredTableCell text={queueName}></CenteredTableCell>
        <CenteredTableCell text={numUsers}></CenteredTableCell>
        <CenteredTableCell text={createDate}></CenteredTableCell>
        <CenteredTableCell text={liveDate}></CenteredTableCell>
        <CenteredTableCell text={closeDate}></CenteredTableCell>
        <CenteredTableCell text={cycleMode}></CenteredTableCell>
        <Td>
          <StatusCircle status={status}></StatusCircle>
        </Td>
      </Tr>
    </>
  );
};

export default LandingPageTableRow;
