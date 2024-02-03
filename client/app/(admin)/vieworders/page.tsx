import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { Pagination } from 'antd';

interface OrderDetails {
    buyerId: string;
    buyerProfile: string;
    buyeremail: string;
    buyername: string;
    buyerphone: string;
    date: string;
    gigId: string;
    gigPrice: number;
    gigTitle: string;
    orderStatus: string;
    paymentStatus: string;
    sellerEmail: string;
    sellerId: string;
    sellerName: string;
    sellerPhone: string;
    sellerPic: string;
    tags: string[];
    __v: number;
    _id: string;
  }
  
  
export default function Vieworder() {
    const [orderData, setOrderData] = useState<OrderDetails[]>([])
    const [pageNumber, setPagenumber] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`/order/viewOrders?page=${pageNumber}`);
            if (response.status === 200) {
              setOrderData(response.data.orders);
              setTotalPages(response.data.totalPages)
            }
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        };
        fetchData();
      }, [pageNumber]);
      const handleChange = (page: number) =>{
        setPagenumber(page)
      }      
      
  return (
    <div className='flex flex-col items-center'>
    <div className="relative overflow-x-auto shadow-md mb-4 ">
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
              Buyer Name
            </th>
            <th scope="col" className="px-6 py-3">
              Order status
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
          {orderData?.map((order) => (
            <tr
              key={order._id.toString()}
              className="bg-white border-2 border-black dark:bg-white-800 dark:border-white-700 hover:bg-white-50 dark:hover:bg-white-600"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black"
              >
                {order.gigTitle}
              </th>
              <td className="px-6 py-4">{order.sellerName}</td>
              <td className="px-6 py-4">{order.buyername}</td>
              <td className="px-6 py-4">{order.orderStatus}</td>
              <td className="px-6 py-4">${order.gigPrice}</td>
              <td className="flex items-center flex-col px-6 py-4 pb-3">
                <Link
                  href={`vieworderdetail/${order._id}`}
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
  )
}
