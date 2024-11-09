import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbarclient() {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = (
        <>
            <Link to="/" className="text-gray-800 font-medium relative group">
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <a href="#menu" className="text-gray-800 font-medium relative group">
                Menu
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#about" className="text-gray-800 font-medium relative group">
                About Us
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#contact" className="text-gray-800 font-medium relative group">
                Contact
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"></span>
            </a>
        </>
    );

    return (
        <nav className="bg-white shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link to="/" className="text-3xl font-bold text-gray-800 hover:text-gray-600">
                            QuickBite 🍴
                        </Link>
                    </div>
                    {/* Desktop Navigation */}
                    <div className="hidden md:flex space-x-4 items-center">
                        {navLinks}
                    </div>
                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-800 hover:text-gray-600 focus:outline-none"
                        >
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d={
                                        isOpen
                                            ? 'M6 18L18 6M6 6l12 12'
                                            : 'M4 6h16M4 12h16M4 18h16'
                                    }
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            {/* Mobile Navigation Menu */}
            {isOpen && (
                <div className="md:hidden bg-white shadow-md">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks}
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbarclient;
