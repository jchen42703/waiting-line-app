import {
  Box,
  Heading,
  VStack,
  List,
  ListItem,
  ListIcon,
} from "@chakra-ui/react";
import { NotAllowedIcon } from "@chakra-ui/icons";
export const BanWidget = ({ heading, users }) => {
  return (
    <Box>
      <VStack>
        <Box>
          <Heading fontSize="20">{heading}</Heading>
        </Box>
        <List spacing={3}>
          <ListItem>
            <ListIcon as={NotAllowedIcon} color="green.500" />
            User 1
          </ListItem>
        </List>
      </VStack>
    </Box>
  );
};

export default BanWidget;
