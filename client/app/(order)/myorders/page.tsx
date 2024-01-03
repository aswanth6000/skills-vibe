"use client";
import Navbar from "@/components/navbar";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Page() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8003/myorders", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
    };
    fetchData();
  }, []);
  return (
    <>
      <Navbar />
      <div className="bg-white p-8 min-h-screen">
        <h1 className="text-3xl font-bold mb-8">Order History</h1>
        <div className="mb-4 p-4 bg-green-100 rounded-md">
          <p className="text-lg font-semibold">Order </p>
          <p className="text-gray-500">12/4/909</p>
          <p className="text-green-700 font-bold">$89898</p>
        </div>
      </div>
    </>
  );
}
