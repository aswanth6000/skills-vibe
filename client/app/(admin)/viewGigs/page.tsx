"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { Gig } from "@/types/adminTypes";
import Link from "next/link";
import { Pagination } from "antd";

function Page() {
  const [gigData, setGigData] = useState<Gig[]>([]);
  const [gigId, setgigId] = useState<string>();
  const [app, setApp] = useState<boolean>(false);
  const [pageNumber, setPagenumber] = useState(0)
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/viewallgigs?page=${pageNumber}`);
        if (response.status === 200) {
          setGigData(response.data.allgigs);
          setTotalPages(response.data.totalPages)
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [pageNumber]);
  console.log(gigData);

  const approval = async () => {
    setApp(!app);
    const status = {
      status: app,
      gigId: gigId,
    };
    try {
      const response = await axios.post(
        "http://localhost:8001/gigstatus",
        status,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (page: number) =>{
    setPagenumber(page)
  }  
  return (
    <div className='flex flex-col items-center'>
      <div className="relative overflow-x-auto shadow-md mb-4">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs border-2 border-black text-gray-700 uppercase bg-white-50 dark:bg-white-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Gig Name
              </th>
              <th scope="col" className="px-6 py-3">
                Seller Name
              </th>
              <th scope="col" className="px-6 py-3">
                Phone number
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {gigData.map((gig) => (
              <tr
                key={gig._id.toString()}
                className="bg-white border-2 border-black dark:bg-white-800 dark:border-white-700 hover:bg-white-50 dark:hover:bg-white-600"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black"
                >
                  {gig.title}
                </th>
                <td className="px-6 py-4">{gig.username}</td>
                <td className="px-6 py-4">{gig.phone}</td>
                <td className="px-6 py-4">${gig.price}</td>
                <td className="flex items-center flex-col px-6 py-4 pb-3">
                  <Link
                    href={`viewgigdetail/${gig.refId}`}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    View
                  </Link>
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
