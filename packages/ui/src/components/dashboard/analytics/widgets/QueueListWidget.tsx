import { Text, Box, Heading, VStack, Image, Link } from "@chakra-ui/react";
import { Link as ReachLink, useParams } from "react-router-dom";
// @ts-ignore
import queuelist from "../../../media/analytics/queuelist.svg";

const QueueListWidget = ({ queuedUsers }) => {
  const { queueId } = useParams();
  return (
    <Link
      style={{ textDecoration: "none" }}
      as={ReachLink}
      to={`/dashboard/users/${queueId}`}
    >
      <Box boxShadow="xs" rounded="lg" bg="white" height="100%" w="100%">
        <VStack>
          <Heading pt="5%" pb="5%" fontSize={"2xl"}>
            Manage your users
          </Heading>
          <Text fontSize={"lg"} fontWeight="bold">
            Users : {queuedUsers.length}
          </Text>
          <Image boxSize="150" src={queuelist}></Image>
        </VStack>
      </Box>
    </Link>
  );
};

export default QueueListWidget;
