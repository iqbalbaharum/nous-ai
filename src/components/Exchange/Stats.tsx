import TypographyNormal from 'components/Typography/Normal'

const ExchangeStats = () => {
  return (
    <>
      <div className="flex items-center justify-between gap-5 px-2 pt-2">
        <div className="flex flex-col">
          <TypographyNormal classNames="text-right uppercase text-sm text-yellow-400 font-semibold tracking-wider">
            SUBSCRIBE VALUE
          </TypographyNormal>
          <TypographyNormal classNames="uppercase text-lg text-white text-right">0 ETH</TypographyNormal>
        </div>
        <div className="flex flex-col">
          <TypographyNormal classNames="text-right uppercase text-sm text-yellow-400 font-semibold tracking-wider">
            REFERALL COUNT
          </TypographyNormal>
          <div className="text-right flex items-center gap-3 justify-end">
            <TypographyNormal classNames="uppercase text-lg text-white">0</TypographyNormal>
          </div>
        </div>
        <div className="flex flex-col">
          <TypographyNormal classNames="text-right uppercase text-sm text-yellow-400 font-semibold tracking-wider">
            CODE
          </TypographyNormal>
          <div className="text-right flex items-center gap-3 justify-end cursor-pointer" onClick={() => {}}>
            <TypographyNormal classNames="uppercase text-lg text-white">NOUS-8FprT...</TypographyNormal>
          </div>
        </div>
      </div>
    </>
  )
}

export default ExchangeStats
