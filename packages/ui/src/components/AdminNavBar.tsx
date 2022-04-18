import { Box, Flex, Button, useToast } from "@chakra-ui/react";
import NavDrawer from "./Drawer";
import { Link as RouteLink, useLocation, useNavigate } from "react-router-dom";
import { Link } from "@chakra-ui/react";
import { logout } from "../lib/services/auth.service";

/**
 * The navigation bar that opens up a side bar with the queues
 *
 * @returns
 */
export default function AdminNavBar() {
  const toast = useToast();

  const navigate = useNavigate();

  const onLogout = async () => {
    try {
      const res = await logout();
      if (res.status !== 200) {
        throw Error(`Response: ${res.status}`);
      } else {
        navigate(0);
      }
    } catch (e) {
      toast({
        position: "top",
        status: "error",
        description:
          "Woops! Looks like something went wrong with our servers. Please try again.",
        duration: 9000,
        isClosable: true,
      });
    }
  };

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

          <Button onClick={onLogout}>Log Out</Button>
        </Flex>
      </Box>
    </>
  );
}
