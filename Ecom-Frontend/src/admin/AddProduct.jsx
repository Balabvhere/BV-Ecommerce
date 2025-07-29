  import React, { useEffect, useState } from 'react';
  import './addProduct.css';
  import Navbar from '../includes/Navbar';
  import Sidebar from './Sidebar';
  import { useDispatch, useSelector } from 'react-redux';
  import { addingProduct ,success} from '../Slices/productSlices';
  import toast from 'react-hot-toast';

  const AddProduct = () => {
    const dispatch = useDispatch();
    const { isLoading, error, successMessage } = useSelector((state) => state.addProduct);


    const [product, setProduct] = useState({
      name: '',
      price: '',
      description: '',
      image: null,
      category: '',
      sellerName:'',
      stock: ''
    });

    const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      // Convert FileList to array and store it
      setProduct({ ...product, image: Array.from(files) });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };


    const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
  formData.append('productname', product.name);
  formData.append('price', product.price);
  formData.append('description', product.description);
  formData.append('category', product.category);
  formData.append('stock', product.stock);
  formData.append('seller', product.sellerName);
  formData.append('createdAt', new Date().toISOString());

  product.image.forEach((imgFile) => {
    formData.append('image', imgFile);  // 'image' matches multer.array('image')
  });
    dispatch(addingProduct(formData));
    
  };
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage, {
        style: { borderRadius: "10px", background: "#333", color: "#fff" },
      });

      setProduct({
        name: '',
        price: '',
        description: '',
        image: [], // <-- Array
        category: '',
        sellerName: '',
        stock: ''
      });

      document.getElementById('image').value = '';
      dispatch(success());
    }

    if (error) {
      toast.error(error || "Something went wrong", {
        style: { borderRadius: "10px", background: "#333", color: "#fff" },
      });
    }
  }, [successMessage, error, dispatch]);





    return (
      <div className="layout">
  <Navbar />
  <div className="main-content">
    <Sidebar />
    <div className="page-content">
      <div className="product-form-container">
        <h2>Add Product</h2>

        <form className="product-form" onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="product-form-row">
            <div className="product-form-group">
              <label htmlFor="name">Product Name</label>
              <input type="text" id="name" name="name" value={product.name} onChange={handleChange} required />
            </div>

            <div className="product-form-group">
              <label htmlFor="price">Price</label>
              <input type="number" id="price" name="price" value={product.price} onChange={handleChange} required />
            </div>
          </div>

          <div className="product-form-group-full">
            <label htmlFor="description">Description</label>
            <textarea id="description" name="description" value={product.description} onChange={handleChange} required />
          </div>

          <div className="product-form-row">
            <div className="product-form-group">
              <label htmlFor="image">Product Image</label>
              <input type="file" id="image" name="image" onChange={handleChange} required multiple />
            </div>

            <div className="product-form-group">
              <label htmlFor="category">Category</label>
              <select id="category" name="category" value={product.category} onChange={handleChange} required>
                <option value="">-- Select Category --</option>
                <option value="Electronics">Electronics</option>
                <option value="Fashion">Fashion</option>
                <option value="Grocery">Grocery</option>
                <option value="Books">Books</option>
                <option value="Home">Home</option>
              </select>
            </div>
          </div>

          <div className="product-form-row">
            <div className="product-form-group">
              <label htmlFor="stock">Stock</label>
              <input type="number" id="stock" name="stock" value={product.stock} onChange={handleChange} required />
            </div>

            <div className="product-form-group">
              <label htmlFor="sellerName">Seller</label>
              <input type="text" id="sellerName" name="sellerName" value={product.sellerName} onChange={handleChange} required />
            </div>
          </div>

          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Adding...' : 'Add Product'}
          </button>
        </form>
      </div>
    </div>
  </div>
</div>

    );
  };

  export default AddProduct;
