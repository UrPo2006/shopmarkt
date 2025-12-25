import { CartItem } from "./CartItem"

export interface ShippingAddress {
  details: string
  city: string
  phone: string
}

export interface User {
  _id: string
  name: string
  email: string
  phone: string
}

export interface Order {
  _id: string
  shippingAddress: ShippingAddress
  taxPrice: number
  shippingPrice: number
  totalOrderPrice: number
  paymentMethodType: string
  isPaid: boolean
  isDelivered: boolean
  user: User
  createdAt: string
   cartItems: CartItem[]; 
}
//   cartItems: {
//     _id: string
//     count: number
//     price: number
//     product: {
//       title: string
//       imageCover: string
//     }
//   }[]
// }