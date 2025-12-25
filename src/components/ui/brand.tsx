import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import { BrandI } from "@/interfaces";

export default async function Brands() {
  const res = await fetch("https://ecommerce.routemisr.com/api/v1/brands");
  const { data: brand }: { data: BrandI[] } = await res.json();

  return (
    <>
      <div className="px-6 mt-24">
        {/* Title */}
        <h3 className="font-bold text-4xl mb-10 text-center">Our Brands</h3>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {brand.map((brand) => (
            <Card
              key={brand._id}
              className="shadow-xl border rounded-xl hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden"
            >
              <CardHeader className="p-0">
                <Image
                  src={brand.image}
                  alt={brand.name}
                  width={300}
                  height={300}
                  className="w-full h-48 object-contain bg-white p-4"
                />
              </CardHeader>

              <CardContent className="py-4 text-center">
                <h1 className="text-xl font-semibold capitalize text-gray-700">
                  {brand.slug}
                </h1>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
