'use client'
import React from 'react'
import ChatAllUsers from '@/components/chatAllUsers';
import ChatMessages from '@/components/ChatMessages';
import axios from '../../../config/axios';
export default function Page() {

  

  return (
    <div>
      <div className='flex flex-row'>
        <ChatAllUsers />
        <ChatMessages/>
      </div>
    </div>
  )
}
