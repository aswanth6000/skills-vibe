"use client";
import { logOut } from "@/redux/features/authSlice";
import { useAppSelector } from "@/redux/store";
import React, { useState, useEffect } from "react";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faBell,
  faCircleQuestion,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { Menu } from "@headlessui/react";
import { button } from "@material-tailwind/react";
import axios from "axios";



let bearerToken: string | null; 

export default function Navbar() {
  const [search, setSearch] = useState('')
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const user = useAppSelector((state) => state.auth.value);
  const notification = useAppSelector((state) => state.chat.notification);
  useEffect(() => {
    bearerToken = localStorage.getItem("token");
  }, []);
  const [navbarOpen, setNavbarOpen] = useState<Boolean>(false);
  useEffect(() => {
    setNavbarOpen(false);
  }, [user]);
  const searchGig = async(e: any)=>{
    if(e.key === "Enter"){
      e.preventDefault()
      router.push(`http://localhost:3000/searchGig/${search}`)
      // console.log("here", search);
      // const { data } = await axios.get(
      //   `http://localhost:8001/searchGig?search=${search}`,
      //   {
      //     headers: {
      //       Authorization: `Bearer ${bearerToken}`,
      //     },
      //   }
      // );
      // console.log(data);
      
    }

  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logOut());
    router.push("/login");
  };

  return (
    <div className="relative flex flex-wrap items-center justify-between px-2 py-3 z-50 bg-navwhite border-y-2">
      <div className="container px-3 mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
          <a
            className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-textgrey"
            href="#pablo"
          >
            Skills Vibe
          </a>
          <button
            className="text-textgrey cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
            type="button"
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className={
            "lg:flex flex-grow items-center" +
            (navbarOpen ? " flex" : " hidden")
          }
          id="example-navbar-danger"
        >
          <ul className="flex flex-col lg:flex-row list-none lg:ml-auto p-2">
            <div className="relative mt-3">
              <div className="absolute inset-y-0 mb-3 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
            </div>
            <form action="" onKeyDown={searchGig}>
            <input
              type="text"
              id="search-navbar"
              className="block outline-none w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
              placeholder="Search..."
              value={search}
              onChange={(e)=> setSearch(e.target.value)}
            />
            </form>
            {user && (
              <li className="nav-item">
                <a
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-textgrey hover:opacity-75"
                  href="#pablo"
                >
                  Dashboard
                </a>
              </li>
            )}
            {user && (
              <li className="nav-item">
                <Menu as="div" className="relative z-10">
                  <Menu.Button className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-textgrey hover:opacity-75">
                    Business
                    <FontAwesomeIcon className="ml-1" icon={faCaretDown} />
                  </Menu.Button>
                  <Menu.Items className="absolute right-0 mt-2 space-y-2 bg-white border border-gray-200 rounded shadow-md z-50">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          className={`block px-4 py-2 text-xs leading-5 text-textgrey ${
                            active ? "bg-blue-500 text-white" : ""
                          } hover:bg-blue-500 hover:text-white`}
                          href="/myorders"
                        >
                          Orders
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          className={`block px-4 py-2 text-xs leading-5 text-textgrey ${
                            active ? "bg-blue-500 text-white" : ""
                          } hover:bg-blue-500 hover:text-white`}
                          href="/mygigs"
                        >
                          Gigs
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          className={`block px-4 py-2 text-xs leading-5 text-textgrey ${
                            active ? "bg-blue-500 text-white" : ""
                          } hover:bg-blue-500 hover:text-white`}
                          href={`/userprofile/${user._id}`}
                        >
                          Profile
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          className={`block px-4 py-2 text-xs leading-5 text-textgrey ${
                            active ? "bg-blue-500 text-white" : ""
                          } hover:bg-blue-500 hover:text-white`}
                          href="/earnings"
                        >
                          Earnings
                        </a>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              </li>
            )}

            <li className="nav-item">
              <Link href={`/messages`}>
                <FontAwesomeIcon
                  className="px-3 py-2 flex items-center text-sm uppercase font-bold leading-snug text-textgrey hover:opacity-75"
                  icon={faEnvelope}
                />
              </Link>
            </li>
            {user && (
              <li className="nav-item">
                <Menu as="div" className="relative z-10">
                  <Menu.Button className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-textgrey hover:opacity-75">
                    <FontAwesomeIcon className="ml-1" icon={faBell} />
                  </Menu.Button>
                  <Menu.Items className="absolute right-0 mt-2 space-y-2 bg-white border w-96 flex justify-center border-gray-200 rounded shadow-md z-50">
                    <Menu.Item>
                      {({ active }) => (
                        <>
                          {notification.length !== 0 ?(
                            <a
                              className={`block px-4 py-2 w-auto text-xs leading-5 text-textgrey ${
                                active ? "bg-blue-500 text-white" : ""
                              } hover:bg-blue-500 hover:text-white`}
                              href="/account-settings"
                            >
                              Overview
                            </a>
                          ): "No new Messeges" }
                          
                        </>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              </li>
            )}
            <li className="nav-item">
              <FontAwesomeIcon
                className="px-3 py-2 flex items-center text-sm uppercase font-bold leading-snug text-textgrey hover:opacity-75"
                icon={faCircleQuestion}
              />
            </li>

            {user.username && (
              <li className="nav-item">
                <button
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-textgrey hover:opacity-75"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            )}

            {user && (
              <li className="nav-item">
                <div className=" h-8 w-8 rounded-3xl">
                  <Link href={`/userprofile/${user._id}`}>
                    <Image
                      src={user.profilePicture}
                      className="h-8 w-8 rounded-3xl"
                      width={500}
                      height={500}
                      alt=""
                    />
                  </Link>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
