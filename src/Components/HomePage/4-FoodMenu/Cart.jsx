import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import pay from "../../../Images/payment.jpg";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    const response = await fetch('http://127.0.0.1:3000/api/cart', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    const data = await response.json();
    setCartItems(data.items || []);
    calculateTotal(data.items || []);
  };

  const calculateTotal = (items) => {
    const total = items.reduce((acc, item) => acc + item.dish.price * item.quantity, 0);
    setTotalCost(total);
  };

  const updateQuantity = async (itemId, quantity) => {
    const updatedItems = cartItems.map((item) =>
      item.id === itemId ? { ...item, quantity } : item
    );
    setCartItems(updatedItems);
    calculateTotal(updatedItems);

    await fetch(`http://127.0.0.1:3000/api/cart/item/${itemId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ quantity }),
    });
  };

  const removeItem = async (itemId) => {
    const updatedItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedItems);
    calculateTotal(updatedItems);

    await fetch(`http://127.0.0.1:3000/api/cart/item/${itemId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  };

  const handleSubmitOrder = () => {
    navigate('/paymentMethode');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${pay})` }}>
      <div className="p-8 bg-white max-w-2xl mx-auto rounded-lg shadow-2xl transform transition-transform duration-300 hover:scale-105 mt-10">
        <h2 className="text-4xl font-bold mb-6 text-green-600 text-center">Your Cart 🛒</h2>
        {cartItems.length === 0 ? (
          <p className="text-gray-500 text-center">Your cart is empty</p>
        ) : (
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center p-5 bg-gray-100 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 space-x-4"
              >
                <img
                  src={item.dish.imageUrl}
                  alt={item.dish.title}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold text-gray-800">{item.dish.title}</h3>
                  <p className="text-md text-gray-700">Price: {item.dish.price.toFixed(2)} DT</p>
                  {item.specialRequest && (
                    <p className="text-sm text-gray-500 italic mt-2">Special Request: <span className="text-gray-600">{item.specialRequest}</span></p>
                  )}
                </div>
                <div className="flex items-center space-x-4">
                  <input
                    type="number"
                    value={item.quantity}
                    min="1"
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                    className="w-16 p-2 text-center border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-600 text-2xl font-bold hover:text-red-700 transition duration-200"
                  >
                    ❌
                  </button>
                </div>
              </div>
            ))}
            <div className="text-2xl font-semibold text-center mt-8">
              Total Cost: <span className="text-green-600">{totalCost.toFixed(2)} DT</span>
            </div>

            <div className="flex justify-between space-x-4 mt-6">
              <button
                onClick={handleSubmitOrder}
                className="w-full py-3 bg-green-500 text-white text-lg font-semibold rounded-lg hover:bg-green-600 transition-all duration-200 transform hover:scale-105"
              >
                💰 Buy Now
              </button>
              <button
                onClick={() => navigate('/')}
                className="w-full py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg hover:bg-blue-600 transition-all duration-200 transform hover:scale-105"
              >
                🛍️ Keep Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
