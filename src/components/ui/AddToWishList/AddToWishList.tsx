'use client'
import { Heart, Loader } from 'lucide-react'
import React, { useContext, useState } from 'react'
import { FaHeart } from 'react-icons/fa'
import { WishListContext } from '../Context/WishListContext';
import toast from 'react-hot-toast';
import { addToWishlist, removeFromWishlist } from '@/services/wishlist';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function AddToWishList({ productId }: { productId: string }) {
  const { wishList, getWishList } = useContext(WishListContext);
  const [isLoading, setIsLoading] = useState(false);
 const session = useSession()
   const router =useRouter()
  const isLiked = wishList?.data.some(p => p._id === productId);

  async function addProductToWishList() {
   if(session.status =='authenticated'){
     setIsLoading(true);
    try {
      await addToWishlist(productId)
      toast.success('Product added to wishlist successfully');
      await getWishList(); 
    } catch (err) {
      console.error(err);
      toast.error('Failed to add product to wishlist');
    } finally {
      setIsLoading(false);
    }
  }else{
     router.push('/login')
  }
   }

  async function deleteProductToWishList() {
    setIsLoading(true);
    try {
      await removeFromWishlist(productId)
      toast.success('Product removed from wishlist');
      await getWishList(); 
    } catch (err) {
      console.error(err);
      toast.error('Failed to remove product');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {!isLiked ? (
        isLoading ? <Loader className="ml-4 animate-spin" /> : <Heart className='w-7 h-7 ml-4 cursor-pointer' onClick={addProductToWishList} />
      ) : ( isLoading ? <Loader className="ml-4 animate-spin" /> : <Heart className="w-7 h-7  ml-4   text-red-500 fill-red-500 cursor-pointer" onClick={deleteProductToWishList}/>)}
    </>
  )
}