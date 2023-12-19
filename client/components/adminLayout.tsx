// components/AdminLayout.tsx
import React, { ReactNode } from 'react';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen bg-green-500">
      {/* Sidebar */}
      <aside className="w-1/5 bg-white p-4">
        <h1 className="text-2xl font-bold text-green-500 mb-4">Admin Panel</h1>
        {/* Add navigation links here */}
      </aside>

      {/* Main Content */}
      <main className="flex-1 pb-4 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
