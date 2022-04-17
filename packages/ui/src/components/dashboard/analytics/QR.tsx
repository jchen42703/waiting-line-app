import { IoMdAddCircleOutline } from "react-icons/io";
import { useEffect, useState } from "react";
import {
  Button,
  Box,
  Heading,
  VStack,
  Flex,
  Modal,
  ModalOverlay,
  ModalHeader,
  Text,
  ModalContent,
  ModalBody,
  ModalFooter,
  useClipboard,
  Input,
  HStack,
  OrderedList,
  ListItem,
  Center,
  Image,
  useDisclosure,
} from "@chakra-ui/react";
import { config } from "../../../lib/config";
import { useParams } from "react-router-dom";

export const QR = () => {
  const { queueId } = useParams();
  const url = `${config.frontendUrl}/users/${queueId}`;
  const qrLink = `http://api.qrserver.com/v1/create-qr-code/?data=${url}&size=100x100&bgcolor=white`;

  const [qrcode, setQRCode] = useState(null);

  const generateQRCode = () => {
    setQRCode(qrLink);
  };

  useEffect(() => {
    generateQRCode();
  }, []);

  const { hasCopied, onCopy } = useClipboard(url);

  const QRModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
      <>
        <Button
          onClick={onOpen}
          leftIcon={<IoMdAddCircleOutline />}
          bg="#ADD8E6"
          variant="solid"
        >
          Generate QRCode
        </Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader textAlign={"center"}>QRCode</ModalHeader>
            <ModalBody>
              <Center>
                <Image src={qrcode}></Image>
              </Center>
            </ModalBody>
            <Center>
              <ModalFooter>
                <OrderedList>
                  <ListItem>Right-click on the QR code.</ListItem>
                  <ListItem>Click "Save image as..."</ListItem>
                  <ListItem>Save the image to a safe location.</ListItem>
                </OrderedList>
              </ModalFooter>
            </Center>
          </ModalContent>
        </Modal>
      </>
    );
  };

  return (
    <Box boxShadow="xs" w="80%" h="110%" rounded="md">
      <VStack pt="5%" spacing="2%">
        <Heading fontSize={"2xl"}>Share Link</Heading>
        <HStack>
          <Flex>
            <Input value={url} borderRadius="0px" isReadOnly w="80%"></Input>
            <Button bg="#ADD8E6" borderRadius="0px" onClick={onCopy}>
              {hasCopied ? "Copied" : "Copy"}
            </Button>
          </Flex>
        </HStack>
        <QRModal></QRModal>
      </VStack>
    </Box>
  );
};

export default QR;
