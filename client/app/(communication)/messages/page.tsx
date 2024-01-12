'use client'
import React from 'react'
import ChatAllUsers from '@/components/chatAllUsers';
import ChatMessages from '@/components/ChatMessages';
import ChatSenderInfo from '@/components/ChatSenderInfo';
import axios from 'axios';
export default function Page() {

  

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
