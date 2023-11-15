export interface Perk {
  id: String
  title: String
  description: String
  longDescription?: string
  price: String
  banner?: String
  cid: string
  forSale: boolean
  isPrivate: boolean
  isActivable: boolean
  isRepurchaseable: boolean
}

export interface Token {
  tokenPerks: TokenPerk[]
}

export interface TokenPerk {
  id: string
}
