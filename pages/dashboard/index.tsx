import React, { useState, useEffect } from 'react';
import { useContract, useDirectListings, useWallet } from '@thirdweb-dev/react';
import MintButton from '@/components/MintButton';
import {
  MUMBAI_DIGITIZE_ETH_ADDRESS,
  MUMBAI_MARKETPLACE_ADDRESS,
} from '@/constant/addresses';
import { PackNFTCard } from '@/components/PackNFT';
import { useAddress } from '@thirdweb-dev/react';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import { useLocalStorage } from 'usehooks-ts';
import { User } from '@prisma/client';
import { USER_LOCAL_STORAGE_KEY } from '@/config';
import Loading from '@/components/Loading';

export default function index() {
  const { contract: marketplace } = useContract(
    MUMBAI_MARKETPLACE_ADDRESS,
    'marketplace-v3'
  );

  const { data: directListings } = useDirectListings(marketplace, {
    tokenContract: MUMBAI_DIGITIZE_ETH_ADDRESS,
  });

  const address = useAddress();
  const [user, setUser] = useLocalStorage<User | null>(USER_LOCAL_STORAGE_KEY, null);

  console.log('LISTINGS', directListings);

  return (
    <div>
      <Head>
        <title>Dashboard | Digitize.eth</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/logo.png' />
      </Head>
      <Navbar />

      <div
        className='container'
        style={{
          marginTop: 100,
        }}
      >
        <h1 style={{ fontSize: 30, fontWeight: 'bold', marginLeft: 20 }}>
          Welcome Back,{' '}
          {address
            ? `${address.substring(0, 6)}...${address.substring(
                address.length - 5,
                address.length - 1
              )}`
            : 'Not signed in'}
          !
        </h1>
        <div className='row' style={{ borderBottom: '1px solid grey', padding: 20 }}>
          <div className='col-sm-2'>
            <img
              src='dp.png'
              alt='Profile Photo'
              style={{
                width: '100%', // Adjust the size as needed
                borderRadius: '50%', // Makes the image circular
                marginRight: '20px', // Adds some space between the photo and the text
                paddingBottom: '20px',
              }}
            />
          </div>

          <div className='col-sm-10'>
            {user ? (
              <div suppressHydrationWarning>
                <h3 suppressHydrationWarning>{user.name}</h3>
                <p suppressHydrationWarning>{user.email}</p>
                {address ? (
                  <div>
                    {/* {address.substring(0, 6).concat('...')}
                      {address.substring(address.length - 5, address.length - 1)} */}
                    {address}
                  </div>
                ) : (
                  'Not signed in'
                )}
              </div>
            ) : (
              <div>
                <h3 suppressHydrationWarning></h3>
                <p suppressHydrationWarning></p>
                Please sign in!
              </div>
            )}
          </div>
        </div>

        <div
          className='row'
          style={{
            padding: 20,
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <h4>Your Items</h4>
            <MintButton />
          </div>
          <div className='row'>
            {!!directListings ? (
              directListings
                ?.filter((listing) => listing.creatorAddress == address)
                .map((listing, index) => (
                  <div className='card' key={index}>
                    <PackNFTCard
                      contractAddress={listing.assetContractAddress}
                      tokenId={listing.tokenId}
                      status={listing.status.toString()}
                      allowTradeAndBuy={true}
                    />
                  </div>
                ))
            ) : (
              <Loading />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
