"use client";
import Navbar from "@/components/navbar";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { Button, Modal } from "antd";

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
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [file, setFile] = useState<File | undefined>(undefined);
  const [modalText, setModalText] = useState("Content of the modal");

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = async (orderData: any) => {
    const formData = {
      file,
      orderId: orderData,
    };
    try {
      setConfirmLoading(true);
      const response = await axios.post(
        "http://localhost:8003/deliver",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${bearerToken}`,
          },
        }
      );
      console.log(response);
      setConfirmLoading(false);
      if (!confirmLoading) {
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  const [data, setData] = useState<OrderData[]>([]);

  useEffect(() => {
    bearerToken = localStorage.getItem("token");
  }, []);

  const handleOrder = async (userId: any) => {
    console.log("handle order user Id", userId);

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
  const handleApprove = async (orderId: string) => {
    const sendStatus = {
      status: "ongoing",
      orderId: orderId,
    };

    const response = await axios.post(
      "http://localhost:8003/orderAccept",
      sendStatus,
      {
        headers: {
          Authorization: "application/json",
        },
      }
    );
    console.log(response.data);
  };
  const handleReject = async (orderId: string) => {
    const sendStatus = {
      status: "rejected by seller",
      orderId: orderId,
    };
    const response = await axios.post(
      "http://localhost:8003/orderReject",
      sendStatus,
      {
        headers: {
          Authorization: "application/json",
        },
      }
    );
    console.log(response.data);
  };

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
    <div>
      <Navbar />
      <div className="flex justify-center content-center items-center flex-col">
        {data.map((x) => (
          <div
            key={x._id}
            className="m-4 w-fit shadow-md  bg-bodywhite h-44 rounded-2xl"
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
                <h2 className="font-semibold">{x.buyername}</h2>
              </div>
              <div className="flex flex-col  align-middle justify-center">
                <div>
                  <p className="text-lg font-semibold">Order: {x.gigTitle}</p>
                  <p className="text-gray-500">
                    Payment Status: {x.paymentStatus}
                  </p>
                  <p className="text-gray-500">Order Status: {x.orderStatus}</p>
                  <p className="text-green-700 font-bold">${x.gigPrice}</p>
                </div>
              </div>
              <div className="flex flex-col">
                {(x.orderStatus === "confirmed" ||
                  x.orderStatus === "failed") && (
                  <>
                    <button
                      className="h-10 w-60 bg-green-400 shadow-md font-semibold  hover:bg-green-600 rounded-2xl m-1"
                      onClick={() => handleApprove(x._id)}
                    >
                      Approve
                    </button>
                    <button
                      className="h-10 w-60 bg-red-400 shadow-lg font-semibold  hover:bg-red-600 rounded-2xl m-1"
                      onClick={() => handleReject(x._id)}
                    >
                      Reject
                    </button>
                  </>
                )}
                {(x.orderStatus === "ongoing" ||
                  x.orderStatus === "review") && (
                  <div>
                    <Button
                      className="h-10 w-60 bg-green-400 font-semibold shadow-md hover:bg-green-600 rounded-2xl m-1 flex justify-center items-center"
                      onClick={showModal}
                    >
                      Deliver
                    </Button>
                    <Modal
                      title="Select the file to deliver"
                      open={open}
                      onOk={() => handleOk(x._id)}
                      confirmLoading={confirmLoading}
                      onCancel={handleCancel}
                      okButtonProps={{
                        className: "bg-blue-600 text-white hover:bg-blue-300 font-semibold",
                      }}
                    >
                      <input
                        type="file"
                        name="file"
                        onChange={(e) => setFile(e.target.files?.[0])}
                      />
                    </Modal>
                  </div>
                )}
                <Link
                  className="h-10 w-60 bg-blue-400  font-semibold hover:bg-blue-600 shadow-md rounded-2xl m-1 flex justify-center items-center"
                  href={`/messages`}
                >
                  <button onClick={() => handleOrder(x.buyerId)}></button>
                  Message
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
