import {
  MUMBAI_DIGITIZE_ETH_ADDRESS,
  MUMBAI_MARKETPLACE_ADDRESS,
} from '../constant/addresses';
import {
  DirectListingV3,
  MediaRenderer,
  Web3Button,
  useAddress,
  useBurnNFT,
  useContract,
  useDirectListings,
  useNFT,
} from '@thirdweb-dev/react';
import styles from '../styles/Home.module.css';

type Props = {
  contractAddress: string;
  tokenId: any;
  status?: string;
  allowTradeAndBuy?: boolean;
};

function getListing(tokenId: string, listings?: DirectListingV3[]) {
  return listings?.find((listing: any) => listing.tokenId === tokenId);
}

export const PersonalNFTCard = ({
  contractAddress,
  tokenId,
  status,
  allowTradeAndBuy,
}: Props) => {
  const address = useAddress();
  console.log('TOKEN ID', tokenId);

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
            'missing revert data in call exception'
          )
        ) {
          alert("You don't have enough funds to buy this!");
        }
      }
    } else {
      throw new Error('No valid listing found');
    }

    return txResult;
  }

  const statuses = ['', '', 'SOLD', '', 'AVAILABLE'];

  const currentListing = getListing(tokenId, cardListings);

  const currentStatus = currentListing?.status;

  const { contract } = useContract(contractAddress);
  const { mutateAsync: burnNft, isLoading, error } = useBurnNFT(contract);

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
              Cost: {currentListing?.currencyValuePerToken.displayValue}{' '}
              {` ` + currentListing?.currencyValuePerToken.symbol}
            </p>
            <p>Creator: {currentListing?.creatorAddress}</p>
            {status && <p>Status: {statuses[currentListing?.status || 2]}</p>}

            {!address ? (
              <p>Login to burn NFT</p>
            ) : !allowTradeAndBuy ? (
              currentStatus !== 2 && (
                <>
                  <Web3Button
                    contractAddress={contractAddress}
                    action={() =>
                      burnNft({
                        tokenId: tokenId,
                        amount: 1,
                      })
                    }
                  >
                    Burn NFT
                  </Web3Button>
                </>
              )
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
