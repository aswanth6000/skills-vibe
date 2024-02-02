"use client";
import Head from "next/head";
import Link from "next/link";
import axios from "../../../../config/axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Script from "next/script";

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

const OrderConfirmation: React.FC = () => {
  let bearerToken: string | null;
  useEffect(() => {
    bearerToken = localStorage.getItem("token");
  }, []);

  const params = useParams<{ tag: string; orderId: string }>();
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
  const gigid = params.orderId;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/user/viewgig/${gigid}`,
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
  }, [gigid]);

  useEffect(()=>{
    async function buyNow(){
      try {
        const response = await axios.get(`/user/ordergig/${gigid}`, {
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
    buyNow()
  },[])

  async function payNow() {
    try {
      const {
        data: { key },
      } = await axios.get("/order/getkey");
      console.log('let:',key);
      const sendData = {
        ...data,
      };      

      const response = await axios.post(
        `/order/payment/${gigid}`, sendData, {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Payment Response:", response.data.order);

      if (window.Razorpay) {
        const options = {
          key,
          amount: sendData.price,
          currency: "INR",
          name: "Skill vibe",
          description: "Razorpay Tutorial",
          image: "https://img.freepik.com/premium-vector/sv-letter-logo-design-black-background-initial-monogram-letter-sv-logo-design-vector-template_634196-1210.jpg",
          order_id: response.data.order.id,
          callback_url: "/order/paymentverification",
          prefill: {
            name: "Sagar Gupta",
            email: "anandguptasir@gmail.com",
            contact: "1234567890",
          },
          notes: {
            address: "Razorpay Official",
          },
          theme: {
            color: "#3399cc",
          },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      }
    } catch (error) {
      console.error("Error in payNow:", error);
    }
  }

  return (
    <>
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
        onLoad={() => {
          // This function will be called once the script is loaded
          // Now you can safely call your functions that depend on Razorpay
          console.log("Razorpay script has been loaded");
          // You might want to call your payNow function here
        }}
      />
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <Head>
          <title>Order Confirmation</title>
        </Head>

        <main className="text-center">
          <h1 className="text-3xl font-semibold mb-8">Order Confirmation</h1>

          <div className="w-96 mx-auto flex flex-col bg-white p-8 rounded-lg shadow-md mb-8">
            <p className="text-gray-700 mb-4">Complete payment to continue!</p>

            {/* Display order details here, e.g., gig information, price, etc. */}
            {/* Example: */}
            <div className="mb-4">
              <p className="text-gray-700">Gig Title: {data.title}</p>
              <p className="text-gray-700">Price: {data.price}</p>
            </div>

            <button
              className="block bg-green-500 text-white p-2 rounded-md hover:bg-green-600 focus:outline-none focus:shadow-outline-green"
              onClick={payNow}
            >
              Proceed to Payment
            </button>
          </div>
        </main>
      </div>
    </>
  );
};

export default OrderConfirmation;
