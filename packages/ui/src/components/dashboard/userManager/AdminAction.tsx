import { Button, CloseButton, Flex } from "@chakra-ui/react";

export type ActionModes = "delete" | "notify" | "ban";
export interface AdminActionProps {
  onDelete?: (userId: string, name: string) => void;
  onNotify?: (userId: string) => void;
  onBan?: (userId: string) => void;
  mode?: ActionModes;
}
export const AdminAction = ({ mode }: AdminActionProps) => {
  if (mode === "notify") {
    return <Button>Notify</Button>;
  }

  if (mode === "delete") {
    return (
      <Flex justifyContent="center" alignItems={"center"}>
        <CloseButton
          size={"sm"}
          width={"100%"}
          height={"100%"}
          _hover={{ bg: "transparent" }}
          _active={{ bg: "transparent" }}
        ></CloseButton>
      </Flex>
    );
  }

  if (mode === "ban") {
    return <Button>Ban</Button>;
  }

  return <></>;
};
