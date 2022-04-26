import { Tr, Td, Button, CloseButton, Flex } from "@chakra-ui/react";
import CenteredTableCell from "../../tables/CenteredTableCell";
import { ActionModes, AdminAction } from "./AdminAction";

export interface UserInfoProps {
  userId: string;
  place: number;
  name: string;
  email: string;
  phoneNumber: string;
  joinQTime: number;
  mode: ActionModes;
  onDelete?: (userId: string, name: string) => void;
  onNotify?: (userId: string) => void;
  onBan?: (userId: string) => void;
}

export function UserInfoRow({
  userId,
  place,
  name,
  email,
  phoneNumber,
  joinQTime,
  mode,
  onDelete,
  onNotify,
  onBan,
}: UserInfoProps) {
  const joinDate = joinQTime
    ? new Date(joinQTime).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      })
    : "N/A";

  const onRowClick = () => {
    if (mode === "delete" && onDelete) {
      return onDelete(userId, name);
    }

    if (mode === "ban" && onBan) {
      return onBan(userId);
    }

    if (mode === "notify" && onNotify) {
      return onNotify(userId);
    }
  };

  return (
    <Tr
      className="cursor-pointer hover:bg-slate-400 active:bg-slate-500 focus:outline-none focus:ring focus:ring-slate-300"
      onClick={() => onRowClick()}
    >
      <CenteredTableCell text={place.toString()}></CenteredTableCell>
      <CenteredTableCell text={name}></CenteredTableCell>
      <CenteredTableCell text={email}></CenteredTableCell>
      <CenteredTableCell text={phoneNumber}></CenteredTableCell>
      <CenteredTableCell text={joinDate}></CenteredTableCell>
      <Td textAlign={"center"}>
        <AdminAction
          onDelete={onDelete}
          onNotify={onNotify}
          onBan={onBan}
          mode={mode}
        ></AdminAction>
      </Td>
    </Tr>
  );
}
