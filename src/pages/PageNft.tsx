import ChainName from 'components/ChainName'
import ShareDialog from 'components/ShareDialog'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { formatDataKey } from 'utils'
import { useApi } from 'hooks/use-api'
import { ChatIcon, DatabaseIcon } from 'components/Icons/icons'
import ViewKnowledgeModal from 'components/Modal/ViewKnowledge'
import { useBoundStore } from 'store'
import ApiKeyModal from 'components/Modal/ApiKeyModal'
import { useConnectedWallet } from 'hooks/use-connected-wallet'
import EncryptKnowledgeModal from 'components/Modal/EncryptKnowledge'
import { useGetLineageNousMetadata } from 'repositories/rpc.repository'
import useCheckAccess from 'hooks/useCheckRoomAccess'
import { useGetPerkByTokenId } from 'repositories/perk.repository'
import Avatar from 'components/Avatar'
import PerkCardNft from 'components/PerkCard/PerkCardNft'

const PageNft = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { rpc } = useApi()
  const { setModalState } = useBoundStore()
  const { address } = useConnectedWallet()

  const { nft } = location.state || {}

  const [nftKey, setNftKey] = useState('')
  // versions
  const [isDataLoaded, setIsDataLoaded] = useState(false)

  const { data: perks } = useGetPerkByTokenId(nft.token.id as number)
  const { data: bot_level } = useGetLineageNousMetadata(
    nftKey,
    'bot_level',
    import.meta.env.VITE_NOUS_DATA_PK as string,
    ''
  )

  const { data: badge } = useGetLineageNousMetadata(nftKey, 'badge', import.meta.env.VITE_NOUS_DATA_PK as string, '')

  const { hasAccess } = useCheckAccess({
    dataKey: nftKey,
    tokenId: nft?.token ? nft.token.id : '',
    walletAddress: address.full,
  })

  useEffect(() => {
    if (!nft) {
      navigate('/inventory')
    } else {
      setIsDataLoaded(true)
    }
  }, [nft, navigate, isDataLoaded, nftKey, rpc])

  const [shareDialogState, setShareDialogState] = useState({
    chainId: '',
    tokenAddress: '',
    tokenId: '',
    version: '',
    opened: false,
  })

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
    navigate(`/room/${nftKey}`)
  }

  const goToKnowledge = () => {
    setModalState({
      encryptKnowledge: {
        isOpen: true,
        token_id: `${nft.token_id}`,
        chain_id: import.meta.env.VITE_DEFAULT_CHAIN_ID,
        token_address: import.meta.env.VITE_NOUS_AI_NFT,
        version: '',
        knowledge: [],
      },
    })
  }

  return (
    <>
      {nft && (
        <div className="flex justify-center">
          <div className="block w-3/4">
            <div className="bg-[#181818] rounded p-4">
              <div className="flex">
                <div className="flex-auto w-1/4">
                  <Avatar
                    imgMain={nft.metadata.image}
                    imgBadge="https://nftstorage.link/ipfs/bafybeicuhj6enp3yuteueqyixian62xfs7wd5cr7dif6axxeicbyox6sbe"
                  />
                </div>
                <div className="flex-auto w-3/4 px-5">
                  <div className="">
                    <div className="text-2xl font-bold">{nft.metadata.name}</div>
                    <div className="mt-2">
                      {bot_level && bot_level.content?.level >= 0 && (
                        <span className="bg-green-400 p-1.5 px-3 text-black rounded-md uppercase text-xs">
                          Level {bot_level.content?.level}
                        </span>
                      )}
                      {!bot_level && (
                        <span className="bg-yellow-400 p-1.5 px-3 text-black rounded-md uppercase text-xs">
                          Not Activated
                        </span>
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-gray-400 text-sm my-2"></div>
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

                {bot_level && bot_level.content?.level > 0 && (
                  <button
                    className="bg-red-900 rounded-lg px-4 py-2 text-white w-full flex items-center justify-center text-center cursor-pointer border border-red-900 hover:border-white"
                    onClick={() => goToKnowledge()}
                  >
                    <div>
                      <DatabaseIcon />
                      <div className="text-sm mt-1">Knowledge</div>
                    </div>
                  </button>
                )}
              </div>
            </div>

            <div className="mt-5 bg-[#181818] rounded p-4">
              <div className="text-2xl font-semibold mb-4">Purchased Perks</div>
              <div className="grid gap-4 sm:grid-cols-4">
                {perks?.map((perk, index) => <PerkCardNft key={index} perk={perk} />)}
              </div>
              {perks && !perks.length && (
                <div className="text-center">
                  <div>You have not purchase any perks</div>
                  <button
                    className={`mt-2 group relative inline-block text-sm font-medium text-black focus:outline-none focus:ring active:text-gray-500`}
                    onClick={e => navigate('/perks')}
                  >
                    <span className="absolute rounded-md inset-0 translate-x-0.5 translate-y-0.5 bg-green-700 transition-transform group-hover:translate-y-0 group-hover:translate-x-0"></span>
                    <span className="flex rounded-md items-center relative border border-current bg-green-400 px-10 py-3">
                      Purchase Now
                    </span>
                  </button>
                </div>
              )}
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
      <EncryptKnowledgeModal />
    </>
  )
}

export default PageNft
