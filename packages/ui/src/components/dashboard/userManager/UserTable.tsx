import { Box, Table, Thead, Tr, Tbody } from "@chakra-ui/react";
import TableHeader from "../../tables/TableHeader";
import { IUser } from "@lyne/shared-dto";
import { UserInfoProps, UserInfoRow } from "./UserInfoRow";
import { ActionModes } from "./AdminAction";

const UserTable = ({
  userList,
  mode,
  onDelete,
  onNotify,
  onBan,
}: {
  userList: IUser[];
  mode: ActionModes;
  onDelete?: (userId: string, name: string) => void;
  onNotify?: (userId: string) => void;
  onBan?: (userId: string) => void;
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
              <TableHeader text="Email"></TableHeader>
              <TableHeader text="Phone Number"></TableHeader>
              <TableHeader text="Join Time"></TableHeader>
              {onNotify && onDelete && (
                <TableHeader text="Action"></TableHeader>
              )}
            </Tr>
          </Thead>
          <Tbody>
            {userList.map(
              (
                { userId, name, email, phoneNumber, joinQTime }: IUser,
                index,
              ) => {
                const opts: UserInfoProps = {
                  userId,
                  name,
                  email,
                  place: index + 1,
                  phoneNumber,
                  joinQTime,
                  mode,
                  onDelete,
                  onNotify,
                  onBan,
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
