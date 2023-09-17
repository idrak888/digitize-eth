import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState } from "react";
import {
  NFT,
  Web3Button,
  useAddress,
  useContract,
  useCreateDirectListing,
  useMintNFT,
  useOwnedNFTs,
} from "@thirdweb-dev/react";
import {
  MUMBAI_DIGITIZE_ETH_ADDRESS,
  MUMBAI_MARKETPLACE_ADDRESS,
  SEPOLIA_MINT_TX_ID,
} from "@/constant/addresses";

function getCurrentNft(
  ownedNfts?: NFT[],
  itemName?: string,
  psaGrade?: string,
  certificateNumber?: string
) {
  if (!ownedNfts) {
    return undefined;
  }
  return ownedNfts.find(
    (nft) =>
      nft.metadata?.description ===
      createUniqueDescription(itemName, psaGrade, certificateNumber)
  );
}


function createUniqueDescription(
  itemName?: string,
  psaGrade?: string,
  certificateNumber?: string
) {
  return `${itemName || ""} - ${psaGrade || ""} - #${certificateNumber || ""}`;
}

enum LoadingStage {
  REQUESTED, // 0%
  VERIFIED, // 33%
  MINTED, // 66%
  LISTED, // 100%
}

export default function MintButton() {
  const address = useAddress();
  const { contract: marketplaceContract } = useContract(
    MUMBAI_MARKETPLACE_ADDRESS,
    "marketplace-v3"
  );
  const { contract: nftContract } = useContract(
    MUMBAI_DIGITIZE_ETH_ADDRESS,
    "edition"
  );

  const {
    mutateAsync: mintNft,
  } = useMintNFT(nftContract);

  const {
    data: ownedNfts,
  } = useOwnedNFTs(nftContract, address);

  const {
    mutateAsync: createDirectListing,
  } = useCreateDirectListing(marketplaceContract);
  const [show, setShow] = useState(false);
  const [loadingStage, setLoadingStage] = useState<LoadingStage | null>(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Use state hooks to store the file, CID, and URL
  const [file, setFile] = useState<File | null>(null);
  const [cid, setCid] = useState<string | null>(null);

  const [itemName, setItemName] = useState<string | undefined>(undefined);
  const [psaGrade, setPsaGrade] = useState<string | undefined>(undefined);
  const [certificateNumber, setCertificateNumber] = useState<
    string | undefined
  >(undefined);

  const currentNft = getCurrentNft(
    ownedNfts,
    itemName,
    psaGrade,
    certificateNumber
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
              setItemName(undefined);
              setPsaGrade(undefined);
              setCertificateNumber(undefined);
              setFile(null);
              setCid(null);
            }}
          >
            Cancel
          </Button>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 5,
            }}
          >
            <Web3Button
              contractAddress={MUMBAI_DIGITIZE_ETH_ADDRESS}
              isDisabled={!file || !itemName || !psaGrade || !address}
              action={async () => {
                if (!address) {
                  alert("Please connect your wallet");
                  return;
                }

                // Step 1: Verify w Computer Vision
                setLoadingStage(LoadingStage.REQUESTED);
                setTimeout(async () => {
                  setLoadingStage(LoadingStage.VERIFIED);

                  await mintNft({
                    metadata: {
                      name: `[${certificateNumber}] ${itemName}`,
                      description: createUniqueDescription(
                        itemName,
                        psaGrade,
                        certificateNumber
                      ),
                      image: file, // Accepts any URL or File type
                    },
                    supply: 1,
                    to: address, // disabled if address is undefined
                  });

                  console.log("Minted, now list it on the marketplace");
                  setLoadingStage(LoadingStage.MINTED);
                }, 1200);
              }}
            >
              {loadingStage === null
                ? "1. Submit"
                : loadingStage === LoadingStage.REQUESTED
                ? "Verifying"
                : loadingStage === LoadingStage.VERIFIED
                ? "Minting"
                : "Minted!"}
            </Web3Button>
            <Web3Button
              isDisabled={
                !currentNft || !address || loadingStage !== LoadingStage.MINTED
              }
              contractAddress={MUMBAI_MARKETPLACE_ADDRESS}
              action={async () => {
                if (!currentNft?.metadata) {
                  alert("Something went wrong, please try minting again");
                  return;
                }
                await createDirectListing({
                  assetContractAddress: MUMBAI_DIGITIZE_ETH_ADDRESS,
                  tokenId: currentNft.metadata.id,
                  pricePerToken: "0.5",
                  quantity: "1",
                  startTimestamp: new Date(),
                  endTimestamp: new Date(
                    new Date().getTime() + 7 * 24 * 60 * 60 * 1000 // 7 days
                  ),
                });

                setLoadingStage(LoadingStage.LISTED);
                console.log("Minted NFT-ESA: " + SEPOLIA_MINT_TX_ID);
                handleClose();
              }}
            >
              {loadingStage === LoadingStage.LISTED ? "Listed" : "2. List"}
            </Web3Button>
          </div>
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
