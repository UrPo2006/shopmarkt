
import { Button } from "@/components/ui/button";
import User from "@/components/ui/User/User";


import Link from "next/link";

export default function Home() {

  return <>
 <div className="flex flex-col justify-center items-center min-h-screen  px-4  text-center">
  <User/>
  <h3 className="font-bold mb-4 
                 text-3xl sm:text-4xl md:text-6xl
                 mt-10 md:mt-20">
    Welcome to ShopMart
  </h3>

  <p className="text-gray-600 mt-4 
                text-sm sm:text-base md:text-lg 
                max-w-[300px] sm:max-w-[500px] md:max-w-[800px]">
    Discover the latest technology, fashion, and lifestyle products. Quality guaranteed with
  </p>

  <p className="text-gray-600 mt-2 
                text-sm sm:text-lg 
                max-w-[280px] sm:max-w-[500px] md:max-w-[600px]">
    fast shipping and excellent customer service.
  </p>

  <div className="flex flex-col sm:flex-row gap-4 mt-6  justify-center">
    <Button className="p-4 sm:p-6   
                       hover:text-black hover:bg-white hover:border-2 hover:border-black">
      <Link href='/products'>Shop Now</Link>
    </Button>

    <Button className="p-4 sm:p-6   
                       text-black bg-white border-2 border-black 
                       hover:text-white hover:bg-black hover:border-white">
      <Link href='/Categories'>Browse Categories</Link>
    </Button>
  </div>

</div>

    
  
  </>
}
