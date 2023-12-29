"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import { CarouselDefault } from "@/components/carousel";
import axios from "axios";
import { useParams } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Image from "next/image";

const styles = {
  outerdiv: "flex h-full w-full items-center justify-center",
  innerdiv: "w-full h-96 object-fill m-0 p-0",
  autosec: 6000,
};
interface OrderGig {
  title: string;
  image1: string;
  image2: string;
  image3: string;
  gigdescription: string;
  description: string;
  username: string;
  price: number;
  profilePicture: string;
}

export default function Page() {
  let bearerToken: string | null;
  const params = useParams<{ tag: string; gigid: string }>();
  const [data, setData] = useState<OrderGig>({
    title: "",
    image1: "",
    image2: "",
    gigdescription: "",
    description: "",
    image3: "",
    username: "",
    price: 0,
    profilePicture: ''
  });
  const gigid = params.gigid;

  async function buyNow(){
    try {
      const response = await axios.get(`http://localhost:8000/ordergig/${gigid}`, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          "Content-Type": "application/json",
        }
      })
      console.log(response);
      
    } catch (error) {
      console.log(error);
      
    }
  }

  useEffect(() => {
    bearerToken = localStorage.getItem("token");
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/viewgig/${gigid}`,
          {
            headers: {
              Authorization: `Bearer ${bearerToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        setData(response.data.gig[0]);
      } catch (error) {
        console.log("error occurred", error);
      }
    };
    fetchData();
  }, []);
  console.log(data);

  return (
    <>
      <Navbar />
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        modules={[Autoplay]}
        autoplay={{ delay: 5000 }}
        loop={true}
        className="h-auto w-full"
      >
        <SwiperSlide>
          <div>
            <Image
              src={data.image1}
              height={500}
              width={500}
              className={styles.innerdiv}
              alt="Picture of the author"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div>
            <Image
              src={data.image2}
              height={500}
              width={500}
              className={styles.innerdiv}
              alt="Picture of the author"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div>
            <Image
              src={data.image3}
              height={500}
              width={500}
              className={styles.innerdiv}
              alt="Picture of the author"
            />
          </div>
        </SwiperSlide>
      </Swiper>
      <div className="flex flex-row">
        <div className="w-3/4 bg-slate-400 h-screen">
          <div className="flex flex-row items-center ">
            <div className="">
              <Image
                src={data.profilePicture}
                height={200}
                width={200}
                className='rounded-full mt-5 ml-5 '
                alt="Picture of the author"
              />
            </div>
            <div className="flex flex-col ml-4 w-auto flex-wrap">
              <div className="text-2xl font-bold ">
                <h2>{data.username}</h2>
              </div>
              <div className="text-xl font-bold">
                <p>{data.title}</p>
              </div>
              <div>
                <p>{data.gigdescription}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/4 bg-black h-screen flex justify-center">
          <div className="w-11/12 rounded-2xl h-64 mt-16 bg-white">
            <h1 className="font-bold ml-4">Price: {data.price}</h1>
            <button className="w-11/12 h-16 bg-red-600 rounded-md hover:bg-red-900 m-2"
            onClick={buyNow}>
              Buy Now
            </button>
            <button className="w-11/12 h-16 bg-red-600 rounded-md hover:bg-red-900 m-2">
              Message Seller
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
