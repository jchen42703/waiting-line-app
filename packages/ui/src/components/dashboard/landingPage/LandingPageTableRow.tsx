import {
  Link as RouteLink,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { Button, Tr, Td } from "@chakra-ui/react";
import { RepeatCycle } from "@lyne/shared-dto";
import _ from "lodash";
import { Link } from "@chakra-ui/react";
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

  const routeToQueue = () => {
    navigate(`/dashboard/${queueId}`);
  };

  return (
    <>
      <Tr
        onClick={routeToQueue}
        className="cursor-pointer hover:bg-slate-400 active:bg-slate-500 focus:outline-none focus:ring focus:ring-slate-300"
      >
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

export { LandingPageTableRow, LandingPageTableRowProps };
