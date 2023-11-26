import BotCard from 'components/BotCard'
import ExchangeCard from 'components/Exchange'
import DisplayExchange from 'components/Exchange/DisplayExchange'
import TypographyNormal from 'components/Typography/Normal'
import { useState } from 'react'
import { useGetAllBots } from 'repositories/rpc.repository'

const PageExchange = () => {
  const [selectedNftIndex, setSelectedNftIndex] = useState(0)

  const { data: bots } = useGetAllBots(50, 0)

  const onSelectedIndex = (index: number) => {
    setSelectedNftIndex(index)
  }

  return (
    <>
      <div className="w-full flex">
        <div className="flex-initial w-1/2 p-2">
          <div className="w-full flex flex-col gap-2 h-screen">
            {bots &&
              bots.map((nft, index) => (
                <ExchangeCard
                  nft={nft}
                  onSelectedIndex={selectedNftIndex}
                  index={index}
                  onClickHandler={onSelectedIndex}
                />
              ))}
          </div>
        </div>
        <div className="p-2 w-1/2 lg:h-[600px]">{bots && <DisplayExchange nft={bots[selectedNftIndex]} />}</div>
      </div>
    </>
  )
}

export default PageExchange
