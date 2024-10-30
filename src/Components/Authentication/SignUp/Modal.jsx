import React from 'react';

const Modal = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg transform transition-all duration-300">
        <h3 className="text-lg font-semibold text-center text-gray-800">{message}</h3>
        <div className="mt-4 flex justify-center">
          <button
            onClick={onClose}
            className="py-2 px-4 bg-orange-500 text-white font-semibold rounded-md shadow-md hover:bg-orange-600 transition duration-300"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
