import TypographyNormal from 'components/Typography/Normal'
import { Perk } from 'lib/Perk'
import PurchaseButton from 'components/PerkCard/PurchaseButton'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useNousStore } from 'store'
import { useEffect, useState } from 'react'
import EquipButton from './EquipButton'

interface Prop {
  perk: Perk
}

const PerkPrice = ({ price }: { price: String }) => {
  if (price === '0.0') {
    return 'FREE'
  } else {
    return `${price} ETH`
  }
}

const DisplayPerk = ({ perk }: Prop) => {
  const [isOwned, setIsOwned] = useState(false)

  const { selectedNous, ownedPerks } = useNousStore()

  useEffect(() => {
    if (ownedPerks.length > 0 && perk) {
      const isPerkIncluded = ownedPerks.some(ownedPerk => {
        return perk.id.toString() === ownedPerk?.id
      })

      setIsOwned(isPerkIncluded)
    }
  }, [ownedPerks, perk])
  return (
    <>
      <div className="m-3 h-full">
        <div className="bg-black/40 ring-1 ring-white backdrop-blur border border-blue-600 shadow-2xl h-full">
          <div className="p-4 bg-blue-500/70 border border-1 border-blue-600">
            <TypographyNormal>{perk.title}</TypographyNormal>
          </div>
          <div className="flex p-4 w-full">
            <div className="w-1/2 flex justify-center h-48">
              <img src={perk.banner as string} className="w-full object-scale-down" />
            </div>
            <div className="w-1/2 p-2">
              <div className="flex justify-end">
                <PerkPrice price={perk.price} />
              </div>
              <hr className="h-px bg-gray-700 border-0 w-full" />
              <div className="flex mt-2 gap-2">
                {perk && !isOwned && <PurchaseButton mintPrice={perk.price} perk={perk} />}
                {perk && isOwned && <EquipButton perkId={perk?.id as string} />}
              </div>
            </div>
          </div>
          <hr className="h-px bg-gray-700 border-0" />
          <div className="p-4 overflow-auto">
            <Markdown className="mt-1 text-sm text-gray-200" remarkPlugins={[remarkGfm]}>
              {perk.longDescription}
            </Markdown>
          </div>
          <div className="absolute uppercase right-1 bottom-1 text-xs px-1 text-blue-300">PERK VER. {perk.id}</div>
        </div>
      </div>
    </>
  )
}

export default DisplayPerk
