"use client"
import { logOut } from "@/redux/features/authSlice";
import { useAppSelector } from "@/redux/store";
import React,{useState, useEffect} from "react" ;
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faBell, faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";


export default function Navbar() {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const user = useAppSelector((state)=> state.auth.value)
  console.log(user.username);
  
  const [navbarOpen, setNavbarOpen] = useState<Boolean>(false);
  useEffect(() => {
    setNavbarOpen(false);
  }, [user]);
  
  const handleLogout = () =>{
     dispatch(logOut())
     router.push('/login')
  }


  return (
  
      <div className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-navwhite ">
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
              <input
                type="text"
                id="search-navbar"
                className="block outline-none w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                placeholder="Search..."
              />
            {user && <li className="nav-item">
                <a
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-textgrey hover:opacity-75"
                  href="#pablo"
                >
                  Dashboard
                </a>
              </li>}
              {user && (
                <li className="nav-item">
                  <Link
                    className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-textgrey hover:opacity-75"
                    href="/gigform"
                  >
                    business
                  </Link>
                </li>
              )}
              <li className="nav-item">
                {user ? (
                  <Link
                    className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-textgrey hover:opacity-75"
                    href={`/userprofile/${user._id}`}
                  >
                    {user.username}
                  </Link>
                ) : (
                  <Link
                    className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-textgrey hover:opacity-75"
                    href="/login"
                  >
                    Login
                  </Link>
                )}
              </li>
              <li className="nav-item">
                <a
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-textgrey hover:opacity-75"
                  href="#pablo"
                >
                  Analytics
                </a>
              </li>
              <li className="nav-item">
              <FontAwesomeIcon className="px-3 py-2 flex items-center text-sm uppercase font-bold leading-snug text-textgrey hover:opacity-75" icon={faEnvelope} />
              </li>
              <li className="nav-item">
              <FontAwesomeIcon className="px-3 py-2 flex items-center text-sm uppercase font-bold leading-snug text-textgrey hover:opacity-75" icon={faBell} />
              </li>
              <li className="nav-item">
              <FontAwesomeIcon className="px-3 py-2 flex items-center text-sm uppercase font-bold leading-snug text-textgrey hover:opacity-75" icon={faCircleQuestion} />
              </li>

              {user.username && (
                <li className="nav-item">
                  <Link
                    className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-textgrey hover:opacity-75"
                    href="#pablo"
                    onClick={handleLogout}
                  >
                    Logout
                  </Link>
                </li>
              )}

              {user &&               
              <li className="nav-item">
                  <div className="bg-textgrey h-8 w-8 rounded-3xl">
                    <Image src={user.profilePhoto} alt="" />
                  </div>
              </li>}
            </ul>
          </div>
        </div>
      </div>

  );
}
