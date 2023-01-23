import { Web3ReactProvider } from '@web3-react/core';
import { AppProps } from 'next/app';
import Web3 from 'web3';
import { provider } from 'web3-core/types/index';

import '@/styles/globals.css';

const getLibrary = (provider: provider) => {
  return new Web3(provider);
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Component {...pageProps} />;
    </Web3ReactProvider>
  );
}

export default MyApp;
