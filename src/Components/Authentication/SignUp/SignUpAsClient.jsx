import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clientBg from '../../../Images/client2.jpg'; // Import the background image
import PopupModal from './Modal.jsx'; // Import the PopupModal component

function SignUpAsClient() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    address: '', // New field for address
  });
  const [error, setError] = useState('');
  const [showPopup, setShowPopup] = useState(false); // State to control popup visibility

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:5000/api/users/client/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setShowPopup(true); // Show popup on successful sign-up
        setTimeout(() => {
          navigate('/login'); // Redirect to login after showing popup
        }, 7000); // Redirect after 2 seconds
      } else {
        setError(data.error || 'Something went wrong, please try again');
      }
    } catch (err) {
      setError('Server error, please try again later');
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false); // Close the popup
  };

  return (
    <div
      className="h-screen bg-cover bg-center flex justify-center items-center"
      style={{ backgroundImage: `url(${clientBg})` }}
    >
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg max-w-md w-full transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
        <h2 className="text-4xl font-bold text-center mb-6 text-gray-800">
          Sign Up as a Client
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Name Field */}
          <div className="relative">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Email Field */}
          <div className="relative">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Phone Field */}
          <div className="relative">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="phoneNumber">
              Phone
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full px-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your phone number"
              required
            />
          </div>

          {/* Address Field */}
          <div className="relative">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="address">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your address"
              required
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Confirm Password Field */}
          <div className="relative">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm your password"
              required
            />
          </div>

          {/* Submit and Cancel Buttons */}
          <div className="flex space-x-4">
            <button
              type="submit"
              className="flex-1 py-3 bg-orange-500 text-white font-semibold rounded-md shadow-md hover:bg-orange-600 transition duration-300"
            >
              Sign Up
            </button>
            <button
              type="button"
              onClick={() => navigate('/')} 
              className="flex-1 py-3 bg-gray-600 text-white font-semibold rounded-md shadow-md hover:bg-gray-700 transition duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
      {showPopup && <PopupModal message="Congratulation 🔥! Let's go to login..." onClose={handleClosePopup} />}
    </div>
  );
}

export default SignUpAsClient;
