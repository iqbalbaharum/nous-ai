import Avatar from 'components/Avatar'
import TypographyNormal from 'components/Typography/Normal'
import { Nft } from 'lib'
import { NousNft } from 'lib/NousNft'
import SubscribeButton from './SubscribeButton'
import UnsubscribeButton from './UnsubscribeButton'
import GoToDappButton from './GoDapp'
import { useState } from 'react'
import SubscribePrice from './SubscribePrice'
import ExchangeTransaction from './Transactions'

interface Prop {
  nft: Nft & NousNft & { dataKey: string }
}

const DisplayExchange = (prop: Prop) => {
  return (
    <div className="h-full">
      <div className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500 to-blue-700/60 ring-2 ring-white backdrop-blur border border-blue-600 shadow-2xl h-full">
        <div className="px-4 py-3 bg-blue-500/70 border-b border-blue-600 flex justify-between items-center">
          <TypographyNormal classNames="">{prop.nft.metadata.name}</TypographyNormal>
        </div>
        <div className="flex justify-between px-4 items-center py-2">
          <TypographyNormal classNames="text-orange-400 font-semibold text-lg tracking-wider uppercase">
            30 subscriber
          </TypographyNormal>
        </div>
        <hr className="h-px bg-blue-800 border-0 w-full" />
        <div className="flex gap-2 p-4 items-center bg-blue-800/60">
          <div className="w-1/2 border-r border-blue-800/60">
            <SubscribeButton nft={prop.nft} />
          </div>
          <div className="flex-auto">
            <UnsubscribeButton nft={prop.nft} />
          </div>
        </div>
        <hr className="h-px bg-blue-800 border-0 w-full" />
        <div className="flex gap-2 p-4 justify-start bg-blue-800/60">
          <GoToDappButton dataKey={prop.nft.dataKey} />
        </div>
        <hr className="h-px bg-blue-800 border-0 w-full" />
        <ExchangeTransaction />
      </div>
    </div>
  )
}

export default DisplayExchange
