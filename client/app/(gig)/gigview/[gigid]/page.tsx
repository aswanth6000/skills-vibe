"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import { CarouselDefault } from "@/components/carousel";
import axios from "../../../../config/axios";
import { useParams } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
  const router = useRouter();
  let bearerToken: string | null = localStorage.getItem("token");
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
    profilePicture: "",
  });
  const gigid = params.gigid;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/viewgig/${gigid}`, {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
            "Content-Type": "application/json",
          },
        });
        setData(response.data.gig[0]);
      } catch (error) {
        console.log("error occurred", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="relative">
        <div className="w-8/12 h-auto mb-10">
          <div className="text-2xl font-semibold m-4">{data.title}</div>
          <div className="w-9/12 h-96 m-4 rounded-md">
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
          </div>
          <div className="m-4">
            {" "}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium
            quo dicta impedit quam officiis excepturi dolor laudantium dolore
            quaerat, molestias adipisci quia culpa doloribus animi quis velit
            eveniet incidunt placeat!
          </div>
          <div className="w-11/12 h-36  border-2 rounded-md m-4 ">
            <div className="flex flex-row items-center">
              <Image
                src={data.profilePicture}
                height={100}
                width={100}
                className="rounded-full mt-5 ml-5 w-28 h-28 "
                alt="Picture of the author"
              />
              <h1 className="text-lg font-semibold ml-4">{data.username}</h1>
              <p>{data.description}</p>
            </div>
            <div></div>
          </div>
        </div>
        <div className="w-4/12 h-screen border-l-2 fixed z-0 top-0 right-0 flex justify-center items-center">
          <div className="h-64 w-9/12 border-2 rounded-md flex flex-col items-center">
            <div className="m-4">
              <p className="font-semibold mb-2">{data.title}</p>
              <p className="font-normal text-sm">{data.gigdescription}</p>
              <p className="font-semibold mt-2">₹ {data.price}</p>
            </div>
            <button className="bg-black text-white font-semibold rounded-md p-4 w-9/12 b-9">
              <Link href={`/orderconfirm/${gigid}`}>Buy Now</Link>
            </button>
          </div>
        </div>
      </div>

      {/* 
      <div className="flex flex-row">
        <div className="w-3/4 bg-slate-400 h-screen">
          <div className="flex flex-row items-center ">
            <div className="">

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
              >
               
            </button>
            <button className="w-11/12 h-16 bg-red-600 rounded-md hover:bg-red-900 m-2">
              Message Seller
            </button>
          </div>
        </div>
      </div> */}
    </>
  );
}
