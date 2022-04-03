import { useEffect, useState, Suspense } from "react";
import { Spinner } from "@chakra-ui/react";
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

  console.log(loading, isLoggedIn);

  if (loading) {
    console.log("render spinner");
    return <Spinner></Spinner>;
  }

  if (isLoggedIn) {
    return protectedElement;
  }

  console.log("redirect to /login");
  return <Navigate to={"/login"}></Navigate>;
};

export default AuthGuard;
