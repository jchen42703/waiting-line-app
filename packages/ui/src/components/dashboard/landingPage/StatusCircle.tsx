import { Flex } from "@chakra-ui/react";
import { FaCircle } from "react-icons/fa";

const QueueStatus = ({ status }: { status: boolean }) => {
  const color = status ? "#22C55E" : "#DC2626";
  const liveStatus = status ? "Live" : "Closed";

  return (
    <>
      <Flex flexDir={"row"} justifyContent="flex-end">
        <p>{liveStatus}</p>
        <FaCircle color={color} className={"ml-3"}></FaCircle>
      </Flex>
    </>
  );
};

export default QueueStatus;
