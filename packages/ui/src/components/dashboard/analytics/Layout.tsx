import { Grid, GridItem } from "@chakra-ui/react";
import QR from "./QR";

import BanWidget from "./widgets/BanWidget";
import QueueInfoWidget from "./widgets/QueueInfoWidget";
import QueueListWidget from "./widgets/QueueListWidget";
const Layout = ({ queueId }) => {
  return (
    <Grid
      pl="1%"
      pt="1%"
      grid-template-rows="auto auto auto"
      grid-template-columns="auto auto auto"
      gap="5%"
    >
      <GridItem colStart={1} colEnd={2} rowStart={1} rowEnd={2}>
        <QueueInfoWidget></QueueInfoWidget>
      </GridItem>
      <GridItem colStart={1} colEnd={2} rowStart={2} rowEnd={3}>
        <QueueListWidget></QueueListWidget>
      </GridItem>
      <GridItem colStart={3} colEnd={4} rowStart={2} rowEnd={3}>
        <BanWidget></BanWidget>
      </GridItem>
      <GridItem colStart={3} colEnd={4} rowStart={1} rowEnd={2}>
        <QR queueId={queueId} />
      </GridItem>
    </Grid>
  );
};

export default Layout;
