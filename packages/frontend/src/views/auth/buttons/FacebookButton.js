import { FaFacebook } from "react-icons/fa";
import { Button, Center, Text } from "@chakra-ui/react";

const FacebookButton = () => {
  return (
    <Center>
      <Button
        w={"full"}
        maxW={"md"}
        colorScheme={"facebook"}
        leftIcon={<FaFacebook />}
      >
        <Center>
          <Text>Continue with Facebook</Text>
        </Center>
      </Button>
    </Center>
  );
};

export default FacebookButton;
