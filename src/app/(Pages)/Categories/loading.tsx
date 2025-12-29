import { LoaderCircle } from 'lucide-react'
import React from 'react'

export default function Loading() {
  return (
  
      <div className="min-h-screen flex justify-center items-center">
          <div className="flex flex-col items-center gap-4">
            
           
            <div className="flex  items-center gap-2">
              <div className="w-14 h-14 bg-black dark:bg-white flex items-center justify-center rounded-xl">
                <h1 className="text-white dark:text-black font-bold text-2xl">S</h1>
              </div>
    
              <h3 className="text-3xl font-bold">ShopMart</h3>
            </div>
    
            
            <div className="relative">
             
              <LoaderCircle className="w-16 h-16 text-black dark:text-white animate-spin" />
    
             
              <LoaderCircle className="w-8 h-8 text-gray-500 dark:text-white absolute top-4 left-4 animate-spin" />
            </div>
    
          </div>
        </div>
  )
}

