import { ConnectWallet, useWallet } from "@thirdweb-dev/react";
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  Fragment,
} from "react";
import axios from "axios";
import { User } from "@prisma/client";
import { Modal, Button, Form } from "react-bootstrap";

export default function AuthButton() {
  const walletInstance = useWallet();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // States
  const [walletAddress, setWalletAddress] = useState("");
  const [name, setName] = useState("");
  const [physicalAddress, setPhysicalAddress] = useState("");
  const [email, setEmail] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // Modal functions
  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    async function getWalletInfo() {
      if (walletInstance) {
        const address = await walletInstance.getAddress();
        setWalletAddress(address);

        // Make API call to get user info if it exists
        const res = await axios.post<User | null>("/api/auth/getUser", {
          walletAddress,
        });
        const user = res.data;
        if (user) {
          setName(user.name);
          setPhysicalAddress(user.physicalAddress);
          setEmail(user.email);
        } else {
          // open dialog for profiles
          setIsOpen(true);
        }
      }
    }

    getWalletInfo();
  }, [walletInstance]);

  return (
    <div>
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Login Form</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close Modal
            </Button>
          </Modal.Footer>
        </Modal>
      </>

      <ConnectWallet />
    </div>
  );
}
