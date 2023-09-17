import {
  MUMBAI_DIGITIZE_ETH_ADDRESS,
  MUMBAI_MARKETPLACE_ADDRESS,
} from "../constant/addresses";
import {
  MediaRenderer,
  Web3Button,
  useAddress,
  useContract,
  useDirectListings,
  useNFT,
} from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";

type Props = {
  contractAddress: string;
  tokenId: any;
  status?: string;
  allowTradeAndBuy?: boolean;
};

export const PackNFTCard = ({
  contractAddress,
  tokenId,
  status,
  allowTradeAndBuy,
}: Props) => {
  const address = useAddress();

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

  const currentStatus = cardListings![tokenId].status;

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
              Cost: {cardListings![tokenId].currencyValuePerToken.displayValue}{" "}
              {` ` + cardListings![tokenId].currencyValuePerToken.symbol}
            </p>
            <p>Creator: {cardListings![tokenId].creatorAddress}</p>
            {status && <p>Status: {statuses[cardListings![tokenId].status]}</p>}

            {!address ? (
              <p>Login to buy</p>
            ) : !allowTradeAndBuy ? (
              <Web3Button
                isDisabled={currentStatus === 2}
                contractAddress={MUMBAI_MARKETPLACE_ADDRESS}
                action={buyCard}
              >
                Buy
              </Web3Button>
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
