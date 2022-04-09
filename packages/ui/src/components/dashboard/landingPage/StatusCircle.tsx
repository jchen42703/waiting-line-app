import { Flex } from "@chakra-ui/react";
import { FaCircle } from "react-icons/fa";

const QueueStatus = ({ status }: { status: boolean }) => {
  const color = status ? "#22C55E" : "#DC2626";
  const liveStatus = status ? "Live" : "Closed";

  return (
    <>
      <Flex flexDir={"row"} alignItems="center" justifyContent={"center"}>
        <p>{liveStatus}</p>
        <FaCircle color={color} className={"mx-3"}></FaCircle>;
      </Flex>
    </>
  );
};

export default QueueStatus;
