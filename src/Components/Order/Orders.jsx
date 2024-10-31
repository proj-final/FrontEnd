import React, { useEffect, useState } from "react";
import ConfirmationPopup from "./popup";
import axios from "axios"; // Ensure axios is imported for API calls
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesome icon
import { faClock, faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons"; // Import specific icons

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState("");
  const [orderToActOn, setOrderToActOn] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const clientId = 1; // Replace with the actual client ID from your authentication context or props
        const response = await axios.get(`http://localhost:5000/api/orders/orders/${clientId}`);
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    
    fetchOrders();
  }, []); // Empty dependency array to run once on mount

  const handleDeleteClick = (orderId) => {
    setOrderToActOn(orderId);
    setPopupType("delete");
    setShowPopup(true);
  };

  const handleConfirmClick = () => {
    setPopupType("confirm");
    setShowPopup(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/orders/${orderToActOn}`); // Delete request
      setOrders(orders.filter((order) => order.id !== orderToActOn));
      setShowPopup(false);
      setOrderToActOn(null);
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  const handleConfirmOrder = () => {
    setShowPopup(false);
  };

  const handleCancel = () => {
    setShowPopup(false);
    setOrderToActOn(null);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Pending":
        return <FontAwesomeIcon icon={faClock} className="text-yellow-500" />;
      case "Completed":
        return <FontAwesomeIcon icon={faCheckCircle} className="text-green-500" />;
      case "Canceled":
        return <FontAwesomeIcon icon={faTimesCircle} className="text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-50 py-10 px-8">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">My Orders</h2>
      <ul className="space-y-8 max-w-3xl mx-auto">
        {orders.map((order) => (
          <li key={order.id} className="flex items-center bg-white p-6 rounded-lg shadow-lg relative">
            <img
              src={order.dish.imageUrl} // Adjust based on the order structure
              alt={order.dish.title} // Adjust based on the order structure
              className="w-32 h-32 object-cover rounded-lg mr-6"
            />
            <div className="flex-1">
              <h3 className="text-2xl font-semibold text-gray-800">{order.dish.title}</h3> {/* Adjust based on the order structure */}
              <p className="text-lg font-bold bg-gradient-to-r from-orange-400 to-yellow-400 text-transparent bg-clip-text mt-2">
                {order.totalAmount} DT {/* Adjust based on the order structure */}
              </p>
              <div className="flex justify-between items-center mt-4">
                <p className="text-lg font-medium text-gray-600">
                  Status: 
                  <span className="flex items-center ml-2">
                    {getStatusIcon(order.status)} {/* Display the corresponding icon */}
                    <span className={`ml-1 ${order.status === 'Pending' ? 'text-yellow-600' : order.status === 'Completed' ? 'text-green-600' : 'text-red-600'}`}>
                      {order.status || "Pending"}
                    </span>
                  </span>
                </p>
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleDeleteClick(order.id)}
                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-semibold hover:bg-gray-300"
                  >
                    Cancel {/* Changed from "Remove Dish" to "Cancel" */}
                  </button>
                  <button
                    onClick={handleConfirmClick}
                    className="bg-[#FFA500] text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-600"
                  >
                    Confirm it
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {showPopup && (
        <ConfirmationPopup
          type={popupType}
          onConfirm={popupType === "delete" ? handleConfirmDelete : handleConfirmOrder}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default Order;
