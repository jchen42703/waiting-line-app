import React, { useEffect, useState } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Stack,
  useDisclosure,
  IconButton,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { getAdminMetadata } from "../lib/services/admin.service";
import { getAllQueues } from "../lib/services/queue.service";
import { IQueue } from "@lyne/shared-dto";
import { useNavigate } from "react-router-dom";

export default function NavDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef();
  const navigate = useNavigate();

  const [adminMetadata, setAdminMetadata] = useState({
    name: "",
    email: "",
  });

  const [queueList, setQueueList] = useState([]);

  useEffect(() => {
    console.log("get admin metadata");
    const initializeAdminInfo = async () => {
      const adminData = await getAdminMetadata();
      setAdminMetadata(adminData);
    };

    const getQueueData = async () => {
      const queues = await getAllQueues();
      setQueueList(queues);
    };

    initializeAdminInfo();

    getQueueData();
  }, []);

  const onQueueButtonClick = (queueId: string) => {
    navigate(`/dashboard/queue/${queueId}`);
  };

  return (
    <>
      <IconButton
        aria-label="Open drawer"
        icon={<HamburgerIcon />}
        onClick={onOpen}
        bg="transparent"
      />

      <Drawer
        isOpen={isOpen}
        placement="left"
        initialFocusRef={firstField}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px" fontSize={"md"}>
            {adminMetadata.name} {adminMetadata.email}
          </DrawerHeader>

          <DrawerHeader borderBottomWidth="1px">Your Queues</DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px" marginBottom={"4"}>
              {queueList.map(({ queueId, queueName }: IQueue) => {
                return (
                  <Button
                    key={queueId}
                    onClick={() => onQueueButtonClick(queueId)}
                  >
                    {queueName}
                  </Button>
                );
              })}
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
