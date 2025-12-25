'use client'
import React, { useContext, useState } from 'react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { WishListContext } from '@/components/ui/Context/WishListContext';

import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';

import toast from 'react-hot-toast';
import AddToWishList from '@/components/ui/AddToWishList/AddToWishList';

// نستخدم API Service الجديد
import { removeFromWishlist } from '@/services/wishlist';
import Rating from '@/components/ui/ratings/page';

export default function WishListPage() {
  const { wishList, getWishList } = useContext(WishListContext);
  const [isRemoving, setIsRemoving] = useState<string | null>(null);

  if (!wishList) return <Loader className="animate-spin" />;

  if (wishList.count === 0) {
    return (
      <div className='flex flex-col min-h-[75vh] items-center justify-center'>
        <h2 className="mt-40 text-center text-3xl py-6">Your Wishlist Is Empty...🥲💔</h2>
        <Link href={'/products'}>
          <Button>Add Products to Wishlist</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 px-4 mt-20">
      <h1 className="text-3xl font-serif tracking-tight">Your Wishlist</h1>
      <p className="text-lg mt-1 text-gray-600">{wishList.count} items in your Wishlist</p>

      <div className="grid md:grid-cols-1 lg:grid-cols-3 w-full gap-20 mx-auto mt-6 ">
        <div className="lg:col-span-2 flex flex-col space-y-3 w-full">

          {wishList.data.map((item) => (
            <Card key={item._id} className="flex flex-row items-start gap-5 p-5 border rounded-xl shadow-sm bg-white relative">

              <Link href={'/products/' + item._id}>
                <img
                  src={item.imageCover}
                  alt={item.title}
                  className="w-50 h-50 rounded-lg object-cover cursor-pointer"
                />
              </Link>

              <div className='flex flex-col flex-1'>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-gray-500 text-sm">
                  {item.brand.name} • {item.category.name}
                </p>

                <CardDescription className="mt-2">
                  {item.description.split(" ").slice(0, 10).join(" ")}...
                </CardDescription>

                <div className="flex justify-between items-center mt-3">
                  <p className="text-sm font-bold text-black">Price: {item.price} EGP</p>
                  <div className="flex gap-1 items-center">
                   
  <Rating rating={item.ratingsAverage} />
     <span className='dark:text-black'>({item.ratingsQuantity})</span>
               
                  </div>
                </div>
              </div>

              {/* زرار إزالة الـ Wishlist */}
              <div className='flex gap-2 absolute right-3 bottom-3 items-center'>
                {/* زرار القلب */}
                <AddToWishList productId={item._id} />

                {/* زرار الإزالة */}
                <Button
                  variant="outline"
                  className="hover:text-red-500 dark:text-black dark:hover:text-red-500  shadow-2xl"
                  onClick={async () => {
                    setIsRemoving(item._id);
                    await removeFromWishlist(item._id);
                    await getWishList();
                    setIsRemoving(null);
                    toast.success("Product removed successfully");
                  }}
                >
                  {isRemoving === item._id ? <Loader className="animate-spin" /> : "Remove"}
                </Button>
              </div>

            </Card>
          ))}

        </div>
      </div>
    </div>
  );
}
