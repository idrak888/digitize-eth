import { Status, useContract, useDirectListings } from '@thirdweb-dev/react';
import {
  MUMBAI_DIGITIZE_ETH_ADDRESS,
  MUMBAI_MARKETPLACE_ADDRESS,
} from '../../constant/addresses';
import styles from '../../styles/Home.module.css';
import { PackNFTCard } from '../../components/PackNFT';

export default function MarketPlace() {
  const { contract: marketplace, isLoading: loadingMarketplace } = useContract(
    MUMBAI_MARKETPLACE_ADDRESS,
    'marketplace-v3'
  );

  const { data: directListings, isLoading: loadingDirectListings } = useDirectListings(
    marketplace,
    {
      tokenContract: MUMBAI_DIGITIZE_ETH_ADDRESS,
    }
  );
  console.log('DirectPack', directListings);

  return (
    <div className={styles.container}>
      <h1>Marketplace</h1>
      <div className={styles.grid}>
        {!!directListings ? (
          directListings
            ?.filter((listing) => listing.status === 4)
            ?.map((listing, index) => (
              <div key={index}>
                <PackNFTCard
                  contractAddress={listing.assetContractAddress}
                  tokenId={listing.tokenId}
                />
              </div>
            ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
