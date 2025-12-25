import { LocationEditIcon, Mail, Phone } from 'lucide-react'
import Link from "next/link";
import React from "react";


export default function Footer() {
  return (
    <footer className="bg-gray-300/30 backdrop-blur-md shadow-md py-10 mt-16">
      <div className="container mx-auto px-6">
        
        {/* GRID MAIN */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* ABOUT SECTION */}
          <div>
              <div className='flex gap-1 pb-2  items-center'>
        <div className='w-10 h-10 bg-black flex items-center justify-center  '><h1 className='text-white font-bold'>S</h1></div>
         <h1><Link href={"/"}>ShopMart</Link></h1>
       </div>
            <p className="text-sm leading-6 text-gray-700 dark:text-white">
              Your one-stop destination for the latest technology, fashion, and lifestyle
              products. Quality guaranteed with fast shipping and excellent customer service.
            </p>

            <div className="space-y-3 mt-4">
              <div className="flex items-center gap-2">
                 <LocationEditIcon size={18} />
                <span>123 Shop Street, Octoper City, DC 12345</span>
              </div>

              <div className="flex items-center gap-2">
                <Phone size={18} />
                <span>(+20) 01093333333</span>
              </div>

              <div className="flex items-center gap-2">
                <Mail size={18} />
                <span>support@shopmart.com</span>
              </div>
            </div>
          </div>
   {/* SHOP */}
          <div>
            <h3 className="font-bold mb-3">SHOP</h3>
            <ul className="space-y-2 flex flex-col">
              <Link href="/products" className="hover:font-semibold font-light">Electronics</Link>
              <Link href="/products" className="hover:font-semibold font-light">Fashion</Link>
              <Link href="/products" className="hover:font-semibold font-light">Home & Garden</Link>
              <Link href="/products" className="hover:font-semibold font-light">Sports</Link>
              <Link href="/products" className="hover:font-semibold font-light">Deals</Link>
            </ul>
          </div>


               <div className='grid grid-cols-3 w-2xl gap-10'>
  
       
          {/* CUSTOMER SERVICE */}
          <div>
            <h3 className="font-bold mb-3">CUSTOMER SERVICE</h3>
            <ul className="space-y-2 flex flex-col">
              <Link href="/contact" className=" font-light hover:font-semibold">Contact Us</Link>
              <Link href="/help" className="font-light hover:font-semibold">Help Center</Link>
              <Link href="/orders" className="font-light hover:font-semibold">Track Your Order</Link>
              <Link href="/returns" className="font-light hover:font-semibold">Returns & Exchanges</Link>
              <Link href="/sizes" className="font-light hover:font-semibold">Size Guide</Link>
            </ul>
          </div>
              <div>  
        <h3 className='font-bold mb-3'>ABOUT</h3>
        <div className='flex flex-col'>
        <Link className='cursor-pointer font-light hover:font-semibold ' href={"/products"}>About shopmart</Link>
        <Link  className='cursor-pointer font-light hover:font-semibold ' href={"/products"}>Careers</Link>
        <Link className='cursor-pointer font-light hover:font-semibold ' href={"/products"}>Press</Link>
        <Link className='cursor-pointer font-light hover:font-semibold ' href={"/products"}>Investor Relations</Link>
        <Link className='cursor-pointer font-light hover:font-semibold ' href={"/products"}>Sustainability</Link>
       </div>
            </div> 
          {/* POLICIES */}
          <div>
            <h3 className="font-bold mb-3">POLICIES</h3>
            <ul className="space-y-2 flex flex-col">
              <Link href="/privacy" className="hover:font-semibold font-light">Privacy Policy</Link>
              <Link href="/terms" className="hover:font-semibold font-light">Terms & Conditions</Link>
              <Link href="/shipping" className="hover:font-semibold font-light">Shipping Policy</Link>
              <Link href="/security" className="hover:font-semibold font-light">Security</Link>
              <Link href="/cookies" className="hover:font-semibold font-light">Cookies Settings</Link>
            </ul>
          </div>
</div>

        </div>

      

      </div>
    </footer>
  );
}

