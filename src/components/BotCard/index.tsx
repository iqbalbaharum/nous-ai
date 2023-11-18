import TypographyNormal from 'components/Typography/Normal'
import { NftMetadata } from 'lib'

interface Prop {
  dataKey: string
  metadata: NftMetadata
}

const BotCard = ({ metadata }: Prop) => {
  return (
    <div>
      <div className="group relative block overflow-hidden ring-2 ring-white bg-black/50">
        <div>
          <h3 className="absolute end-4 bottom-4 z-10 text-md font-medium truncate text-white">
            <TypographyNormal>{metadata.name}</TypographyNormal>
          </h3>

          <img
            src={metadata.image}
            alt={metadata.name}
            className="h-56 w-full object-cover transition duration-500 scale-150"
          />
        </div>
      </div>
    </div>
  )
}

export default BotCard
