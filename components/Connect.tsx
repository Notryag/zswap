//App.js

import React from 'react'
import { Spinner } from './Spiner'
import { useWeb3React } from '@web3-react/core'
import { useInactiveListener } from '../utils/hook'

function ConnectChain(props) {
  const context = useWeb3React()
  const { connector, library, chainId, account, activate, deactivate, active, error } = context

  const [activatingConnector, setActivatingConnector] = React.useState()
  React.useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined)
    }
  }, [activatingConnector, connector])

  const activating = false
  const connected = false
  const disabled = !props.triedEager || !!activatingConnector || !!error

  useInactiveListener(!props.triedEager || !!activatingConnector)

  let isDisconnect = !error && chainId
  const buttonText = isDisconnect ? 'Disconnect' : activating ? 'Connectting' : 'Connect'

  return (
    <button
      style={{
        borderColor: activating ? 'orange' : connected ? 'green' : 'unset',
        cursor: disabled ? 'unset' : 'pointer',
        position: 'relative',
      }}
      className="ConnectButton"
      disabled={disabled}
      onClick={() => {
        if (!isDisconnect) {
        } else {
          deactivate()
        }
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '0',
          left: '0',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          color: 'black',
          margin: '0 0 0 1rem',
        }}
      >
        {activating && <Spinner color={'red'} style={{ height: '50%', marginLeft: '-1rem' }} />}
      </div>
      {buttonText}
    </button>
  )
}
