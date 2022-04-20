import { Box } from "@chakra-ui/react";
import QueueInfo from "./QueueInfo";
import EditQueueInfo from "./EditQueueInfo";

const QueueInfoWidget = ({ queueInfo, canEdit }) => {
  return (
    <Box
      boxShadow="xs"
      rounded="lg"
      bg="white"
      height="100%"
      w="100%"
      justifyItems="center"
      fontWeight="bold"
    >
      {canEdit ? (
        <EditQueueInfo queueInfo={queueInfo} />
      ) : (
        <QueueInfo queueInfo={queueInfo} />
      )}
    </Box>
  );
};

export default QueueInfoWidget;
