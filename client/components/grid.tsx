"use client";
import "swiper/css";
import Image from "next/image";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import React from "react";
import { Gigs } from "@/types/gigTypes";
import Link from "next/link";
import { Skeleton } from "antd";

interface GridProps {
  props: Gigs[];
}

const Grid = ({ props }: any) => {
  if (!props) {
    return (
      <div className="flex flex-col">
        <div className="flex justify-center">
          <div className="w-56 h-auto flex flex-col justify-start rounded-2xl mt-3 mb-3 ml-3">
            <Skeleton active />
          </div>
          <div className="w-56 h-auto flex flex-col justify-start rounded-2xl mt-3 mb-3 ml-3">
            <Skeleton active />
          </div>
          <div className="w-56 h-auto flex flex-col justify-start rounded-2xl mt-3 mb-3 ml-3">
            <Skeleton active />
          </div>
          <div className="w-56 h-auto flex flex-col justify-start rounded-2xl mt-3 mb-3 ml-3">
            <Skeleton active />
          </div>
          <div className="w-56 h-auto flex flex-col justify-start rounded-2xl mt-3 mb-3 ml-3">
            <Skeleton active />
          </div>
        </div>
        <div className="flex justify-center">
          <div className="w-56 h-auto flex flex-col justify-start rounded-2xl mt-3 mb-3 ml-3">
            <Skeleton active />
          </div>
          <div className="w-56 h-auto flex flex-col justify-start rounded-2xl mt-3 mb-3 ml-3">
            <Skeleton active />
          </div>
          <div className="w-56 h-auto flex flex-col justify-start rounded-2xl mt-3 mb-3 ml-3">
            <Skeleton active />
          </div>
          <div className="w-56 h-auto flex flex-col justify-start rounded-2xl mt-3 mb-3 ml-3">
            <Skeleton active />
          </div>
          <div className="w-56 h-auto flex flex-col justify-start rounded-2xl mt-3 mb-3 ml-3">
            <Skeleton active />
          </div>
        </div>
        <div className="flex justify-center">
          <div className="w-56 h-auto flex flex-col justify-start rounded-2xl mt-3 mb-3 ml-3">
            <Skeleton active />
          </div>
          <div className="w-56 h-auto flex flex-col justify-start rounded-2xl mt-3 mb-3 ml-3">
            <Skeleton active />
          </div>
          <div className="w-56 h-auto flex flex-col justify-start rounded-2xl mt-3 mb-3 ml-3">
            <Skeleton active />
          </div>
          <div className="w-56 h-auto flex flex-col justify-start rounded-2xl mt-3 mb-3 ml-3">
            <Skeleton active />
          </div>
          <div className="w-56 h-auto flex flex-col justify-start rounded-2xl mt-3 mb-3 ml-3">
            <Skeleton active />
          </div>
        </div>
        <div className="flex justify-center">
          <div className="w-56 h-auto flex flex-col justify-start rounded-2xl mt-3 mb-3 ml-3">
            <Skeleton active />
          </div>
          <div className="w-56 h-auto flex flex-col justify-start rounded-2xl mt-3 mb-3 ml-3">
            <Skeleton active />
          </div>
          <div className="w-56 h-auto flex flex-col justify-start rounded-2xl mt-3 mb-3 ml-3">
            <Skeleton active />
          </div>
          <div className="w-56 h-auto flex flex-col justify-start rounded-2xl mt-3 mb-3 ml-3">
            <Skeleton active />
          </div>
          <div className="w-56 h-auto flex flex-col justify-start rounded-2xl mt-3 mb-3 ml-3">
            <Skeleton active />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-row flex-wrap mb-5'>
      {props.map((x: any) => (
        <div key={x.refId} className='w-56 h-auto flex flex-col justify-start border rounded-2xl mt-3 mb-3 ml-3'>
          <div>
            {/* Initialize Swiper component for image carousel */}
            <Swiper
              spaceBetween={50}
              slidesPerView={1}
              modules={[Autoplay]}
              autoplay={{ delay: 5000 }}
              loop={true}
              className='h-auto w-full'
            >
              <SwiperSlide>
                <div>
                  <Image
                  height={500}
                  width={500}
                    src={x.image1}
                    className='w-full h-36 object-fill m-0 p-0 rounded-2xl'
                    alt='Slide 1'
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div>
                  <Image
                  height={500}
                  width={500}
                    src={x.image2}
                    className='w-full h-36 object-fill m-0 p-0 rounded-2xl'
                    alt='Slide 2'
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div>
                  <Image
                  height={500}
                  width={500}
                    src={x.image3}
                    className='w-full h-36 object-fill m-0 p-0 rounded-sm'
                    alt='Slide 3'
                  />
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
          <div>
            <p className='pl-3 font-bold'>{x.title}</p>
          </div>
          <div>
            {/* You can replace this placeholder with your actual star rating component */}
            {/* <p className='pl-3'>{x.gigdescription}</p> */}
          </div>
          <div>
            <p className='pl-3 font-semibold'>From: {x.price}</p>
          </div>
          {/* <div className='pl-3'>
            <a href={`/editgig/${x.refId}`} className='text-blue-900'>
              Edit
            </a>
          </div> */}
          <div className='pl-3'>
          <Link href={`/gigview/${x.refId}`}>
          <button className='text-white bg-green-600 hover:bg-green-900 rounded-md w-11/12 mb-4'>
              View Details
            </button>
            </Link>
          </div>

        </div>
      ))}
    </div>
  );
};

export default Grid;
