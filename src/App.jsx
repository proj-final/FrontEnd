import "./App.css";
import Navbar from "./Components/HomePage/1-Navbar/Navbar";
import Hero from "./Components/HomePage/2-HeroSection/Hero";
import Services from "./Components/HomePage/3-Services/Services";
import FoodMenu from "./Components/HomePage/4-FoodMenu/FoodMenu";
import RoleSelection from "./Components/RoleSelection/RoleSelection";
import SignUpAsChef from "./Components/Authentication/SignUp/SignUpAsChef";
import SignUpAsdeliveryBoy from "./Components/Authentication/SignUp/SignUpAsdeliveryBoy";
import SignUpAsClient from "./Components/Authentication/SignUp/SignUpAsClient";
import Login from "./Components/Authentication/Login/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect,useRef } from "react";
import OurChefs from "./Components/HomePage/ower chifs/chifs";
import Order from "./Components/Order/Orders";
import ClientDashboard from "./Components/ClientDashboard/Client";


const LayoutWithNavbarAndHero = ({ children }) => {

  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token'); 
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (token && storedUser) {
      setUser(storedUser);
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false); 
    }
  }, []);
  
  const servicesRef = useRef(null);
  const foodMenuRef = useRef(null);

  const scrollToSection = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Navbar
        user={user} 
        isAuthenticated={isAuthenticated}
        scrollToServices={() => scrollToSection(servicesRef)}
        scrollToFoodMenu={() => scrollToSection(foodMenuRef)}
      />
      <Hero />
      <div ref={servicesRef}>
        <Services />
      </div>
      <div ref={foodMenuRef}>
        <FoodMenu />
      </div>
      <div ref={foodMenuRef}>
        <OurChefs />
      </div>
      <div>
        <Order/>
      </div>
      {children}
    </>
  );
};




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LayoutWithNavbarAndHero />} />
        <Route path="/signup" element={<RoleSelection />} />
        <Route path="/SignUpAsClient" element={<SignUpAsClient />} />
        <Route path="/SignUpAsChef" element={<SignUpAsChef />} />
        <Route path="/SignUpAsdeliveryBoy" element={<SignUpAsdeliveryBoy />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/orders" element={<Order />} />
        <Route path="/client-dashboard" element={<ClientDashboard />} />

      </Routes>
    </Router>
  );
}

export default App;
