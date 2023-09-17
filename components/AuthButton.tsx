import { ConnectWallet, useWallet } from "@thirdweb-dev/react";
import React, { useEffect, useState } from "react";
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
        if (!address) {
          return;
        }
        setWalletAddress(address);
      }
    }
    getWalletInfo();
  }, [walletInstance]);

  useEffect(() => {
    async function getUserInfo() {
      if (!walletAddress) {
        return;
      }

      // Make API call to get user info if it exists
      const res = await axios.post<User | null>("/api/auth/getUser", {
        walletAddress,
      });
      const user = res.data;

      if (user) {
        handleClose();
        setName(user.name);
        setPhysicalAddress(user.physicalAddress);
        setEmail(user.email);
      } else {
        handleShow();
      }
    }
    getUserInfo();
  }, [walletAddress]);

  return (
    <div className="AuthButton">
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header
            closeButton
            style={{
              backgroundColor: "#080808",
              border: 0,
            }}
          >
            <Modal.Title>Complete Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body
            style={{
              backgroundColor: "#080808",
              border: 0,
            }}
          >
            <Form className="AuthForm">
              <input
                type="text"
                placeholder="Name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <input
                type="text"
                placeholder="Email Address"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <input
                type="text"
                placeholder="Physical Address"
                onChange={(e) => {
                  setPhysicalAddress(e.target.value);
                }}
              />
              <input type="text" readOnly={true} value={walletAddress} />
            </Form>
          </Modal.Body>
          <Modal.Footer
            style={{
              backgroundColor: "#080808",
              border: 0,
            }}
          >
            <Button
              variant="primary"
              onClick={async () => {
                await axios.post("/api/auth/signin", {
                  walletAddress,
                  name,
                  physicalAddress,
                  email,
                });
                handleClose();
              }}
              disabled={!walletAddress || !name || !physicalAddress || !email}
            >
              Continue
            </Button>
          </Modal.Footer>
        </Modal>
      </>

      <ConnectWallet />
    </div>
  );
}
