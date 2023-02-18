import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { createWeb3ReactRoot, useWeb3React, Web3ReactProvider } from '@web3-react/core'
import Web3 from 'web3'

function getLibrary(provider: any) {
  return new Web3(provider) // this will vary according to whether you use e.g. ethers or web3.js
}




export default function App({ Component, pageProps }: AppProps) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
        <Component {...pageProps} />
    </Web3ReactProvider>
  )
}
