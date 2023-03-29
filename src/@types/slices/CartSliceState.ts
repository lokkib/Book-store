import { Product } from '../types/Product'

export interface CartSliceState {
  items: Product[]
  totalPrice: number
}
