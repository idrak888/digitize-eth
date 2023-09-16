import { useEffect } from 'react';
import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.css';
import { ThirdwebProvider } from '@thirdweb-dev/react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import dotenv from 'dotenv';

dotenv.config();
const activeChain = 'ethereum';

function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return (
    <ThirdwebProvider
      activeChain={activeChain}
      clientId={process.env.NEXT_PUBLIC_CLIENT_ID}
    >
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}
export default App;
