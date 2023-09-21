import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import { FC, useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const AuthModal: FC<{ isOpen: boolean; toggle: VoidFunction }> = ({
  isOpen,
  toggle,
}) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const toggleLogin = () => {
    setIsLoginOpen((item) => !item);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={toggle}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            {isLoginOpen ? (
              <>
                <SignIn closeToggle={toggle} toggleLogin={toggleLogin} />
              </>
            ) : (
              <>
                <SignUp closeToggle={toggle} toggleLogin={toggleLogin} />
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AuthModal;
