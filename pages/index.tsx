import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import React from 'react';
import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <>
      <Head>
        <title> Mint Physical Collectibles and Trade them on the Blockchain | Digitize.eth</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/logo.png' />
      </Head>
      <Navbar />
      <div
        className={`${styles.center} container`}
        style={{
          width: '100%',
          margin: 'auto',
          display: 'block',
          marginTop: 100,
        }}
      >
        <div
          className='row'
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div className='col-sm'>
            <h1
              style={{
                fontSize: 70,
                fontWeight: 'bold',
                marginLeft: 80,
              }}
            >
              Digitize your physical collectibles into NFTs
            </h1>
          </div>
          <div className='col-sm'>
            <img
              className='landingImage'
              style={{
                width: '100%',
                maxWidth: 400,
                padding: 30,
                display: 'block',
                margin: 'auto',
              }}
              src={'/image1.png'}
            />
          </div>
        </div>
        <div
          style={{
            width: '100%',
            marginTop: 100,
          }}
        >
          <div className='row'>
            <div className={`card col-sm`}>
              <div className='row'>
                <img width={150} src='./home_image/6.jpg' />
              </div>

              <div className='cardRow'>
                <h3>[47287656] Michael Jordan</h3>
                Cost: 9.99 MATIC
                <p>Creator: 0x1fa672...A6a66</p>
              </div>
            </div>
            <div className={`card col-sm`}>
              <div className='row'>
                <img width={150} src='./home_image/2.jpg' />
              </div>

              <div className='cardRow'>
                <h3>[51728625] Patrick Mahomes II</h3>
                Cost: 5.0 MATIC
                <p>Creator: 0x22a6...4A6a88</p>
              </div>
            </div>
            <div className={`card col-sm`}>
              <div className='row'>
                <img width={150} src='./home_image/3.jpg' />
              </div>
              <div className='cardRow'>
                <h3>[413928878] Charizard-Holo</h3>
                Cost: 999.99 MATIC
                <p>Creator: 0x2134...234</p>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className={`card col-sm`}>
              <div className='row'>
                <img width={150} src='./home_image/4.jpg' />
              </div>

              <div className='cardRow'>
                <h3>[53133148] Joe Burrow</h3>
                Cost: 120.22 MATIC
                <p>Creator: 0x1122...6a66</p>
              </div>
            </div>
            <div className={`card col-sm`}>
              <div className='row'>
                <img width={150} src='./home_image/5.jpg' />
              </div>

              <div className='cardRow'>
                <h3>[20756850] Michael Jordan</h3>
                Cost: 69.99 MATIC
                <p>Creator: 0x1f310...4556</p>
              </div>
            </div>
            <div className={`card col-sm`}>
              <div className='row'>
                <img width={150} src='./home_image/1.jpg' />
              </div>
              <div className='cardRow'>
                <h3>[75511805] Connor Bedard</h3>
                Cost: 7.89 MATIC
                <p>Creator: 0x1324...23443</p>
              </div>
            </div>
          </div>
        </div>
        <div
          className='Guide'
          style={{
            maxWidth: 1050,
            display: 'block',
            margin: 'auto',
            marginTop: 100,
          }}
        >
          <h4 style={{ fontWeight: 'bold', fontSize: 40 }}>How it Works</h4>
          <br />
          <div className='row'>
            <div className='col-sm step'>
              <h4>Step 1</h4>
              <p>
                {' '}
                Connect your wallet. Choose from a variety of supported wallets, such as
                Metamask, WalletConnect, Coinbase Wallet, and more. You can also create a
                new wallet if you don’t have one already.
              </p>
            </div>
            <div className='col-sm step'>
              <h4>Step 2</h4>
              <p>
                Submit your valuables. Provide clear and high-quality images and
                descriptions of your valuables that you want to digitize and trade. Our
                team will verify and approve your submissions within 24 hours.
              </p>
            </div>
            <div className='col-sm step'>
              <h4>Step 3</h4>
              <p>
                Trade! Browse our marketplace to discover and exchange rare and unique
                collectibles with other users. You can also track the value and popularity
                of your own collectibles over time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
