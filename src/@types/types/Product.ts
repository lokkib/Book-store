type FormatPrice = {
  price: string
}

export interface Format {
  string: FormatPrice
}

export type Product = {
  id: string
  formatType: string
  imageUrl: string[]
  title: string
  description: string
  author: string
  languages: number[]
  language: string
  formats: Format[]
  price: number
  category: number
  rating: number
  count: number
}
