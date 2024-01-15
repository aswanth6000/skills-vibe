'use client'
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Stack } from "@chakra-ui/react";
import ChatLoading from "./chatLoading";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { Text } from '@chakra-ui/react'

let bearerToken: string | null;

export default function ChatAllUsers() {
  const selectedChat = useAppSelector((state: any) => state.chat.selectedChat);
  const dispatch = useDispatch<AppDispatch>();
  const [chat, setChat] = useState([])
  const [data, setData] = useState([])
  const user = useAppSelector((state: any)=> state.chat.user)
  const chats = useAppSelector((state: any)=> state.chat.chats)
  console.log("llll0o",chats);
  
  useEffect(() => {
    bearerToken = localStorage.getItem("token");

    if (bearerToken) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8004/accesschat`,
            {
              headers: {
                Authorization: `Bearer ${bearerToken}`,
              },
            }
          );
          const userData = response.data;
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }
  }, []);

  const setSelectedChatFn = (chat: any) =>{

  }
  
  console.log('ssssss',data);

  
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
        {chats ? (
          <Stack overflowY="scroll">
            {chats.map((chat: any) => (
              <button
                onClick={() => setSelectedChatFn(chat)}
                // cursor="pointer"
                // bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                // color={selectedChat === chat ? "white" : "black"}
                // px={3}
                // py={2}
                // borderRadius="lg"
                className="bg-bodywhite  h-16 rounded-md shadow-md w-11/12 flex border  mb-2 items-center p-2"
                key={chat._id}
              >
                {chat.latestMessage && (
                  <Text fontSize="xs">
                    <b>{chat.latestMessage.sender.name} : </b>
                    {chat.latestMessage.content.length > 50
                      ? chat.latestMessage.content.substring(0, 51) + "..."
                      : chat.latestMessage.content}
                  </Text>
                )}
              </button>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </div>
      <div>
      </div>
    </div>
  );
}
