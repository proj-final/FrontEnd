import React from 'react';

function Notifications() {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6 transition-transform transform hover:scale-105">
      <h2 className="text-2xl font-bold text-center text-orange-500 mb-4">Notifications 🔔</h2>
      <ul className="space-y-2">
        {/* Example Notification */}
        {Array.from({ length: 3 }).map((_, index) => (
          <li  className="bg-gray-100 p-2 rounded-md">
            Notification {index + 1}: I need a delivery now , are you available !
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Notifications;