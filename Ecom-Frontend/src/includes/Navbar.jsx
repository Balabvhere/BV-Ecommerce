import React, { useState } from 'react';
import './navbar.css';
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { login, logout } from '../Slices/userSlices';
import { admlogout } from '../Slices/adminSlices';
import { clearCart } from '../Slices/cartSlice';
import { clearOrderState } from '../Slices/orderSlices';
import toast from 'react-hot-toast';

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { username, isAuthenticated: userAuth } = useSelector(state => state.userInfo);
  const { username: admName, isAuthenticated: admAuth } = useSelector(state => state.adminInfo);

  const [menuOpen, setMenuOpen] = useState(false); // mobile menu toggle
  const [showDropdown, setShowDropdown] = useState(false); // dropdown toggle

  const handleLogin = () => {
    navigate('/login');
    dispatch(login());
  };

  const handleLogout = () => {
    if (admAuth) {
      dispatch(admlogout());
      navigate('/', { replace: true });
    } else if (userAuth) {
      dispatch(clearCart());
      dispatch(clearOrderState());
      dispatch(logout());
      navigate("/");
    }
  };

  const admLog = () => navigate('/admLogin');
  const handleAdmin = () => navigate('/admDashboard');

  const handleOrdersClick = () => {
    if (userAuth) {
      navigate('/orders');
    } else {
      toast.error("Please login to view orders", {
        style: { borderRadius: "10px", background: "#333", color: "#fff" },
      });
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-top">
        <div className="navbar-logo">🛍️ ShopZone</div>
        <button className="nav-toggle" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
      </div>

      <ul className={`navbar-links ${menuOpen ? '' : 'hidden'}`}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/products">Products</Link></li>
        <li onClick={handleOrdersClick} style={{ color: 'white' }}>Orders</li>
        <li><Link to="/contact">Contact</Link></li>

        {/* Dropdown login/logout */}
        <li className="dropdown" onClick={() => setShowDropdown(!showDropdown)}>
          <span className="dropbtn">
            {userAuth || admAuth ? `👤 Welcome, ${admAuth ? admName : username}` : '🔐 Login ▾'}
          </span>
          {showDropdown && (
            <div className="dropdown-content">
              {userAuth || admAuth ? (
                <>
                  <button>👤 Profile</button>
                  {admAuth && <button onClick={handleAdmin}>⚙️ Manage Admin</button>}
                  <button onClick={handleLogout}>🚪 Logout</button>
                </>
              ) : (
                <>
                  <button onClick={admLog}>Admin</button>
                  <button onClick={handleLogin}>User</button>
                </>
              )}
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
