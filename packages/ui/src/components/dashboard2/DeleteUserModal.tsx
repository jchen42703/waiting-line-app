import {
  Button,
  Modal,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
// import { deleteQueue } from "../../../lib/services/queue.service";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import { deleteUser } from "../../lib/services/user.service";

const DeleteUserModal = ({
  isOpen,
  onClose,
  queueId,
  userId,
  name,
}: {
  isOpen: boolean;
  onClose: () => void;
  queueId: string;
  userId: string;
  name: string;
}) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast(); // A toast to show some errors

  const onConfirm = async (queueId: string) => {
    setLoading(true);

    try {
      // If it works, no errors
      await deleteUser({
        queueId,
        userId,
      });
      setLoading(false);
      navigate(0);
    } catch (e) {
      setLoading(false);
      if (_.isError(e)) {
        // Sentry log if we are not broke
        // Otherwise console.log for debug
        console.log(e);
      }

      toast({
        position: "top",
        status: "error",
        description:
          "Woops! Looks like something went wrong with our servers. Please try again.",
        duration: 8000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete User</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Click "Delete" to confirm that you want to delete the user:
            <Text fontWeight={"extrabold"}>{name}</Text>.
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              isLoading={loading}
              loadingText="Deleting user..."
              bg={"brand.secondary"}
              textColor={"white"}
              _hover={{ textColor: "black", bg: "brand.secondary" }}
              onClick={() => onConfirm(queueId)}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteUserModal;
