import { ProductI } from "@/interfaces";
import { log } from "console";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";



import { Params } from "next/dist/server/request/params";
import ProductSlider from "./../../../../components/ui/producySlider/productSlider";
import AddToCard from "@/components/ui/AddToCard/AddToCard";
import Rating from "@/components/ui/ratings/page";
import AddToWishList from "@/components/ui/AddToWishList/AddToWishList";

export default async function ProductDetails({ params }: { params: Params }) {
  const { productId } = await params;
  log(productId);
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products/${productId}`
  );
  const { data: product }: { data: ProductI } = await res.json();
  log(product);
  return (
    <>
      <Card className=" relative grid md:grid-cols-1  lg:grid-cols-3 w-3/4 mx-auto shadow-2xl items-center  mt-30">
        <div className="mt-4">
          <ProductSlider images={product?.images} title={product.title} />
        </div>
        
        <div className="lg:col-span-2 ">
          <CardHeader>
 <div className="   top-2 end-3  absolute  ">
                  <AddToWishList  productId={product._id} />
            </div>
            <CardDescription>{product.brand.name}</CardDescription>
            <CardTitle>{product.category.name}</CardTitle>
            <CardDescription>
              {product.description.split(" ").slice(0, 4).join(" ")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex    justify-end-safe  sm:justify-between lg:flex-col  gap-2 mt-3">
              <div className="flex gap-3">
                <Rating rating={product.ratingsAverage} />
              
              </div>

              <p className="flex gap-1 ">
                Price : <span className="font-bold">{product.price}</span>EGP
              </p>
            </div>
          </CardContent>

          <AddToCard productId={product._id} />
        </div>
      </Card>
    </>
  );
}
