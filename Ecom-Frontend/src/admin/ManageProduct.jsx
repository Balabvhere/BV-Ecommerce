import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, deleteProduct, updateProduct,success } from '../Slices/productSlices';
import './manageProduct.css';
import Navbar from '../includes/Navbar';
import Sidebar from './Sidebar';
import toast from 'react-hot-toast';

function ManageProduct() {
  const dispatch = useDispatch();
  const { products, successMessage,isLoading, error } = useSelector((state) => state.addProduct);

  const [currentImageIndices, setCurrentImageIndices] = useState({});
  const [showModal, setShowModal] = useState(false);

  const [product, setProduct] = useState({
    _id: '',
    productname: '',
    price: '',
    description: '',
    category: '',
    stock: '',
    seller: '',
    images: []
  });

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    const initialIndices = {};
    products.forEach(product => {
      if (product.images?.length) {
        initialIndices[product._id] = 0;
      }
    });
    setCurrentImageIndices(initialIndices);
  }, [products]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(id));
    }
  };

  const handlePrev = (productId, imagesLength) => {
    setCurrentImageIndices(prev => ({
      ...prev,
      [productId]: (prev[productId] - 1 + imagesLength) % imagesLength
    }));
  };

  const handleNext = (productId, imagesLength) => {
    setCurrentImageIndices(prev => ({
      ...prev,
      [productId]: (prev[productId] + 1) % imagesLength
    }));
  };

  const handleEdit = (productData) => {
    setProduct({
      ...productData,
      images: productData.images.map(img => img.image) // Store only image names for editing
    });
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'images') {
      setProduct(prev => ({ ...prev, images: files }));
    } else {
      setProduct(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("productname", product.productname);
    formData.append("price", product.price);
    formData.append("description", product.description);
    formData.append("category", product.category);
    formData.append("stock", product.stock);
    formData.append("seller", product.seller);

    if (product.images && product.images.length && product.images[0] instanceof File) {
      for (let i = 0; i < product.images.length; i++) {
        formData.append("images", product.images[i]);
      }
    }

    dispatch(updateProduct({ _id: product._id, formData }));
    setShowModal(false);
  };

  useEffect(() => {
  if (successMessage) {
    toast.success(successMessage, {
      style: { borderRadius: "10px", background: "#333", color: "#fff" },
    });
    dispatch(success());
  }

  if (error) {
    toast.error(error || "Something went wrong", {
      style: { borderRadius: "10px", background: "#333", color: "#fff" },
    });
  }
}, [successMessage,error,dispatch]);



  return (
    <>
    <div className={` ${showModal ? 'blur' : ''}`}>
      <Navbar />
      <Sidebar />
      <div className="manage-container">
        <h2>📦 Manage Products</h2>
        {isLoading && <p>Loading products...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <table className="manage-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Category</th>
              <th>Seller</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => {
              const currentIndex = currentImageIndices[p._id] || 0;
              return (
                <tr key={p._id}>
                  <td>
                    {p.images?.length ? (
                      <div className="image-slider-cell">
                        <button onClick={() => handlePrev(p._id, p.images.length)}>◀</button>
                        <img
                          src={`http://localhost:3000/uploads/${p.images[currentIndex].image}`}
                          alt={p.productname}
                          className="table-product-image"
                        />
                        <button onClick={() => handleNext(p._id, p.images.length)}>▶</button>
                      </div>
                    ) : 'No image'}
                  </td>
                  <td>{p.productname}</td>
                  <td>{p.description}</td>
                  <td>{p.category}</td>
                  <td>{p.seller}</td>
                  <td>₹{p.price}</td>
                  <td>{p.stock}</td>
                  <td className='btn'>
                    <button className="edit-btn" onClick={() => handleEdit(p)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDelete(p._id)}>Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Update Product</h2>
           <form onSubmit={handleUpdate} encType="multipart/form-data">
  <div>
    <label>Product Name</label>
    <input type="text" name="productname" value={product.productname} onChange={handleChange} required />
  </div>

  <div>
    <label>Price</label>
    <input type="number" name="price" value={product.price} onChange={handleChange} required />
  </div>

  <div className="full-width">
    <label>Description</label>
    <textarea name="description" value={product.description} onChange={handleChange} required />
  </div>

  <div>
    <label>Category</label>
    <select name="category" value={product.category} onChange={handleChange} required>
      <option value="">Select</option>
      <option>Electronics</option>
      <option>Fashion</option>
      <option>Grocery</option>
      <option>Books</option>
    </select>
  </div>

  <div>
    <label>Stock</label>
    <input type="number" name="stock" value={product.stock} onChange={handleChange} required />
  </div>

  <div className="full-width">
    <label>Seller</label>
    <input type="text" name="seller" value={product.seller} onChange={handleChange} required />
  </div>

  <div className="full-width">
    <label>Product Images</label>
    <input type="file" name="images" onChange={handleChange} multiple />
  </div>

  <div className="modal-actions full-width">
    <button type="submit">Update</button>
    <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
  </div>
</form>

          </div>
        </div>
      )}
      </div>
    </>
  );
}

export default ManageProduct;
