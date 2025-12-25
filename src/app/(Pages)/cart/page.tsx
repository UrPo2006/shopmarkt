
'use client'

import { Button } from '@/components/ui/button'
import Checkout from '@/components/ui/ChechOut/CheckOut'



import { CartContext } from '@/components/ui/Context/CartContext'

import { clearCart, removeItemFromCart, updateItemInCart } from '@/services/cart'

import { Loader, Trash2 } from 'lucide-react'

import Link from 'next/link'

import React, { useContext, useState} from 'react'
import { toast } from 'react-hot-toast';

export default function Cart() {
const [isRemoving, setIsRemoving] = useState<string|null>(null)
const [isUpDate, setIsUpDate] = useState<string|null>(null)
const [isClear, setIsClear] = useState(false)
  const { cartData, isLoading,getCart, setCartData} = useContext(CartContext);
if(typeof cartData?.data.products[0]?.product=='string'|| cartData==null) {
  getCart()
}
 
  // delete cart
 async function removeCartItem(ProductId: string){
  setIsRemoving(ProductId)
  const data = await removeItemFromCart(ProductId);
  
 
  console.log(data);
  if(data.status=='success'){
    toast.success('product deleted successfully')
    setCartData(data); 

    
  }
  setIsRemoving(null)
  }
  // update
  async function updateCartItem(ProductId: string , count:number){
  setIsUpDate(ProductId)
   const data = await updateItemInCart(ProductId, count);
  
 
  console.log(data);
  if(data.status=='success'){
    toast.success('product Quantity Updateing successfully')
    setCartData(data); 

    
  }
  setIsUpDate(null)
  }
  // Clear

  async function ClearCartItem() {
  setIsClear(true);

    const data = await clearCart();

  

  if (data.message === 'success') {
    toast.success("Cart cleared successfully");
    setCartData(null);
  }

  setIsClear(false);
}



  return (
  <>
    {isLoading || !cartData || !cartData.data || !cartData.data.products
      ? (
        <Loader className="animate-spin" />
      )
      : cartData.numOfCartItems > 0
        ? (
          <div className="container mx-auto py-6 px-4 mt-20">
            <h1 className="text-3xl  tracking-tight font-serif ">Your Shopping Cart</h1>
            <p className="text-lg mt-1 text-gray-600">
              {cartData.numOfCartItems} items in your Cart 🛒
            </p>

            <div className="grid md:grid-cols-1 lg:grid-cols-3 w-full gap-20 mx-auto mt-6">

              {/* Cart Items Section */}
              <div className="lg:col-span-2 flex flex-col justify-between space-y-3 w-full tracking-tight">
                {cartData.data.products.map((item) => (
                  <div key={item._id} className="flex items-start gap-5 p-5 border rounded-xl shadow-sm bg-white dark:text-black">
                    <Link href={'/products/' + item.product._id}>
                      <img
                        src={item.product.imageCover}
                        alt={item.product.title}
                        className="w-28 h-28 rounded-lg object-cover cursor-pointer"
                      />
                    </Link>

                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">{item.product.title}</h3>
                      <p className="text-gray-500 text-sm">
                        {item.product.brand.name} • {item.product.category.name}
                      </p>

                      <div className="flex items-center gap-3 mt-3">
                        <button
                          onClick={() => updateCartItem(item.product._id, item.count - 1)}
                          disabled={item.count === 1}
                          className="w-8 h-8 border rounded flex items-center justify-center hover:bg-gray-100 dark:border-black"
                        >
                          -
                        </button>

                        {isUpDate === item.product._id
                          ? <Loader className="animate-spin" />
                          : <span className="font-semibold">{item.count}</span>}

                        <button
                          onClick={() => updateCartItem(item.product._id, item.count + 1)}
                          className="w-8 h-8 border rounded flex items-center justify-center hover:bg-gray-100 dark:border-black"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="text-right flex flex-col justify-between h-full">
                      <div>
                        <h4 className="text-lg font-semibold">EGP {item.price}</h4>
                        <span className="text-gray-500 text-sm">each</span>
                      </div>

                      <button
                        onClick={() => removeCartItem(item.product._id)}
                        aria-label="remove"
                        className="text-sm hover:underline cursor-pointer flex items-center text-destructive"
                      >
                        {isRemoving === item.product._id && <Loader className="animate-spin" />}
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cart Summary Section */}
              <div className="rounded-xl border p-6 lg:col-span-1 shadow-sm bg-card h-fit">
                <h2 className="text-2xl font-bold mb-4 font-serif">Cart Summary</h2>

                <div className="flex justify-between mb-2">
                  <span className="text-muted-foreground">Subtotal ({cartData.numOfCartItems} items)</span>
                  <span className="font-semibold">EGP {cartData.data.totalCartPrice}</span>
                </div>

                <div className="flex justify-between mb-4">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-semibold text-teal-600">Free</span>
                </div>

                <div className="border-t pt-4 mt-4 font-bold text-lg flex justify-between">
                  <span>Total</span>
                  <span>{cartData.data.totalCartPrice}</span>
                </div>
<Checkout cartId={cartData?.cartId} />

                {/* Clear Cart */}
                <div className="flex justify-end">
                  <Button
                    onClick={ClearCartItem}
                    variant="outline"
                    className="mt-4 px-6 py-2 bg-transparent hover:text-red-500 border hover:border-red-400 rounded-xl flex items-center gap-2 cursor-pointer hover:bg-red-100"
                  >
                    {isClear ? <Loader className="animate-spin" /> : <Trash2 />}
                     Clear Cart
                  </Button>
                </div>
              </div>

            </div>
          </div>
        )
        : (
       <div className='flex  flex-col  min-h-[75vh] items-center justify-center  '>
           <h2 className="mt-40 text-center text-3xl py-6 ">Your Cart Is Empty...🥲</h2>
           <Link href={'/products'}>
           <Button>Add Products to Cart</Button>
           </Link>
       </div>
        )}
  </>
);
}

