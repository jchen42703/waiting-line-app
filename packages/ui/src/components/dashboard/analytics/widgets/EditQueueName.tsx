import {
  useEditableControls,
  ButtonGroup,
  IconButton,
  Flex,
  Editable,
  EditablePreview,
} from "@chakra-ui/react";

import { FaRegEdit } from "react-icons/fa";
import { FiCheck } from "react-icons/fi";
import { GrFormClose } from "react-icons/gr";

const EditQueueName = () => {
  const {
    isEditing,
    getSubmitButtonProps,
    getCancelButtonProps,
    getEditButtonProps,
  } = useEditableControls();

  return isEditing ? (
    <ButtonGroup justifyContent="center" size="sm">
      <IconButton
        aria-label="submit"
        icon={<FiCheck />}
        {...getSubmitButtonProps()}
      />
      <IconButton
        aria-label="close"
        icon={<GrFormClose />}
        {...getCancelButtonProps()}
      />
    </ButtonGroup>
  ) : (
    <Flex justifyContent="right">
      <IconButton
        aria-label="Edit"
        size="sm"
        icon={<FaRegEdit />}
        {...getEditButtonProps()}
      />
    </Flex>
  );
};

const EditableQueue = () => {
  return (
    <Editable
      textAlign="center"
      defaultValue="Queue Name"
      fontSize="2xl"
      isPreviewFocusable={false}
    >
      <EditablePreview />
    </Editable>
  );
};

export default EditableQueue;
