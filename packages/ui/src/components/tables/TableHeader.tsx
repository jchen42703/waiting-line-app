import { Text, Th } from "@chakra-ui/react";

const TableHeader = ({ text }: { text: string }) => {
  return (
    <>
      <Th textAlign={"center"} fontSize={"md"}>
        {text}
      </Th>
    </>
  );
};

export default TableHeader;
