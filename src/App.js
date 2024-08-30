import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import Footer from './components/Footer';
import ProductList from './components/ProductList';
import CreateProduct from './components/CreateProduct';
import EditProduct from './components/EditProduct';
import Dashboard from './components/Dashboard';
import Products from './components/Products';
import ProtectedRoute from './components/ProtectedRoute';
import Register from './authentication/Register';
import Login from './authentication/Login';
import Logout from './authentication/Logout';
import ForgotPassword from './authentication/ForgotPassword';
import UpdateProfile from './authentication/UpdateProfile';

import './App.css';

function App() {
  const [user, setUser] = React.useState(JSON.parse(localStorage.getItem('user')));

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/logout" element={<Logout setUser={setUser} />} />
          <Route path="/updateProfile" element={<ProtectedRoute element={UpdateProfile} user={user} />} />
          <Route 
            path="/dashboard" 
            element={<ProtectedRoute element={Dashboard} user={user} />} 
          />
          <Route path="/createProduct" element={<ProtectedRoute element={CreateProduct} user={user} />} />
          <Route path="/productList" element={<ProtectedRoute element={ProductList} user={user} />} />
          <Route path="/products" element={<ProtectedRoute element={Products} user={user} />} />
          <Route path="/editProduct/:productId" element={<ProtectedRoute element={EditProduct} user={user} />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
