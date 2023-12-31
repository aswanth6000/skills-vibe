'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Navbar from '@/components/adminNav';

interface GigUser {
  userId: string;
  refId: string;
  username: string;
  phone?: number;
  description?: string;
  email: string;
  profilePicture?: string;
  status?: boolean;
  ordersRecieved?: string;
  skills?: { value: string; label: string }[];
  availability?: boolean;
  portfolio?: string;
  title?: string;
  gigdescription?: string;
  gigstatus: boolean;
  price?: number;
  tags?: string;
  image1?: string;
  image2?: string;
  image3?: string;
  video?: string;
}

const Page = () => {
  const [status, setStatus] = useState(false);
  const [gigUser, setGigUser] = useState<GigUser | null>(null);
  const params = useParams()
  const gigId = params.viewgigdetail;
  

  useEffect(() => {
    const fetchGigUser = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/viewgigdetail/${gigId}`);
        setGigUser(response.data.gig[0]);
      } catch (error) {
        console.error('Error fetching gig user:', error);
      }
    };
    fetchGigUser();
  }, []);
  const handleReject = async (gigId: any) =>{
    const gigSendId= {
      gigId: gigId 
    }
    try {
      const response = await axios.post('http://localhost:8002/rejectgig', gigSendId, {
        headers:{
          "Content-Type": 'application/json' 
        }
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  const handleAccept = async (gigId: any) =>{
    const gigSendId= {
      gigId: gigId 
    }
    try {
      const response = await axios.post('http://localhost:8002/acceptgig', gigSendId, {
        headers:{
          "Content-Type": 'application/json' 
        }
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  

  if (!gigUser) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <Navbar/>
    <div className="container mx-auto mt-8 ml-8">
      <h1 className="text-3xl font-bold mb-4">{gigUser.username} Gig Details</h1>
      <img src={gigUser.profilePicture} alt={gigUser.username} className="rounded-full w-16 h-16" />
      <p>Email: {gigUser.email}</p>
      <p>Gig Title: {gigUser.title}</p>
      <p>Price: {gigUser.price}</p>
      <p>Tags: {gigUser.tags}</p>
      <p>Email: {gigUser.email}</p>
      <div className='flex flex-row p-5 '>
      <img src={gigUser.image1} alt={gigUser.username} className="ml-2 w-36 h-3w-36" />
      <img src={gigUser.image2} alt={gigUser.username} className="ml-2 w-36 h-3w-36" />
      <img src={gigUser.image3} alt={gigUser.username} className="ml-2 w-36 h-3w-36" />
      </div>
      <div>
  {gigUser.gigstatus ? (
    <button
      className='h-12 w-52 rounded-2xl bg-red-600 text-white '
      onClick={() => handleReject(gigId)}
    >
      Reject
    </button>
  ) : (
    <button
      className='h-12 w-52 rounded-2xl bg-green-600 text-white ml-4'
      onClick={() => handleAccept(gigId)}
    >
      Approve
    </button>
  )}
</div>

      <ul>
        {gigUser.skills?.map((skill) => (
          <li key={skill.value}>{skill.label}</li>
        ))}
      </ul>

      {/* Add other sections based on your schema */}
    </div>
    </>
  );
};

export default Page;
