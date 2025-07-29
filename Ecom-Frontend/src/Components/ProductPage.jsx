import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../Slices/productSlices';
import './productpage.css';
import Search from './Search';
import Navbar from '../includes/Navbar';
import { useNavigate } from 'react-router-dom';

const ProductPage = () => {
  const dispatch = useDispatch();
  const { products, isLoading, error } = useSelector((state) => state.addProduct);
  const navigate=useNavigate()

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  function goCart()
  {
    navigate('/cart')
  }

  return (
    <>
    <Navbar/>
    <div className="product-card-page">
       <div className="product-header-row">
            <h1 className="page-title">📌 All Products</h1>
            <div className="product-header-right">
                <Search />
                <div className="icons">
                <span className="icon" onClick={goCart}>🛒</span>
                <span className="icon">🤍</span>
            </div>
      </div>
    </div>
      {isLoading && <p className="error-text">Loading...</p>}
      {error && <p className="error-text">{error}</p>}
       
      <div className="product-list" >
        {products.map((p) => {
          const img = p.images?.length > 0 ? p.images[0].image : '';
          return (
            <div className="product-card" key={p._id}onClick={() => navigate(`/productDetail/${p._id}`)}>

              <img
                className="product-img"
                src={`http://localhost:3000/uploads/${img}`}  
                alt={p.productname}
              />
              <div className="product-info">
                <h2>{p.productname}</h2>
                <p>{p.description.slice(0, 60)}...</p>
                <div className="price-cart">
                  <span className="price">₹{p.price}</span>
                  <button className="cart-btn">View Details</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
    </>
  );
};

export default ProductPage;
