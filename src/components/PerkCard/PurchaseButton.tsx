import { useBoundStore, useNousStore } from 'store'
import useIsWhitelisted from './hook/useIsWhitelist'
import usePurchasePerk from './hook/usePurchasePerk'
import { Perk } from 'lib/Perk'
import { useAlertMessage } from 'hooks/use-alert-message'

interface Prop {
  perk: Perk
  mintPrice: String
}

const PurchaseButton = (prop: Prop) => {
  const { purchasePerk, isLoading, error } = usePurchasePerk({
    perk: prop.perk,
    mintPrice: prop.mintPrice,
  })

  const { isWhitelistedForPerk } = useIsWhitelisted({
    perkId: prop.perk.id,
  })

  const { selectedNous } = useNousStore()
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
      console.log(error)
    }
  }

  return (
    <div className="">
      {error && <div className="text-xs text-red-500 py-2">{error}</div>}
      <button
        onClick={onHandlePurchase}
        className="relative px-5 py-3 overflow-hidden font-medium text-gray-600 bg-white border border-gray-100 shadow-inner group"
      >
        <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-100 border-t-2 border-gray-600 group-hover:w-full ease"></span>
        <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-100 border-b-2 border-gray-600 group-hover:w-full ease"></span>
        <span className="absolute top-0 left-0 w-full h-0 transition-all duration-100 delay-200 bg-gray-600 group-hover:h-full ease"></span>
        <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-100 delay-200 bg-gray-600 group-hover:h-full ease"></span>
        <span className="absolute inset-0 w-full h-full duration-100 delay-300 bg-gray-900 opacity-0 group-hover:opacity-100"></span>
        <span className="relative transition-colors duration-100 delay-200 group-hover:text-white ease">
          {!isLoading && <span>Purchase</span>}
          {isLoading && <span>Processing...</span>}
        </span>
      </button>
    </div>
  )
}

export default PurchaseButton
