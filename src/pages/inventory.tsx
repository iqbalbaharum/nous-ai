import { useConnectedWallet } from 'hooks/use-connected-wallet'
import { useNavigate } from 'react-router-dom'
import { useGetOwnedNousMetadatas } from 'repositories/rpc.repository'
import { useNousStore } from 'store'
import { Nft } from 'lib'
import TypographyNormal from 'components/Typography/Normal'
import GenericButton from 'components/Button/GenericButton'
import { useEffect, useState } from 'react'
import Avatar from 'components/Avatar'
import { useInView } from 'react-intersection-observer'

const PageInventory = () => {
  const [selectedNftIndex, setSelectedNftIndex] = useState(0)

  const navigate = useNavigate()
  const { address } = useConnectedWallet()
  const { setSelectedNous } = useNousStore()

  const { ref, inView } = useInView()
  const { data, fetchNextPage } = useGetOwnedNousMetadatas(address.full, 20)
  const nfts = data?.pages?.flatMap(group => group.data)

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
    if (inView) fetchNextPage()
  }, [fetchNextPage, inView])

  useEffect(() => {
    if (nfts && nfts.length <= 0) {
      navigate('/mint')
    }
  }, [navigate, nfts])

  return (
    <div className="flex justify-center">
      <div className="w-full">
        <div className="h-full">
          <div className="p-4">
            <div className="flex justify-start gap-2">
              <GenericButton name="Mint Nous Psyche" className="text-xs lg:text-sm" onClick={goToMintPage} />
              <GenericButton
                name="Opensea"
                color="blue"
                className="text-xs lg:text-sm"
                textColor="text-blue-600"
                onClick={() => window.open('https://opensea.io/collection/thenouspsyche', '_blank')}
              />
            </div>
            <div className="grid gap-2 sm:grid-cols-1 md:grid-cols-2">
              <div className="w-full">
                <div className="mt-4 flex items-center gap-2 py-4 md:py-0 w-full">
                  {nfts?.map((nft, index) => (
                    <div key={index} className="flex gap-2 items-center w-full">
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
                                <TypographyNormal classNames="text-xs lg:text-sm">{nft.metadata.name}</TypographyNormal>
                                {nft.stat && nft.stat.level && (
                                  <TypographyNormal classNames="uppercase font-bold text-yellow-300">
                                    Level {nft.stat.level}
                                  </TypographyNormal>
                                )}
                                {nft.stat && !nft.stat.level && (
                                  <TypographyNormal classNames="uppercase font-bold text-yellow-300 text-sm lg:text-[16px]">
                                    Not activated
                                  </TypographyNormal>
                                )}
                              </div>
                              <img src={nft.metadata.image} alt={nft.metadata.name} className="h-12 object-cover" />
                            </div>
                          </>
                        )}
                      </div>
                      <div>
                        {selectedNftIndex === index && (
                          <GenericButton
                            name="Customize"
                            className="text-xs py-6 lg:text-sm"
                            onClick={() => onHandleCustomizeClick(nfts[selectedNftIndex])}
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-center justify-center mt-4">
                {nfts && nfts[selectedNftIndex] && (
                  <>
                    <Avatar
                      imgMain={nfts[selectedNftIndex].metadata.image}
                      imgBadge={nfts[selectedNftIndex].achievement?.badge}
                      className="h-62 w-62 md:h-56 md:w-56 lg:h-96 lg:w-96"
                      badgeSize="20"
                    />
                  </>
                )}
              </div>
              <p ref={ref} className="opacity-0">
                Observe this
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageInventory
