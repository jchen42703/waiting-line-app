import { Grid, GridItem } from "@chakra-ui/react";
import QR from "./QR";

import BanWidget from "./BanWidget";
export const Layout = ({ queueId }) => {
  return (
    <Grid
      pl="1%"
      pt="1%"
      grid-template-rows="auto auto auto"
      grid-template-columns="auto auto auto"
      gap="10px"
    >
      <GridItem>
        <BanWidget></BanWidget>
      </GridItem>
      <GridItem>
        <BanWidget></BanWidget>
      </GridItem>
      <GridItem>
        <BanWidget></BanWidget>
      </GridItem>
      <GridItem w="100%" colStart={3} colEnd={4} rowStart={1} rowEnd={3}>
        <QR queueId={queueId} />
      </GridItem>
    </Grid>
  );
};

export default Layout;
