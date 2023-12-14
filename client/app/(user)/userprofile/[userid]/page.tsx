'use client'
import { useEffect } from 'react';
import { useAppSelector } from '@/redux/store';
import React, { useState } from 'react';
import Navbar from '@/components/navbar';
import Image from 'next/image';
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import { textarea } from '@material-tailwind/react';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const UserProfileEdit: React.FC = () => {
  const colourOptions = [
    { value: 'red', label: 'Red' },
    { value: 'blue', label: 'Blue' },
    { value: 'green', label: 'Green' },
  ];
  const animatedComponents = makeAnimated();
  const user = useAppSelector((state) => state.auth.value);
  const [username, setUsername] = useState(user.username);
  const [phone, setPhone] = useState(user.phone);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState('');
  const [uploadPic, setUploadPic] = useState<File | null>(null);
  const [pic, setPic] = useState< null | string>(null);

  const handleProfilePhotoClick = () => {
    // Logic to handle profile photo editing
    alert('Edit profile photo');
  };

  const handleSaveChanges = () => {
    // Logic to save changes
    alert('Changes saved');
  };

  useEffect(() => {
    if (user) {
      setPic(user.profilePicture || null);
    }
  }, [user]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPic(URL.createObjectURL(file));
      setUploadPic(file);
    }
  };
  

  const handleImageClick = () => {
    
    // Trigger the file input when the image is clicked
    const fileInput = document.getElementById('file_input') as HTMLInputElement | null;
    if (fileInput) {
      fileInput.click();
    }
  };

  return (
    <section>
      <Navbar />
      
      <div className=" bg-bodywhite min-h-screen flex   ">
        {/* Left Section - Profile Photo */}
        <div className="w-1/3 bg-navwhite h-auto ml-5 rounded-2xl border-black flex flex-col mt-2 items-center p-4 mb-12">
          <div className="w-56 h-56 rounded-full cursor-pointer overflow-hidden">
            <input
              id="file_input"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <Image
              src={
                pic
                  ? pic
                  : "https://res.cloudinary.com/dihrwghx2/image/upload/v1699291554/admin-user-react/default-pic_rkk3gl.jpg"
              }
              alt="Profile"
              height={500}
              width={500}
              className="w-full h-full object-cover"
              onClick={handleImageClick}
            />
          </div>
          <h2 className="text-2xl font-bold mb-2">{username}</h2>
        </div>

        <div className="w-1/3 flex-grow p-4 bg-navwhite h-auto ml-5 mt-2 rounded-2xl border-black mb-12">
          <h2 className="text-2xl font-bold mb-2">{username}</h2>
          <p className="text-gray-600">
            {/* User bio or additional details */}
          </p>

          {/* Editable Fields */}
          <div className="mt-4 ">
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Username
            </label>
            <input
              type="text"
              className="w-96 p-2 border rounded-md focus:outline-none focus:border-green-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Phone
            </label>
            <input
              type="tel"
              className="w-96 p-2 border rounded-md focus:outline-none focus:border-green-500"
              value={phone}
              onChange={(e) => setPhone(parseInt(e.target.value, 10))}
            />
          </div>
          <div className="mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              className="w-96 p-2 border rounded-md focus:outline-none focus:border-green-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Skills
            </label>
            <Select
              closeMenuOnSelect={false}
              components={animatedComponents}
              defaultValue={[colourOptions[4], colourOptions[5]]}
              isMulti
              options={colourOptions}
            />
          </div>
          <div className="mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Brief description about yourself
            </label>
            <textarea className="w-96 p-2 border rounded-md focus:outline-none focus:border-green-500" />
          </div>

          {/* Save Changes Button */}
          <button
            className="mt-6 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none"
            onClick={handleSaveChanges}
          >
            Save Changes
          </button>
        </div>

        <div className="w-1/3 flex flex-col  items-center bg-navwhite h-auto ml-5 rounded-2xl border-black  mt-2 p-4 mb-12 mr-4 justify-center">
          <button className="w-2/3 mb-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none">
            Orders
          </button>
          <button className="w-2/3 mb-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none">
            Active Gigs
          </button>
          <button className="w-2/3 mb-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none">
            Dashboard
          </button>
          <button className="w-2/3 mb-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none">
            Change Password
          </button>
        </div>
      </div>
    </section>
  );
};

export default UserProfileEdit;
