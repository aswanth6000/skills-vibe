"use client";
import React from 'react';
import { useParams } from 'next/navigation';
import {ZegoUIKitPrebuilt} from '@zegocloud/zego-uikit-prebuilt'
import { useAppSelector } from '@/redux/store';

function Page() {
  const userAuth = useAppSelector((state: any) => state.auth.value);
  const params = useParams();
  const roomID: any = params.meetingId;
  const myMeeting = async (element: any) =>{
    const appID = 1684448233;
    const serverSecret = "0b1383bec38fbd4d8abbb30d739bd223";
    const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID,  userAuth._id,  userAuth.username);
    const zc = ZegoUIKitPrebuilt.create(kitToken)
    zc.joinRoom({
      container: element,
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall
      },
      showScreenSharingButton: true
    })
  } 
  return (
    <div>
      <div ref={myMeeting}></div>
    </div>
  )
}

export default Page