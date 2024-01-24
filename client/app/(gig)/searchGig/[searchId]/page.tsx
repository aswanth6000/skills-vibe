"use client";
import Navbar from "@/components/navbar";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import { Gigs } from "@/types/gigTypes";
import Link from "next/link";


let bearerToken: string | null;
interface GridProps {
  data: Gigs[];
}

const Page: React.FC<GridProps> = () => {
  const [data, setData] = useState<Gigs[]>([])
  const params = useParams();
  const searchId = params.searchId;
  console.log(searchId);

  useEffect(() => {
    bearerToken = localStorage.getItem("token");
  }, []);

  useEffect(()=>{
   async function fetchData (){
      const { data } = await axios.get(
        `http://localhost:8001/searchGig/${searchId}`,
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        }
        );
        setData(data)
    }
    fetchData()
  }, [])

  console.log(data);
  

  return (
    <>
      <Navbar />

      <div className='flex flex-row flex-wrap mb-5'>
      {data.map((x) => (
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
            <p className='pl-3'>Star rating here</p>
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
    </>
  );
}

export default Page;
