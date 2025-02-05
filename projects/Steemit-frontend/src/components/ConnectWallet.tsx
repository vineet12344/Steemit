import { Provider, useWallet } from '@txnlab/use-wallet'
import { CardBody, CardContainer } from '../components/ui/3d-card'

interface ConnectWalletInterface {
  openModal: boolean
  closeModal: () => void
}

const ConnectWallet = ({ openModal, closeModal }: ConnectWalletInterface) => {
  const { providers, activeAddress, activeNetwork } = useWallet()

  const isKmd = (provider: Provider) => provider.metadata.name.toLowerCase() === 'kmd'

  return (
    <dialog id="connect_wallet_modal" className={`modal ${openModal ? 'modal-open' : ''}`}>
      <form method="dialog" className="bg-transparent modal-box p-0 border-0 shadow-none">
        <CardContainer className="inter-var w-full">
          <CardBody className="bg-transparent relative dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full sm:w-[30rem] h-auto rounded-xl p-6 border">
            <h3 className="text-black dark:text-white font-bold text-2xl mb-4">Select Wallet Provider</h3>

            <div className="grid gap-4">
              {activeAddress && (
                <>
                  <div className="bg-transparent dark:bg-gray-800 p-4 rounded-lg border shadow-md">
                    <p className="text-gray-600 dark:text-white font-medium">Connected Address:</p>
                    <p className="text-gray-900 dark:text-emerald-400 font-mono break-all overflow-x-auto">{activeAddress}</p>
                    <p className="text-gray-600 dark:text-white font-medium mt-2">Network:</p>
                    <p className="text-gray-900 dark:text-emerald-400 font-mono">{activeNetwork || 'Unknown'}</p>
                  </div>
                  <div className="divider" />
                </>
              )}

              {!activeAddress &&
                providers?.map((provider) => (
                  <button
                    data-test-id={`${provider.metadata.id}-connect`}
                    className="btn flex items-center gap-2 border-teal-800 border-1 bg-white dark:bg-gray-900 dark:text-white p-3 rounded-lg hover:bg-teal-100 dark:hover:bg-gray-800 transition-all"
                    key={`provider-${provider.metadata.id}`}
                    onClick={() => provider.connect()}
                  >
                    {!isKmd(provider) && (
                      <img alt={`wallet_icon_${provider.metadata.id}`} src={provider.metadata.icon} className="w-6 h-6 object-contain" />
                    )}
                    <span>{isKmd(provider) ? 'LocalNet Wallet' : provider.metadata.name}</span>
                  </button>
                ))}
            </div>

            <div className="modal-action flex justify-between mt-6">
              <button
                data-test-id="close-wallet-modal"
                className="btn bg-gray-500 dark:bg-gray-700 text-white px-4 py-2 rounded-lg"
                onClick={closeModal}
              >
                Close
              </button>
              {activeAddress && (
                <button
                  className="btn bg-red-500 text-white px-4 py-2 rounded-lg"
                  data-test-id="logout"
                  onClick={() => {
                    if (providers) {
                      const activeProvider = providers.find((p) => p.isActive)
                      if (activeProvider) {
                        activeProvider.disconnect()
                      } else {
                        localStorage.removeItem('txnlab-use-wallet')
                        window.location.reload()
                      }
                    }
                  }}
                >
                  Logout
                </button>
              )}
            </div>
          </CardBody>
        </CardContainer>
      </form>
    </dialog>
  )
}

export default ConnectWallet
