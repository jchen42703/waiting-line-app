import { Button, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import DeleteButton from "./DeleteButton";

export default function UserInfoRow({
  userPlace,
  userName,
  userPhoneNumber,
  userJoinQTime,
  deleteUserId,
  deleteQueueId,
  toggleDeleteUser,
}: {
  userPlace: number;
  userName: string;
  userPhoneNumber: string;
  userJoinQTime: string;
  deleteUserId: string;
  deleteQueueId: string;
  toggleDeleteUser: boolean;
}) {
  return (
    <Tr>
      <Td>{userPlace}</Td>
      <Td>{userName}</Td>
      <Td>{userPhoneNumber}</Td>
      <Td>{userJoinQTime}</Td>
      <Td>
        <DeleteButton
          deleteUserEnabled={toggleDeleteUser}
          deleteUserId={deleteUserId}
          deleteQueueId={deleteQueueId}
        ></DeleteButton>
      </Td>
    </Tr>
  );
}
