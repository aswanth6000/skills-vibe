"use client";
import React, { useState, useEffect } from "react";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { faFaceSmile } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Picker from "emoji-picker-react";
import { EmojiStyle } from "emoji-picker-react";
import { EmojiClickData } from "emoji-picker-react";
import Lottie from "lottie-react";
import amimationData from "../../../components/lotties/typingAnimation.json";
import axios from "../../../config/axios";
import { useParams } from "next/navigation";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { Button, Modal } from 'antd';

import {
  getSender,
  getSenderImg,
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "@/config/chatLogics";
import { Avatar, Tooltip } from "@chakra-ui/react";
import ScrollableFeed from "react-scrollable-feed";
import ChatAllUsers from "@/components/chatAllUsers";
import { setChats, setSelectedChat } from "@/redux/features/chatSlice";
import { setNotification } from "@/redux/features/chatSlice";
import io from "socket.io-client";
import Navbar from "@/components/navbar";
import { useRouter } from "next/navigation";

const ENDPOINT = "http://message-service:8004";
var socket: any, selectedChatCompare: any;

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
  const [loggedUser, setLoggedUser]: any = useState("");
  const userAuth = useAppSelector((state: any) => state.auth.value);
  useEffect(() => {
    bearerToken = localStorage.getItem("token");
    setLoggedUser(userAuth);
  }, [userAuth]);
  const router = useRouter()
  
  const [modal1Open, setModal1Open] = useState(false);
  const [modal2Open, setModal2Open] = useState(false);
  const [fetchAgain, setFetchAgain ] = useState<boolean>(false)
  const [accessData, setAccessData] = useState<Pokedex>({
    username: "",
    profilePicture: "",
    sellerName: "",
    sellerProfilePicture: "",
  });
  const dispatch = useDispatch<AppDispatch>();

  const selectedChat = useAppSelector((state: any) => state.chat.selectedChat);
  const notification = useAppSelector((state: any)=> state.chat.notification)

  const params = useParams<{ tag: string; userId: string }>();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [messages, setMessages]: any = useState("");
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage]: any = useState();
  const [sendM, setSendM] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [meetingCode, setMeetingCode] = useState('')
  const [customMeeting, setCustommeeting] = useState('');
  const user = useAppSelector((state) => state.auth.value);
  const userId = user._id;
  const chats = useAppSelector((state) => state.chat.chats);

  const handleEmojiClick = (emojiData: EmojiClickData, event: MouseEvent) => {
    console.log(emojiData);

    let newMessages = newMessage + emojiData.emoji;
    setNewMessage(newMessages);
  };
  const handleGenerateCode =async () =>{
    try {
      const {data} = await axios.get(`/message/generateMeeting`);
      setMeetingCode(data)
    } catch (error) {
      console.error(error);
    }
  }
  const handleJoinRoom = () =>{
    
    router.push(`/message/meetings/${customMeeting}`)
  }
  const customRoomCode = (e:any) =>{
    setCustommeeting(e.target.value)
  }

  

  const handeleCopy = async (meetingCode: any) =>{    
    try {
      await navigator.clipboard.writeText(meetingCode);
      alert('Text copied to clipboard:');
    } catch (error) {
      alert('Error copying to clipboard:');
    }
  }


  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, []);

  const typingHandler = (e: any) => {
    setNewMessage(e.target.value);
    if (!socketConnected) return;
    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
      let lastTypingTime = new Date().getTime();
      var timerLength = 3000;
      setTimeout(() => {
        var timeNow = new Date().getTime();
        var timeDiff = timeNow - lastTypingTime;
        if (timeDiff >= timerLength && typing) {
          socket.emit("stop typing", selectedChat._id);
          setTyping(false);
        }
      }, timerLength);
    }
  };
  

  useEffect(() => {
    bearerToken = localStorage.getItem("token");

    if (bearerToken) {
      const fetchChats = async () => {
        try {
          const response = await axios.get(
            `/message/getmessage/${selectedChat._id}`,
            {
              headers: {
                Authorization: `Bearer ${bearerToken}`,
              },
            }
          );
          const chatData = response.data;
          console.log("chat data: ", chatData);

          setMessages(chatData);

          socket.emit("join chat", selectedChat._id);
        } catch (error) {
          console.error(error);
        }
      };
      fetchChats();
      selectedChatCompare = selectedChat;
    }
  }, [selectedChat]);
  console.log(notification,'---------------------');
  

  useEffect(() => {
    socket.on("message recieved ", (newMessageRecieved: any) => {
      console.log("new Message recieved is : ", newMessageRecieved);

      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        if(!notification.includes(newMessageRecieved)){
          dispatch(setNotification([newMessageRecieved, ...notification]))
          setFetchAgain(!fetchAgain)
        }
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });

  console.log("messages: ", messages);

  useEffect(() => {
    bearerToken = localStorage.getItem("token");

    if (bearerToken) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`/message/fetchchat`, {
            headers: {
              Authorization: `Bearer ${bearerToken}`,
            },
          });
          const userData = response.data;

          dispatch(setChats(userData));
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }
  }, []);

  const handleSendButton = async (e: any) => {
    socket.emit("stop typing", selectedChat._id);

    if (newMessage) {
      try {
        const sendData = {
          content: newMessage,
          chatId: selectedChat,
        };
        console.log(sendData);
        setNewMessage("");
        const { data } = await axios.post(
          "/message/sendmessage",
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

        socket.emit("new message", data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const formatDate = (d: Date): string => {
    const date = new Date(d);
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const day = date.getDate().toString().padStart(2, '0');
    const hours: any = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const period = (date.getHours() >= 12) ? 'PM' : 'AM';
    const formattedDate = `${day}/${month}/${year} ${hours % 12}:${minutes} ${period}`;
    return formattedDate;
  };
  
  // Example usage:
  const exampleDate = new Date("2024-01-19T10:07:47.469Z");
  const formattedExampleDate = formatDate(exampleDate);
  console.log(formattedExampleDate);
  


  return (
    <div>
      <div className="flex flex-row">
        <ChatAllUsers />
        {selectedChat ? (
          <div
            className={`bg-bodywhite w-1/2 h-screen relative overflow-y-scroll `}
          >
            <div
              className={`w-1/2 h-16 border-y bg-bodywhite z-50 flex items-center p-2 fixed `}
            >
              <img
              src={getSenderImg(loggedUser, selectedChat.users)}
              className="h-10 w-10 rounded-3xl"
            ></img>
              <div className="flex flex-col ml-2">
                <div className="text-md font-semibold">
                 {getSender(loggedUser, selectedChat.users)}
                </div>
                {isTyping ? (
                <div className="text-sm font-semibold"> Typing...</div>
              ) : (
                <></>
              )}
              </div>
            </div>
            <div className="mt-16 mb-16">
              {messages &&
                messages.map((m: any, i: any) => (
                  <div style={{ display: "flex" }} key={m._id}>
                    {(isSameSender(messages, m, i, user._id) ||
                      isLastMessage(messages, i, user._id)) && (
                      <Tooltip
                        label={m.sender.name}
                        placement="bottom-start"
                        hasArrow
                      >
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
                        marginLeft: isSameSenderMargin(
                          messages,
                          m,
                          i,
                          user._id
                        ),
                        marginTop: isSameUser(messages, m, i) ? 3 : 10,
                        borderRadius: "20px",
                        padding: "5px 15px",
                        maxWidth: "75%",
                      }}
                    >
                      {m.content} <div style={{fontSize: '10px', color: "grey", marginTop: "7px" }}>{formatDate(m.updatedAt)}</div>
                    </span>
                  </div>
                ))}
              <div>
                {showEmojiPicker && (
                  <Picker className="mb-5" onEmojiClick={handleEmojiClick} />
                )}
              </div>

            </div>
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
        ) : (
          <div
            className={`bg-bodywhite w-1/2 h-screen flex justify-center items-center`}
            style={{
              opacity: 0.5,
              backgroundImage:
                'url("https://i.pinimg.com/564x/8c/98/99/8c98994518b575bfd8c949e91d20548b.jpg")',
              backgroundSize: "cover",
            }}
          >
            <div className="text-2xl font-semibold opacity-100">
              Select a user to start Chating
            </div>
          </div>
        )}
        <div className="  flex flex-col items-center justify-center  w-1/4 h-screen">
        <Button className="bg-blue-600 text-white hover:bg-blue-300"  onClick={() => setModal1Open(true)}>
        Join Meeting
      </Button>
      <Modal
        title="Join Meeting"
        style={{ top: 20 }}
        open={modal1Open}
        onOk={() => setModal1Open(false)}
        onCancel={() => setModal1Open(false)}
        okButtonProps={{ className: "bg-blue-600 text-white hover:bg-blue-300", onClick: handleJoinRoom}}
        okText="Join Room"
      >
        <input type="text" onChange={customRoomCode} className="outline-none border-none w-9/12" placeholder="Enter the meeting code" value={customMeeting} />
      </Modal>
      <br />
      <br />
      {!meetingCode && <button className="w-7/12 h-8 bg-blue-600 rounded-sm text-white "
      onClick={handleGenerateCode}
      >
        Start An Instant Meeting 
      </button>}
      {meetingCode && <p onClick={handeleCopy}  className="w-7/12 p-5 text-md font-bold h-5" > {meetingCode} </p>}
        </div>
      </div>
    </div>
  );
}
