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
        console.log(response.data);
        setData(response.data)
      } catch (error) {
        console.error(error);
        
      }
    }
    fetchData()
  })

  return (
    <div>
      <div className='flex flex-row'>
        <ChatAllUsers />
        <ChatMessages/>
        <ChatSenderInfo/>
      </div>
    </div>
  )
}
