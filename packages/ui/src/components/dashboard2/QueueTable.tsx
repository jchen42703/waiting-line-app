import { Button, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import DeleteButton from "./DeleteButton";
import UserInfoRow from "./UserInfoRow";

import JsonData from "../dashboard2/testData.json";
import { useState } from "react";
export default function QueueTable({
  deleteUserEnabled,
  deleteQueueId,
}: {
  deleteUserEnabled: boolean;
  deleteQueueId: string;
}) {
  /*
  const handleDeleteUser = async () => {
    try {
      await postData("http://localhost:5000/api/queue/pop", queueId);
    } catch (err) {
      console.log("Error: ", err);
    }
  };
*/
  const [userList, setUserList] = useState([]);

  const getAllUsers = async (queueId = "") => {
    try {
      const data = await getData(
        "http://localhost:5000/api/queue/all",
        queueId,
      );
      setUserList(data.data);
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  const getData = async (url = "", data = {}) => {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  };

  const DisplayData = userList.map((info, index) => {
    getAllUsers(deleteQueueId);
    return (
      <UserInfoRow
        key={info.userId}
        userPlace={index + 1}
        userName={info.name}
        userPhoneNumber={info.phoneNumber}
        userJoinQTime={info.joinQTime}
        deleteUserId={info.userId}
        toggleDeleteUser={this.deleteUserEnabled}
        deleteQueueId={this.deleteQueueId}
      ></UserInfoRow>
      /*
      <Tr>
        <Td>{index + 1}</Td>
        <Td>{info.name}</Td>
        <Td>{info.phoneNumber}</Td>
        <Td>{info.joinQTime}</Td>
        <Td>
          <DeleteButton
            deleteUserEnabled={this.deleteUserEnabled}
            deleteUserId={info.userId}
            deleteQueueId={this.deleteQueueId}
          ></DeleteButton>
        </Td>
      </Tr>
      */
    );
  });

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
        <Tbody>{DisplayData}</Tbody>
      </Table>
    </div>
  );
}
