'use client'
import axios from "axios";
import { useEffect, useState } from "react";

interface Gig{
  _id:string,
  title: string,
  skills: any,
  price: number,
  username: string,
  phone: number,
  status: boolean

  




}

function Page() {
  const [gigData, setGigData] = useState<Gig[]>([])
  const [app, setApp] = useState<boolean>(false);
  useEffect(()=>{
    const fetchData = async () => {
      try{
        const response = await axios.get('http://localhost:8000/viewallgigs');
        if(response.status === 200){
          setGigData(response.data.allgigs)
          console.log(response.data);
          
        }
      }catch(err){
        console.log(err)
      }
    }
    fetchData()
  }, [])
  console.log(gigData);


  const approval = () =>{
    setApp(!app)
  }
  

  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Gig Name
              </th>
              <th scope="col" className="px-6 py-3">
                Seller Name
              </th>
              <th scope="col" className="px-8 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Phone number
              </th>
              <th scope="col" className="px-6 py-3">
                Available
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Weight
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
          { gigData.map((gig) => (
            <tr key={gig._id.toString()} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {gig.title}
              </th>
              <td className="px-6 py-4">{gig.username}</td>
              <td className="px-6 py-4">{gig.skills[0].value}</td>
              <td className="px-6 py-4">{gig.phone}</td>
              <td className="px-6 py-4">{gig.status}</td>
              <td className="px-6 py-4">${gig.price}</td>
              <td className="px-6 py-4">3.0 lb.</td>
              <td className="flex items-center flex-col px-6 py-4 pb-3">
                <a
                  href="#"
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  View
                </a>
                <a
                  href="#"
                  className="font-medium text-green-600 dark:text-green-500 hover:underline"
                >
                  Approve
                </a>
                <button
                  onClick={approval}
                  className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
                >
                  Reject
                </button>
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
