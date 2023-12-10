import React from 'react'
import { CarouselDefault } from "@/components/carousel"
export default function Card() {
  return (
    <div className='w-64 h-auto flex flex-col justify-start border rounded mt-3 mb-3 ml-3'>
        <div className='w-64 rounded-2xl p-3'>
            <CarouselDefault/>
        </div>
        <div>
        <p className='pl-3'>I make your video editting job much easier</p> 
        </div>
        <div>
        <p className='pl-3'>star rating here</p>
        </div>
        <div>
            <p className='pl-3'>From: 4455</p>
        </div>
    </div>
  )
}
