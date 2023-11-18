import PerkCard from 'components/PerkCard'
import DisplayPerk from 'components/PerkCard/DisplayPerk'
import PurchaseModal from 'components/PerkCard/Purchase'
import SelectNousModal from 'components/SelectNousModal'
import TypographyNormal from 'components/Typography/Normal'
import { Perk } from 'lib/Perk'
import { useEffect, useState } from 'react'
import { useGetPerks } from 'repositories/perk.repository'
import { useBoundStore, useNousStore } from 'store'

const PagePerks = () => {
  const [selectedPerkIndex, setSelectedPerkIndex] = useState(0)

  const { data: perks } = useGetPerks({
    first: 50,
    skip: 0,
  })

  const { selectedNous } = useNousStore()
  const { setModalState } = useBoundStore()

  const onHandlePerkClicked = (index: number) => {
    setSelectedPerkIndex(index)
  }

  useEffect(() => {
    if (!selectedNous) {
      // setModalState({ selectNous: { isOpen: true } })
    }
  }, [selectedNous, setModalState])
  return (
    <>
      <div className="flex w-full">
        <div className="w-1/2">
          <img src={selectedNous?.metadata.image} className="-z-10 h-48 w-48" />
          <div className="p-2 flex flex-col gap-4 overflow-scroll h-2/5 relative bottom-0 w-full -top-10 left-5">
            {perks &&
              perks.map((perk, index) => (
                <PerkCard
                  key={index}
                  perk={perk}
                  index={index}
                  onClickHandler={onHandlePerkClicked}
                  onSelectedIndex={selectedPerkIndex}
                />
              ))}
          </div>
        </div>
        <div className="w-1/2 h-[600px]">
          {perks && perks[selectedPerkIndex] && <DisplayPerk perk={perks[selectedPerkIndex]} />}
        </div>
      </div>
      <PurchaseModal />
      <SelectNousModal />
    </>
  )
}

export default PagePerks
