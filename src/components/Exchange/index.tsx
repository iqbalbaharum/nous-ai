import TypographyNormal from 'components/Typography/Normal'
import { Nft } from 'lib'
import { NousNft } from 'lib/NousNft'

interface Prop {
  nft: Nft & NousNft
  index: number
  onSelectedIndex: number
  onClickHandler: (index: number) => void
}

const ExchangeCard = (prop: Prop) => {
  return (
    <div
      onClick={() => prop.onClickHandler(prop.index)}
      className={`lg:w-4/5 border relative ring-2 border-slate-600 p-2 py-2 flex justify-between items-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] ${
        prop.onSelectedIndex === prop.index
          ? 'left-5 ring-white/90 from-yellow-500 to-yellow-600'
          : 'ring-white/80 from-blue-500 to-blue-700'
      }`}
    >
      <div className="flex gap-2">
        <img
          src={prop.nft.metadata.image}
          alt={prop.nft.metadata.name}
          className="h-12 object-cover ring-1 ring-blue-900"
        />
        <div className="flex flex-col justify-center">
          <TypographyNormal>{prop.nft.metadata.name}</TypographyNormal>
          <TypographyNormal classNames="uppercase font-bold text-yellow-300">38 subscribers</TypographyNormal>
        </div>
      </div>
      <div>
        <TypographyNormal classNames="uppercase font-bold text-yellow-300">0.06 ETH</TypographyNormal>
      </div>
    </div>
  )
}

export default ExchangeCard
