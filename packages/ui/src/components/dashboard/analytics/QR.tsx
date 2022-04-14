import { IoMdAddCircleOutline } from "react-icons/io";
import { useState } from "react";
import { Button, Box, Image, VStack } from "@chakra-ui/react";
import { config } from "../../../lib/config";
import { useParams } from "react-router-dom";
// @ts-ignore
import paper from "../../media/analytics/qr.svg";

export const QR = () => {
  const [qrcode, setQRCode] = useState(null);
  const { queueId } = useParams();
  const url = `${config.frontendUrl}/users/${queueId}`;

  const generateQRCode = (e) => {
    e.preventDefault();
    setQRCode(
      `http://api.qrserver.com/v1/create-qr-code/?data=${url}&size=100x100&bgcolor=white`,
    );
  };

  const QRImage = () => {
    if (!qrcode) {
      return <Image boxSize={180} pt="10%" pb="3%" src={paper}></Image>;
    }
    return <Image pt="20%" pb="6%" src={qrcode}></Image>;
  };

  return (
    <Box boxShadow="xs" w="80%" h="300px" rounded="md">
      <VStack pt="5%">
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
