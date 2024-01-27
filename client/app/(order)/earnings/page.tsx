"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/components/navbar";
import NextBreadcrumb from "@/components/NextBreadcrumb";

interface OrderData {
  buyerId: string;
  buyerProfile: string;
  buyeremail: string;
  buyername: string;
  buyerphone: string;
  date: string;
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


const Page = () => {
  const [earn, setEarn ]: any = useState([])
  const [data, setData] = useState<OrderData[]>([]);
  useEffect(() => {
    bearerToken = localStorage.getItem("token");
  }, []);
  useEffect(()=>{
    const fetchEarnings = async() =>{
      try {
        const { data } = await axios.get(
          `http://localhost:8003/earnings`,
          {
            headers: {
              Authorization: `Bearer ${bearerToken}`,
            },
          }
        );
        setEarn(data[0])
      } catch (error) {
        console.log(error); 
      }
      
  }
  fetchEarnings()
  } ,[])

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
  return (
    <>
      <Navbar />
      <NextBreadcrumb
        homeElement={'Home'}
        separator={<span> /  </span>}
        activeClasses='text-amber-500'
        containerClasses='flex py-2 bg-bodywhite' 
        listClasses='hover:underline mx-2 font-bold'
        capitalizeLinks
      />
      <div className="p-8 bg-white text-bodydark2">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Available Funds</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-100 p-4 rounded-md">
              <p className="text-xl font-bold mb-2">
                Balance available for use
              </p>
             {earn ? <p>${earn.totalPrice}</p> : <p>₹ 0</p> }
            </div>
            <div className="bg-green-100 p-4 rounded-md">
              <p className="text-xl font-bold mb-2">Withdraw balance</p>
              <p>Manage payout methods</p>
            </div>
          </div>
        </section>



        <section>
          <h2 className="text-2xl font-semibold mb-4">Earnings & Expenses</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-100 p-4 rounded-md">
              <p className="text-xl font-bold mb-2">Earnings to date</p>
              <p>₹ 4.00</p>
              <p>Your earnings before taxes since joining.</p>
            </div>
            <div className="bg-green-100 p-4 rounded-md">
              <p className="text-xl font-bold mb-2">Expenses to date</p>
              <p>₹ 0.00</p>
              <p>Earnings spent on purchases since joining.</p>
            </div>
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Transaction History</h2>
          <table className="min-w-full border-2">
            <thead className="border">
              <tr>
                <th className="border-2">Date</th>
                <th className="border-2">Title</th>
                <th className="border-2">From</th>
                <th className="border-2">Order ID</th>
                <th className="border-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item._id}>
                  <td className="border-2">{item.date.split("T")[0]}</td>
                  <td className="border-2">{item.gigTitle}</td>
                  <td className="border-2">{item.buyername}</td>
                  <td className="border-2">{item._id}</td>
                  <td className="border-2 text-green-700 font-bold">
                    ${item.gigPrice}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </>
  );
};

export default Page;
