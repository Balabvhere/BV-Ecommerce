import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from '../includes/Navbar';
import './AdminDashboard.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../Slices/userSlices';
import { fetchProducts } from '../Slices/productSlices';
import {  getOrder } from '../Slices/orderSlices'; // Assuming you have an action to fetch orders
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { user } = useSelector(state => state.userInfo);
  const { products } = useSelector(state => state.addProduct);
  const { orders } = useSelector(state => state.order);
  const[totalSales,setTotalSales] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUser());
    dispatch(fetchProducts());
    dispatch(getOrder());
  }, [dispatch]);


  useEffect(()=>
  {
    const total=orders.filter(order=>order.status==="successful")
    .reduce((sum,order)=>sum+order.totalAmount,0)
    setTotalSales(total)
  },[orders])
    

  return (
    
    <div className="layout">
      <Navbar />
      
      <div className="main-content">
        <Sidebar />
        <div className="page-content">
          <h2 className="dashboard-heading">📈 Admin Dashboard</h2>

          <div className="dashboard-boxes">
            <div className="dash-box box1">
              <h3>📦 Products</h3>
              <p>{products.length}</p>
            </div>
            <div className="dash-box box2"  onClick={() => navigate('/manageOrder')}>
              <h3>🛒 Orders</h3>
              <p>{orders.filter(order => order.status === "successful").length}</p>
            </div>
            <div className="dash-box box3">
              <h3>👥 Users</h3>
              <p>{user.length}</p>
            </div>
            <div className="dash-box box4">
              <h3>💰 Total Sales</h3>
              <p>{totalSales}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
