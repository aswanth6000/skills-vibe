'use client'
import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

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
  let bearerToken: string | null
  useEffect(()=>{
    bearerToken = localStorage.getItem("token");
  },[])

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
    profilePicture: ''
  });
  const gigid = params.orderId;  
  const router = useRouter()

  useEffect(() => {
    console.log(bearerToken);
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
        console.log('hhhhhhhhhhh',response.data.gig);
        
      } catch (error) {
        console.log("error occurred", error);
      }
    };
    fetchData();
  }, []);
  console.log(data)


  // async function buyNow(){
  //   console.log("klik");
  //   console.log(bearerToken);
  //   try {
  //     const response = await axios.get(`http://localhost:8000/ordergig/${gigid}`, {
  //       headers: {
  //         Authorization: `Bearer ${bearerToken}`,
  //         "Content-Type": "application/json",
  //       }
  //     })
  //     console.log(response);
  //     router.push('/payment')
      
  //   } catch (error) {
  //     console.log(error);
      
  //   }
  // }
  async function payNow(){
    const {data:{key}}= await axios.get("http://localhost:8003/getkey")
    console.log('kkkkkkkk', key);
  try {
    const sendData = {
      ...data
    }    
    const response = await axios.post(`http://localhost:8003/payment/${gigid}`,sendData, {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json'
      }
    } )

    console.log(window);
    const options ={
      key,
      amount:data.price,
      currency:"INR",
      name:"Sinmplyjs",
      description:"Razorpay tutorial",
      image:"https://avatars.githubusercontent.com/u/96648429?s=96&v=4",
      order_id:gigid,
      callback_url:"http://localhost:8000/paymentverification",
      prefill:{
        name:"Sagar gupta",
        email:"anandguptasir@gmail.com",
        contact:"1234567890"
      },
      notes:{
        "address":"razorapy official"
      },
      theme:{
        "color":"#3399cc"
      }
    };
    const razor = new window.Razorpay(options);
    razor.open();

  }


    

  } catch (error) {
    console.log(error);
    
  }
  }
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Head>
        <title>Order Confirmation</title>
      </Head>

      <main className="text-center">
        <h1 className="text-3xl font-semibold mb-8">Order Confirmation</h1>

        <div className="w-96 mx-auto bg-white p-8 rounded-lg shadow-md mb-8">
          <p className="text-gray-700 mb-4">Complete payment to continue!</p>

          {/* Display order details here, e.g., gig information, price, etc. */}
          {/* Example: */}
          <div className="mb-4">
            <p className="text-gray-700">Gig Title: {data.title}</p>
            <p className="text-gray-700">Price: {data.price}</p>
          </div>


            <button className="block bg-green-500 text-white py-2 rounded-md hover:bg-green-600 focus:outline-none focus:shadow-outline-green"
            onClick={payNow}>
              Proceed to Payment
            </button>
        </div>
      </main>
    </div>
  );
};

export default OrderConfirmation;
