import React from 'react'
import { ProductI } from './../../../interfaces/Product';
import {
  Card,

  CardContent,
  CardDescription,

  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from 'next/image';


import Link from 'next/link';
import AddToCard from '@/components/ui/AddToCard/AddToCard';
import Rating from '@/components/ui/ratings/page';
import AddToWishList from '@/components/ui/AddToWishList/AddToWishList';




export default async function Products() {
  const res =  await fetch('https://ecommerce.routemisr.com/api/v1/products', {
    cache: "no-store",
  });
  const{data:product}:{data:ProductI[]}= await res?.json()

  console.log(product);
  return (<>
    <div className='grid grid-cols-1 mt-23 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 '>
       {product.map((product) => <div key={product._id} className='flex justify-center '>
      
      <Card className=" relative  shadow-2xl w-4/4  overflow-hidden h-auto" >
       <div className="   end-3  top-3  absolute  ">
        <AddToWishList  productId={product._id} />
  </div>

        <Link href={'/products/'+product._id} >
  <CardHeader className=" mt-6">
    <Image className='w-full'  src={product.imageCover} alt={product.title} height={200} width={200}  />
   <CardDescription>{product.brand.name}</CardDescription>
    <CardTitle>{product.category.name}</CardTitle>
    <CardDescription>{product.description.split(" ").slice(0, 1).join(" ")}</CardDescription>
    
  </CardHeader>
  <CardContent>
 
       <div className='flex  gap-3 mt-3 items-center'>
        <Rating rating={product.ratingsAverage }/>
        
      </div>

        <div className='flex gap-1 mt-2 '>
          <p >Price : <span className='font-bold'>{product.price}</span>EGP</p>
        </div>
  
  </CardContent>
  </Link> 
  <AddToCard  productId={product._id}/>
</Card>
  </div>)}
      </div> 
  
  
  </>
  )
}
