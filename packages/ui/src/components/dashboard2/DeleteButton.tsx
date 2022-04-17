import { Button, Box } from "@chakra-ui/react";

export default function DeleteButton({
  deleteUserEnabled,
  deleteUserId,
  deleteQueueId,
}: {
  deleteUserEnabled: boolean;
  deleteUserId: string;
  deleteQueueId: string;
}) {
  // Delete user using userIdshould be up here

  if (deleteUserEnabled) {
    return <Button>Delete</Button>; // Delete user method should be handled onClick here
  } else return <Box></Box>;
}
