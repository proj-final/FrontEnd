import React, { useEffect, useState } from 'react';
import { FaEnvelope, FaPhone, FaUserCircle } from 'react-icons/fa';

function Profile() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    imageUrl: ''
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser({
        name: storedUser.name,
        email: storedUser.email,
        phone: storedUser.phone || 'Not provided',
        // imageUrl: storedUser.imageUrl || avatar,
      });
    }
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6 transition-transform transform hover:scale-105">
      <h2 className="text-3xl font-bold text-center text-orange-500 mb-4">Welcome, Delivery Hero! 🚚</h2>
      <div className="flex flex-col items-center mb-6">
        <img
          src={user.imageUrl}
          alt="Profile"
          className="w-32 h-32 rounded-full border-4 border-orange-500 mb-4 transition-transform duration-300 transform hover:scale-110"
        />
        <h3 className="text-xl font-bold text-gray-800">
          <FaUserCircle className="inline mr-2 text-orange-500" />
          {user.name}
        </h3>
        <p className="text-gray-600 flex items-center">
          <FaEnvelope className="mr-2 text-orange-500" />
          {user.email}
        </p>
        <p className="text-gray-600 flex items-center">
          <FaPhone className="mr-2 text-orange-500" />
          {user.phone}
        </p>
      </div>
    </div>
  );
}

export default Profile;
