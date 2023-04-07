type FormatPrice = {
  price: string
}

type Format = {
  string: FormatPrice
}

export type ProductBlockProps = {
  id: string
  imageUrl: string[]

  author: string
  title: string
  languages: number[]
  formats: Format[]
  price: number
  category: number
  rating: number
  count: number
}
