import React from 'react';
import Navbar from '../includes/Navbar';
import './adminDashboard.css';
import { useSelector } from 'react-redux';
import './dashboard.css'
const AdminDashboard = () => {
  const { username } = useSelector(state => state.adminInfo);
    
  return (
    <>
      <Navbar />
      <div className="admin-dashboard">
        <h2>👋 Welcome back, {username || "Admin"}!</h2>

        <div className="dashboard-cards">
          <div className="card">
            <div className="icon">🛍️</div>
            <div className="details">
              <h3>Products</h3>
              <p>Manage your inventory</p>
            </div>
          </div>

          <div className="card">
            <div className="icon">📦</div>
            <div className="details">
              <h3>Orders</h3>
              <p>Track customer orders</p>
            </div>
          </div>

          <div className="card">
            <div className="icon">👤</div>
            <div className="details">
              <h3>Users</h3>
              <p>View and manage users</p>
            </div>
          </div>

          <div className="card">
            <div className="icon">📈</div>
            <div className="details">
              <h3>Reports</h3>
              <p>Sales insights</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
