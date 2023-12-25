'use client'
import { CarouselDefault } from '@/components/carousel'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FC } from 'react';


import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import Image from 'next/image';
import Navbar from '@/components/navbar';

interface Gigs{
    _id: string,
    title: string,
    refId: string,
    image1: string,
    image2: string,
    image3: string,
    price: number,
    status: boolean

}

export default function Page() {
  let token: string | null;

    const [gig, setGig] = useState<Gigs[]>([])
    const styles ={
        outerdiv : null,
        innerdiv : 'w-64 rounded-2xl p-3 m-0 p-0',
        autosec : 8000
    }
    useEffect(()=>{
         token = localStorage.getItem('token')
        const fetchData = async () =>{
            try {
                console.log('send' ,token);
                
                const response = await  axios.get('http://localhost:8000/mygigs',
                {headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',  
                  },});
                  console.log('response send', response.data.usergigs);
                if(response.status === 200){
                    setGig(response.data.usergigs)
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchData()
    }, [])

        const handleDelete = async (refId: string) => {
          try {
            const response = await axios.post(
              'http://localhost:8001/deletegig',
              { refId },
              {
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json',
                },
              }
            );
            if (response.status === 200) {
              console.log('Gig deleted successfully');
            }
            console.log(response);
            
          } catch (error) {
            console.log(error);
          }
        
    
  }


  return (
    <>
    <Navbar/>
    { gig.map((x)=>
    <div key={x.refId} className='w-72 h-auto flex flex-col justify-start border rounded mt-3 mb-3 ml-3'>
    <div >
        <Swiper
      spaceBetween={50}
      slidesPerView={1}
      modules={[Autoplay]}
      autoplay={{delay:5000}}
      loop={true}
      className='h-auto w-full'
    >
      <SwiperSlide>
      <div >
      <img src={x.image1}     
        className="w-full h-36 object-fill m-0 p-0"
      alt="Picture of the author"/>
      </div>
      </SwiperSlide>
      <SwiperSlide>
      <div >
      <img src={x.image2}     
        className="w-full h-36 object-fill m-0 p-0"
      alt="Picture of the author"/>
      </div>
      </SwiperSlide>
      <SwiperSlide>
      <div >
      <img src={x.image3}     
        className="w-full h-36 object-fill m-0 p-0"
      alt="Picture of the author"/>
      </div>
      </SwiperSlide>
    </Swiper>
        </div>
        <div>
        <p className='pl-3'>{x.title}</p> 
        </div>
        <div>
        <p className='pl-3'>star rating here</p>
        </div>
        <div>
            <p className='pl-3'>From: {x.price}</p>
        </div>
        <div>
            <p className='pl-3'>status: {x.status ? 'approved' : 'rejected'}</p>
        </div>
    <div className='pl-3'>
        <a href={`/editgig/${x.refId}`} className='text-blue-900'>Edit</a>
    </div>
    <div className='pl-3'>
        <button onClick={() => handleDelete(x.refId)} className='text-red-900'>Delete</button>
    </div>
    </div>
    )}
    </>
  )
}
