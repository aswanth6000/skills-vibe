'use client'
import React from 'react'
import { useEffect, useState } from 'react';
import ChatAllUsers from '@/components/chatAllUsers';
import ChatMessages from '@/components/ChatMessages';
import ChatSenderInfo from '@/components/ChatSenderInfo';
import axios from 'axios';
export default function Page() {
  const [data, setData] = useState('')
  useEffect(()=>{
    const fetchData = async () =>{
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get('http://localhost:8003/vorders',{
          headers:{
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          }
        })
        console.log(response.data.orders);
        setData(response.data.orders)
      } catch (error) {
        console.error(error);
        
      }
    }
    fetchData()
  },[])
  console.log('ssssss',data);
  

  return (
    <div>
      <div className='flex flex-row'>
        <ChatAllUsers data={data} />
        <ChatMessages/>
        <ChatSenderInfo/>
      </div>
    </div>
  )
}
