import { useBoundStore, useNousStore } from 'store'
import useIsWhitelisted from './hook/useIsWhitelist'
import usePurchasePerk from './hook/usePurchasePerk'
import { Perk } from 'lib/Perk'
import { useAlertMessage } from 'hooks/use-alert-message'
import GenericButton from 'components/Button/GenericButton'
import TypographyNormal from 'components/Typography/Normal'
import { useEffect } from 'react'

interface Prop {
  perk: Perk
  mintPrice: String
  onReceivedError: (error: string) => void
}

const PurchaseButton = (prop: Prop) => {
  const { purchasePerk, isLoading, error } = usePurchasePerk({
    perk: prop.perk,
    mintPrice: prop.mintPrice,
  })

  const { isWhitelistedForPerk } = useIsWhitelisted({
    perkId: prop.perk.id,
  })

  const { setModalState } = useBoundStore()
  const { showSuccess } = useAlertMessage()

  const onHandlePurchase = async () => {
    if (isLoading) {
      return
    }
    try {
      await purchasePerk()
      setModalState({ purchasePerk: { isOpen: false, perk: undefined } })
    } catch (e) {
      if (error) {
        prop.onReceivedError(error)
      }
      console.log(error)
    }
  }

  return (
    <div className="">
      <GenericButton name={(!isLoading ? `Purchase` : `Processing`) as string} onClick={onHandlePurchase} />
    </div>
  )
}

export default PurchaseButton
