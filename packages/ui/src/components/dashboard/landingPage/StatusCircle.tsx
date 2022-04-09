import { Flex } from "@chakra-ui/react";
import { BsCircle } from "react-icons/bs";

const QueueStatus = ({ status }: { status: boolean }) => {
  const color = status ? "bg-green-500" : "bg-red-600";
  return (
    <>
      <Flex flexDir={"row"} alignItems="center" justifyContent={"center"}>
        <p>Live</p>
        <BsCircle className={`${color} mx-3`}></BsCircle>;
      </Flex>
    </>
  );
};

export default QueueStatus;
