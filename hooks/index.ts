import { injected } from "@/scripts/connectors"
import { useWeb3React } from "@web3-react/core"
import { useEffect, useState } from "react"
import { isMobile } from "react-device-detect"

export function useEagerConnect() {
    const { activate, active } = useWeb3React()
    const [tried, setTried] = useState<boolean>()
    const { ethereum } = window as any
    useEffect(() => {
        injected.isAuthorized().then(isAuthorized => {
            if (isAuthorized) {
                activate(injected, undefined, true).catch(() => {
                    setTried(true)
                })
            } else {
                if (isMobile && ethereum) {
                    activate(injected, undefined, true).catch(() => {
                        setTried(true)
                    })
                } else {
                    setTried(true)
                }
            }
        })
    }, [activate])

    useEffect(() => {
        if (active) {
            setTried(true)
        }
    }, [active])

    return tried
}

export function useInactiveListener(suppress = false) {
    const { active, error, activate } = useWeb3React() // specifically using useWeb3React because of what this hook does
  
    useEffect(() => {
      const { ethereum } = window as any
  
      if (ethereum && ethereum.on && !active && !error && !suppress) {
        const handleChainChanged = () => {
          // eat errors
          activate(injected, undefined, true).catch(error => {
            console.error('Failed to activate after chain changed', error)
          })
        }
  
        const handleAccountsChanged = (accounts: string[]) => {
          if (accounts.length > 0) {
            // eat errors
            activate(injected, undefined, true).catch(error => {
              console.error('Failed to activate after accounts changed', error)
            })
          }
        }
  
        ethereum.on('chainChanged', handleChainChanged)
        ethereum.on('accountsChanged', handleAccountsChanged)
  
        return () => {
          if (ethereum.removeListener) {
            ethereum.removeListener('chainChanged', handleChainChanged)
            ethereum.removeListener('accountsChanged', handleAccountsChanged)
          }
        }
      }
      return undefined
    }, [active, error, suppress, activate])
  }