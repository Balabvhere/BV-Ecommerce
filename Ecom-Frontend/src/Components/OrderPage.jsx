import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../Slices/orderSlices';
import Navbar from '../includes/Navbar';
import './order.css'; // Assuming you have some styles for the order page
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const OrderPage = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const { orders, loading, error} = useSelector(state => state.order);
  const { userId,isAuthenticated:userAuth } = useSelector(state => state.userInfo);


  console.log("User ID:", userId);
  useEffect(() => {
    
    if (userId && !userAuth) {
      toast.error("Please login to view your orders", {
        style: { borderRadius: "10px", background: "#333", color: "#fff" },
      });
    }

    if (userId && userAuth) {
     dispatch(fetchOrders(userId));
    }
  }, [dispatch, userId, userAuth]);
 
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }
  
  console.log("Orders:", orders);



  return (
    <>
      <Navbar />
      <div className="order-page">
       <h2>📦 My Orders</h2>

{orders.length === 0 ? (
  <>
  <div className="order-header">
  
  <p className="order-subtext">Track all your recent and past purchases below.</p>
</div>
  <div className="no-orders">
    <img src="https://cdn-icons-png.flaticon.com/512/2748/2748558.png" alt="No Orders" />

    <p>You haven't placed any orders yet!</p>
    <button onClick={() => navigate('/products')}>🛒 Start Shopping</button>
  </div>
  </>
) : (

          orders.map((order) => (
            <div key={order._id} className="order-card">
              <p>Order ID: {order._id}</p>
              
              <ul>
                 {order.orderItems.map((item) => (
                   <li key={item.productId._id} className="order-item">
                     {item.productId?.images?.[0]?.image ? (
  <img
    src={`http://localhost:3000/uploads/${item.productId.images[0].image}`}
    alt={item.productId.productname}
    className="product-image"
  />
) : (
  <div className="placeholder-image">No Image</div>
)}

                     <div className="item-details">
                       <p><strong>{item.productId.productname}</strong></p>
                       <p>Quantity: {item.quantity}</p>
                       <p>Price: ₹{item.price}</p>
                     </div>
                   </li>
                 ))}
              </ul>

              <p>Total Amount: ₹{order.totalAmount}</p>
              <p className={`order-status ${order.status.toLowerCase()}`}>Status: {order.status}</p>

            </div>
          ))
        )}
      </div>
    </>
  );
};

export default OrderPage;
