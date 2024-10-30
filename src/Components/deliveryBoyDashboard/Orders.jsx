import React from 'react';

function Orders() {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6 transition-transform transform hover:scale-105">
      <h2 className="text-2xl font-bold text-center text-orange-500 mb-4">My Orders 📦</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Example Order Card */}
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="bg-gray-100 rounded-lg p-4 hover:shadow-lg transition-shadow duration-300">
            <h3 className="font-semibold text-lg text-gray-800">Order #{index + 1}</h3>
            <p className="text-gray-600">Details of the order will go here.</p>
            <button className="bg-orange-500 text-white py-1 px-2 mt-2 rounded-md">View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;