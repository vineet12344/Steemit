import { useWallet } from '@txnlab/use-wallet'
import React, { useState } from 'react'
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

  // Mock data for videos
  const videos = [
    {
      id: 1,
      title: 'Introduction to AlgoKit',
      thumbnail: 'https://via.placeholder.com/320x180',
      channel: 'AlgoKit Tutorials',
      views: '1.2M views',
      timestamp: '2 weeks ago',
    },
    {
      id: 2,
      title: 'Building Smart Contracts with Algorand',
      thumbnail: 'https://via.placeholder.com/320x180',
      channel: 'Blockchain Academy',
      views: '800K views',
      timestamp: '1 month ago',
    },
    {
      id: 3,
      title: 'Getting Started with React and AlgoKit',
      thumbnail: 'https://via.placeholder.com/320x180',
      channel: 'React Pro',
      views: '500K views',
      timestamp: '3 days ago',
    },
    // Add more videos as needed
  ]

  return (
    <div className="min-h-screen bg-gray-900  text-white ">
      {/* Navbar */}
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">AlgoTube</h1>
          <button data-test-id="connect-wallet" className="btn btn-primary" onClick={toggleWalletModal}>
            {activeAddress ? 'Connected' : 'Connect Wallet'}
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {videos.map((video) => (
            <div key={video.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
              <img src={video.thumbnail} alt={video.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="font-bold text-lg">{video.title}</h2>
                <p className="text-sm text-gray-400">{video.channel}</p>
                <p className="text-sm text-gray-400">
                  {video.views} • {video.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modals */}
      <ConnectWallet openModal={openWalletModal} closeModal={toggleWalletModal} />
      <Transact openModal={openDemoModal} setModalState={setOpenDemoModal} />
      <AppCalls openModal={appCallsDemoModal} setModalState={setAppCallsDemoModal} />
    </div>
  )
}

export default Home