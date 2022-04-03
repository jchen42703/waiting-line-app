import { useParams, Navigate } from "react-router-dom";
import { Box, Button, Flex } from "@chakra-ui/react";
import QueueTableHandler from "../../components/QueueTableHandler";

export default function QueueDashboard({user}) {
  let { queueId } = useParams();

  if (!user){
    return <Navigate to="/login" />
  }

  const [deleteToggleState, setToggle] = useState(false);
  const handleToggle = () => {
    return setToggle(!deleteToggleState);
  };

  const handleNextUser = async () => {};

  return (
    <>
      <Flex flexDirection={"column"} justifyContent={"center"} my="3" mx="16">
        {/* Header + Buttons */}
        <Flex flexDirection={"row"} justifyContent={"space-between"}>
          {/* <Box>
            <h1>Queue Dashboard</h1>
          </Box> */}
          <Flex flexDirection={"column"} align={"center"}>
            <Flex flexDirection={"row"} align={"left"}>
              <Button>&lt;-</Button>
              <Box>Queue Name</Box>
            </Flex>
            <Box>Users</Box>
          </Flex>

          <Flex flexDirection={"row"}>
            <Button>Next User</Button>
            <Button onClick={() => handleToggle()}>
              {deleteToggleState ? "Cancel" : "Delete User"}
            </Button>
          </Flex>
        </Flex>
        {/* Queue table goes here */}
        <QueueTableHandler deleteUserEnabled={deleteToggleState} />
      </Flex>
    </>
  );
}
