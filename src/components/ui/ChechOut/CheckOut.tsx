'use client' 
 import React, { useContext, useRef } from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import { CartContext } from "../Context/CartContext";
import { Button } from '@/components/ui/button';




export default function CheckOut({cartId}:{cartId:string}) {


      const { setCartData} = useContext(CartContext);
    const detailsInput=useRef<HTMLInputElement | null>(null)
     const CityInput=useRef<HTMLInputElement | null>(null)
      const PhoneInput=useRef<HTMLInputElement | null>(null)

    // cash order
    async function createOrder() {
      try {
          const shippingAddress = {
          details:detailsInput.current?.value,
          phone:PhoneInput.current?.value,
          city:CityInput.current?.value,
        }
        const res = await fetch("/api/orders/cash", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cartId, shippingAddress }),
    });
    
        const data = await res.json();
        console.log(data);
    
        if (data.status === "success") {
          toast.success("Order Created Successfully!");
     
          // بعد ما الأوردر ينجح امسحي الكارت
          setCartData(null);
            window.location.href = "/allorders";
        }
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong");
      }
    }
    // CheckOut
    
   async function CheckOutSession() {
  try {
    const shippingAddress = {
      details: detailsInput.current?.value,
      phone: PhoneInput.current?.value,
      city: CityInput.current?.value,
    };

    if (!shippingAddress.details || !shippingAddress.phone || !shippingAddress.city) {
      toast.error("Please fill all fields ❌");
      return;
    }

    const res = await fetch("/api/orders/online", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cartId, shippingAddress }),
    });

    // تأكد من أن الاستجابة OK
    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      console.error("API Error:", errorData);
      toast.error(errorData?.message || "Failed to create order ❌");
      return;
    }

    const data = await res.json();

    if (data.status === "success" && data.data?.session?.url) {
      toast.success("Order Created Successfully!");
      window.location.href = data.data.session.url;
    } else {
      console.error("Invalid API response:", data);
      toast.error("Failed to create order ❌");
    }

  } catch (error) {
    console.error("Unexpected error:", error);
    toast.error("Something went wrong ❌");
  }
}

  return (
    <>
      <div className="mt-6 space-y-3">
        <Dialog>
          <form>
            <DialogTrigger asChild>
              <Button className="cursor-pointer w-full bg-transparent border-2 border-black text-black py-3 rounded-lg hover:bg-primary/30 dark:border-white dark:text-white">
                Continue Shopping
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Address</DialogTitle>
                <DialogDescription>
                Add a shipping address for your deliveries..
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="grid gap-3">
                  <Label>City :</Label>
                  <Input ref={CityInput} id="City"  />
                </div>
                <div className="grid gap-3">
                  <Label>Details :</Label>
                  <Input
                    id="Details"
                    
                  ref={detailsInput}
                  />
                </div>
                <div className="grid gap-3">
                  <Label>Phone Number :</Label>
                  <Input
                    id="Phone Number"
                   
                  ref={PhoneInput}
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button onClick={()=>createOrder()} type="submit">Checkout</Button>
              </DialogFooter>
            </DialogContent>
          </form>
        </Dialog>
        {/* =========================================================== */}
        <Dialog>
          <form>
            <DialogTrigger asChild>
              <Button className="cursor-pointer w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90 dark:text-black">
                Proceed to Checkout
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Address</DialogTitle>
                <DialogDescription>
                Add a shipping address for your deliveries..
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="grid gap-3">
                  <Label>City :</Label>
                  <Input ref={CityInput} id="City"  />
                </div>
                <div className="grid gap-3">
                  <Label>Details :</Label>
                  <Input
                    id="Details"
                    
                  ref={detailsInput}
                  />
                </div>
                <div className="grid gap-3">
                  <Label>Phone Number :</Label>
                  <Input
                    id="Phone Number"
                   
                  ref={PhoneInput}
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button onClick={()=>CheckOutSession()} type="submit">Visa</Button>
              </DialogFooter>
            </DialogContent>
          </form>
        </Dialog>
      </div>
    </>
  );
}
