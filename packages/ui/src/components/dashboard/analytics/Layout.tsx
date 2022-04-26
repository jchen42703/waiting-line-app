import {
  Grid,
  GridItem,
  Button,
  useBoolean,
  Box,
  VStack,
} from "@chakra-ui/react";
import QR from "./QR";

import BanWidget from "./widgets/BanWidget";
import QueueInfoWidget from "./widgets/QueueInfoWidget";
import QueueListWidget from "./widgets/QueueListWidget";
import { BsFillPenFill } from "react-icons/bs";

const Layout = ({ queuedUsers, queueInfo }) => {
  const [canEdit, toggleCanEdit] = useBoolean(false);

  return (
    <Grid
      pl="1%"
      pt="1%"
      grid-template-rows="auto auto "
      grid-template-columns="auto auto "
      gap="10%"
    >
      <GridItem colStart={1} colEnd={3} rowStart={1} rowEnd={2}>
        <Box>
          <VStack>
            <Button
              onClick={toggleCanEdit.toggle}
              rightIcon={<BsFillPenFill />}
            >
              Edit Queue
            </Button>
            <QueueInfoWidget queueInfo={queueInfo} canEdit={canEdit} />
          </VStack>
        </Box>
      </GridItem>
      <GridItem colStart={1} colEnd={3} rowStart={2} rowEnd={3}>
        <QueueListWidget queuedUsers={queuedUsers}></QueueListWidget>
      </GridItem>
      <GridItem colStart={3} colEnd={4} rowStart={1} rowEnd={2}>
        <QR />
      </GridItem>
      <GridItem colStart={3} colEnd={4} rowStart={2} rowEnd={2}>
        <BanWidget queueInfo={queueInfo}></BanWidget>
      </GridItem>
    </Grid>
  );
};

export default Layout;
