# Bl0ckify - Hack the North 2023 

<img width="1613" alt="Screenshot 2023-09-17 at 6 55 23 AM" src="https://github.com/idrak888/digitize-eth/assets/72030222/02a20ea2-379a-4dfb-ad04-5ed4523af225">

<img width="1624" alt="Screenshot 2023-09-17 at 6 58 30 AM" src="https://github.com/idrak888/digitize-eth/assets/72030222/9c80bde3-1c15-4c9e-9833-aaf7e3861617">

<img width="2029" alt="Screenshot 2023-09-17 at 7 27 18 AM" src="https://github.com/idrak888/digitize-eth/assets/72030222/3707177c-a05e-490b-adfe-bd42fe537c07">

Video Demo: [https://youtu.be/3-WpAtG7PqA](https://youtu.be/3-WpAtG7PqA)

Devpost URL [here](https://devpost.com/software/digitize-eth?ref_content=user-portfolio&ref_feature=in_progress).


## Inspiration 💡

Buying, selling, and trading physical collectibles can be a rather tedious task, and this has become even more apparent with the recent surge of NFTs (Non-Fungible Tokens).

The global market for physical collectibles was estimated to be worth $372 billion in 2020. People have an innate inclination to collect, driving the acquisition of items such as art, games, sports memorabilia, toys, and more. However, considering the world's rapid shift towards the digital realm, there arises a question about the sustainability of this market in its current form.

At its current pace, it seems inevitable that people may lose interest in physical collectibles, gravitating towards digital alternatives due to the speed and convenience of digital transactions. Nevertheless, we are here with a mission to rekindle the passion for physical collectibles.

## What it does 🤖

Our platform empowers users to transform their physical collectibles into digital assets. This not only preserves the value of their physical items but also facilitates easy buying, selling, and trading.

We have the capability to digitize various collectibles with verifiable authenticity, including graded sports/trading cards, sneakers, and more.

## How we built it 👷🏻‍♂️

To construct our platform, we utilized [NEXT.js](https://nextjs.org/) for both frontend and backend development. Additionally, we harnessed the power of the [thirdweb](https://thirdweb.com/) SDK for deploying, minting, and trading NFTs. Our NFTs are deployed on the Ethereum L2 [Mumbai](https://mumbai.polygonscan.com/) testnet.

- MUMBAI_DIGITIZE_ETH_ADDRESS = [0x6A80AD071932ba92fe43968DD3CaCBa989C3253f](https://thirdweb.com/mumbai/0x6A80AD071932ba92fe43968DD3CaCBa989C3253f)
- MUMBAI_MARKETPLACE_ADDRESS = [0xedd39cAD84b3Be541f630CD1F5595d67bC243E78](https://thirdweb.com/mumbai/0xedd39cAD84b3Be541f630CD1F5595d67bC243E78)

Furthermore, we incorporated the Ethereum Attestation Service to verify asset ownership and perform KYC (Know Your Customer) checks on users.

- SEPOLIA_KYC_SCHEMA = [0x95f11b78d560f88d50fcc41090791bb7a7505b6b12bbecf419bfa549b0934f6d](https://sepolia.easscan.org/schema/view/0x95f11b78d560f88d50fcc41090791bb7a7505b6b12bbecf419bfa549b0934f6d)
- SEPOLIA_KYC_TX_ID = [0x18d53b53e90d7cb9b37b2f8ae0d757d1b298baae3b5767008e2985a5894d6d2c](https://sepolia.easscan.org/attestation/view/0x18d53b53e90d7cb9b37b2f8ae0d757d1b298baae3b5767008e2985a5894d6d2c)
- SEPOLIA_MINT_NFT_SCHEMA = [0x480a518609c381a44ca0c616157464a7d066fed748e1b9f55d54b6d51bcb53d2](https://sepolia.easscan.org/schema/view/0x480a518609c381a44ca0c616157464a7d066fed748e1b9f55d54b6d51bcb53d2)
- SEPOLIA_MINT_NFT_TX_ID = [0x0358a9a9cae12ffe10513e8d06c174b1d43c5e10c3270035476d10afd9738334](https://sepolia.easscan.org/attestation/view/0x0358a9a9cae12ffe10513e8d06c174b1d43c5e10c3270035476d10afd9738334)

We also made use of CockroachDB and Prisma to manage our database.

## Challenges we ran into 🏃🏻‍♂️🏃🏻‍♂️💨💨

Our journey in the blockchain space was met with several challenges, as we were relatively new to this domain. Integrating various SDKs proved to be a formidable task. Initially, we deployed our NFTs on Sepolia, but encountered difficulties in fetching data. We suspect that thirdweb does not fully support Sepolia. Ultimately, we made a successful transition to the Mumbai network. We also faced issues with the PSA card website, as it went offline temporarily, preventing us from scraping data to populate our applications.

## Accomplishments that we're proud of 🌄

As a team consisting of individuals new to blockchain technology, and even first-time deployers of smart contracts and NFT minting, we take pride in successfully integrating web3 SDKs into our application. We managed to deliver a functional minimum viable product within a short time frame. 🎇🎇

## What we learned 👨🏻‍🎓

Through this experience, we learned the value of teamwork and the importance of addressing challenges head-on. In moments of uncertainty, we found effective solutions through open discussions. Overall, we have gained confidence in our ability to deliver exceptional products as a team.Lastly, we learned to have fun and build things that matter to us.

## What's next for Bl0ckify 👀👀👀

Our future plans include further enhancements such as:

- Populating our platform with a range of supported NFTs for physical assets.
- Take a leap of faith and deploy on Mainnet  
- Deploy our NFTs on other chains, eg Solana.

## Tech Stack

- Frontend & Backend: [Next.js](https://nextjs.org/)
- Web3 Framework: [ThirdWeb](https://thirdweb.com/)
  - Walletconnect feature
- Ethereum Attestation Serivce: [EAS](https://attest.sh/)
  - This is used to KYC new users and verify the authenticity of the physical asset.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
