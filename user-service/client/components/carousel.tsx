'use client'


import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import Image from 'next/image';
 
export function CarouselDefault({className}) {
  return (
    <>
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      onSlideChange={() => console.log('slide change')}
      modules={[Autoplay]}
      autoplay={{delay:5000}}
      onSwiper={(swiper) => console.log(swiper)}
      loop={true}
      className='h-96 w-full'
    >
      <SwiperSlide>
      <div className='flex h-full w-full items-center justify-center'>
      <img src='https://c4.wallpaperflare.com/wallpaper/553/119/620/windows-10-windows-10x-windows-11-minimalism-material-minimal-hd-wallpaper-preview.jpg'     
        className='w-full h-96 object-fill m-0 p-0'
      alt="Picture of the author"/>
      </div>
      </SwiperSlide>
      <SwiperSlide>
      <div className='flex h-full w-full items-center justify-center'>
      <img src='https://wallpaperaccess.com/full/7178383.jpg'     
        className='w-full h-96 object-fill m-0 p-0'
      alt="Picture of the author"/>
      </div>
      </SwiperSlide>
    </Swiper>
    </>
  );
}