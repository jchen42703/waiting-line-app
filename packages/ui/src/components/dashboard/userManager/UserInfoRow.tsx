import { Tr, Td, CloseButton, Flex } from "@chakra-ui/react";
import CenteredTableCell from "../../tables/CenteredTableCell";

export interface UserInfoProps {
  userId: string;
  place: number;
  name: string;
  email: string;
  phoneNumber: string;
  joinQTime: number;
  canDelete: boolean;
  onDelete: (userId: string, name: string) => void;
}

export function UserInfoRow({
  userId,
  place,
  name,
  email,
  phoneNumber,
  joinQTime,
  canDelete,
  onDelete,
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
    if (canDelete) {
      return onDelete(userId, name);
    }

    return;
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
          <></>
        )}
      </Td>
    </Tr>
  );
}
