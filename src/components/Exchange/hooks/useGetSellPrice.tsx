import { ethers } from 'ethers'
import { useCallback, useEffect, useState } from 'react'
import RPC from 'utils/ethers'

interface Prop {
  tokenId: string
  amount: number
}

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
    name: 'getSellPrice',
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
      { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'getSellPriceAfterFee',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
]

const useGetSellPrice = ({ tokenId, amount }: Prop) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [sellPrice, setSellPrice] = useState('0')
  const [sellPriceAfterTax, setSellPriceAfterTax] = useState('0')

  const getSellPrice = useCallback(async () => {
    setIsLoading(true)
    setError('')

    if (amount == 0) {
      setSellPrice(`0`)
      return
    }

    try {
      const rpc = new RPC(window?.ethereum as any)

      const price: string = await rpc.readContractData({
        contractABI,
        contractAddress: import.meta.env.VITE_NOUS_AIFI as string,
        method: 'getSellPrice',
        data: [tokenId, amount.toString()],
      })

      const subscribePrice = price === '0.0' ? `0` : ethers.formatEther(price.toString())

      setSellPrice(subscribePrice.toString())
    } catch (error: any) {
      setError(error.reason as string)
      throw new Error(error.reason as string)
    } finally {
      setIsLoading(false)
    }
  }, [amount, tokenId])

  const getSellPriceAfterTax = useCallback(async () => {
    setIsLoading(true)
    setError('')

    if (amount == 0) {
      setSellPrice(`0`)
      return
    }

    try {
      const rpc = new RPC(window?.ethereum as any)

      const price: string = await rpc.readContractData({
        contractABI,
        contractAddress: import.meta.env.VITE_NOUS_AIFI as string,
        method: 'getSellPriceAfterFee',
        data: [tokenId, amount.toString()],
      })

      const subscribePrice = price === '0' ? `0` : ethers.formatEther(price.toString())
      setSellPriceAfterTax(subscribePrice.toString())
    } catch (error: any) {
      setError(error.reason as string)
      throw new Error(error.reason as string)
    } finally {
      setIsLoading(false)
    }
  }, [amount, tokenId])

  useEffect(() => {
    const timer = setTimeout(async () => {
      await getSellPrice().catch(console.log)
      await getSellPriceAfterTax().catch(console.log)
    }, 1000)

    return () => clearTimeout(timer)
  }, [getSellPrice, getSellPriceAfterTax])

  return { sellPrice, sellPriceAfterTax, isLoading, error }
}

export default useGetSellPrice
