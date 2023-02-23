import { network } from "@/connectors"
import { useEagerConnect, useInactiveListener } from "@/hooks"
import { useWeb3React } from "@web3-react/core"
import { useEffect, useState } from "react"

export default function Web3ReactManager({ children }: { children: JSX.Element }) {
    const { active } = useWeb3React()

    const { active: networkActive, error: netWorkError, activate: activeNetwork } = useWeb3React()

    const triedEager = useEagerConnect()

    useEffect(() => {
        if (triedEager && !networkActive && !netWorkError && !active) {
            activeNetwork(network)
        }
    }, [triedEager, active, networkActive, netWorkError, activeNetwork])

    useInactiveListener(!triedEager)

    const [showLoader, setShowLoader] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowLoader(true)
        }, 500)
        return () => {
            clearTimeout(timer)
        }
    }, [])

    if (!triedEager) {
        return null
    }

    if (!active && netWorkError) {
        return <div>unknow Error</div>
    }

    if (!active && !netWorkError) {
        return showLoader ? <div>loader</div> : null
    }

    return children
}
