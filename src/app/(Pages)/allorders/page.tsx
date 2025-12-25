'use client'

import { Button } from '@/components/ui/button'
import { Order } from '@/interfaces'
import { useState, useEffect } from 'react'

export default function AllOrder() {
  const [orders, setOrders] = useState<Order[]>([])
  const [openOrder, setOpenOrder] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  function toggleItems(id: string) {
    setOpenOrder(openOrder === id ? null : id)
  }

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await fetch('https://ecommerce.routemisr.com/api/v1/orders/')
        const data = await res.json()
        setOrders(data.data as Order[])
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [])
 function formatDate(dateString: string): string {
  const d = new Date(dateString)
  const day = d.getDate().toString().padStart(2, '0')
  const month = (d.getMonth() + 1).toString().padStart(2, '0')
  const year = d.getFullYear()
  return `${day}/${month}/${year}`
}




  return (
    <>
      <h1 className='mt-25 text-3xl font-serif '>All Orders</h1>

      <div className='mt-5 space-y-5'>
        {orders.map((order) => (
          <div
            key={order._id}
            className='w-full border shadow-sm rounded-xl p-5 '
          >
            <h2 className='font-serif text-xl'>
              Order #{order._id.slice(-6)}
            </h2>

            <p className='font-serif opacity-60'>
              OrderDate:
              <span className='ml-1'>
                {formatDate(order.createdAt)}
              </span>
            </p>

            <p className='opacity-60'>Payment: {order.paymentMethodType} </p>
            <p className='opacity-60'>Delivered: {order.isDelivered ? 'Yes' : 'No'}</p>
            <p className='opacity-60'>Total: {order.totalOrderPrice} EGP</p>

            <div className='mt-4'>
              <h3 className='font-serif text-lg'>Shipping Address</h3>
              <p className='opacity-60'>City: {order.shippingAddress?.city}</p>
              <p className='opacity-60'>Details: {order.shippingAddress?.details}</p>
              <p className='opacity-60'>Phone: {order.shippingAddress?.phone}</p>
            </div>

            <Button onClick={() => toggleItems(order._id)} className='mt-4'>
              View Order Items
            </Button>

            <p className="flex mx-3 justify-end opacity-60">
              <span className='font-serif'>Last Updated: </span> 
              {new Date(order.createdAt).toLocaleString('en-GB')}
            </p>

            {/* Product Items */}
            {openOrder === order._id && (
              <div className="mt-5 space-y-4 p-4 border rounded-lg bg-gray-50">
                {order.cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center gap-4 p-3 bg-white rounded-lg shadow dark:bg-black dark:text-white"
                  >
                    <img
                      src={item.product.imageCover}
                      alt={item.product.title}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div>
                      <h4 className="font-semibold">{item.product.title}</h4>
                      <p>Qty: {item.count}</p>
                      <p>Price: {item.price} EGP</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  )
}
