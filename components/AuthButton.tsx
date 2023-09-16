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

  useEffect(() => {
    async function getWalletInfo() {
      if (walletInstance) {
        const address = await walletInstance.getAddress();
        setWalletAddress(address);

        // Make API call to get user info if it exists
        // const res = await axios.post<User | null>("/api/auth/getUser", {
        //   walletAddress,
        // });
        const user = undefined;
        if (user) {
          setName(user.name);
          setPhysicalAddress(user.physicalAddress);
          setEmail(user.email);
        } else {
          handleShow();
        }
      }
    }

    getWalletInfo();
  }, [walletInstance]);

  return (
    <div className="AuthButton">
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton style={{
            backgroundColor: "#080808",
            border: 0
          }}>
            <Modal.Title>Complete Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{
            backgroundColor: "#080808",
            border: 0
          }}>
            <Form className="AuthForm">
              <input type="text" placeholder="Username" />
              <input type="text" placeholder="Email Address" />
            </Form>
          </Modal.Body>
          <Modal.Footer style={{
            backgroundColor: "#080808",
            border: 0
          }}>
            <Button variant="primary" onClick={() => { }}>
              Continue
            </Button>
          </Modal.Footer>
        </Modal>
      </>

      <ConnectWallet />
    </div>
  );
}
