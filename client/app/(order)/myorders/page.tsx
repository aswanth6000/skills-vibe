"use client";
import Navbar from "@/components/navbar";
import React, { useEffect, useState } from "react";
import axios from "axios";

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get<OrderData[]>("http://localhost:8003/myorders", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  console.log(data);

  return (
    <>
      <Navbar />
      <div className="bg-white p-8 min-h-screen">
        <h1 className="text-3xl font-bold mb-8">Order History</h1>
        {data.map((x) => (
          <div key={x._id} className="mb-4 p-4 bg-green-100 rounded-md">
            <p className="text-lg font-semibold">Order:  {x.gigTitle}</p>
            <p className="text-gray-500">Order date: {x.date}</p>
            <p className="text-gray-500">Order Status: {x.orderStatus}</p>
            <p className="text-gray-500">Payment Status: {x.paymentStatus}</p>
            <p className="text-green-700 font-bold">${x.gigPrice}</p>
          </div>
        ))}
      </div>
    </>
  );
}
