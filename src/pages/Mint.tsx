import PublicMintBox from 'components/Mint/PublicMintBox'
import WhitelistMintBox from 'components/Mint/WhitelistMintBox'
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

        setTotalSupply(Number(current))

        const max: number = await rpc.readContractData({
          contractABI,
          contractAddress: import.meta.env.VITE_NOUS_AI_NFT,
          method: 'maxTokens',
          data: [],
        })

        setMaxSupply(Number(max))
      } catch (e) {
        console.log(e)
      }
    }

    if (!isLoaded) {
      getTotalSupply().catch(console.log)
      setIsLoaded(true)
    }
  }, [isLoaded])

  return (
    <>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
        <div className="h-32 rounded-lg lg:col-span-2">
          <div className="rounded-lg border border-gray-700 bg-orange-300 text-black p-4">
            <div className="text-lg font-bold">Mint your NOUS Bot</div>
            <div className="text-sm">Contract: {import.meta.env.VITE_NOUS_AI_NFT}</div>
            <PublicMintBox isCompleted={isCompleted} />
            <WhitelistMintBox />
          </div>
        </div>
        <div className="flex flex-col gap-7">
          <div className="h-32 rounded-lg">
            <div className="rounded-lg border border-gray-700 bg-gray-800/50 p-4">
              <div className="text-lg font-bold mb-4">Progress</div>
              <div className="flex justify-between text-sm">
                <span>{isCompleted ? 'SOLD OUT' : `${((supply / max) * 100).toFixed(2)}% minted`}</span>
                <span className="font-semibold">
                  {supply}/{max}
                </span>
              </div>
              <div className="mt-1">
                <span id="ProgressLabel" className="sr-only">
                  Supply
                </span>

                <span aria-labelledby="ProgressLabel" className="block rounded-full bg-yellow-100">
                  <span
                    className="block h-4 pt-1 rounded-lg bg-[repeating-linear-gradient(45deg,_var(--tw-gradient-from)_0,_var(--tw-gradient-from)_20px,_var(--tw-gradient-to)_20px,_var(--tw-gradient-to)_40px)] from-orange-400 to-orange-500"
                    style={{ width: `${(supply / max) * 100}%` }}
                  >
                    <span className="font-bold text-white"> </span>
                  </span>
                </span>
              </div>
              <div className="mt-3 text-xs">Minting remains open while supplies last.</div>
            </div>
          </div>
          <div className="h-32 rounded-lg">
            <div className="rounded-lg border border-gray-700 bg-gray-800/50 p-4">
              <div className="text-lg font-bold mb-4">Latest Transaction</div>
              <div className='flex flex-col'>
                <div className='flex justify-between items-center gap-1'>
                  <img className='h-8 w-8 rounded-full' alt="default" src="https://images.pexels.com/photos/18734695/pexels-photo-18734695/free-photo-of-cup-of-coffee-on-bed.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"  />
                  <p>0x539ef07aAC991109E18616860896bf0c588Ff1D7</p>
                </div>
                <div className='flex justify-end gap-1 py-2 font-semibold text-sm'>
                  <p>0.156 ETH</p>
                  . 
                  <p>2 Trekki</p>
                </div>
              </div>
              <div className='flex flex-col'>
                <div className='flex justify-between items-center gap-1'>
                  <img className='h-8 w-8 rounded-full' alt="default" src="https://images.pexels.com/photos/18734695/pexels-photo-18734695/free-photo-of-cup-of-coffee-on-bed.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"  />
                  <p>0x539ef07aAC991109E18616860896bf0c588Ff1D7</p>
                </div>
                <div className='flex justify-end gap-1 py-2 font-semibold text-sm'>
                  <p>0.156 ETH</p>
                  . 
                  <p>2 Trekki</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PageMint