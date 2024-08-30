import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Register from './authentication/Register';
import Login from './authentication/Login';
import Logout from './authentication/Logout';

import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import Footer from './components/Footer';
import ProductList from './components/ProductList';
import Dashboard from './components/Dashboard';
import Products from './components/Products';
import ProtectedRoute from './components/ProtectedRoute';

import './App.css';

function App() {
  const [user, setUser] = React.useState(JSON.parse(localStorage.getItem('user')));

  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/logout" element={<Logout setUser={setUser} />} />
          
          <Route 
            path="/dashboard" 
            element={<ProtectedRoute element={Dashboard} user={user} />} 
          />
          <Route path="/productList" element={<ProtectedRoute element={ProductList} user={user} />} />
          <Route path="/products" element={<ProtectedRoute element={Products} user={user} />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
