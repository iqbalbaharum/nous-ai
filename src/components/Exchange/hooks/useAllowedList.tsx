import { ethers } from 'ethers'
import { useCallback, useState } from 'react'
import { RQ_KEY } from 'repositories'
import { useNousStore } from 'store'
import RPC from 'utils/ethers'
import { useQueryClient } from 'wagmi'

interface Props {
  code: string
}

const contractABI = [
  {
    inputs: [
      {
        internalType: 'bytes',
        name: 'referralCode',
        type: 'bytes',
      },
    ],
    name: 'enterAllowlistWithReferral',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
    ],
    name: 'isAddressAllowlisted',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
]

const useReferralCode = ({ code }: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  const { selectedNous } = useNousStore()

  const queryClient = useQueryClient()

  const enterAllowedList = useCallback(async () => {
    setIsLoading(true)
    setError('')
    setIsSuccess(false)

    try {
      const rpc = new RPC(window?.ethereum as any)

      await rpc.callContractMethod({
        contractABI,
        contractAddress: import.meta.env.VITE_NOUS_AIFI as string,
        method: 'enterAllowlistWithReferral',
        data: [],
      })
    } catch (error: any) {
      setError(error.reason as string)
      throw new Error(error.reason as string)
    } finally {
      setIsLoading(false)
      setIsSuccess(true)
      await queryClient.invalidateQueries([RQ_KEY.GET_PERK_BY_TOKEN_ID, Number(selectedNous?.token_id)])
    }
  }, [queryClient, selectedNous?.token_id])

  const isAllowed = useCallback(async () => {
    setIsLoading(true)
    setError('')
    setIsSuccess(false)

    try {
      const rpc = new RPC(window?.ethereum as any)

      await rpc.readContractData({
        contractABI,
        contractAddress: import.meta.env.VITE_NOUS_AIFI as string,
        method: 'isAll',
        data: [],
      })
    } catch (error: any) {
      setError(error.reason as string)
      throw new Error(error.reason as string)
    } finally {
      setIsLoading(false)
      setIsSuccess(true)
      await queryClient.invalidateQueries([RQ_KEY.GET_PERK_BY_TOKEN_ID, Number(selectedNous?.token_id)])
    }
  }, [queryClient, selectedNous?.token_id])

  return { enterAllowedList, isLoading, error, isSuccess }
}

export default useReferralCode
