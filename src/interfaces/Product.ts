
import { CategoryI } from './Category';
import { BrandI } from './Brand';
import { Subcategory } from './Subcategory';


export interface ProductI {

  sold: number
  images: string[]
  subcategory: Subcategory[]
  ratingsQuantity: number
  _id: string
  title: string
  slug: string
  description: string
  quantity: number
  price: number
  imageCover: string
  category: CategoryI
  brand: BrandI
  ratingsAverage: number
  createdAt: string
  updatedAt: string
  id: string
}
