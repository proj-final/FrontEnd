import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaPhone, FaHome, FaUserCircle, FaImage } from 'react-icons/fa';
import Navbarclient from './Navbarclient';

function UpdateProfile({ onUpdate }) {
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    imageUrl: ''
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser({
        name: storedUser.name || '',
        email: storedUser.email || '',
        phone: storedUser.phone || '',
        address: storedUser.address || '',
        imageUrl: storedUser.imageUrl || ''
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    // Update user data (backend call can be added here)
    localStorage.setItem('user', JSON.stringify(user));
    onUpdate && onUpdate(user); // Optional callback to update parent state
    alert('Profile updated successfully');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbarclient />
      <div className="flex-grow flex items-center justify-center relative">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-red-500 to-purple-600"></div>
        <div className="relative bg-white bg-opacity-90 shadow-lg rounded-lg p-8 w-full max-w-2xl mx-4">
          <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
            Update Your Profile
          </h2>
          <div className="flex flex-col items-center mb-6">
            <div className="flex flex-col items-center w-full">
              <div className="flex items-center mb-6 w-full">
                <FaUserCircle className="mr-4 text-orange-500 text-2xl" />
                <input
                  type="text"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  placeholder="Enter Name"
                  className="w-full px-5 py-4 rounded border text-gray-700 text-xl"
                />
              </div>
              <div className="flex items-center mb-6 w-full">
                <FaEnvelope className="mr-4 text-orange-500 text-2xl" />
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  placeholder="Enter Email"
                  className="w-full px-5 py-4 rounded border text-gray-700 text-xl"
                />
              </div>
              <div className="flex items-center mb-6 w-full">
                <FaPhone className="mr-4 text-orange-500 text-2xl" />
                <input
                  type="tel"
                  name="phone"
                  value={user.phone}
                  onChange={handleChange}
                  placeholder="Enter Phone"
                  className="w-full px-5 py-4 rounded border text-gray-700 text-xl"
                />
              </div>
              <div className="flex items-center mb-6 w-full">
                <FaHome className="mr-4 text-orange-500 text-2xl" />
                <input
                  type="text"
                  name="address"
                  value={user.address}
                  onChange={handleChange}
                  placeholder="Enter Address"
                  className="w-full px-5 py-4 rounded border text-gray-700 text-xl"
                />
              </div>
              <div className="flex items-center mb-6 w-full">
                <FaImage className="mr-4 text-orange-500 text-2xl" />
                <input
                  type="text"
                  name="imageUrl"
                  value={user.imageUrl}
                  onChange={handleChange}
                  placeholder="Enter Image URL"
                  className="w-full px-5 py-4 rounded border text-gray-700 text-xl"
                />
              </div>
            </div>
          </div>
          <button
            onClick={handleSubmit}
            className="bg-orange-500 text-white py-4 px-8 rounded-md shadow hover:bg-orange-600 transition duration-300 transform hover:scale-105 w-full text-xl"
          >
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateProfile;
