import { ethers } from 'ethers'
import { useCallback, useState } from 'react'
import RPC from 'utils/ethers'

const contractABI = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'getBuyPrice',
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
        name: 'tokenId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'buyKey',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'sellKey',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]

const useSubscription = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const subscribe = useCallback(async (tokenId: string, amount: number) => {
    setIsLoading(true)
    setError('')

    try {
      const rpc = new RPC(window?.ethereum as any)

      const price: string = await rpc.readContractData({
        contractABI,
        contractAddress: import.meta.env.VITE_NOUS_AIFI as string,
        method: 'getBuyPrice',
        data: [tokenId, ethers.formatEther(amount.toString())],
      })

      const subscribePrice = price === '0.0' ? `0` : ethers.parseEther(price.toString())

      await rpc.callContractMethod({
        contractABI,
        contractAddress: import.meta.env.VITE_NOUS_AIFI as string,
        method: 'buyKey',
        data: [tokenId, ethers.formatEther(amount.toString())],
        options: {
          value: subscribePrice.toString(),
        },
      })
    } catch (error: any) {
      console.log(error)
      setError(error.reason as string)
      throw new Error(error.reason as string)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const unsubscribe = useCallback(async (tokenId: string, amount: number) => {
    setIsLoading(true)
    setError('')

    try {
      const rpc = new RPC(window?.ethereum as any)

      await rpc.callContractMethod({
        contractABI,
        contractAddress: import.meta.env.VITE_NOUS_AIFI as string,
        method: 'sellKey',
        data: [tokenId, ethers.formatEther(amount.toString())],
        options: {
          value: '',
        },
      })
    } catch (error: any) {
      console.log(error)
      setError(error.reason as string)
      throw new Error(error.reason as string)
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { subscribe, unsubscribe, isLoading, error }
}

export default useSubscription
