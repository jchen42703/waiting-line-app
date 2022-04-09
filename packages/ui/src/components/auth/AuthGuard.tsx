import { useEffect, useState } from "react";
import { Flex, Spinner, Text } from "@chakra-ui/react";
import { Navigate } from "react-router-dom";
import { adminIsLoggedIn } from "../../lib/services/auth.service";
import { sleep } from "../../lib/time";

const AuthGuard = ({
  protectedElement,
}: {
  protectedElement: React.ReactElement | null;
}) => {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (loading) {
      sleep(300).then(() => {
        adminIsLoggedIn().then((isLoggedIn: boolean) => {
          setIsLoggedIn(isLoggedIn);
          setLoading(false);
        });
      });
    }
  }, []);

  if (loading) {
    return (
      <>
        <Flex
          flexDir="column"
          alignItems="center"
          justifyContent="center"
          minHeight={"100vh"}
        >
          <Text size="lg" marginBottom={"8"} fontWeight="bold">
            Loading your queues...
          </Text>
          <Spinner size="xl" speed="0.6s" thickness="4px"></Spinner>;
        </Flex>
      </>
    );
  }

  if (isLoggedIn) {
    return protectedElement;
  }

  console.log("redirect to /login");
  return <Navigate to={"/login"}></Navigate>;
};

export default AuthGuard;
