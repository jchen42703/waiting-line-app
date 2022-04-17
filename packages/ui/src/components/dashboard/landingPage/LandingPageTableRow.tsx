import { useNavigate } from "react-router-dom";
import { Flex, Tr, Td, CloseButton, toCSSObject } from "@chakra-ui/react";
import { RepeatCycle } from "@lyne/shared-dto";
import _ from "lodash";
import StatusCircle from "./StatusCircle";
import CenteredTableCell from "../../tables/CenteredTableCell";

interface LandingPageTableRowProps {
  queueId: string;
  queueName: string;
  numUsers: string;
  status: boolean;
  timeCreated: number;
  liveTime: number;
  closeTime?: number;
  repeatCycle?: RepeatCycle | null;
  canDelete: boolean;
  onDelete: (queueId: string) => void;
}

const LandingPageTableRow = ({
  queueId,
  queueName,
  numUsers,
  timeCreated,
  liveTime,
  closeTime,
  repeatCycle,
  status,
  canDelete,
  onDelete,
}: LandingPageTableRowProps) => {
  const navigate = useNavigate();
  const createDate = new Date(timeCreated).toLocaleDateString();
  const liveDate = new Date(liveTime).toLocaleDateString();
  const closeDate = closeTime
    ? new Date(closeTime).toLocaleDateString()
    : "N/A";
  const cycleMode = repeatCycle
    ? _.startCase(repeatCycle.toLocaleLowerCase())
    : "N/A";

  // Either navigate to the appropriate queue page or delete the queue based on the canDelete prop
  const onClick = () => {
    if (!canDelete) {
      navigate(`/dashboard/queue/${queueId}`);
    } else {
      onDelete(queueId);
    }
  };

  return (
    <>
      <Tr
        onClick={onClick}
        className="cursor-pointer hover:bg-slate-400 active:bg-slate-500 focus:outline-none focus:ring focus:ring-slate-300"
      >
        <CenteredTableCell text={queueName}></CenteredTableCell>
        <CenteredTableCell text={numUsers}></CenteredTableCell>
        <CenteredTableCell text={createDate}></CenteredTableCell>
        <CenteredTableCell text={liveDate}></CenteredTableCell>
        <CenteredTableCell text={closeDate}></CenteredTableCell>
        <CenteredTableCell text={cycleMode}></CenteredTableCell>
        <Td>
          {canDelete ? (
            <Flex justifyContent="center" alignItems={"center"}>
              <CloseButton
                size={"sm"}
                width={"100%"}
                height={"100%"}
                _hover={{ bg: "transparent" }}
                _active={{ bg: "transparent" }}
              ></CloseButton>
            </Flex>
          ) : (
            <StatusCircle status={status}></StatusCircle>
          )}
        </Td>
      </Tr>
    </>
  );
};

export { LandingPageTableRow, LandingPageTableRowProps };
