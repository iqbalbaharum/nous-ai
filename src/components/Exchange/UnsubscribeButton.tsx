import GenericButton from 'components/Button/GenericButton'
import TypographyNormal from 'components/Typography/Normal'
import SubscribePrice from './SubscribePrice'
import { useEffect, useState } from 'react'
import QuantityInput from 'components/QuantityInput'
import { Nft } from 'lib'
import { NousNft } from 'lib/NousNft'
import useGetSellPrice from './hooks/useGetSellPrice'
import useSubscription from './hooks/useSubscription'

interface Prop {
  nft: Nft & NousNft
  currentKeyCount: number
}

const UnsubscribeButton = (prop: Prop) => {
  const [subscribeCount, setSubscribeCount] = useState(prop.currentKeyCount)

  const { unsubscribe } = useSubscription()
  const { sellPrice } = useGetSellPrice({ tokenId: prop.nft.token_id as string, amount: subscribeCount })

  const onClickUnsubscribe = () => {
    unsubscribe(prop.nft.token_id as string, subscribeCount).catch(console.log)
  }

  useEffect(() => {
    if (prop.nft.token_id) {
      setSubscribeCount(0)
    }
  }, [prop.nft.token_id])

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex flex-col text-center justify-center gap-1">
        <TypographyNormal classNames="text-red-400 text-md font-semibold tracking-wider uppercase">
          <SubscribePrice count={sellPrice} /> ETH
        </TypographyNormal>
        <QuantityInput input={subscribeCount} setInput={setSubscribeCount} />
      </div>
      <GenericButton name="Unsubscribe" onClick={onClickUnsubscribe} />
    </div>
  )
}

export default UnsubscribeButton
