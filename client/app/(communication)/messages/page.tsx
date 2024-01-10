import React from 'react'
import ChatAllUsers from '@/components/chatAllUsers';
import ChatMessages from '@/components/ChatMessages';
import ChatSenderInfo from '@/components/ChatSenderInfo';
export default function Page() {
  return (
    <div>
      <div className='flex flex-row'>
        <ChatAllUsers/>
        <ChatMessages/>
        <ChatSenderInfo/>
      </div>
    </div>
  )
}
