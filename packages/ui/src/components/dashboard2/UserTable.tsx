import {
  Box,
  Button,
  Flex,
  TableContainer,
  Table,
  Thead,
  Tr,
  Tbody,
} from "@chakra-ui/react";
import TableHeader from "../../components/tables/TableHeader";
import { IQueue, IUser } from "@lyne/shared-dto";
import { UserInfoProps, UserInfoRow } from "./UserInfoRow";

const UserTable = ({
  userList,
  canDelete,
  onDelete,
}: {
  userList: IUser[];
  canDelete: boolean;
  onDelete: () => void;
}) => {
  return (
    <>
      <Box border="2px solid" borderColor="gray.100" borderRadius="md">
        <Table
          variant="striped"
          colorScheme={"blackAlpha"}
          size="md"
          border={"8px black"}
        >
          <Thead>
            <Tr>
              <TableHeader text="Place"></TableHeader>
              <TableHeader text="Name"></TableHeader>
              <TableHeader text="Phone Number"></TableHeader>
              <TableHeader text="Join Time"></TableHeader>
              <TableHeader text="Action"></TableHeader>
            </Tr>
          </Thead>
          <Tbody>
            {userList.map(
              (
                {
                  userId,
                  name,
                  email,
                  phoneNumber,
                  joinQTime,
                }: // queueId,
                // queueName,
                // queue,
                // timeCreated,
                // repeatCycle,
                // liveTime,
                // closeTime,
                IUser,
                index,
              ) => {
                const opts: UserInfoProps = {
                  name,
                  place: index + 1,
                  phoneNumber,
                  joinQTime,
                  canDelete,
                  onDelete,
                };

                return <UserInfoRow key={userId} {...opts}></UserInfoRow>;
              },
            )}
          </Tbody>
        </Table>
      </Box>
    </>
  );
};

export default UserTable;
