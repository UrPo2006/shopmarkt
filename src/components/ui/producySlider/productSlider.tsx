'use client'
 import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
 
} from "@/components/ui/carousel"
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
export default function ProductSlider({images, title}:{images:string[], title:string}) {
  return<>
            <Carousel   opts={{
  
    loop: true,
  }}
  plugins={[
        Autoplay({
          delay: 1000,
        }),
      ]}>
  <CarouselContent>
{images.map((img, index) => (  
      <CarouselItem key={index}><Image className='w-300'  src={img} alt={title} width={300} height={300}/></CarouselItem>
))}
   
  
  </CarouselContent>
 
</Carousel>
  
  </>
}
