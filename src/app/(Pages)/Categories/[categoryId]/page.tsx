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

interface Props {
  params: { categoryId: string }
}

export default async function CategoryProducts({ params }: Props) {
  const { categoryId } = await params;

  // حماية لو categoryId غير موجود
  if (!categoryId) {
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
    products = json?.data ?? []; // تأكد من أن data موجودة
  } catch (error) {
    console.error("Error fetching products:", error);
    products = [];
  }

  if (products.length === 0) {
    return <p className="text-center mt-10 text-gray-500">لا توجد منتجات لهذه الفئة</p>;
  }

  return (
    <div className='grid grid-cols-1 mt-23 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
      {products.map((product) => (
        <div key={product._id} className='flex justify-center'>
          <Card className="shadow-2xl w-full overflow-hidden h-auto">

            {/* الانتقال إلى صفحة المنتج عند الضغط */}
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
                  <p className="text-slate-800 text-sm font-bold dark:text-white">
                    ({product.ratingsAverage})
                  </p>
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
