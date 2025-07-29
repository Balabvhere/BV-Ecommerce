// pages/CartPage.jsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCart, updateCartItem, deleteCartItem } from '../Slices/cartSlice';
import './cart.css';
import Navbar from '../includes/Navbar';
import  {createOrder }from '../Slices/orderSlices';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function goOrder()
  {
    navigate('/orders');
  }

  const { items, loading } = useSelector((state) => state.cart);
  const { userId, isAuthenticated:userAuth } = useSelector(state => state.userInfo);
  

  useEffect(() => {
  if (userId && userAuth) {
    dispatch(fetchCart(userId));
  }
}, [dispatch, userId, userAuth]);



  const handleQtyChange = (item, type) => {
    const newQty = type === 'inc' ? item.quantity + 1 : item.quantity - 1;

    // Allow quantity update only within limits
    if (newQty >= 1 && newQty <= item.stock) {
      dispatch(updateCartItem({ id: item._id, quantity: newQty }));
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteCartItem(id));
  };

 const handleCheckout = async () => {
  try {
    console.log(items)
    if(items.length>0)
    {
     await dispatch(
      createOrder({ userId, items, totalAmount: subtotal })
    ).unwrap();

    // If successful
    toast.success("Order Successful", {
      style: { borderRadius: "10px", background: "#333", color: "#fff" },
    });

    // Optionally clear the cart after order placed
    items.forEach(item => {
      dispatch(deleteCartItem(item._id));
    });
    }
    else
    {
      toast.error("Cart Item is Empty: ", {
      style: { borderRadius: "10px", background: "#333", color: "#fff" },
    });
    }
  } catch (error) {
    toast.error("Order Failed: " + error, {
      style: { borderRadius: "10px", background: "#ff4d4f", color: "#fff" },
    });
  }

};


  if (loading) return <p className="loading-text">Loading...</p>;
let totalItems = 0;
    let subtotal = 0;

items.forEach(item => {
  totalItems += item.quantity;
  subtotal += item.quantity * item.price;
});
  return (
    <>
    <Navbar />
    <div className="cart-container">
      <h2 className="cart-title">🛒 Cart</h2>
      {items.length === 0 && ! userId ? (
        <p className="cart-empty">No items in cart</p>
      ) : (
        <div className="cart-list">
          {items.map((item) => (
            <div key={item._id} className="cart-item">
              <img
                src={`http://localhost:3000/uploads/${item.image}`}
                alt={item.productname}
                className="cart-image"
              />
              <div className="cart-info">
                <h4>{item.productname}</h4>
                <p className="cart-price">₹{item.price}</p>
                <div className="cart-actions">
                  <button className='dec-btn'
                    onClick={() => handleQtyChange(item, 'dec')}
                    disabled={item.quantity <= 1}
                  >
                    −
                  </button>
                  <span className="quantity-display">{item.quantity}</span>
                  <button className='inc-btn'
                    onClick={() => handleQtyChange(item, 'inc')}
                    disabled={item.quantity >= item.stock}
                  >
                    +
                  </button>
                  <button className="remove-btn" onClick={() => handleDelete(item._id)}>
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
      )}<div className="order-summary">
        <h3>Order Summary</h3>
        <hr />
        <p>Total Item: {totalItems}</p>
        <p>
          Subtotal: ₹
          {subtotal}
        </p>
        <button className="checkout-btn" onClick={()=>handleCheckout()} disabled={items.length === 0}>Proceed to Checkout</button>
        <button className="order-btn" onClick={()=>goOrder()}>My Orders</button>
      </div>
    </div>
    </>
  );
};

export default CartPage;




