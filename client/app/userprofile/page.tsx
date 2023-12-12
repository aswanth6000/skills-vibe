'use client'
import React, { useState } from 'react';

const UserProfileEdit: React.FC = () => {
  const [username, setUsername] = useState('JohnDoe');
  const [phone, setPhone] = useState('123-456-7890');
  const [email, setEmail] = useState('johndoe@example.com');
  const [password, setPassword] = useState('');

  const handleProfilePhotoClick = () => {
    // Logic to handle profile photo editing
    alert('Edit profile photo');
  };

  const handleSaveChanges = () => {
    // Logic to save changes
    alert('Changes saved');
  };

  return (
    <div className=" bg-white min-h-screen flex mt-24  ">
      {/* Left Section - Profile Photo */}
      <div className="w-1/3 flex flex-col mt-24 items-center p-4">
        <div
          className="w-56 h-56 rounded-full bg-green-500 cursor-pointer overflow-hidden"
          onClick={handleProfilePhotoClick}
        >
          {/* You can use an actual profile photo here */}
          <img
            src="https://via.placeholder.com/150"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="text-2xl font-bold mb-2">{username}</h2>

      </div>
      

      {/* Middle Section - User Details */}
      <div className="w-1/3 flex-grow p-4">
        <h2 className="text-2xl font-bold mb-2">{username}</h2>
        <p className="text-gray-600">{/* User bio or additional details */}</p>

        {/* Editable Fields */}
        <div className="mt-4">
          <label className="block mb-2 text-sm font-medium text-gray-600">Username</label>
          <input
            type="text"
            className="w-96 p-2 border rounded-md focus:outline-none focus:border-green-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mt-4">
          <label className="block mb-2 text-sm font-medium text-gray-600">Phone</label>
          <input
            type="tel"
            className="w-96 p-2 border rounded-md focus:outline-none focus:border-green-500"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="mt-4">
          <label className="block mb-2 text-sm font-medium text-gray-600">Email</label>
          <input
            type="email"
            className="w-96 p-2 border rounded-md focus:outline-none focus:border-green-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mt-4">
          <label className="block mb-2 text-sm font-medium text-gray-600">Password</label>
          <input
            type="password"
            className="w-96 p-2 border rounded-md focus:outline-none focus:border-green-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Save Changes Button */}
        <button
          className="mt-6 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none"
          onClick={handleSaveChanges}
        >
          Save Changes
        </button>
      </div>

      {/* Right Section - Action Buttons */}
      <div className="w-1/3 flex flex-col mt-24 items-center">
        <button className="w-2/3 mb-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none">
          Orders
        </button>
        <button className="w-2/3 mb-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none">
          Dashboard
        </button>
        {/* Add more buttons as needed */}
      </div>
    </div>
  );
};

export default UserProfileEdit;
