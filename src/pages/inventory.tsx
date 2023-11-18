import { useConnectedWallet } from 'hooks/use-connected-wallet'
import { useNavigate } from 'react-router-dom'
import { useGetNftByWalletAddress } from 'repositories/moralis.repository'
import { useGetOwnedNousMetadatas } from 'repositories/rpc.repository'
import { PlusIcon } from 'components/Icons/icons'
import { useNousStore } from 'store'
import { Nft } from 'lib'
import TypographyNormal from 'components/Typography/Normal'
import GenericButton from 'components/Button/GenericButton'
import { useEffect, useState } from 'react'
import Avatar from 'components/Avatar'

const PageInventory = () => {
  const [selectedNftIndex, setSelectedNftIndex] = useState(0)

  const navigate = useNavigate()
  const { address } = useConnectedWallet()
  const { setSelectedNous } = useNousStore()

  const { data: owned } = useGetNftByWalletAddress({
    address: address?.full,
    chain: import.meta.env.VITE_DEFAULT_CHAIN_NAME,
  })

  console.log(owned)
  const { data: nfts } = useGetOwnedNousMetadatas(address.full, owned?.map(el => `${el.token_id}`) ?? [])
  const goToMintPage = () => {
    navigate('/mint')
  }

  const onHandleNftClick = (index: number) => {
    setSelectedNftIndex(index)
  }

  const onHandleCustomizeClick = (nft: Nft) => {
    setSelectedNous(nft)
    navigate(`/nft`, { state: { nft } })
  }

  useEffect(() => {
    if (owned && owned.length <= 0) {
      navigate('/mint')
    }
  }, [navigate, owned])

  return (
    <div className="flex justify-center">
      <div className="w-full">
        <div className="h-full">
          <div className="p-4">
            <div className="flex justify-start gap-2">
              <GenericButton name="Mint Bot" onClick={goToMintPage} />
              <GenericButton name="Opensea" onClick={() => {}} />
            </div>
            <div className="grid gap-2 sm:grid-cols-1 md:grid-cols-2">
              <div className="w-full">
                <div className="mt-4 flex flex-col gap-2">
                  {nfts?.map((nft, index) => (
                    <div key={index} className="flex gap-2">
                      <div
                        onClick={() => onHandleNftClick(index)}
                        className={`backdrop-blur ring-2 ring-white border border-black cursor-pointer w-3/4 ${
                          index === selectedNftIndex ? 'bg-yellow-600' : 'bg-black/60'
                        }`}
                      >
                        {nft.metadata && (
                          <>
                            <div className="flex justify-between p-2">
                              <div className="flex flex-col justify-center">
                                <TypographyNormal>{nft.metadata.name}</TypographyNormal>
                                {nft.stat && (
                                  <TypographyNormal classNames="uppercase font-bold text-yellow-300">
                                    Level {nft.stat.level}
                                  </TypographyNormal>
                                )}
                                {!nft.stat && (
                                  <TypographyNormal classNames="uppercase font-bold text-yellow-300">
                                    Not activated
                                  </TypographyNormal>
                                )}
                              </div>
                              <img src={nft.metadata.image} alt={nft.metadata.name} className="h-12 object-cover" />
                            </div>
                          </>
                        )}
                      </div>
                      {selectedNftIndex === index && (
                        <GenericButton
                          name="Customize"
                          onClick={() => onHandleCustomizeClick(nfts[selectedNftIndex])}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-center justify-center">
                {nfts && nfts[selectedNftIndex] && (
                  <>
                    <Avatar
                      imgMain={nfts[selectedNftIndex].metadata.image}
                      imgBadge={nfts[selectedNftIndex].achievement?.badge}
                      className="h-96 w-96"
                      badgeSize="24"
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageInventory
