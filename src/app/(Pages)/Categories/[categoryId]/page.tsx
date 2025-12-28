import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from 'next/image';

import Link from 'next/link';
import AddToCard from '@/components/ui/AddToCard/AddToCard';
// import { Product } from "@/interfaces";
import Rating from "@/components/ui/ratings/page";
import { ProductI } from "@/interfaces";
import AddToWishList from "@/components/ui/AddToWishList/AddToWishList";

interface Props {
  params: { categoryId: string }
}

export default async function CategoryProducts({ params }: Props) {
  const { categoryId } = await params;


  if (!categoryId) {  // حماية لو categoryId غير موجود
    return <p className="text-center mt-30 text-gray-500">🥲🥲💔💔</p>;
  }

  let products: ProductI[] = [];

  try {
    // جلب جميع المنتجات الخاصة بالفئة
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products?category=${categoryId}`,
      { cache: "no-store" }
    );
    const json = await res.json();
    products = json?.data ?? [];
  } catch (error) {
    console.error("Error fetching products:", error);
    products = [];
  }

  if (products.length === 0) {
    return <div className='flex  flex-col  min-h-[75vh] items-center justify-center  '>
           <h2 className="mt-40 text-center text-3xl py-6 ">No products found for this Category... 🥲</h2>
       </div>
  }

  return (
    <div className='grid grid-cols-1 mt-23 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
      {products.map((product) => (
        <div key={product._id} className='relative flex justify-center'>
          
          <Card className="shadow-2xl w-full overflow-hidden h-auto">
 <div className="  end-3 top-3  absolute  ">
                  <AddToWishList  productId={product._id} />
            </div>
            <Link href={'/products/' + product._id}>
              <CardHeader>
                
                <Image
                  className='w-full'
                  src={product.imageCover}
                  alt={product.title}
                  height={200}
                  width={200}
                />
                <CardDescription>{product.brand?.name}</CardDescription>
                <CardTitle>{product.category?.name}</CardTitle>
                <CardDescription>
                  {product.description.split(" ").slice(0, 10).join(" ")}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className='flex gap-3 mt-3 items-center'>
                  <Rating rating={product.ratingsAverage} />
               
                </div>

                <div className='flex gap-1 mt-2'>
                  <p>Price : <span className='font-bold'>{product.price}</span> EGP</p>
                </div>
              </CardContent>
            </Link>

            <AddToCard productId={product._id} />
          </Card>
        </div>
      ))}
    </div>
  );
}
