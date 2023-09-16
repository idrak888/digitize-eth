import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.css';
import { ThirdwebProvider } from '@thirdweb-dev/react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';

const activeChain: string = 'ethereum';

function App({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
      activeChain={activeChain}
      clientId={'e8a318aeb47137f800f553d9291e9c7d'}
    >
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default App;
