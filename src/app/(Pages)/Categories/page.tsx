import { log } from 'console';
import React from 'react'
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import Image from 'next/image';
import { CategoryI } from '@/interfaces';
import Link from 'next/link';

export default async function Categories() {
 const res = await  fetch('https://ecommerce.routemisr.com/api/v1/categories')
  const {data:category}:{data: CategoryI[] } = await res.json()
  log(category);

  return <>
<div className="px-6 mt-70 lg:mt-24 ">
       
        <h3 className="font-bold text-4xl mb-10 text-center">Our Category</h3>

      
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 ">
          
          {category.map((category) => (
            
           <div key={category._id} className="shadow-xl  hover:shadow-2xl  cursor-pointer overflow-hidden">
           <Link href={`/Categories/${category._id}`}> 
            <Card>
              <CardHeader className="p-0">
                <Image
                  src={category?.image}
                  alt={category?.name}
                  width={300}
                  height={300}
                  className="w-full h-80 object-contain bg-white p-4"
                />
              </CardHeader>

              <CardContent className="py-4 text-center">
                <h1 className="text-xl font-semibold capitalize text-gray-700 dark:text-white">
                  {category?.slug}
                </h1>
              </CardContent>
            </Card>
           </Link> 
           </div>
          
          ))}

        </div>
      </div>
  
  
  </>
}
