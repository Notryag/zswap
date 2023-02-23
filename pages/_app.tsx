import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { Web3ReactProvider } from "@web3-react/core"
import { Web3Provider } from "@ethersproject/providers"
import dynamic from "next/dynamic"
import Header from "@/components/Header"
import Web3ReactManager from "@/components/Web3ReactManager"

export function getLibrary(provider: any): Web3Provider {
    const library = new Web3Provider(provider)
    library.pollingInterval = 15000
    return library
}

const Web3ProviderNetwork = dynamic(() => import("../components/Web3ProviderNetwork"), { ssr: false })

export default function App({ Component, pageProps }: AppProps) {
    return (
        <Web3ReactProvider getLibrary={getLibrary}>
            <Web3ProviderNetwork getLibrary={getLibrary}>
                <>
                    <Header></Header>
                    <Web3ReactManager>
                        <Component {...pageProps} />
                    </Web3ReactManager>
                </>
            </Web3ProviderNetwork>
        </Web3ReactProvider>
    )
}
