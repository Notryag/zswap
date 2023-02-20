import { useWeb3React } from "@web3-react/core"
import { injected } from "@/scripts/connectors"


export default function WalletConnect() {
  const context = useWeb3React()
  const { connector, library, chainId, account, activate, deactivate, active, error } = context

  const connect = async () => {
    try {
      await activate(injected)
    } catch (error) {
      console.log(error)
    }
  }

  const disConnect = () => {
    try {
      deactivate()
    } catch (ex) {
      console.log(ex)
    }
  }

  return (
    <div>
      <div className="header">
        <div></div>
        <div>
          <button onClick={connect}>connect</button>
        </div>
      </div>
      <div className="container">
        <div className="wrap">
          <div></div>
          <div></div>
          <div></div>
          <button></button>
        </div>
      </div>
    </div>
  )
}