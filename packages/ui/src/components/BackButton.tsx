import { ArrowBackIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <>
      <IconButton
        aria-label="Back button"
        icon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        // bg="transparent"
      />
    </>
  );
};

export default BackButton;
