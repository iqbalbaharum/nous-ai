import { useQuery } from '@tanstack/react-query'
import { ApolloClientFilter, apolloQuery, getPerkById, getPerksByTokenId } from 'services/apollo'
import { RQ_KEY } from 'repositories'
import { Perk } from 'lib/Perk'
import { ethers } from 'ethers'
import rpc from 'services/rpc'
import axios from 'axios'

const useGetPerks = (variables?: ApolloClientFilter) => {
  const query = `
  query Perks($first: Int, $skip: Int) {
    perks(first: $first, skip: $skip) {
      id
      title
      description
      cid
      price
      forSale
      isPrivate
      isActivable
      isRepurchaseable
    }
  }
  `
  return useQuery({
    queryKey: [RQ_KEY.GET_PERKS],
    queryFn: async () => {
      const { data } = await apolloQuery<{ perks: Perk[] }>({ query, variables })

      const ipfsPromises = data.perks.map(perk => {
        return axios.get(perk.cid)
      })

      const content = await Promise.all(ipfsPromises)

      return data.perks.map((perk, index) => {
        const c = (content[index] as any).data
        return {
          id: perk.id,
          title: perk.title,
          description: perk.description,
          price: ethers.formatEther(perk.price as any) as String,
          banner: c.image,
          longDescription: c.description,
          isPrivate: perk.isPrivate,
          isActiveable: perk.isActivable,
          isRepurchaseable: perk.isRepurchaseable,
          forSale: perk.forSale,
        }
      })
    },
  })
}

const useGetPerkById = (perkId: number) => {
  return useQuery({
    queryKey: [RQ_KEY.GET_PERK_BY_ID, perkId],
    queryFn: async () => {
      const { data } = await getPerkById(perkId)
      const perk = data.perk
      if (!perk) {
        throw new Error(`Perk with ID ${perkId} not found`)
      }

      return {
        id: perk.id,
        title: perk.title,
        description: perk.description,
        price: ethers.formatEther(perk.price as any),
        banner: 'https://nftstorage.link/ipfs/bafybeieh2ghkfaak7pbv5s6xmwmqpxdfytnbgr3tyjg5tkxt42sihdqfza' as string,
      }
    },
  })
}

const useGetPerkByTokenId = (tokenId: number) => {
  return useQuery({
    queryKey: [RQ_KEY.GET_PERK_BY_TOKEN_ID, tokenId],
    queryFn: async () => {
      const { data } = await getPerksByTokenId(tokenId)
      return data?.token.tokenPerks
    },
    enabled: tokenId >= 0,
  })
}

export { useGetPerks, useGetPerkById, useGetPerkByTokenId }
