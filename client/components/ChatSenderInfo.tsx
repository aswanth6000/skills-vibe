import React from 'react'

export default function ChatSenderInfo() {
  return (
    <div className='  flex flex-col items-center  w-1/4 h-screen'>
        <div  className="h-48 w-48 bg-black rounded-full mt-16"></div>
        <div className=''><button className='bg-blue-400 p-1 mt-4 font-semibold text-white rounded-md'>View Profile</button></div>
        <div className='flex flex-col mt-3 items-center'>
            <h1>Gig title</h1>
            <p>Gig description</p>
        </div>
    </div>
  )
}
