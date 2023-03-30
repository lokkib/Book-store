type FormatPrice = {
  price: string
}

export type Format = {
  string: FormatPrice
}

export type Product = {
  id: string
  imageUrl: string[]
  title: string
  author: string
  languages: number[]
  formats: Format[]
  price: number
  category: number
  rating: number
  count: number
}
