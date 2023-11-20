import PublicMintBox from 'components/Mint/PublicMintBox'
import TimelineMint from 'components/Mint/TimelineMint'
import TransactionMint from 'components/Mint/TransactionMint'
import WhitelistMintBox from 'components/Mint/WhitelistMintBox'
import TypographyNormal from 'components/Typography/Normal'
import { useEffect, useState } from 'react'
import RPC from 'utils/ethers'

const contractABI = [
  {
    inputs: [],
    name: 'totalSupply',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'maxTokens',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
]

const PageMint = () => {
  const [supply, setTotalSupply] = useState(0)
  const [max, setMaxSupply] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isCompleted, setIsCompleted] = useState(true)

  const progressPercentage = (supply / max) * 100

  useEffect(() => {
    if (Number(((supply / max) * 100).toFixed(2)) === 100.0) {
      setIsCompleted(true)
    } else {
      setIsCompleted(false)
    }
  }, [supply, max])

  useEffect(() => {
    const getTotalSupply = async () => {
      const rpc = new RPC(window?.ethereum as any)

      try {
        const current: number = await rpc.readContractData({
          contractABI,
          contractAddress: import.meta.env.VITE_NOUS_AI_NFT,
          method: 'totalSupply',
          data: [],
        })

        if (Number.isFinite(current)) {
          setTotalSupply(Number(current))
        } else {
          setTotalSupply(0)
        }

        const max: number = await rpc.readContractData({
          contractABI,
          contractAddress: import.meta.env.VITE_NOUS_AI_NFT,
          method: 'maxTokens',
          data: [],
        })

        if (Number.isFinite(max)) {
          setMaxSupply(Number(max))
        } else {
          setMaxSupply(0)
        }
      } catch (e) {
        console.log(e)
      }
    }

    const handleAccountChange = () => {
      setIsLoaded(false)
    }

    if (!isLoaded) {
      getTotalSupply()
        .then(() => setIsLoaded(true))
        .catch(console.log)
      setIsLoaded(true)
    }

    window?.ethereum?.on('accountsChanged', handleAccountChange)
    return () => window?.ethereum?.removeListener('accountsChanged', handleAccountChange)
  }, [isLoaded])

  const handleLink = () => {
    if (import.meta.env.VITE_DEFAULT_CHAIN_ID === '80001') {
      return 'https://mumbai.polygonscan.com/address/0xC1ff59a4fBA0D0a26c0A84b9A11831E1488366b4#code' as string
    } else if (import.meta.env.VITE_DEFAULT_CHAIN_ID === '1') {
      return 'https://etherscan.io/' as string
    }
  }

  const handleNaNValue = () => {
    if (supply === 0 || max === 0) {
      return '0'
    } else {
      return `${progressPercentage.toFixed(2)}`
    }
  }

  return (
    <>
      <div className="w-2/5">
        <div className="p-4">
          <PublicMintBox />
        </div>
        <div className="flex justify-between text-sm mt-2">
          <TypographyNormal>{((supply / max) * 100).toFixed(2)}% minted</TypographyNormal>
          <TypographyNormal classNames="font-semibold">
            {supply}/{max}
          </TypographyNormal>
        </div>
        <div className="mt-1">
          <span id="ProgressLabel" className="sr-only">
            Supply
          </span>

          <div className="relative">
            <div className="border border-green-300 p-1">
              <div
                className="flex h-3 items-center justify-center bg-green-300 text-xs leading-none"
                style={{ width: `${(supply / max) * 100 < 3 ? 3 : (supply / max) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
        {/* <div className="text-sm mt-4 text-center">
          Nous Psyche NFT Contract:{' '}
          <a target="_blank" href={`https://basescan.org/address/${import.meta.env.VITE_NOUS_AI_NFT}`}>
            {import.meta.env.VITE_NOUS_AI_NFT}
          </a>
        </div> */}
      </div>
    </>
  )
}

export default PageMint
