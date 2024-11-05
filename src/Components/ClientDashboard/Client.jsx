import React from 'react';
import Sidebar from './Sidebar';
import Profile from './Profile';
import Orders from '../Order/Orders';
import Navbar from '../HomePage/1-Navbar/Navbar';

function Client() {
  return (
    <div className="flex min-h-screen bg-gradient-to-r from-orange-300 to-orange-500">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-8">
          <Profile />
          <Orders />
        </div>
      </div>
    </div>
  );
}

export default Client;
