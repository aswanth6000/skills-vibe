'use client'

import axios from "../../../config/axios";
import { useEffect, useState } from "react";
import { User } from "@/types/adminTypes";
import Image from "next/image";
import { Pagination } from "antd";


function Page() {
  const [userData, setUserData] = useState<User[]>([]);
  const [pageNumber, setPagenumber] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/viewAllUsers?page=${pageNumber}`);
        if (response.status === 200) {
          setUserData(response.data.allusers);
          setTotalPages(response.data.totalPages)
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchData();
  }, [pageNumber]);

  const userBlock = async(userId: string) =>{
    const sendBlock = {
      userId: userId
    }
    try {
      const response = await axios.post(`/block`, sendBlock,{
        headers:{
          "Content-Type": 'application/json' 
        }
      })      
      console.log(response);
    } catch (error) {
      console.error(error);
      
    }
  }
  const userUnblock =async(userId: string) =>{
    const sendUnblock = {
      userId: userId
    }
    try {
      const response = await axios.post(`/unblock`, sendUnblock,{
        headers:{
          "Content-Type": 'application/json' 
        }
      })      
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }
  const handleChange = (page: number) =>{
    setPagenumber(page)
  }  

  return (
    <div className='flex flex-col items-center'>
      {/* <Navbar /> */}
      <div className="relative overflow-x-auto shadow-md  m-10">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase border-2 border-black bg-white-50 dark:bg-white-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4"></th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Phone  
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user) => (
              <tr
                key={user._id}
                className="bg-white border-2 border-black dark:bg-white-800 dark:border-white-700 hover:bg-white-50 dark:hover:bg-white-600"
              >
                <td className="w-4 p-4"></td>
                <th
                  scope="row"
                  className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <Image
                    className="w-10 h-10 rounded-full"
                    src={user.profilePicture}
                    height={500}
                    width={500}
                    alt={`${user.username}'s profile`}
                  />
                  <div className="ps-3">
                    <div className="text-base font-semibold text-black">{user.username}</div>
                    <div className="font-normal text-gray-500">{user.email}</div>
                  </div>
                </th>
                <td className="px-6 py-4">{user.phone}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div
                      className={`h-2.5 w-2.5 rounded-full ${user.status ? 'bg-green-500' : 'bg-red-500'} me-2`}
                    ></div>{' '}
                    {user.status ? 'Active' : 'Blocked'}
                  </div>
                </td>
                <td className="px-6 py-4">
                  {!user.status ? <button
                    onClick={()=>userUnblock(user._id)}                  
                    className="font-medium text-green-600 dark:text-green-500 hover:underline"
                  >
                    UnBlock
                  </button> : 
                  <button
                  onClick={()=>userBlock(user._id)}    
                    className="font-medium text-red-600 dark:text-red-500 hover:underline"
                  >
                    Block
                  </button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination defaultCurrent={1} total={totalPages * 10} onChange={handleChange} />
    </div>
  );
}

export default Page;