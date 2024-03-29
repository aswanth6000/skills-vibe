"use client"
import { logOut } from "@/redux/features/authSlice";
import { useAppSelector } from "@/redux/store";
import React,{useState, useEffect} from "react" ;
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faBell, faCircleQuestion, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { Menu } from '@headlessui/react'
import { button } from "@material-tailwind/react";


export default function Navbar() {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const user = useAppSelector((state)=> state.auth.value.isAdmin)
  
  
  
  const [navbarOpen, setNavbarOpen] = useState<Boolean>(false);
  useEffect(() => {
    setNavbarOpen(false);
  }, [user]);
  
  const handleLogout = () =>{
     localStorage.removeItem('token');
     dispatch(logOut())
     router.push('/login')
  }


  return (
    <div className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-navwhite shadow-md">
      <div className="container px-3 mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
          <Link
            className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-textgrey"
            href="#pablo"
          >
            Skills Vibe
          </Link>
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
          <div className="flex flex-col lg:flex-row list-none lg:ml-auto p-2">


            {user && <div className="nav-item">
              <Menu as="div" className="relative z-10">
                <Menu.Button className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-textgrey hover:opacity-75">
                  Business<FontAwesomeIcon className="ml-1" icon={faCaretDown} />
                </Menu.Button>
                <Menu.Items className="absolute right-0 mt-2 space-y-2 bg-white border border-gray-200 rounded shadow-md z-50">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        className={`block px-4 py-2 text-xs leading-5 text-textgrey ${
                          active ? "bg-blue-500 text-white" : ""
                        } hover:bg-blue-500 hover:text-white`}
                        href="/account-settings"
                      >
                        Orders
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        className={`block px-4 py-2 text-xs leading-5 text-textgrey ${
                          active ? "bg-blue-500 text-white" : ""
                        } hover:bg-blue-500 hover:text-white`}
                        href="/viewGigs"
                      >
                        View Gigs
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        className={`block px-4 py-2 text-xs leading-5 text-textgrey ${
                          active ? "bg-blue-500 text-white" : ""
                        } hover:bg-blue-500 hover:text-white`}
                        href="/documentation"
                      >
                        Profile
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        className={`block px-4 py-2 text-xs leading-5 text-textgrey ${
                          active ? "bg-blue-500 text-white" : ""
                        } hover:bg-blue-500 hover:text-white`}
                        href="/documentation"
                      >
                        Earnings
                      </Link>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Menu>
            </div>}

            {user && <div className="nav-item">
              <Menu as="div" className="relative z-10">
                <Menu.Button className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-textgrey hover:opacity-75">
                  Users<FontAwesomeIcon className="ml-1" icon={faCaretDown} />
                </Menu.Button>
                <Menu.Items className="absolute right-0 mt-2 space-y-2 bg-white border border-gray-200 rounded shadow-md z-50">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        className={`block px-4 py-2 text-xs leading-5 text-textgrey ${
                          active ? "bg-blue-500 text-white" : ""
                        } hover:bg-blue-500 hover:text-white`}
                        href="viewusers"
                      >
                        View Users
                      </Link>
                    )}
                  </Menu.Item>
                  
                </Menu.Items>
              </Menu>
            </div>}

            <div className="nav-item">
              <FontAwesomeIcon
                className="px-3 py-2 flex items-center text-sm uppercase font-bold leading-snug text-textgrey hover:opacity-75"
                icon={faEnvelope}
              />
            </div>
            <div className="nav-item">
              <FontAwesomeIcon
                className="px-3 py-2 flex items-center text-sm uppercase font-bold leading-snug text-textgrey hover:opacity-75"
                icon={faBell}
              />
            </div>
            <div className="nav-item">
              <FontAwesomeIcon
                className="px-3 py-2 flex items-center text-sm uppercase font-bold leading-snug text-textgrey hover:opacity-75"
                icon={faCircleQuestion}
              />
            </div>

            {user && (
              <div className="nav-item">
                <button
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-textgrey hover:opacity-75"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}

            {user && (
              <div className="nav-item">
                <div className=" h-8 w-8 rounded-3xl">
                  <Link href={`/adminprofile`}>
                    <Image
                      src='https://cdn3.iconfinder.com/data/icons/user-group-black/100/user-process-512.png'
                      className="h-8 w-8 rounded-3xl"
                      width={500}
                      height={500}
                      alt=""
                    />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
