import { useWeb3React } from "@web3-react/core"
import { InjectedConnector } from '@web3-react/injected-connector'


export default function WalletConnect() {
  const context = useWeb3React()
  const { connector, library, chainId, account, activate, deactivate, active, error } = context
  console.log('%c [ content ]-6', 'font-size:13px; background:pink; color:#bf2c9f;', context)


  const injected = new InjectedConnector({ supportedChainIds: [1, 3, 4, 5, 42] })

  const handleClick = () => {
    activate()
  }

  return (
    <div>
      connect
      <button onClick={handleClick}> connect </button>
    </div>
  )
}