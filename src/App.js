import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Customization from './components/Customization';
import Cart from './components/Cart';
import Resale from './components/Resale';
import Checkout from './components/Checkout';
import NotFound from './components/NotFound';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/customize" element={<Customization />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/resale" element={<Resale />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

