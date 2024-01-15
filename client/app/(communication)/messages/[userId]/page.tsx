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
import { chatAll } from "@/redux/features/chatSlice";
import ScrollableFeed from "react-scrollable-feed";
import { isSameSender } from "@/config/chatLogics";

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

  const chat = useAppSelector((state: any) => state.chat.value);

  const params = useParams<{ tag: string; userId: string }>();

  const userId = params.userId;
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [messages, setMessages]: any = useState("");
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage]: any = useState();
  const [sendM, setSendM] = useState("");
  const selectedChat = useAppSelector((state: any) => state.chat.selectedChat);

  const handleEmojiClick = (emojiData: EmojiClickData, event: MouseEvent) => {
    console.log(emojiData);

    let newMessages = newMessage + emojiData.emoji;
    setNewMessage(newMessages);
  };

  const typingHandler = (e: any) => {
    setNewMessage(e.target.value);
  };

  useEffect(() => {
    bearerToken = localStorage.getItem("token");

    if (bearerToken) {
      const fetchChats = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8004/getmessage/${selectedChat}`,
            {
              headers: {
                Authorization: `Bearer ${bearerToken}`,
              },
            }
          );
          const chatData = response.data;
          setMessages(chatData);
        } catch (error) {
          console.error(error);
        }
      };
      fetchChats();
    }
  }, [selectedChat]);

  useEffect(() => {
    bearerToken = localStorage.getItem("token");

    if (bearerToken) {
      const fetchData = async () => {
        try {
          const response = await axios.post(
            `http://localhost:8004/accesschat`,
            { userId },
            {
              headers: {
                Authorization: `Bearer ${bearerToken}`,
              },
            }
          );
          const userData = response.data;

          setAccessData({
            username: userData.users[0].username,
            profilePicture: userData.users[0].profilePicture,
            sellerName: userData.users[1].username,
            sellerProfilePicture: userData.users[1].profilePicture,
          });
          dispatch(
            chatAll({
              selectedChat: userData.latestMessage.chat,
              user: null,
              notification: [],
              chats: null,
            })
          );
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
      } catch (error) {
        console.error(error);
      }
    }
  };
  const user = useAppSelector((state) => state.auth.value);

  return (
    <div>
      <div className="flex flex-row">
        <div
          className={`bg-bodywhite w-3/4 h-screen relative overflow-y-scroll `}
        >
          <div
            className={`w-3/4 h-16 border-y bg-bodywhite z-50 flex items-center p-2 fixed `}
          >
            <img
              src={accessData.profilePicture}
              className="h-10 w-10 rounded-3xl"
            ></img>
            <div className="flex flex-col ml-2">
              <div className="text-md font-semibold">Git tiltle goes here</div>
              <div className="text-sm font-semibold">{accessData.username}</div>
            </div>
          </div>
          {messages &&
            messages.map((m: any, i: any) => (
              <div
                key={m._id}
                className="flex flex-col mt-20 pb-20 absolute w-full  z-0"
              >
                {isSameSender(messages, m, i, user._id) && (
                  <div className="flex justify-end mb-2">
                    <div className="h-5/6  bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white w-auto p-3 flex justify-end  ">
                      {m.content}
                    </div>
                  </div>
                )}
                {!isSameSender(messages, m, i, user._id) && (
                  <div className="flex justify-start mb-2">
                    <div className="h-5/6 bg-blue-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white w-auto p-3 flex justify-start  ">
                      {m.content}
                    </div>
                  </div>
                )}
              </div>
            ))}
          <div>
            {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
          </div>
          <div
            className={`border-y w-3/4 h-16 bg-bodywhite fixed flex flex-row justify-center items-center bottom-0`}
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
          <img
            src={accessData.sellerProfilePicture}
            className="h-48 w-48  rounded-full mt-16"
          ></img>
          <div className="text-md font-semibold">{accessData.sellerName}</div>
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
