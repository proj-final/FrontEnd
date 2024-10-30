import React from 'react';
import { FaHome, FaSignOutAlt, FaUserCircle, FaTruck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <aside className="bg-white shadow-lg w-64 p-6 rounded-lg transition-all duration-300 transform hover:scale-105">
      <h2 className="text-3xl font-bold mb-6 text-center text-orange-500">Delivery Hub 🚚</h2>
      <nav className="flex flex-col space-y-4">
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-gray-700 hover:bg-orange-500 hover:text-white p-2 rounded-md transition duration-300"
        >
          <FaHome className="mr-2" /> Home
        </button>
        <button
          onClick={() => navigate('/my-orders')}
          className="flex items-center text-gray-700 hover:bg-orange-500 hover:text-white p-2 rounded-md transition duration-300"
        >
          <FaTruck className="mr-2" /> My Orders
        </button>
        <button
          onClick={() => navigate('/profile')}
          className="flex items-center text-gray-700 hover:bg-orange-500 hover:text-white p-2 rounded-md transition duration-300"
        >
          <FaUserCircle className="mr-2" /> Profile
        </button>
        <button
          onClick={handleLogout}
          className="flex items-center text-red-500 hover:bg-red-300 hover:text-white p-2 rounded-md transition duration-300"
        >
          <FaSignOutAlt className="mr-2" /> Logout
        </button>
      </nav>
    </aside>
  );
}

export default Sidebar;