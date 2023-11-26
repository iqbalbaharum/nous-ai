import GenericButton from 'components/Button/GenericButton'
import TypographyNormal from 'components/Typography/Normal'
import SubscribePrice from './SubscribePrice'
import QuantityInput from 'components/QuantityInput'
import { useEffect, useState } from 'react'
import { Nft } from 'lib'
import { NousNft } from 'lib/NousNft'

interface Prop {
  nft: Nft & NousNft
}

const SubscribeButton = (prop: Prop) => {
  const [subscribeCount, setSubscribeCount] = useState(0)

  useEffect(() => {
    if (prop.nft.token_id) {
      setSubscribeCount(0)
    }
  }, [prop.nft.token_id])
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex flex-col text-center justify-center gap-1">
        <TypographyNormal classNames="text-green-400 text-2xl font-semibold tracking-wider uppercase">
          <SubscribePrice count={subscribeCount} /> ETH
        </TypographyNormal>
        <QuantityInput input={subscribeCount} setInput={setSubscribeCount} />
      </div>
      <GenericButton name="Subscribe" onClick={() => {}} />
    </div>
  )
}

export default SubscribeButton
