type FormatPrice = {
  price: string
}

export interface Format {
  string: FormatPrice
}

export type Product = {
  id: string
  imageUrl: string[]
  title: string
  description: string
  author: string
  languages: number[]
  formats: Format[]
  price: number
  category: number
  rating: number
  count: number
}
