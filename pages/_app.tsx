import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { createWeb3ReactRoot, useWeb3React, Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from "@ethersproject/providers";
import Web3 from 'web3'
import { NetworkContextName } from '@/config';

export function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider);
  library.pollingInterval = 15000;
  return library;
}


const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName)


export default function App({ Component, pageProps }: AppProps) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3ProviderNetwork getLibrary={getLibrary}>
        <App />
      </Web3ProviderNetwork>
    </Web3ReactProvider>
  )
}
