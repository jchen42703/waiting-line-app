import { Box, Flex, useColorModeValue, IconButton } from "@chakra-ui/react";
import { SettingsIcon } from "@chakra-ui/icons";
import NavDrawer from "./Drawer";
/**
 * Last example of:
 * https://chakra-templates.dev/navigation/navbar
 *
 * @returns
 */
export default function Nav() {
  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Flex h={16} alignItems={"center"} justifyContent={"flex-start"}>
            <NavDrawer></NavDrawer>
            <Box paddingLeft={4}>Queue App</Box>
          </Flex>
          <IconButton icon={<SettingsIcon />}></IconButton>
        </Flex>
      </Box>
    </>
  );
}
