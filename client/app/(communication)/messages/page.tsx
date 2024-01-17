"use client";
import React, { useState, useEffect } from "react";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { faFaceSmile } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Picker from "emoji-picker-react";
import { EmojiStyle } from "emoji-picker-react";
import { EmojiClickData } from "emoji-picker-react";
import axios from "axios";
import { useParams } from "next/navigation";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from "@/config/chatLogics";
import { Avatar, Tooltip } from '@chakra-ui/react';
import ScrollableFeed from "react-scrollable-feed";
import ChatAllUsers from "@/components/chatAllUsers";
import { setChats, setSelectedChat } from "@/redux/features/chatSlice";
import io from 'socket.io-client';


const ENDPOINT = 'http://localhost:8004'
var socket: any, selectedChatCompare: any

interface Pokedex {
  username: string;
  profilePicture: string;
  sellerName: string;
  sellerProfilePicture: string;
}

interface ID {
  $oid: string;
}

interface LatestMessage {
  _id: ID;
  sender: Sender;
  content: string;
  chat: ID;
  readBy: any[];
  createdAt: Date;
  updatedAt: Date;
}

interface Sender {
  _id: ID;
  username: string;
  email: string;
  profilePicture: string;
}

interface User {
  _id: ID;
  username: string;
  phone: number;
  email: string;
  profilePicture: string;
  createdAt: Date;
  updatedAt: Date;
  status: boolean;
}

let bearerToken: string | null;
export default function Page() {

  const [accessData, setAccessData] = useState<Pokedex>({
    username: "",
    profilePicture: "",
    sellerName: "",
    sellerProfilePicture: "",
  });
  const dispatch = useDispatch<AppDispatch>();
  
  const selectedChat = useAppSelector((state: any) => state.chat.selectedChat);

  const params = useParams<{ tag: string; userId: string }>();

  
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [messages, setMessages]: any = useState("");
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage]: any = useState();
  const [sendM, setSendM] = useState("");
  const [socketConnected, setSocketConnected] = useState(false)
  
  const user = useAppSelector((state)=> state.auth.value);
  const userId = user._id;
  const chats = useAppSelector((state)=> state.chat.chats)


  const handleEmojiClick = (emojiData: EmojiClickData, event: MouseEvent) => {
    console.log(emojiData);

    let newMessages = newMessage + emojiData.emoji;
    setNewMessage(newMessages);
  };

  
  useEffect(()=>{
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connection", ()=> setSocketConnected(true))
  })

  const typingHandler = (e: any) => {
    setNewMessage(e.target.value);
  };

  useEffect(() => {
    bearerToken = localStorage.getItem("token");
    console.log('ojoihoiuh',selectedChat);
    

    if (bearerToken) {
      const fetchChats = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8004/getmessage/${selectedChat._id}`,
            {
              headers: {
                Authorization: `Bearer ${bearerToken}`,
              },
            }
          );
          const chatData = response.data;
          console.log("chat data: ", chatData);
          
          setMessages(chatData);

          socket.emit('join chat', selectedChat._id)
          
        } catch (error) {
          console.error(error);
        }
      };
      fetchChats();
      selectedChatCompare = selectedChat
    }
  }, [selectedChat]);

  useEffect(()=>{
    socket.on("message recived ", (newMessageRecieved: any)=>{
      console.log("new Message recieved is : ", newMessageRecieved);
      
      if(!selectedChatCompare || selectedChatCompare._id !== newMessageRecieved.chat._id){
        //give notification 
      }else{
        setMessages([...messages, newMessageRecieved])
      }
    })
  })

  console.log("messages: ", messages);
  



  // useEffect(() => {
  //   bearerToken = localStorage.getItem("token");

  //   if (bearerToken) {
  //     const fetchData = async () => {
  //       try {
  //         const response = await axios.post(
  //           `http://localhost:8004/accesschat`,
  //           { userId },
  //           {
  //             headers: {
  //               Authorization: `Bearer ${bearerToken}`,
  //             },
  //           }
  //         );
  //         const userData = response.data;
          

  //         setAccessData({
  //           username: userData.users[0].username,
  //           profilePicture: userData.users[0].profilePicture,
  //           sellerName: userData.users[1].username,
  //           sellerProfilePicture: userData.users[1].profilePicture,
  //         });
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     };
  //     fetchData();
  //   }
  // }, []);

  useEffect(() => {
    bearerToken = localStorage.getItem("token");

    if (bearerToken) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8004/fetchchat`,
            {
              headers: {
                Authorization: `Bearer ${bearerToken}`,
              },
            }
          );
          const userData = response.data;
          
          dispatch(setChats(userData))
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }
  }, []);
  

  
  

  const handleSendButton = async (e: any) => {

    if (newMessage) {
      try {
        const sendData = {
          content: newMessage,
          chatId: selectedChat,
        };
        console.log(sendData);
        setNewMessage("");
        const { data } = await axios.post(
          "http://localhost:8004/sendmessage",
          sendData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${bearerToken}`,
            },
          }
        );
        
        setMessages([...messages, data]);
        console.log(data);

        socket.emit("new message",data)
      } catch (error) {
        console.error(error);
      }
    }
  };
  
console.log("Messages:",messages);


  return (
    <div>
      <div className="flex flex-row">
        <ChatAllUsers/>
        <div
          className={`bg-bodywhite w-1/2 h-screen relative overflow-y-scroll `}
        >
          <div
            className={`w-1/2 h-16 border-y bg-bodywhite z-50 flex items-center p-2 fixed `}
          >
            {/* <img
              src={accessData.profilePicture}
              className="h-10 w-10 rounded-3xl"
            ></img> */}
            <div className="flex flex-col ml-2">
              <div className="text-md font-semibold">Git tiltle goes here</div>
              {/* <div className="text-sm font-semibold">{accessData.username}</div> */}
            </div>
          </div>
          <ScrollableFeed className="mt-16">
          {messages &&
        messages.map((m: any, i: any) => (
          <div style={{ display: "flex" }} key={m._id}>
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
                <img
                  className="w-6 h-6 mr-1 ml-1 mt-2 rounded-full"
                  alt={m.sender.username}
                  src={m.sender.profilePicture}
                />
              </Tooltip>
            )}
            <span
              style={{
                backgroundColor: `${
                  m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
                }`,
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginTop: isSameUser(messages, m, i) ? 3 : 10,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
              }}
            >
              {m.content}
            </span>
          </div>
        ))}
          <div>
            {showEmojiPicker && <Picker className="mb-5" onEmojiClick={handleEmojiClick} />}
          </div>
          </ScrollableFeed>
          <div
            className={`border-y w-1/2 h-16 bg-bodywhite fixed flex flex-row justify-center items-center bottom-0`}
          >
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
              value={newMessage}
              onChange={typingHandler}
              name="message"
            />
            <button
              className="w-1/12 flex justify-center items-center h-7"
              onClick={handleSendButton}
            >
              <FontAwesomeIcon
                className="h-6 w-6 text-blue-300 hover:text-blue-500"
                icon={faPaperPlane}
              />
            </button>
          </div>
        </div>
        <div className="  flex flex-col items-center  w-1/4 h-screen">
          {/* <img
            src={accessData.sellerProfilePicture}
            className="h-48 w-48  rounded-full mt-16"
          ></img> */}
          {/* <div className="text-md font-semibold">{accessData.sellerName}</div> */}
          <div className="">
            <button className="bg-blue-400 p-1 mt-4 font-semibold text-white rounded-md">
              View Profile
            </button>
          </div>
          <div className="flex flex-col mt-3 items-center">
            <h1>Gig title</h1>
            <p>Gig description</p>
          </div>
        </div>
      </div>
    </div>
  );
}
