import { product } from "./product";
import { User } from "./user";

export interface Order {
    quantity: number
    paymentMethod: string
    status: string
    _id: string
    product: product
    price: number
    user: User
    firstName: string
    lastName: string
    address: string
    created_at: string
    updatedAt: string
    __v: number
  }