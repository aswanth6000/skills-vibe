'use client'

import axios from "axios";
import { useEffect, useState } from "react";

interface User {
  _id: string;
  profilePicture: string;
  username: string;
  email: string;
  phone: string;
}

function Page() {
  const [userData, setUserData] = useState<User[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/viewAllUsers');
        if (response.status === 200) {
          setUserData(response.data.allusers);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {/* <Navbar /> */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-10">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="w-4 p-4"></td>
                <th
                  scope="row"
                  className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <img
                    className="w-10 h-10 rounded-full"
                    src={user.profilePicture}
                    alt={`${user.username}'s profile`}
                  />
                  <div className="ps-3">
                    <div className="text-base font-semibold">{user.username}</div>
                    <div className="font-normal text-gray-500">{user.email}</div>
                  </div>
                </th>
                <td className="px-6 py-4">{user.phone}</td>
                <td className="px-6 py-4">
                  {/* <div className="flex items-center">
                    <div
                      className={`h-2.5 w-2.5 rounded-full ${user.online ? 'bg-green-500' : 'bg-red-500'} me-2`}
                    ></div>{' '}
                    {user.online ? 'Online' : 'Offline'}
                  </div> */}
                </td>
                <td className="px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit user
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Page;