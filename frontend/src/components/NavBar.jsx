import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Center,
  IconButton,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
/**
 * Last example of:
 * https://chakra-templates.dev/navigation/navbar
 *
 * @returns
 */
export default function Nav() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton aria-label="Search database" icon={<HamburgerIcon />} />
          <Box>Logo</Box>
        </Flex>
      </Box>
    </>
  );
}
