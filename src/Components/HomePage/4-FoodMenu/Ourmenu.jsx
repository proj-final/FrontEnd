// OurMenu.jsx
import React, { useState, useEffect } from 'react';
import './ourmenu.css';
import DishModal from './DishModal';  // Import the modal component

const OurMenu = ({ searchQuery }) => {
    const [dishes, setDishes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedDish, setSelectedDish] = useState(null); // Track the selected dish
    const [modalOpen, setModalOpen] = useState(false); // Control modal visibility

    useEffect(() => {
        const fetchDishes = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/dishes'); // Fetch all dishes
                if (!response.ok) {
                    throw new Error('Failed to fetch dishes');
                }
                const data = await response.json();
                setDishes(data);
            } catch (error) {
                console.error('Error fetching dishes:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDishes();
    }, []);

    const handleCardClick = (dish) => {
        setSelectedDish(dish); // Set the clicked dish as selected
        setModalOpen(true); // Open the modal
    };

    const handleCloseModal = () => {
        setModalOpen(false); // Close the modal
    };

    // Filter dishes based on search query
    const filteredDishes = dishes.filter(dish => 
        dish.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return <div className="text-center text-xl">Loading...</div>;
    }

    return (
        <div className="bg-gray-100 py-20">
            <h2 className="text-4xl font-bold mb-12 text-center text-orange-600">Our Menu 🍽️</h2>
            <div className="menu-grid">
                {filteredDishes.map((dish) => (
                    <div key={dish.id} className="menu-card" onClick={() => handleCardClick(dish)}>
                        <img src={dish.imageUrl} alt={dish.title} className="menu-image" />
                        <div className="menu-info">
                            <h3 className="menu-title">{dish.title}</h3>
                            <p className="menu-description">
                                {dish.description.length > 100
                                    ? `${dish.description.substring(0, 100)}...` 
                                    : dish.description}
                            </p>
                            <p className="menu-price">{dish.price.toFixed(2)} DT</p>
                        </div>
                    </div>
                ))}
            </div>

            {modalOpen && selectedDish && (
                <DishModal dish={selectedDish} onClose={handleCloseModal} />
            )}
        </div>
    );
};

export default OurMenu;
