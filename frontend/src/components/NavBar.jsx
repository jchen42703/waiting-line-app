import {
  Box,
  Flex,
  useColorModeValue,
  IconButton,
  Button,
} from "@chakra-ui/react";
import { SettingsIcon } from "@chakra-ui/icons";
import NavDrawer from "./Drawer";
import { Link as RouteLink } from "react-router-dom";
import { Link } from "@chakra-ui/react";

/**
 * The navigation bar that opens up a side bar with the queues
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
            <Link as={RouteLink} to="/">
              <Button
                paddingLeft={4}
                paddingTop={1}
                _hover={{ bg: "transparent" }}
                _active={{
                  bg: "transparent",
                }}
              >
                CSDS 393 Queue App
              </Button>
            </Link>
          </Flex>
          {/* To maintain compatibility w/chakra ui attributes */}
          <Link as={RouteLink} to="/settings">
            <IconButton icon={<SettingsIcon />}></IconButton>
          </Link>
        </Flex>
      </Box>
    </>
  );
}
