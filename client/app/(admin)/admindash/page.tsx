'use client'
import React from 'react';
import AdminLayout from '../../../components/adminLayout';
import Navbar from '@/components/navbar';

const Home: React.FC = () => {
  return (
    <AdminLayout>
        <Navbar/>
      <div className="container">
        <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
        {/* Your dashboard content goes here */}
      </div>
    </AdminLayout>
  );
};

export default Home;
