"use client";
import React from "react";
import Navbar from "@/components/navbar";
import { CarouselDefault } from "@/components/carousel";

const styles = {
    outerdiv : 'flex h-full w-full items-center justify-center',
    innerdiv : 'w-full h-96 object-fill m-0 p-0',
    autosec : 6000
  }

export default function Page() {
  return (
    <>
      <Navbar />
        <CarouselDefault stl={styles}/>
      <div className="flex flex-row">
        <div className="w-3/4 bg-slate-400 h-screen">
            <div className="flex flex-row justify-between items-center ">
                <div className="rounded-full bg-orange-300 mt-5 ml-5 "></div>
                <div className="flex flex-col ml-4 w-auto flex-wrap">
                <div><h2>Name</h2></div>
                <div><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt quod at eum ut officia iusto, aspernatur veniam, alias voluptates, quidem unde amet cupiditate eos earum autem reiciendis cum blanditiis beatae?</p></div>
                </div>
            </div>
        </div>
            <div className="w-1/4 bg-black h-screen flex justify-center">
            <div className="w-11/12 rounded-2xl h-64 mt-16 bg-white">
                <h1 className="font-bold ml-4">Price: 5000</h1>
                <button className="w-11/12 h-16 bg-red-600 rounded-md hover:bg-red-900 m-2">Buy Now</button>
                <button className="w-11/12 h-16 bg-red-600 rounded-md hover:bg-red-900 m-2">Message Seller</button>
            </div>
        </div>
      </div>
    </>
  );
}
