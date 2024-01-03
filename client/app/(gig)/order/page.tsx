"use client";
import Navbar from "@/components/navbar";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

interface OrderData {
  buyerId: string;
  buyerProfile: string;
  buyeremail: string;
  buyername: string;
  buyerphone: string;
  date: string; // Adjust the type to match the actual type of the 'date' property
  gigId: string;
  gigPrice: number;
  gigTitle: string;
  orderStatus: string;
  paymentStatus: string;
  sellerEmail: string;
  sellerId: string;
  sellerName: string;
  sellerPhone: string;
  sellerPic: string;
  tags: string[];
  __v: number;
  _id: string;
}

export default function Page() {
  const [data, setData] = useState<OrderData[]>([]);
  const handleApprove = () =>{

  } 
  const handleReject = () =>{
    
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get<OrderData[]>(
          "http://localhost:8003/orders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  console.log(data);
  return (
    <div>
      <Navbar />
      <div className="flex justify-center">
        {data.map((x) => (
          <div
            key={x._id}
            className="m-4 w-11/12 bg-bodywhite outline-dashed h-44 rounded-2xl"
          >
            <div className="flex justify-between m-3">
              <div className="flex flex-col  align-middle justify-center items-center">
                <Image
                  className="h-24 w-24 rounded-full"
                  src={x.buyerProfile}
                  width={500}
                  height={500}
                  alt="Picture of the buyer"
                />
                <h2>{x.buyername}</h2>
              </div>
              <div className="flex flex-col  align-middle justify-center">
                <div>
                  <p className="text-lg font-semibold">Order: {x.gigTitle}</p>
                  <p className="text-gray-500">
                    Payment Status: {x.paymentStatus}
                  </p>
                  <p className="text-green-700 font-bold">${x.gigPrice}</p>
                </div>
              </div>
              <div className="flex flex-col">
                <button className="h-10 w-60 bg-green-400 hover:bg-green-600 rounded-2xl m-1"
                onClick={handleApprove}>
                  Approve
                </button>
                <button className="h-10 w-60 bg-red-400 hover:bg-red-600 rounded-2xl m-1"
                onClick={handleReject}>
                  Reject
                </button>
                <button className="h-10 w-60 bg-blue-400 hover:bg-blue-600 rounded-2xl m-1">
                  Message
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
