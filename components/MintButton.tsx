import { Modal, Button, Form } from "react-bootstrap";
import React, { useState } from "react";
import { Web3Storage } from "web3.storage";
import axios from "axios";
import {
  Web3Button,
  useAddress,
  useContract,
  useMintNFT,
} from "@thirdweb-dev/react";
import { MUMBAI_DIGITIZE_ETH_ADDRESS } from "@/constant/addresses";

function constructIpfsUrl(cid: string, fileName: string) {
  return `ipfs://${cid}/${fileName}`;
}

export default function MintButton() {
  const address = useAddress();
  const { contract } = useContract(MUMBAI_DIGITIZE_ETH_ADDRESS, "edition");
  const { mutateAsync: mintNft, isLoading, error } = useMintNFT(contract);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Create a new Web3Storage instance with your API token
  const client = new Web3Storage({
    token: process.env.NEXT_PUBLIC_WEB3_STORAGE_KEY || "",
  });
  // Use state hooks to store the file, CID, and URL
  const [file, setFile] = useState<File | null>(null);
  const [cid, setCid] = useState<string | null>(null);

  const [itemName, setItemName] = useState<string | null>(null);
  const [psaGrade, setPsaGrade] = useState<string | null>(null);
  const [certificateNumber, setCertificateNumber] = useState<string | null>(
    null
  );

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Get the first file from the input
    const file = e.target.files?.[0];
    if (file) {
      // Set the file state
      setFile(file);
      // Reset the CID and URL states
      setCid(null);
    }
  };

  // Handle file upload button click
  const handleUpload = async () => {
    if (file) {
      try {
        // Upload the file to IPFS and get the CID
        const cid = await client.put([file], {
          name: file.name,
          maxRetries: 3,
        });
        // Set the CID state
        setCid(cid);

        // Get the URL for the file from the CID
        return constructIpfsUrl(cid, file.name);
      } catch (error) {
        // Handle any errors
        console.error(error);
      }
    }
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header
          closeButton
          style={{
            backgroundColor: "#080808",
            border: 0,
          }}
        >
          <Modal.Title>Digitize your Collectible</Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            backgroundColor: "#080808",
            border: 0,
          }}
        >
          <Form className="AuthForm">
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <input
              type="text"
              placeholder="Name of Item"
              onChange={(e) => {
                setItemName(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="PSA Grade"
              onChange={(e) => {
                setPsaGrade(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Certificate Number"
              onChange={(e) => {
                setCertificateNumber(e.target.value);
              }}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer
          style={{
            backgroundColor: "#080808",
            border: 0,
          }}
        >
          <Button
            variant="secondary"
            onClick={() => {
              handleClose();
              setItemName(null);
              setPsaGrade(null);
              setCertificateNumber(null);
              setFile(null);
              setCid(null);
            }}
          >
            Cancel
          </Button>
          <Web3Button
            contractAddress={MUMBAI_DIGITIZE_ETH_ADDRESS}
            isDisabled={!file || !itemName || !psaGrade || !address}
            action={async () => {
              // Upload the file to IPFS
              // const url = await handleUpload();
              // console.log(url);
              // // If successful, get the URL
              // if (!url) {
              //   alert("Failed to upload file to IPFS, please try again.");
              //   return;
              // }
              if (!address) {
                alert("Please connect your wallet");
                return;
              }

              await mintNft({
                // metadata: {
                //   name: `[${certificateNumber}] ${itemName}`,
                //   description: `${itemName} - ${psaGrade} - #${certificateNumber}`,
                //   image: file, // Accepts any URL or File type
                // },
                metadata: {
                  name: "My NFT",
                  description: "This is my NFT",
                  image: "ipfs://example.com/my-nft.png", // Accepts any URL or File type
                },
                to: address, // disabled if address is undefined
              });
            }}
          >
            Submit
          </Web3Button>
          {isLoading && <p>Loading...</p>}
          {(error as Error) && <button>{(error as Error).message}</button>}
        </Modal.Footer>
      </Modal>
      <button
        style={{
          marginLeft: 20,
        }}
        onClick={handleShow}
        className="btn btn-outline-primary"
      >
        Mint New
      </button>
    </div>
  );
}
