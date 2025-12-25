// 'use client'
// import React, { useContext, useState } from 'react'

// import { Heart, Loader, ShoppingCart } from 'lucide-react'

// import { CardFooter } from '../card'
// import toast from 'react-hot-toast'
// import { CartContext } from '../Context/CartContext'
// import{ FaHeart } from 'react-icons/fa'
// import { WishListContext } from '../Context/WishListContext'
// import AddToWishList from '../AddToWishList/AddToWishList'
// import { addToCartAction } from '@/app/(Pages)/products/_action/addToCart.action'



// import { Button } from "@/components/ui/button";
// import { useSession } from 'next-auth/react'
// import { useRouter } from 'next/navigation'





// export default function AddToCard({productId}:{productId:string}) {
//  const session = useSession()
//     const [isLoading, setIsLoading] = useState(false)
//       const { setCartData} = useContext(CartContext);
//    const router =useRouter()
//  async   function addProductToCard(){
//  if(session.status =='authenticated'){
//    setIsLoading (true);
//  const data = await addToCartAction(productId)
// data.status! =='success'&& toast.success('Product added to cart successfully')

// setCartData(data);
//     console.log(data);
//     setIsLoading(false);
//  }else{
//     router.push('/login')
//  }
//    }


//   return<>
  
//     <CardFooter className='gap-2 mt-10' >
    
//     <Button onClick={addProductToCard} className=' cursor-pointer grow'>{isLoading? <Loader className='animate-spin'/> :<ShoppingCart/>   } Add To Cart </Button>
// <AddToWishList productId={productId}/>
//   </CardFooter>
  
//   </>
// }
'use client'
import React, { useContext, useState } from 'react'
import { Loader, ShoppingCart } from 'lucide-react'
import { CardFooter } from '../card'
import toast from 'react-hot-toast'
import { CartContext } from '../Context/CartContext'
import AddToWishList from '../AddToWishList/AddToWishList'
import { addToCartAction } from '@/app/(Pages)/products/_action/addToCart.action'
import { Button } from "@/components/ui/button"
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function AddToCard({ productId }: { productId: string }) {
  const { data: sessionData, status } = useSession()
  const [isLoading, setIsLoading] = useState(false)
  const { setCartData } = useContext(CartContext)
  const router = useRouter()

  async function addProductToCard() {
    if (status === 'authenticated') {
      setIsLoading(true)
      try {
        const data = await addToCartAction(productId)

        if (data.status === 'success') {
          toast.success('Product added to cart successfully')
          setCartData(data)
        } else {
          toast.error('Failed to add product to cart')
        }

      } catch (error) {
        toast.error('Something went wrong')
      } finally {
        setIsLoading(false)
      }
    } else {
      router.push('/login')
    }
  }

  return (
    <CardFooter className='gap-2 mt-10'>
      <Button onClick={addProductToCard} className='cursor-pointer grow'>
        {isLoading ? <Loader className='animate-spin' /> : <ShoppingCart />} Add To Cart
      </Button>
      <AddToWishList productId={productId} />
    </CardFooter>
  )
}
