import { Format } from '../types/Product'

export type CartItemProps = {
  id: string
  formatType: string
  imageUrl: string | string[]
  title: string
  author: string
  language: string
  formats: Format[]
  price: number
  category: number
  rating: number
  count: number
}
