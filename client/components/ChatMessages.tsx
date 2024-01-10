import React from 'react'

export default function ChatMessages() {
  return (
    <div className='bg-bodywhite w-1/2 h-screen'>
        <div className='w-full h-16 border-y flex items-center p-2 '>
            <div  className="h-10 w-10 bg-black rounded-3xl"></div>
            <div className='flex flex-col ml-2'>
            <div className='text-md font-semibold'>Git tiltle goes here</div>
            <div className='text-sm font-semibold'>Seller name goes here</div>
            </div>
        </div>
            <div className='flex flex-col h-auto '>
                {/* <div className='h-5/6 bg-black w-full'> df</div>
                <div className=' bg-blue-600 w-full'>dxd</div> */}
            </div>
    </div>
  )
}
