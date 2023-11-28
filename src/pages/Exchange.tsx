import { Listbox } from '@headlessui/react'
import GenericButton from 'components/Button/GenericButton'
import ExchangeCard from 'components/Exchange'
import DisplayExchange from 'components/Exchange/DisplayExchange'
import ExchangeNotAllowed from 'components/Exchange/NotAllowed'
import ExchangeStats from 'components/Exchange/Stats'
import useCheckAllowedList from 'components/Exchange/hooks/useIsAllowed'
import { CopyIcon, PlayIcon } from 'components/Icons/icons'
import { OpenseaIcon } from 'components/Icons/socials'
import TypographyNormal from 'components/Typography/Normal'
import { useState } from 'react'
import { useGetAllBots } from 'repositories/rpc.repository'

const PageExchange = () => {
  const [selectedNftIndex, setSelectedNftIndex] = useState(0)

  const { isAllowed } = useCheckAllowedList()

  const { data: bots } = useGetAllBots(50, 0)

  const onSelectedIndex = (index: number) => {
    setSelectedNftIndex(index)
  }

  return (
    <>
      <div className="w-full flex">
        {isAllowed && (
          <>
            <div className="flex-initial w-1/2 p-2">
              <div className="bg-blue-600/80 backdrop-blur ring ring-white">
                <ExchangeStats />
                <hr className="my-2" />
                <div className="flex gap-2 mb-2 px-2 pb-2">
                  <GenericButton icon={<OpenseaIcon enabled />} onClick={() => {}} />
                  <GenericButton icon={<OpenseaIcon enabled />} onClick={() => {}} />
                  <input className="p-2 text-black" />
                </div>
              </div>
              <div className="w-full flex flex-col gap-2 h-[400px] overflow-auto p-2">
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
            </div>
            <div className="p-2 w-1/2 lg:h-[600px]">{bots && <DisplayExchange nft={bots[selectedNftIndex]} />}</div>
          </>
        )}
        {!isAllowed && <ExchangeNotAllowed />}
      </div>
    </>
  )
}

export default PageExchange
