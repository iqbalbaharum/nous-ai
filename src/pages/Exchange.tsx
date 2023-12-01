import GenericButton from 'components/Button/GenericButton'
import ExchangeCard from 'components/Exchange'
import ExchangeBuyDialog from 'components/Exchange/BuyDialog'
import DisplayExchange from 'components/Exchange/DisplayExchange'
import ExchangeNotAllowed from 'components/Exchange/NotAllowed'
import ReferralBox from 'components/Exchange/Referral'
import ExchangeSellDialog from 'components/Exchange/SellDialog'
import ExchangeStats from 'components/Exchange/Stats'
import useAllowedList from 'components/Exchange/hooks/useAllowedList'
import useCheckAllowedList from 'components/Exchange/hooks/useIsAllowed'
import { DownArrow, UpArrow } from 'components/Icons/misc'
import { OpenseaIcon } from 'components/Icons/socials'
import ScrollController from 'components/ScrollController'
import TypographyNormal from 'components/Typography/Normal'
import { useConnectedWallet } from 'hooks/use-connected-wallet'
import { useRef, useState } from 'react'
import { useGetAllBots } from 'repositories/rpc.repository'

const PageExchange = () => {
  const [selectedNftIndex, setSelectedNftIndex] = useState(0)
  const scrollContainerRef = useRef(null)

  const { address } = useConnectedWallet()

  const { isAllowed } = useAllowedList({ address: address?.full })

  const { data: bots } = useGetAllBots(50, 0)

  const onSelectedIndex = (index: number) => {
    setSelectedNftIndex(index)
  }

  return (
    <>
      <div className="w-full md:flex">
        {isAllowed && (
          <>
            <div className="flex-initial w-full md:w-1/2 p-2">
              <div className="bg-blue-600/80 backdrop-blur ring ring-white">
                <ExchangeStats />
                <hr className="my-2" />
                <div className="flex gap-2 mb-2 px-2 pb-2">
                  {/* <GenericButton icon={<OpenseaIcon enabled />} onClick={() => {}} />
                  <GenericButton icon={<OpenseaIcon enabled />} onClick={() => {}} />
                  <input className="p-2 text-black" /> */}
                </div>
              </div>
              <div className="relative">
                <div className="w-full flex flex-col gap-2 h-[400px] overflow-auto p-2" ref={scrollContainerRef}>
                  {bots &&
                    bots.map((nft, index) => (
                      <ExchangeCard
                        key={index}
                        nft={nft}
                        onSelectedIndex={selectedNftIndex}
                        index={index}
                        onClickHandler={onSelectedIndex}
                      />
                    ))}
                </div>
                {bots && bots.length > 3 && <ScrollController targetRef={scrollContainerRef} />}
              </div>
            </div>
            <div className="p-2 w-full md:w-1/2 lg:h-[600px]">
              {bots && <DisplayExchange nft={bots[selectedNftIndex]} />}
            </div>
          </>
        )}
        {!isAllowed && <ExchangeNotAllowed />}
        <ReferralBox />
        <ExchangeBuyDialog />
        <ExchangeSellDialog />
      </div>
    </>
  )
}

export default PageExchange
