// pages/ManageOrder.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrder, updateStatus } from '../Slices/orderSlices';
import Navbar from '../includes/Navbar';
import Sidebar from './Sidebar';
import './ManageOrder.css';
import toast from 'react-hot-toast';

const ManageOrder = () => {
  const dispatch = useDispatch();
  const { orders, loading, error, successMessage } = useSelector(state => state.order);

  // Refetch orders when the page loads or when a status update occurs
  useEffect(() => {
    dispatch(getOrder());
  }, [dispatch, successMessage]);

  // Function to mark an order as successful
  async function handleSuccess(id) {
    const result = await dispatch(updateStatus({ id, status: 'successful' }));
    if (updateStatus.fulfilled.match(result)) {
      toast.success("Order status updated!", {
        style: { borderRadius: "10px", background: "#333", color: "#fff" },
      });
      dispatch(getOrder()); // Refetch orders after updating status
    } else {
      toast.error("Failed to update order status.");
    }
  }

  return (
    <div className="layout">
      <Navbar />
      <div className="main-content">
        <Sidebar />
        <div className="page-content">
          <h2 className="order-heading">📋 Manage Orders</h2>

          {loading ? (
            <p>Loading orders...</p>
          ) : error ? (
            <p className="error">{error}</p>
          ) : orders.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            <table className="order-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>User ID</th>
                  <th>Total Amount</th>
                  <th>Items</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, idx) => (
                  <tr key={order._id}>
                    <td>{idx + 1}</td>
                    <td>{order.userId}</td>
                    <td>₹{order.totalAmount}</td>
                    <td>
                      <ul>
                        {order.orderItems.map((item, i) => (
                          <li key={i}>
                            {item.productname} × {item.quantity}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td>{order.status || "Pending"}</td>
                    <td>{order.orderedAt?.slice(0, 10)}</td>
                    <td>
                      {order.status === "successful" ? (
                        <span style={{ color: "lightgreen" }}>✔️</span>
                      ) : (
                        <span
                          className="btn-succes-order"
                          onClick={() => handleSuccess(order._id)}
                          style={{ cursor: "pointer", color: "blue" }}
                        >
                          👍
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageOrder;
