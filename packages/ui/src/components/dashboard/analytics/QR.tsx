import { IoMdAddCircleOutline } from "react-icons/io";
import { useState } from "react";
import { Button, Box, Image, VStack } from "@chakra-ui/react";
import { config } from "../../../lib/config";

// @ts-ignore
import paper from "../../media/analytics/qr.svg";

export const QR = ({ queueId }) => {
  const [qrcode, setQRCode] = useState(null);
  const url = `${config.frontendUrl}/users/${queueId}`;

  const generateQRCode = (e) => {
    e.preventDefault();
    setQRCode(
      `http://api.qrserver.com/v1/create-qr-code/?data=${url}&size=100x100&bgcolor=white`,
    );
  };

  const QRImage = () => {
    if (!qrcode) {
      return <Image boxSize={175} pt="20%" pb="6%" src={paper}></Image>;
    }
    return <Image pt="20%" pb="6%" src={qrcode}></Image>;
  };

  return (
    <Box boxShadow="xs" w="80%" h="250px" rounded="md">
      <VStack>
        <QRImage></QRImage>
        <Button
          onClick={generateQRCode}
          leftIcon={<IoMdAddCircleOutline />}
          colorScheme="teal"
          variant="solid"
        >
          Generate QRCode
        </Button>
      </VStack>
    </Box>
  );
};

export default QR;
