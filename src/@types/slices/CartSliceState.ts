import { Product } from "../types/Product"

export type CartSliceState = {
    items: Product[] | [],
    totalPrice: number
} 