import { Product } from '../types/Product'

export interface ProductSliceState {
  items: Product[]
  status: string
}
