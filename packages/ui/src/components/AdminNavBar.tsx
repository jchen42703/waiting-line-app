import {
  Box,
  Flex,
  useColorModeValue,
  IconButton,
  Button,
} from "@chakra-ui/react";
import { SettingsIcon } from "@chakra-ui/icons";
import NavDrawer from "./Drawer";
import { Link as RouteLink, useLocation } from "react-router-dom";
import { Link } from "@chakra-ui/react";

/**
 * The navigation bar that opens up a side bar with the queues
 *
 * @returns
 */
export default function AdminNavBar() {
  // this needs to be here because react hooks must be called in the same order
  // in every render
  // const navBg = useColorModeValue("gray.100", "gray.900");

  // conditionally render based on route
  // navbar should only render for admin routes
  const location = useLocation();

  if (
    location.pathname.match("/users/*") ||
    location.pathname.match("/login/*")
  ) {
    return null;
  }

  return (
    <>
      <Box bg={"brand.primary-light"} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Flex h={16} alignItems={"center"} justifyContent={"flex-start"}>
            <NavDrawer></NavDrawer>
            <Link as={RouteLink} to="/dashboard">
              <Button
                paddingLeft={4}
                paddingTop={1}
                bg={"transparent"}
                _hover={{ bg: "transparent" }}
                _active={{
                  bg: "transparent",
                }}
                fontSize="lg"
                fontWeight={"extrabold"}
              >
                Lyne
              </Button>
            </Link>
          </Flex>

          {/* To maintain compatibility w/chakra ui attributes */}
          <Link as={RouteLink} to="/settings">
            <IconButton
              aria-label={"settings"}
              icon={<SettingsIcon />}
              bg="transparent"
            ></IconButton>
          </Link>
        </Flex>
      </Box>
    </>
  );
}
