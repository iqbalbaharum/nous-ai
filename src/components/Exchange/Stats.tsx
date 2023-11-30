import TypographyNormal from 'components/Typography/Normal'
import useReferralCode from './hooks/useReferralCode'
import GenericButton from 'components/Button/GenericButton'
import { useBoundStore } from 'store'

const ExchangeStats = () => {
  const { setModalState } = useBoundStore()

  return (
    <>
      <div className="flex items-center justify-between gap-5 px-2 pt-2">
        <div className="flex flex-col">
          <TypographyNormal classNames="text-right uppercase text-sm text-yellow-400 font-semibold tracking-wider">
            SUBSCRIBE VALUE
          </TypographyNormal>
          <TypographyNormal classNames="uppercase text-lg text-white text-right">0 ETH</TypographyNormal>
        </div>
        <div className="">
          <GenericButton name="Referral" onClick={() => setModalState({ referral: { isOpen: true } })} />
        </div>
      </div>
    </>
  )
}

export default ExchangeStats
