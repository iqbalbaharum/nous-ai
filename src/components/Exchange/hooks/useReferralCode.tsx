import { useConnectedWallet } from 'hooks/use-connected-wallet'
import { useCallback, useEffect, useState } from 'react'
import { hexToBase58 } from 'utils'
import RPC from 'utils/ethers'

const contractABI = [
  {
    inputs: [{ internalType: 'address', name: 'user', type: 'address' }],
    name: 'getCode',
    outputs: [{ internalType: 'bytes', name: '', type: 'bytes' }],
    stateMutability: 'view',
    type: 'function',
  },
]

const useReferralCode = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)
  const [refCode, setRefCode] = useState('')

  const { address } = useConnectedWallet()

  const checkIfHaveCode = useCallback(async () => {
    setIsLoading(true)
    setError('')
    setIsSuccess(false)

    try {
      const rpc = new RPC(window?.ethereum as any)

      const code = await rpc.readContractData({
        contractABI,
        contractAddress: import.meta.env.VITE_NOUS_REF as string,
        method: 'getCode',
        data: [address?.full],
      })

      setIsSuccess(true)
      setRefCode(`NP-${hexToBase58(code as string)}`)
    } catch (error: any) {
      setError(error.reason as string)
      setRefCode('')
    } finally {
      setIsLoading(false)
    }
  }, [address?.full])

  useEffect(() => {
    if (address?.full) {
      checkIfHaveCode().catch(console.log)
    }
  }, [address?.full, checkIfHaveCode])

  return { refCode, isLoading, error, isSuccess }
}

export default useReferralCode
