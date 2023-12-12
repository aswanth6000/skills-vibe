'use client'
import React from 'react'
import { CarouselDefault } from "@/components/carousel"
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faStar } from '@fortawesome/free-solid-svg-icons';



export default function Card() {
    const styles ={
        outerdiv : null,
        innerdiv : 'w-64 rounded-2xl p-3 m-0 p-0',
        autosec : 8000
    }
  return (
    <div className='w-64 h-auto flex flex-col justify-start border rounded mt-3 mb-3 ml-3'>
        <div >
            <CarouselDefault stl={styles}/>
        </div>
        <div>
        <p className='pl-3'>I make your video editting job much easier</p> 
        </div>
        <div>
        {/* <FontAwesomeIcon icon={faStar} size='xs' className="text-2xl" style={{ fontSize: '2em' }}/> */}
        <p className='pl-3'>star rating here</p>
        </div>
        <div>
            <p className='pl-3'>From: 4455</p>
        </div>
    </div>
  )
}
