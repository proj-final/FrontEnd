// Login.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import tunisian from '../../../Images/tunisian.jpg';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:5000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        const userData = {
          id: data.user.id,
          email: data.user.email,
          phone: data.user.phone,
          name: data.user.name,
          imageUrl: data.user.imageUrl,
          userType: data.userType,
        };
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(userData));

        console.log(userData);
        switch (data.userType) {
          case 'client':
            navigate('/client-dashboard');
            break;
          case 'chef':
            navigate('/chef-dashboard');
            break;
          case 'deliveryBoy':
            navigate('/deliveryboy-dashboard');
            break;
          case 'admin':
            navigate('/admin-dashboard');
            break;
          default:
            setError('Unknown user type');
        }
      } else {
        setError(data.error || 'Invalid login credentials');
      }
    } catch (err) {
      console.error('Error during login:', err);
      setError('Server error, please try again later');
    }
  };

  return (
    <div
      className="h-screen flex justify-center items-center bg-cover bg-center"
      style={{ backgroundImage: `url(${tunisian})` }}
    >
      <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Login
        </h2>
        {error && (
          <p className="text-red-500 text-center mb-4">
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="relative">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-green-500 text-white font-bold rounded-md hover:bg-green-600 transition-all"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
