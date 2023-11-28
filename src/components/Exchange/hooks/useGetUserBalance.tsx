import { useCallback, useEffect, useState } from 'react'
import RPC from 'utils/ethers'

const contractABI = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'getUserBalanceKeys',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'keySupply',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
]

const useUserKeyBalance = (tokenId: string) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)
  const [balance, setIsBalance] = useState(0)
  const [tokenKeyBalance, setTokenKeyBalance] = useState(0)

  const getUserKeyCount = useCallback(async () => {
    setIsLoading(true)
    setError('')
    setIsSuccess(false)

    try {
      const rpc = new RPC(window?.ethereum as any)

      const balance = await rpc.readContractData({
        contractABI,
        contractAddress: import.meta.env.VITE_NOUS_AIFI as string,
        method: 'getUserBalanceKeys',
        data: [tokenId],
      })

      setIsSuccess(true)
      setIsBalance(Number(balance.toString()))
    } catch (error: any) {
      setError(error.reason as string)
    } finally {
      setIsLoading(false)
    }
  }, [tokenId])

  const getTokenKeyCount = useCallback(async () => {
    setIsLoading(true)
    setError('')
    setIsSuccess(false)

    try {
      const rpc = new RPC(window?.ethereum as any)

      const balance = await rpc.readContractData({
        contractABI,
        contractAddress: import.meta.env.VITE_NOUS_AIFI as string,
        method: 'keySupply',
        data: [tokenId],
      })

      setIsSuccess(true)
      setTokenKeyBalance(Number(balance.toString()))
    } catch (error: any) {
      setError(error.reason as string)
    } finally {
      setIsLoading(false)
    }
  }, [tokenId])

  useEffect(() => {
    if (tokenId) {
      getUserKeyCount().catch(console.log)
      getTokenKeyCount().catch(console.log)
    }
  }, [getTokenKeyCount, getUserKeyCount, tokenId])
  return { keyCount: balance, totalTokenKeyCount: tokenKeyBalance, isLoading, error, isSuccess }
}

export default useUserKeyBalance
