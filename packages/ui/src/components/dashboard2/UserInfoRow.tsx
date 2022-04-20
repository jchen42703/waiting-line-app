import {
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  CloseButton,
  Flex,
} from "@chakra-ui/react";
import CenteredTableCell from "../tables/CenteredTableCell";

export interface UserInfoProps {
  place: number;
  name: string;
  email: string;
  phoneNumber: string;
  joinQTime: number;
  // userId: string;
  // queueId: string;
  canDelete: boolean;
  onDelete: () => void;
}

export function UserInfoRow({
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

  return (
    <Tr>
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
              onClick={onDelete}
            ></CloseButton>
          </Flex>
        ) : (
          <></>
          // <h1>do something</h1>
          // <StatusCircle status={status}></StatusCircle>
        )}
      </Td>
    </Tr>
  );
}
