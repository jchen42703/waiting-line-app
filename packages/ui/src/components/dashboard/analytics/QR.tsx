import {IoMdAddCircleOutline} from "react-icons/io"
import { useState } from "react";
import {Button,Image } from "@chakra-ui/react";
import { config } from "../../../lib/config";

export const QR = ({queueId}) => {
    const [qrcode, setQRCode] = useState(null)
    const url = `${config.frontendUrl}/users/${queueId}`
  
    const generateQRCode = (e) => {
      e.preventDefault()
      setQRCode(`http://api.qrserver.com/v1/create-qr-code/?data=${url}&size=100x100&bgcolor=white`)
    }
  
    return(
      <>
      <Image src={qrcode}></Image>
      <Button onClick={generateQRCode} leftIcon={<IoMdAddCircleOutline/>}  colorScheme='teal' variant='solid'>
        Generate QRCode
      </Button>
      </>
    )
}

export default QR;