import { Text, Grid, GridItem } from "@chakra-ui/react";
import QR from "./QR";
import { useState } from "react";
import BanWidget from "./BanWidget";
export const Layout = ({ queueId }) => {
  // banned users
  const [users, setUsers] = useState(["benson", "joseph"]);
  return (
    <Grid
      grid-auto-columns="1fr"
      grid-auto-rows="1fr"
      grid-template-columns=" 0.9fr 1.3fr 0.8fr"
      grid-template-rows="0.9fr 1.1fr"
      gap="0px 0px"
      grid-template-areas={`". . ." ". . ."`}
    >
      <GridItem>
        <QR queueId={queueId} />
      </GridItem>
      <GridItem>
        <Text>Analytics</Text>
      </GridItem>
      <GridItem>
        <Text>Analytics</Text>
      </GridItem>
      <GridItem
        boxShadow="xs"
        rounded="lg"
        bg="white"
        height="max-content"
        w="25%"
      >
        <BanWidget heading={"Ban List"} users={users}></BanWidget>
      </GridItem>
    </Grid>
  );
};

export default Layout;
