import GenericButton from 'components/Button/GenericButton'
import TypographyNormal from 'components/Typography/Normal'
import { useEffect, useState } from 'react'
import useReferralCode from './hooks/useAllowedList'
import { useBoundStore } from 'store'

const ExchangeNotAllowed = () => {
  const [inputValue, setInputValue] = useState<string>('')

  const { enterAllowedList, error, isSuccess } = useReferralCode({ code: inputValue })
  const { setModalState } = useBoundStore()

  const onSubmitClicked = async () => {
    try {
      // remove NOUS- NOUS-8FprTmXBYuyMFC27y9SdaQo9i1fphk7xWCBVFsNmvyED
      // convert input to bytes
      await enterAllowedList()
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    if (isSuccess) {
      setModalState({
        alert: { isOpen: true, state: 'success', message: `Quest submitted` },
      })
    }

    if (error) {
      setModalState({
        alert: { isOpen: true, state: 'failed', message: `Referal code error: ${error}` },
      })
    }
  }, [isSuccess, setModalState, error])

  return (
    <>
      <div className="p-4 text-center fixed left-1/2 md:w-2/4 top-1/2 -translate-x-1/2 -translate-y-1/2 transform ring ring-white bg-blue-600/80 backdrop-blur text-white h-2/5 w-1/2">
        <div className="flex flex-col gap-2 items-center">
          <TypographyNormal>
            Exchange is still in <span className="font-semibold text-yellow-400 mt-2">Beta</span>, paste your invite to
            join
          </TypographyNormal>
          <div className="h-48 flex flex-col items-center justify-center w-full gap-2">
            <input
              placeholder="Invite code"
              className="p-2 w-1/3 mt-2 text-slate-600 text-lg text-center"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
            />
            <GenericButton name="Submit" onClick={onSubmitClicked} />
          </div>
        </div>
      </div>
    </>
  )
}

export default ExchangeNotAllowed
