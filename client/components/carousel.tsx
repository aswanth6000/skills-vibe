'use client'
import { FC } from 'react';


import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import Image from 'next/image';
 
interface CarouselDefaultProps {
  stl: {
    outerdiv: string | null;
    innerdiv: string;
    autosec: number;
  };
}
export const CarouselDefault: FC<CarouselDefaultProps> = ({stl}) => {
  
  return (
    <>
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
      <img src='https://c4.wallpaperflare.com/wallpaper/553/119/620/windows-10-windows-10x-windows-11-minimalism-material-minimal-hd-wallpaper-preview.jpg'     
        className={stl.innerdiv}
      alt="Picture of the author"/>
      </div>
      </SwiperSlide>
      <SwiperSlide>
      <div >
      <img src='https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg'     
        className={stl.innerdiv}
      alt="Picture of the author"/>
      </div>
      </SwiperSlide>
      <SwiperSlide>
      <div >
      <img src='https://i.redd.it/lsknlqcnihza1.jpg'     
        className={stl.innerdiv}
      alt="Picture of the author"/>
      </div>
      </SwiperSlide>
    </Swiper>
    </>
  );
}