"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { Text } from "@chakra-ui/react";
import { setChats, setSelectedChat } from "@/redux/features/chatSlice";
import ChatLoading from "./chatLoading";
import { getSender, getSenderImg } from "@/config/chatLogics";


let bearerToken: string | null;


export default function ChatAllUsers() {
  const userAuth = useAppSelector((state: any)=> state.auth.value)
  
  const [loggedUser, setLoggedUser]: any = useState('')
  useEffect(()=>{
    bearerToken = localStorage.getItem("token");
    setLoggedUser(userAuth._id)
  }, [])
  console.log("Logged user",loggedUser);
  

  const selectedChat = useAppSelector((state: any) => state.chat.selectedChat);
  
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  const [chat, setChat] = useState([]);
  const [data, setData] = useState([]);
  const [searchResult, setSearchResult] = useState([])

  const [search, setSearch] = useState('')
  const user = useAppSelector((state: any) => state.chat.user);
  const chats = useAppSelector((state: any) => state.chat.chats);
  console.log("llll0o", chats);
  const handleSearch = async () => {
    if (!search) {
      toast.error('Please enter something in search', {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      return;
    }
      if (bearerToken) {
          setLoading(true)
          try {
            const {data} = await axios.get(`http://localhost:8004/searchuser?search=${search}`, {
              headers: {
                Authorization: `Bearer ${bearerToken}`,
              },
            });
            setLoading(false)
            if (!chats.find((c: any) => c._id === data._id)) setChats([data, ...chats]);
            setSearchResult(data);
          } catch (error) {
            toast.error('An error occoured', {
              position: "bottom-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              });
              console.log(error);
              setSearchResult(data);
              
          }
      }

  };



console.log(searchResult);



  const setSelectedChatFn = (chat: any) => { };


  return (
    <div className=" w-1/4 h-screen overflow-x-hidden">
      <div className="flex flex-row   mb-3 w-full justify-center mt-3">
        <input
          type="text"
          className="pl-1 p-2 shadow-md outline-none rounded-s-md border bg-bodywhite h-10"
          placeholder="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="bg-green-600 p-1 rounded-e-md shadow-md border h-10"
          onClick={handleSearch}
        >
          Search
        </button>
        <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      </div>
      <div className="flex flex-col h-fit  w-full items-center">
        {/* users */}

        {searchResult ? searchResult.map((x: any)=>(<div key={x._id} className="bg-bodywhite  h-16 rounded-md shadow-md w-11/12 flex border  mb-2 items-center p-2">
          <img src={x.profilePicture} className="h-10 w-10 rounded-3xl"/>
          <div className="ml-2">
            <div className="text-md font-bold">{x.username}</div>
            {/* <div className="text-sm font-semibold">ads</div> */}
          </div>
        </div>)) : <ChatLoading />}

        {chats ? chats.map((x: any)=>(
        <button onClick={() => dispatch(setSelectedChat(chat))} key={x._id} className="bg-bodywhite  h-16 rounded-md shadow-md w-11/12 flex border  mb-2 items-center p-2">
          <img src={getSenderImg(loggedUser, x.users)} className="h-10 w-10 rounded-3xl"/>
          <div className="ml-2">
            <div className="text-md font-bold">{getSender(loggedUser, x.users)}</div>
            {x.latestMessage && (
                  <div className="text-sm font-semibold">
                    <b>{x.latestMessage.sender.name} : </b>
                    {x.latestMessage.content.length > 50
                      ? x.latestMessage.content.substring(0, 51) + "..."
                      : x.latestMessage.content}
                  </div>
                )}
          </div>
        </button>)) : <ChatLoading />}
      </div>
      <div></div>
    </div>
  );
}
