import GenericButton from 'components/Button/GenericButton'
import TypographyNormal from 'components/Typography/Normal'
import SubscribePrice from './SubscribePrice'
import QuantityInput from 'components/QuantityInput'
import { useEffect, useState } from 'react'
import { Nft } from 'lib'
import { NousNft } from 'lib/NousNft'
import useSubscription from './hooks/useSubscription'
import useGetBuyPrice from './hooks/useGetBuyPrice'

interface Prop {
  nft: Nft & NousNft
  currentKeyCount: number
}

const SubscribeButton = (prop: Prop) => {
  const [subscribeCount, setSubscribeCount] = useState(0)

  const { subscribe } = useSubscription()
  const { buyPrice } = useGetBuyPrice({ tokenId: prop.nft.token_id as string, amount: subscribeCount })

  const onClickSubscribe = () => {
    subscribe(prop.nft.token_id as string, subscribeCount).catch(console.log)
  }

  useEffect(() => {
    if (prop.nft.token_id) {
      setSubscribeCount(0)
    }
  }, [prop.nft.token_id])

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex flex-col text-center justify-center gap-1">
        <TypographyNormal classNames="text-green-400 text-md font-semibold tracking-wider uppercase">
          <SubscribePrice count={buyPrice} /> ETH
        </TypographyNormal>
        <QuantityInput input={subscribeCount} setInput={setSubscribeCount} />
      </div>
      <GenericButton name="Subscribe" onClick={onClickSubscribe} />
    </div>
  )
}

export default SubscribeButton
