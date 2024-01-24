"use client";
import Navbar from "@/components/navbar";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Tooltip } from "antd";

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

let bearerToken: string | null;

export default function Page() {
  const [data, setData] = useState<OrderData[]>([]);
  const [cancel, setCancel] = useState(false);
  const [review, setReview] = useState(false);
  const [displayReview, setDisplayReview] = useState(false)

  const formatDate = (ts: string) => {
    const date = new Date(ts);
    const formatedDate = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    }).format(date);
    return formatedDate;
  };
  const hourDiff = (time: string) => {
    const orderCompletionTime: Date = new Date(time);
    const currentTime: Date = new Date();
    
    const timeDifference: number = currentTime.getTime() - orderCompletionTime.getTime();
    
    const hoursDifference: number = timeDifference / (1000 * 60 * 60);
    if (hoursDifference > 24) {
    return true
  }
  return false
}
  const handleReview = async (orderId: any) => {
    setReview(true);
    try {
      const response = await axios.post(
        `http://localhost:8003/orderReview`,
        { orderId },
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        }
      );
      const userData = response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const formatTime = (ts: string) => {
    const date = new Date(ts);
    const formattedTime = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    }).format(date);
    return formattedTime;
  };

  useEffect(() => {
    bearerToken = localStorage.getItem("token");
  }, []);

  const handleOrder = async (userId: any) => {
    try {
      const response = await axios.post(
        `http://localhost:8004/accesschat`,
        { userId },
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        }
      );
      const userData = response.data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get<OrderData[]>(
          "http://localhost:8003/myorders",
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
  }, [cancel, review]);

  console.log(data);
  const handleCancel = async (orderId: string) => {
    setCancel(true);
    const sendId = {
      orderId: orderId,
    };
    const response = await axios.post(
      "http://localhost:8003/ordercancel",
      sendId,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };

  return (
    <>
      <Navbar />
      <div className="bg-white p-8 min-h-screen">
        <h1 className="text-3xl font-bold mb-8">Order History</h1>
        {data.map((x) => (
          <div
            key={x._id}
            className={`mb-4 p-4 ${
              x.orderStatus === "cancelled" ? "bg-red-100" : "bg-green-100"
            } rounded-md`}
          >
            <p className="text-lg font-semibold">Order: {x.gigTitle}</p>
            <p className="text-gray-500">Order date: {formatDate(x.date)}</p>
            <p className="text-gray-500">Order Time: {formatTime(x.date)}</p>
            <p className="text-gray-500">Order Status: {x.orderStatus}</p>
            <p className="text-gray-500">Payment Status: {x.paymentStatus}</p>
            <p className="text-green-700 font-bold">${x.gigPrice}</p>
            {x.orderStatus !== "cancelled" &&
              x.orderStatus !== "ongoing" &&
              x.orderStatus !== "completed" && (
                <button
                  className="w-64 text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                  onClick={() => handleCancel(x._id)}
                >
                  cancel
                </button>
              )}
            <Link href={`/messages`}>
              {x.orderStatus !== "cancelled" &&
                x.orderStatus !== "completed" && (
                  <button
                    onClick={() => handleOrder(x.sellerId)}
                    className="w-64 ml-3 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700  dark:focus:ring-blue-800"
                  >
                    Message Seller
                  </button>
                )}
            </Link>
            {x.orderStatus === "completed" && (
              <div className="font-semibold">
                Your order has been delivered to the Email: {x.buyeremail}
              </div>
            )}
            {(x.orderStatus === "completed" && hourDiff(x.date)) && (
              <Tooltip
                title="If you are not satified with your delivery you can request a review within 24 hours of delivery"
                placement="right"
                arrow={false}
              >
                <button
                  className="w-64 text-white bg-sky-600 hover:bg-sky-700 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800"
                  onClick={() => handleReview(x._id)}
                >
                  Review
                </button>
              </Tooltip>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
