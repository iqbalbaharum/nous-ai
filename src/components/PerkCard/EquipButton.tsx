import { useBoundStore, useNousStore } from 'store'
import { Perk } from 'lib/Perk'
import useEquipPerk from 'hooks/useEquip'
import GenericButton from 'components/Button/GenericButton'

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
        <GenericButton name={!isLoading ? `Equip` : `Processing`} onClick={onHandleEquip} />
      </div>
    </div>
  )
}

export default EquipButton
