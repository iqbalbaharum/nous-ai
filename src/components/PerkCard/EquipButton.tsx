import { useBoundStore, useNousStore } from 'store'
import { Perk } from 'lib/Perk'
import useEquipPerk from 'hooks/useEquip'

interface Prop {
  perkId: string
}

const EquipButton = (prop: Prop) => {
  const { selectedNous } = useNousStore()
  const { setModalState } = useBoundStore()

  const { equipPerk, isLoading, error } = useEquipPerk({
    perkId: prop.perkId,
    tokenId: selectedNous?.token_id as string,
  })

  const onHandleEquip = async () => {
    try {
      await equipPerk()
      setModalState({ purchasePerk: { isOpen: false, perk: undefined } })
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className="w-full">
      <div className="">
        <button
          onClick={onHandleEquip}
          className="relative px-5 py-3 overflow-hidden font-medium text-gray-600 bg-white border border-gray-100 shadow-inner group"
        >
          <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-100 border-t-2 border-gray-600 group-hover:w-full ease"></span>
          <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-100 border-b-2 border-gray-600 group-hover:w-full ease"></span>
          <span className="absolute top-0 left-0 w-full h-0 transition-all duration-100 delay-200 bg-gray-600 group-hover:h-full ease"></span>
          <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-100 delay-200 bg-gray-600 group-hover:h-full ease"></span>
          <span className="absolute inset-0 w-full h-full duration-100 delay-300 bg-gray-900 opacity-0 group-hover:opacity-100"></span>
          <span className="relative transition-colors duration-100 delay-200 group-hover:text-white ease">
            {!isLoading && <span>Equip</span>}
            {isLoading && <span>Processing...</span>}
          </span>
        </button>
      </div>
    </div>
  )
}

export default EquipButton
