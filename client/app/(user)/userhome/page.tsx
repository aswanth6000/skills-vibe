"use client";
import Navbar from "@/components/navbar";
import Grid from "@/components/grid";
import Popular from "@/components/popular";
import Footer from "@/components/footer";
import { useAppSelector } from "@/redux/store";
import { useRouter } from "next/navigation";
import axios from "../../../config/axios";
import { useEffect, useState } from "react";
import { Gigs } from "@/types/gigTypes";
import SubNav from "@/components/subNav";
import { Skeleton } from "antd";


export default function Home() {
  const [data, setData] = useState<Gigs[]>([]);
  const [loading, setLoading] = useState(false)
  const user = useAppSelector((state) => state.auth.value);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await axios.get("/getallgig", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (response.status === 200) {
          setLoading(false)
          console.log(response.data.allgigs);
          setData(response.data.allgigs);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  console.log(data);
  const router = useRouter();
  if (user.isAuth === false) {
    router.push("/login");
  }

  const stl = {
    backgroundColor: "rgb(255 255 255 / 25%)",
    WebkitBackdropFilter: "blur(10px)",
    backdropFilter: "blur(10px)",
  };

  return (
    <div className="bg-bodywhite">
      <Navbar />
      <SubNav/>
      
      <div className="flex justify-center mt-4 mb-2 ">
        <div
          className="w-11/12  h-60 rounded-2xl"
          style={{
            backgroundImage:
              'url("https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/e88236dd83c7f9408af91782329400d7-1704292070364/Banner-Desktop.png")',
            backgroundSize: "cover",
          }}
        >
          <h1 className="font-semibold mt-8 text-white text-3xl ml-7">
            Welcome back, Aswanth 👋
          </h1>
          <div className="flex justify-evenly mt-5 pl-4">
            <div className="w-4/12 h-28 rounded-xl flex items-center flex-col " style={stl}>
              <h1 className="text-white font-semibold text-trasform: uppercase ml-2 mt-2 text-sm">Browse Freelancers</h1>
              <p className="ml-4 mt-2 text-white font-bold">Explore a diverse pool of skilled freelancers offering a wide range of services.</p>
            </div>
            <div className="w-4/12 h-28 rounded-xl flex items-center flex-col" style={stl}>
              <h1 className="text-white font-semibold text-trasform: uppercase ml-2 mt-2 text-sm">Post a Gig</h1>
              <p className="ml-4 mt-2 text-white font-bold">Looking for a specific service? Post a gig and let freelancers come to you.</p>
            </div>
            <div className="w-3/12 h-28 rounded-xl flex items-center flex-col" style={stl}>
              <h1 className="text-white font-semibold text-trasform: uppercase ml-2 mt-2 text-sm">Secure Transactions</h1>
              <p className="ml-4 mt-2 text-white font-bold">Ensure trust and security in every transaction. </p>
            </div>
          </div>
        </div>
      </div>
      <Grid props={data} /> 
      {loading && <div className="flex flex-col">
        <div className="flex justify-center">
          <div className="w-56 h-auto flex flex-col justify-start rounded-2xl mt-3 mb-3 ml-3">
            <Skeleton active />
          </div>
          <div className="w-56 h-auto flex flex-col justify-start rounded-2xl mt-3 mb-3 ml-3">
            <Skeleton active />
          </div>
          <div className="w-56 h-auto flex flex-col justify-start rounded-2xl mt-3 mb-3 ml-3">
            <Skeleton active />
          </div>
          <div className="w-56 h-auto flex flex-col justify-start rounded-2xl mt-3 mb-3 ml-3">
            <Skeleton active />
          </div>
          <div className="w-56 h-auto flex flex-col justify-start rounded-2xl mt-3 mb-3 ml-3">
            <Skeleton active />
          </div>
        </div>
        <div className="flex justify-center">
          <div className="w-56 h-auto flex flex-col justify-start rounded-2xl mt-3 mb-3 ml-3">
            <Skeleton active />
          </div>
          <div className="w-56 h-auto flex flex-col justify-start rounded-2xl mt-3 mb-3 ml-3">
            <Skeleton active />
          </div>
          <div className="w-56 h-auto flex flex-col justify-start rounded-2xl mt-3 mb-3 ml-3">
            <Skeleton active />
          </div>
          <div className="w-56 h-auto flex flex-col justify-start rounded-2xl mt-3 mb-3 ml-3">
            <Skeleton active />
          </div>
          <div className="w-56 h-auto flex flex-col justify-start rounded-2xl mt-3 mb-3 ml-3">
            <Skeleton active />
          </div>
        </div>
        <div className="flex justify-center">
          <div className="w-56 h-auto flex flex-col justify-start rounded-2xl mt-3 mb-3 ml-3">
            <Skeleton active />
          </div>
          <div className="w-56 h-auto flex flex-col justify-start rounded-2xl mt-3 mb-3 ml-3">
            <Skeleton active />
          </div>
          <div className="w-56 h-auto flex flex-col justify-start rounded-2xl mt-3 mb-3 ml-3">
            <Skeleton active />
          </div>
          <div className="w-56 h-auto flex flex-col justify-start rounded-2xl mt-3 mb-3 ml-3">
            <Skeleton active />
          </div>
          <div className="w-56 h-auto flex flex-col justify-start rounded-2xl mt-3 mb-3 ml-3">
            <Skeleton active />
          </div>
        </div>
        <div className="flex justify-center">
          <div className="w-56 h-auto flex flex-col justify-start rounded-2xl mt-3 mb-3 ml-3">
            <Skeleton active />
          </div>
          <div className="w-56 h-auto flex flex-col justify-start rounded-2xl mt-3 mb-3 ml-3">
            <Skeleton active />
          </div>
          <div className="w-56 h-auto flex flex-col justify-start rounded-2xl mt-3 mb-3 ml-3">
            <Skeleton active />
          </div>
          <div className="w-56 h-auto flex flex-col justify-start rounded-2xl mt-3 mb-3 ml-3">
            <Skeleton active />
          </div>
          <div className="w-56 h-auto flex flex-col justify-start rounded-2xl mt-3 mb-3 ml-3">
            <Skeleton active />
          </div>
        </div>
      </div>}
      <Footer />
    </div>
  );
}
