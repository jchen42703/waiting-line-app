import { Button, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import UserInfoRow from "./UserInfoRow";

import { useEffect, useState } from "react";
import { getAllUsers } from "../../lib/services/user.service";
import { IUser } from "@lyne/shared-dto";

export default function QueueTable({
  deleteUserEnabled,
  queueId,
}: {
  deleteUserEnabled: boolean;
  queueId: string;
}) {
  const [userList, setUserList] = useState<IUser[]>([]);

  const setAllUsers = async () => {
    try {
      const users = await getAllUsers({ queueId });
      setUserList(users.users);
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  useEffect(() => {
    setAllUsers();
  }, []);

  return (
    <div>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Place</Th>
            <Th>Name</Th>
            <Th>Phone Number</Th>
            <Th>Time Joined</Th>
            <Th>{deleteUserEnabled ? "" : "Delete User"}</Th>
          </Tr>
        </Thead>
        <Tbody>
          {userList.map(({ userId, name, phoneNumber, joinQTime }, index) => {
            if (!userId) {
              return <></>;
            }
            return (
              <UserInfoRow
                key={userId}
                userPlace={index + 1}
                userName={name}
                userPhoneNumber={phoneNumber}
                userJoinQTime={joinQTime.toString()}
                deleteUserId={userId}
                toggleDeleteUser={deleteUserEnabled}
                deleteQueueId={queueId}
              ></UserInfoRow>
            );
          })}
        </Tbody>
      </Table>
    </div>
  );
}
