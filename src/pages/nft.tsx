import ChainName from 'components/ChainName'
import ShareDialog from 'components/ShareDialog'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { convertSnakeToCamelCase, formatDataKey } from 'utils'
import { Metadata } from 'lib'
import { useApi } from 'hooks/use-api'
import { AccessKeyIcon, ChatIcon, DatabaseIcon } from 'components/Icons/icons'
import { useLitProtocol } from 'hooks/use-lit-protocol'
import ViewKnowledgeModal from 'components/Modal/ViewKnowledge'
import { useBoundStore } from 'store'
import { AccessControlConditions } from '@lit-protocol/types'
import { useAlertMessage } from 'hooks/use-alert-message'
import ApiKeyModal from 'components/Modal/ApiKeyModal'
import { useConnectedWallet } from 'hooks/use-connected-wallet'

const PageNft = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { rpc } = useApi()
  const { setModalState } = useBoundStore()
  const { showError } = useAlertMessage()
  const { address, signMessage } = useConnectedWallet()

  const { nft } = location.state || {}

  const [nftKey, setNftKey] = useState('')
  // versions
  const [isDataLoaded, setIsDataLoaded] = useState(false)

  useEffect(() => {
    const loadVersion = async () => {
      const nftKey = formatDataKey(nft.chain_id as String, nft.address as String, nft.token_id as String)

      const response = await rpc.getMetadataUseKeyByBlock(nftKey, import.meta.env.VITE_META_CONTRACT_ID as String, '')

      const metadatas = response?.data?.result?.metadatas as Metadata[]

      const uniqueVersions: String[] = []
      metadatas?.map(item => {
        if (!uniqueVersions.includes(item.version)) {
          uniqueVersions.push(item.version)
        }
      })

      setIsDataLoaded(true)
    }

    if (!nft) {
      navigate('/inventory')
    }

    if (nft && !isDataLoaded && !nftKey) {
      loadVersion()
    }
  }, [nft, navigate, isDataLoaded, nftKey, rpc])

  const [shareDialogState, setShareDialogState] = useState({
    chainId: '',
    tokenAddress: '',
    tokenId: '',
    version: '',
    opened: false,
  })

  const { decrypt } = useLitProtocol()

  // init
  useEffect(() => {
    const init = () => {
      const key = formatDataKey(nft.chain_id, nft.token_address, nft.token_id)
      setNftKey(key)
    }

    if (nft && !nftKey) {
      init()
    }
  }, [nft, nftKey])

  const goToChatroom = () => {
    if (!nftKey) return
    navigate(`/room/${nftKey}/${nft.token_id}`)
  }

  const goToKnowledge = async () => {
    if (!nft?.lit_protocol) return
    const { encrypted_string, encrypted_symmetric_key, access_control_conditions } = nft.lit_protocol
    const accessControlConditions = convertSnakeToCamelCase(access_control_conditions) as AccessControlConditions
    try {
      const decrypted = await decrypt({
        accessControlConditions,
        encryptedString: encrypted_string,
        encryptedSymmetricKey: encrypted_symmetric_key,
      })

      if (decrypted) {
        setModalState({ viewKnowledge: { isOpen: true, url: decrypted } })
      } else {
        showError('No available data')
      }
    } catch (e) {
      showError('Unauthorized')
    }
  }

  const goToKey = async () => {
    if (!address.full) {
      showError('Unauthorized')
      return
    }

    const content = 'Hi'
    try {
      const signature = (await signMessage(content)) as string
      setModalState({ apiKey: { isOpen: true, key: `/register ${signature}/${nft.token_id}` } })
    } catch (e) {
      showError(`${e}`)
    }
  }

  return (
    <>
      {nft && (
        <div className="flex justify-center">
          <div className="block w-3/4">
            <div className="bg-[#181818] rounded p-4">
              <div className="flex">
                <div className="flex-auto w-1/4">
                  <img src={nft.metadata.image} className="rounded-lg bg-white w-full h-full" />
                </div>
                <div className="flex-auto w-3/4 px-5">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold">{nft.metadata.name}</span>
                  </div>
                  <div>
                    <div className="flex justify-between text-gray-400 text-sm my-2">
                      <div className="">
                        Address: {import.meta.env.VITE_NOUS_AI_NFT} <span className="mx-3">&#8226;</span> #
                        {nft.token_id}
                        <span className="mx-3">&#8226;</span>{' '}
                        <ChainName chainId={import.meta.env.VITE_DEFAULT_CHAIN_ID} />
                      </div>
                    </div>
                    <p className="">{nft.metadata.description}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 bg-[#181818] rounded p-4">
              <div className="text-2xl font-semibold mb-4">Tools</div>
              <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-4">
                <button
                  className="bg-red-900 rounded-lg px-4 py-2 text-white w-full flex items-center justify-center cursor-pointer border border-red-900 hover:border-white"
                  onClick={() => goToChatroom()}
                >
                  <div className="block text-left">
                    <ChatIcon />
                    <div className="text-sm mt-1">Chat</div>
                  </div>
                </button>
                <button
                  className="bg-red-900 rounded-lg px-4 py-2 text-white w-full flex items-center justify-center text-center cursor-pointer border border-red-900 hover:border-white"
                  onClick={() => goToKnowledge()}
                >
                  <div>
                    <DatabaseIcon />
                    <div className="text-sm mt-1">Knowledge</div>
                  </div>
                </button>
                <button
                  className="bg-red-900 rounded-lg px-4 py-2 text-white w-full flex items-center justify-center text-center cursor-pointer border border-red-900 hover:border-white"
                  onClick={() => goToKey()}
                >
                  <div>
                    <AccessKeyIcon />
                    <div className="text-sm mt-1">API Key</div>
                  </div>
                </button>
              </div>
            </div>

            <div className="mt-5 bg-[#181818] rounded p-4">
              <div className="text-2xl font-semibold mb-4">Bots</div>
              <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-6">
                <button
                  className="bg-red-900 rounded-lg px-4 py-2 text-white w-full flex items-center justify-center cursor-pointer border border-red-900 hover:border-white"
                  onClick={() => goToChatroom()}
                >
                  <div className="block text-left">
                    <div className="text-sm mt-1">Telegram</div>
                  </div>
                </button>
                <button
                  className="bg-red-900 rounded-lg px-4 py-2 text-white w-full flex items-center justify-center text-center cursor-pointer border border-red-900 hover:border-white"
                  onClick={() => goToKnowledge()}
                >
                  <div>
                    <div className="text-sm mt-1">Discord</div>
                  </div>
                </button>
              </div>
            </div>

            <ViewKnowledgeModal />
            <ApiKeyModal />

            {shareDialogState.opened && (
              <ShareDialog
                chainId={shareDialogState.chainId}
                tokenAddress={shareDialogState.tokenAddress}
                tokenId={shareDialogState.tokenId}
                version={shareDialogState.version}
                onHandleCloseClicked={() =>
                  setShareDialogState({
                    chainId: '',
                    tokenAddress: '',
                    tokenId: '',
                    version: '',
                    opened: false,
                  })
                }
              />
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default PageNft
