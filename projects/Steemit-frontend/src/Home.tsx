import { useWallet } from '@txnlab/use-wallet'
import React, { useState } from 'react'
import { Vortex } from '../src/components/ui/vortex'
import AppCalls from './components/AppCalls'
import ConnectWallet from './components/ConnectWallet'
import Transact from './components/Transact'

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const [openWalletModal, setOpenWalletModal] = useState<boolean>(false)
  const [openDemoModal, setOpenDemoModal] = useState<boolean>(false)
  const [appCallsDemoModal, setAppCallsDemoModal] = useState<boolean>(false)
  const { activeAddress } = useWallet()

  const toggleWalletModal = () => {
    setOpenWalletModal(!openWalletModal)
  }

  const toggleDemoModal = () => {
    setOpenDemoModal(!openDemoModal)
  }

  const toggleAppCallsModal = () => {
    setAppCallsDemoModal(!appCallsDemoModal)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navbar */}
      <nav className="bg-black p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">AlgoTube</h1>
          <div className="flex space-x-4">
            {activeAddress && (
              <>
                <button
                  className="bg-green-500 hover:bg-green-700 text-black font-bold py-2 px-4 rounded"
                  onClick={toggleDemoModal}
                >
                  Transact
                </button>
                <button
                  className="bg-yellow-500 hover:bg-yellow-700 text-black font-bold py-2 px-4 rounded"
                  onClick={toggleAppCallsModal}
                >
                  AppCalls
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      <div className="w-full mx-auto rounded-md h-screen overflow-hidden">
        <Vortex
          backgroundColor="black"
          rangeY={800}
          particleCount={500}
          baseHue={120}
          className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
        >
          <h2 className="text-white text-2xl md:text-6xl font-bold text-center">SteemIt</h2>
          <p className="text-white text-sm md:text-2xl max-w-xl mt-6 text-center">Welcomes You :)</p>
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
            <button
              data-test-id="connect-wallet"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={toggleWalletModal}
            >
              {activeAddress ? 'Connected' : 'Connect Wallet'}
            </button>
            <button className="px-4 py-2 text-white">Watch trailer</button>
          </div>
        </Vortex>
      </div>

      {/* Modals */}
      <ConnectWallet openModal={openWalletModal} closeModal={toggleWalletModal} />
      <Transact openModal={openDemoModal} setModalState={setOpenDemoModal} />
      <AppCalls openModal={appCallsDemoModal} setModalState={setAppCallsDemoModal} />
    </div>
  )
}

export default Home
