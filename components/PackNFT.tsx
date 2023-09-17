import {
  MUMBAI_DIGITIZE_ETH_ADDRESS,
  MUMBAI_MARKETPLACE_ADDRESS,
} from "../constant/addresses";
import {
  DirectListingV3,
  MediaRenderer,
  Web3Button,
  useAddress,
  useContract,
  useDirectListings,
  useNFT,
} from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import axios from "axios";
import { Button } from "react-bootstrap";

type Props = {
  contractAddress: string;
  tokenId: any;
  status?: string;
  disallowTradeAndBuy?: boolean;
  ownerAddress: string;
  cardsTraded: Set<string>;
};

function getListing(tokenId: string, listings?: DirectListingV3[]) {
  return listings?.find((listing: any) => listing.tokenId === tokenId);
}

export const PackNFTCard = ({
  contractAddress,
  tokenId,
  status,
  disallowTradeAndBuy,
  ownerAddress,
  cardsTraded,
}: Props) => {
  const address = useAddress();
  const isOwner = address === ownerAddress;

  const isTraded = cardsTraded.has(tokenId);

  const { contract: marketplace, isLoading: loadingMarketplace } = useContract(
    MUMBAI_MARKETPLACE_ADDRESS,
    "marketplace-v3"
  );
  const { contract: packContract } = useContract(contractAddress);
  const { data: packNFT, isLoading: loadingNFT } = useNFT(
    packContract,
    tokenId
  );

  const { data: cardListings, isLoading: loadingPackListings } =
    useDirectListings(marketplace, {
      tokenContract: MUMBAI_DIGITIZE_ETH_ADDRESS,
    });

  async function buyCard() {
    let txResult;

    if (cardListings?.[tokenId]) {
      try {
        txResult = await marketplace?.directListings.buyFromListing(
          cardListings[tokenId].id,
          1
        );
      } catch (error) {
        if (
          (error as { message: string }).message.includes(
            "missing revert data in call exception"
          )
        ) {
          alert("You don't have enough funds to buy this!");
        }
      }
    } else {
      throw new Error("No valid listing found");
    }

    return txResult;
  }

  const statuses = ["", "", "SOLD", "", "AVAILABLE"];

  const currentListing = getListing(tokenId, cardListings);

  const currentStatus = currentListing?.status;

  if (!packNFT) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.packCard}>
      {!loadingNFT && !loadingPackListings ? (
        <div className={styles.shopPack}>
          <div>
            <MediaRenderer
              src={packNFT?.metadata.image}
              width="80%"
              height="100%"
            />
          </div>
          <div className={styles.packInfo}>
            <h3>{packNFT?.metadata.name}</h3>

            <p>
              Cost: {currentListing?.currencyValuePerToken.displayValue}{" "}
              {` ` + currentListing?.currencyValuePerToken.symbol}
            </p>
            <p>Creator: {currentListing?.creatorAddress}</p>
            {status && <p>Status: {statuses[currentListing?.status || 2]}</p>}

            {!address ? (
              <p>Login to buy</p>
            ) : isOwner ? (
              <div>Owned by You</div>
            ) : !disallowTradeAndBuy ? (
              <div style={{ display: "flex", flexDirection: "row", gap: 5 }}>
                <Web3Button
                  isDisabled={currentStatus === 2}
                  contractAddress={MUMBAI_MARKETPLACE_ADDRESS}
                  action={buyCard}
                >
                  Buy
                </Web3Button>
                <Button
                  disabled={!packNFT || currentStatus === 2 || isTraded}
                  onClick={async () => {
                    await axios.post("/api/submitTrade", {
                      tokenId,
                      requestingAddress: address,
                      ownerAddress,
                      description:
                        packNFT.metadata.description || "No description",
                    });
                    alert("Trade request sent!");
                  }}
                >
                  {isTraded
                    ? "Up for Trade"
                    : currentStatus === 2
                    ? "Sold"
                    : "Trade"}
                </Button>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
