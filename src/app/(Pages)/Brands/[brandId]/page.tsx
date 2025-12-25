import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ProductI } from "@/interfaces";
// import { Product } from "@/interfaces";


export default async function BrandProducts({ params }: { params: { brandId: string } }) {

  const { brandId } = await params; 
  console.log(params);

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products?brand=${brandId}`,
    { cache: "no-store" }
  );

  const { data: products }: { data: ProductI[] } = await res.json();

  return (
    <div className="px-6 mt-24">
      <h1 className="text-3xl font-bold mb-10">Products of Brand</h1>

      {products.length === 0 ? (
        <p className="text-center text-xl mt-10">No products found for this brand.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <Link href={`/products/${product._id}`} key={product._id}>
              <div className="border rounded-xl shadow hover:shadow-lg cursor-pointer p-4">
                <Image
                  src={product.imageCover}
                  alt={product.title}
                  width={300}
                  height={300}
                  className="w-full h-52 object-cover rounded"
                />

                <div className="mt-3">
                  <h2 className="font-semibold">{product.title.slice(0, 25)}...</h2>
                  <p className="text-gray-600 text-sm">{product.brand.name}</p>
                  <p className="font-bold mt-1">EGP {product.price}</p>
                </div>
              
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
