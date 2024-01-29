"use client";
import Navbar from "@/components/navbar";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import { Gigs } from "@/types/gigTypes";
import Link from "next/link";
import Grid from "@/components/grid";


let bearerToken: string | null;
interface GridProps {
  data: Gigs[];
}

const Page: React.FC<GridProps> = () => {
  const [data, setData] = useState<Gigs[]>([])
  const params = useParams();
  const searchId = params.searchId;
  console.log(searchId);

  useEffect(() => {
    bearerToken = localStorage.getItem("token");
  }, []);

  useEffect(()=>{
   async function fetchData (){
      const { data } = await axios.get(
        `http://localhost:8001/searchGig/${searchId}`,
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        }
        );
        setData(data)
    }
    fetchData()
  }, [])

  console.log(data);
  
 
  return (
    <>
      {/* <Navbar /> */}
      
      {data.length > 0 && <h1 className="text-2xl font-bold">Search results for &#34;{searchId}&#34;</h1>}
      {data.length > 0 ? 
      <Grid props={data}/> : 
      <div className="w-full flex justify-center h-screen items-center">
        <h1 className="text-2xl font-bold">No items found for the search &#34;{searchId}&#34;</h1>
      </div>
      }
    </>
  );
}

export default Page;
