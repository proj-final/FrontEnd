import React from 'react';
import Sidebar from './Sidebar';
import Profile from './Profile.jsx';
import Orders from './Orders.jsx';
import Notifications from './Notifications';

function DeliveryBoyDashboard() {
  return (
    <div className="flex min-h-screen bg-gradient-to-r from-green-200 to-blue-200">
      <Sidebar />
      <div className="flex-1 p-8">
        <Profile />
        <Orders />
        <Notifications/>
      </div>
    </div>
  );
}

export default DeliveryBoyDashboard;