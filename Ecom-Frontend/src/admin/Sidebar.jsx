import React from 'react';
import { Link } from 'react-router-dom';
import './sidebar.css';
import '../App.css';


const Sidebar = () => {
  // Get user and admin states from Redux
 

  return (
    <div className="sidebar">
      

      <ul className="sidebar-menu">
        <li><Link to="/admDashboard">🏠 Dashboard</Link></li>
        <li><Link to="/addProduct">🛒 Add Products</Link></li>
        <li><Link to="/manageProduct">🔧 Manage Products</Link></li>
        <li><Link to="/manageOrder">📦 Orders</Link></li>
        <li><Link to="/profile">👤 Profile</Link></li>
        <li><Link to="/manageUser">👥 Manage Users</Link></li>
        <li><Link to="/admin/settings">⚙️ Admin Settings</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
