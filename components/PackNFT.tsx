import {
  MUMBAI_DIGITIZE_ETH_ADDRESS,
  MUMBAI_MARKETPLACE_ADDRESS,
} from '../constant/addresses';
import {
  MediaRenderer,
  Web3Button,
  useAddress,
  useContract,
  useDirectListings,
  useNFT,
} from '@thirdweb-dev/react';
import styles from '../styles/Home.module.css';

type Props = {
  contractAddress: string;
  tokenId: any;
};

export const PackNFTCard = ({ contractAddress, tokenId }: Props) => {
  const address = useAddress();

  const { contract: marketplace, isLoading: loadingMarketplace } = useContract(
    MUMBAI_MARKETPLACE_ADDRESS,
    'marketplace-v3'
  );
  const { contract: packContract } = useContract(contractAddress);
  const { data: packNFT, isLoading: loadingNFT } = useNFT(packContract, tokenId);

  const { data: cardListings, isLoading: loadingPackListings } = useDirectListings(
    marketplace,
    {
      tokenContract: MUMBAI_DIGITIZE_ETH_ADDRESS,
    }
  );
  console.log('Card Listings: ', cardListings);

  async function buyCard() {
    let txResult;

    if (cardListings?.[tokenId]) {
      txResult = await marketplace?.directListings.buyFromListing(
        cardListings[tokenId].id,
        1
      );
    } else {
      throw new Error('No valid listing found');
    }

    return txResult;
  }

  return (
    <div className={styles.packCard}>
      {!loadingNFT && !loadingPackListings ? (
        <div className={styles.shopPack}>
          <div>
            <MediaRenderer src={packNFT?.metadata.image} width='80%' height='100%' />
          </div>
          <div className={styles.packInfo}>
            <h3>{packNFT?.metadata.name}</h3>

            <p>
              Cost: {cardListings![tokenId].currencyValuePerToken.displayValue}{' '}
              {` ` + cardListings![tokenId].currencyValuePerToken.symbol}
            </p>
            <p>Creator: {cardListings![tokenId].creatorAddress}</p>
            {!address ? (
              <p>Login to buy</p>
            ) : (
              <Web3Button
                contractAddress={MUMBAI_MARKETPLACE_ADDRESS}
                action={() => buyCard()}
              >
                Buy
              </Web3Button>
            )}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
