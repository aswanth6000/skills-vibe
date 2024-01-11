"use client";
import React, { useState } from "react";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { faFaceSmile } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Picker from "emoji-picker-react";
import { EmojiStyle } from "emoji-picker-react";
import { EmojiClickData } from "emoji-picker-react";

export default function ChatMessages() {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [message, setMessage] = useState("");
  const [sendM, setSendM] = useState('')

  const handleEmojiClick = (emojiData: EmojiClickData, event: MouseEvent) => {
    console.log(emojiData);

    let newMessage = message + emojiData.emoji;
    setMessage(newMessage);
  };
  const handleSendButton = ()=>{
    setSendM(message)
    setMessage('')
  }
  return (
    <div className="bg-bodywhite w-1/2 h-screen relative overflow-y-scroll ">
      <div className="w-1/2 h-16 border-y bg-bodywhite z-50 flex items-center p-2 fixed ">
        <div className="h-10 w-10 bg-black rounded-3xl"></div>
        <div className="flex flex-col ml-2">
          <div className="text-md font-semibold">Git tiltle goes here</div>
          <div className="text-sm font-semibold">Seller name goes here</div>
        </div>
      </div>
      <div className="flex flex-col mt-20 pb-20 absolute w-full  z-0">
        <div className="flex justify-end mb-2">
          {sendM&&<div className="h-5/6  bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white w-auto p-3 flex justify-end  ">
            {sendM}
          </div>}
        </div>
        <div className="flex justify-start mb-2">
          <div className="h-5/6 bg-blue-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white w-auto p-3 flex justify-start  ">
            Other person sends a message
          </div>
        </div>

        


      </div>
      <div>{showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}</div>
      <div className=" border-y w-6/12 h-14 bg-bodywhite fixed flex flex-row justify-center items-center bottom-0  ">
        <button
          className="mr-2"
          onClick={(e) => {
            e.preventDefault();
            setShowEmojiPicker(!showEmojiPicker);
          }}
        >
          <FontAwesomeIcon
            className={`h-6 w-6 ${
              !showEmojiPicker ? "text-blue-300" : "text-blue-500"
            }`}
            icon={faFaceSmile}
          />
        </button>

        <input
          type="text"
          className="w-9/12 h-7 outline-none "
          placeholder="Type something"
          autoComplete="off"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          name="message"
        />
        <button className="w-1/12 flex justify-center items-center h-7"
        onClick={handleSendButton}>
          <FontAwesomeIcon
            className="h-6 w-6 text-blue-300 hover:text-blue-500"
            icon={faPaperPlane}
          />
        </button>
      </div>
    </div>
  );
}
