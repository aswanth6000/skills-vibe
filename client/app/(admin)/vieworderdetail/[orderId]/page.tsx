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
  orderStatus: string;
}

interface GigData {
  orderStatus: string;
  title: string;
  gigdescription: string;
  gigstatus: boolean;
  price: number;
  tags: string;
  image1: string;
  image2: string;
  image3: string;
  video: string;
  refId: string;
  username: string;
  phone: number;
  email: string;
  profilePicture: string;
  status: boolean;
  paymentStatus: string
}

function Page() {
  const params = useParams();
  const [sellerData, setSellerData]: any = useState();
  const [buyerData, setBuyerData]: any = useState();
  const [gigData, setGigData] = useState<GigData>({
    refId: "",
    username: "",
    phone: 0,
    email: "",
    profilePicture: "",
    status: false,
    title: "",
    gigdescription: "",
    gigstatus: false,
    price: 0,
    tags: "",
    image1: "",
    image2: "",
    image3: "",
    video: "",
    orderStatus: "",
    paymentStatus: "",
  });
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
    orderStatus: "",
  });
  const orderId = params.orderId;

  const handleWithdraw = async() =>{

    const { data } = await axios.post(
        `http://localhost:8003/withdraw`,
        { paymentStatus: 'withdrawable', orderId }
      );
      console.log("with", data);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.post(
          `http://localhost:8003/viewOrderDetail`,
          { orderId }
        );

        // Log to check if data is retrieved correctly
        console.log("Order Detail:", data);

        const response = await axios.post(
          `http://localhost:8001/viewGigDetail`,
          { gigId: data.gigId }
        );
        // Log to check if gig data is retrieved correctly
        console.log("Gig Detail:", response.data[0]);

        setGigData(response.data[0]);
        setData(data);

        const uId = {
          sellerId: data.sellerId,
          buyerId: data.buyerId,
        };
        console.log("userId's", uId);

        const res = await axios.post(
          "http://localhost:8001/userSpecificDetails",
          { userId: data.sellerId }
        );
        // Log to check if seller data is retrieved correctly
        console.log("Seller Data:", res.data);
        setSellerData(res.data);

        const buyerResponse = await axios.post(
          "http://localhost:8001/userSpecificDetails",
          { userId: data.buyerId }
        );
        console.log("Buyer Data:", buyerResponse.data);
        setBuyerData(buyerResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [orderId]);
  console.log(gigData);

  return (
    <>
      <Navbar />
      <div className="relative">
        <div className="w-8/12 h-auto mb-10">
          <div className="text-2xl font-semibold m-4">{gigData.title}</div>
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
                    src={gigData.image1}
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
                    src={gigData.image2}
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
                    src={gigData.image3}
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
            {gigData.gigdescription}
          </div>
          <h1>Buyer</h1>
          {/* <div className="w-11/12 h-36  border-2 rounded-md m-4 ">
            <div className="flex flex-row items-center">
              <Image
                src={buyerData.profilePicture}
                height={100}
                width={100}
                className="rounded-full mt-5 ml-5 w-28 h-28 "
                alt="Picture of the author"
              />
              <h1 className="text-lg font-semibold ml-4">{buyerData.username}</h1>
              <p>{buyerData.description}</p>
            </div>
            <div></div>
          </div> */}
          <h1>Seller</h1>
          {/* <div className="w-11/12 h-36  border-2 rounded-md m-4 ">
            <div className="flex flex-row items-center">
              <Image
                src={sellerData.profilePicture}
                height={100}
                width={100}
                className="rounded-full mt-5 ml-5 w-28 h-28 "
                alt="Picture of the author"
              />
              <h1 className="text-lg font-semibold ml-4">{buyerData.username}</h1>
              <p>{buyerData.description}</p>
            </div>
            <div></div>
          </div> */}
        </div>
        <div className="w-4/12 h-screen border-l-2 fixed z-0 top-0 right-0 flex justify-center items-center">
          <div className="h-64 w-9/12 border-2 rounded-md flex flex-col items-center">
            <div className="m-4">
              <p className="font-semibold mb-2">{gigData.title}</p>
              <p className="font-normal text-sm">{gigData.gigdescription}</p>
              <p className="font-semibold mt-2">₹ {gigData.price}</p>
            </div>
            {gigData.paymentStatus === "completed" && <button
              className="bg-black text-white font-semibold rounded-md p-4 w-9/12 b-9"
              onClick={handleWithdraw}
            >
              Release payment
            </button>}
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
