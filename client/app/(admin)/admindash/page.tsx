'use client'
import React from 'react';
import Navbar from '@/components/adminNav';

const Home: React.FC = () => {
  return (
    <>
        <Navbar/>
      <div className="container">
        <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
      </div>
      </>
  );
};

export default Home;
