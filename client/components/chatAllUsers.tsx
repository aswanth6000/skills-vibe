"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Stack } from "@chakra-ui/react";
import ChatLoading from "./chatLoading";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { Text } from "@chakra-ui/react";
import { setChats } from "@/redux/features/chatSlice";

let bearerToken: string | null;

export default function ChatAllUsers() {
  const selectedChat = useAppSelector((state: any) => state.chat.selectedChat);
  const dispatch = useDispatch<AppDispatch>();
  const [chat, setChat] = useState([]);
  const [data, setData] = useState([]);
  const user = useAppSelector((state: any) => state.chat.user);
  const chats = useAppSelector((state: any) => state.chat.chats);
  console.log("llll0o", chats);

  // useEffect(() => {
  //   bearerToken = localStorage.getItem("token");

  //   if (bearerToken) {
  //     const fetchData = async () => {
  //       try {
  //         const response = await axios.get(`http://localhost:8004/accesschat`, {
  //           headers: {
  //             Authorization: `Bearer ${bearerToken}`,
  //           },
  //         });
  //         const userData = response.data;
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
          const response = await axios.get(`http://localhost:8004/findchats`, {
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

  const setSelectedChatFn = (chat: any) => {};

  return (
    <div className=" w-1/4 h-screen overflow-x-hidden">
      <div className="flex flex-row   mb-3 w-full justify-center mt-3">
        <input
          type="text"
          className="pl-1 p-2 shadow-md outline-none rounded-s-md border bg-bodywhite h-10"
          placeholder="search"
        />
        <button className="bg-green-600 p-1 rounded-e-md shadow-md border h-10">
          Search
        </button>
      </div>
      <div className="flex flex-col h-fit  w-full items-center">
        {/* users */}

        {chats.map((c: any) => (
          <div
            key={c._id}
            className="bg-bodywhite  h-16 rounded-md shadow-md w-11/12 flex border  mb-2 items-center p-2"
          >
            <img className="h-10 w-10 rounded-3xl" src={c.users[0].profilePicture}/>
            <div className="ml-2">
              <div className="text-md font-bold">{c.users[0].username}</div>
              <div className="text-sm font-semibold">
                {c.latestMessage.content.length > 50
                  ? c.latestMessage.content.substring(0, 51) + "..."
                  : c.latestMessage.content}{" "}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div></div>
    </div>
  );
}
