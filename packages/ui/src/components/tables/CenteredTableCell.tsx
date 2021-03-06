import { Text, Td } from "@chakra-ui/react";

const CenteredTableCell = ({ text }: { text: string }) => {
  return (
    <>
      <Td textAlign={"center"}>
        <Text fontSize="lg" color={"black"} fontWeight="bold">
          {text}
        </Text>
      </Td>
    </>
  );
};

export default CenteredTableCell;
