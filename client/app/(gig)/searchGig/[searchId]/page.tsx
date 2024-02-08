"use client";
import Navbar from "@/components/navbar";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "../../../../config/axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import { Gigs } from "@/types/gigTypes";
import Link from "next/link";
import Grid from "@/components/grid";
import type { MenuProps } from 'antd';
import { Button, Dropdown, Space } from 'antd';
import { Col, InputNumber, Row, Slider } from 'antd';



let bearerToken: string | null;
interface GridProps {
  data: Gigs[];
}

const Page = () => {
  const [data, setData]: any = useState([])
  const params = useParams();
  const searchId = params.searchId;
  const [sort, setSort] = useState('Default')
  const [filterPrice, setFilterPrice]: any = useState(500)


  useEffect(() => {
    bearerToken = localStorage.getItem("token");
  }, []);

  useEffect(()=>{
   async function fetchData (){
      const { data } = await axios.get(
        `/searchGig/${searchId}?sort=${sort}&price=${filterPrice}`,
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        }
        );
        setData(data)
    }
    fetchData()
  }, [sort, filterPrice, searchId])

  const onClick: MenuProps['onClick'] = ({ key }) => {
    setSort(key)
  };
  const onChange = (newValue: number) => {
    setFilterPrice(newValue);
  };
  console.log(filterPrice);
  
  const items: MenuProps['items'] = [
    {
      key: 'Default',
      label: (
        <p >
          Default
        </p>
      ),
    },
    {
      key: 'Low to high',
      label: (
        <p>
          Low to high
        </p>
      ),
    },
    {
      key: 'High to low',
      label: (
        <p>
          High to low
        </p>
      ),
    },
  ];
  
   
  return (
    <>
      {/* <Navbar /> */}
      <div className="flex flex-row">
      <div className="h-96 w-56 bg-white shadow-md ml-6 mt-6 flex flex-col">       
      {data.length > 0 && 
      <h1 className="text-md font-bold ml-4">Search results for &#34;{searchId}&#34;</h1>}
      <h1 className="font-semibold m-2">Sort by: </h1>
       <Dropdown menu={{ items, onClick }} className="m-2" placement="bottom">
        <Button onClick={(e)=> e.preventDefault()}>{sort}</Button>
      </Dropdown>
      <h1 className="font-semibold m-2">Filter by price ₹ {filterPrice}</h1>
      <Col span={12}>
        <Slider
          min={500}
          max={10000}
          onChange={onChange}
          value={typeof filterPrice === 'number' ? filterPrice : 0}
        />
      </Col>
      </div>
      {data.length > 0 ? 
      <Grid props={data}/> : 
      <div className="w-full flex justify-center h-screen items-center">
        <h1 className="text-2xl font-bold">No items found for the search &#34;{searchId}&#34;</h1>
      </div>
      }
    </div>
    </>
  );
}

export default Page;
