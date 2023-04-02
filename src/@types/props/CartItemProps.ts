import { Format } from '../types/Product'

export type CartItemProps = {
  id: string
  imageUrl: string[]
  title: string
  author: string
  languages: string
  formats: Format[]
  price: number
  category: number
  rating: number
  count: number
}
