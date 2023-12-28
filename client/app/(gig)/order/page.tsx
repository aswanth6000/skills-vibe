'use client'
import Navbar from "@/components/navbar"
import { CarouselDefault } from "@/components/carousel"

export default function Page() {
  return (

    <div>
        <Navbar/>
        <div className="flex justify-center">
        <div className="m-4 w-11/12 bg-bodywhite h-44 rounded-2xl">
            <div className="flex justify-between m-3">
                <div className="flex flex-col  align-middle justify-center items-center">
                    <div className="h-24 w-24 rounded-full bg-black">
                    </div>
                    <h2>user name</h2>
                </div>
                <div className="flex flex-col  align-middle justify-center">
                    <div>
                        {/* <CarouselDefault/> */}
                    </div>
                </div>
            <div className="flex flex-col">
                <button className="h-10 w-60 bg-green-400 hover:bg-green-600 rounded-2xl m-1">
                    Approve
                </button>
                <button className="h-10 w-60 bg-red-400 hover:bg-red-600 rounded-2xl m-1">
                    Reject
                </button>
                <button className="h-10 w-60 bg-blue-400 hover:bg-blue-600 rounded-2xl m-1">
                    Message
                </button>
            </div>
            </div>
        </div>

        </div>
    </div>
  )
}
