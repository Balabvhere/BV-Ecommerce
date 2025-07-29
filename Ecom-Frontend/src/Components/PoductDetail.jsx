import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../Slices/productSlices";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../includes/Navbar";
import "./ProductDetails.css";
import { addToCart } from "../Slices/cartSlice";
import toast from "react-hot-toast";
import { createOrder } from "../Slices/orderSlices";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
   // import addToCart thunk

 const { selectedProduct: product, isLoading, error } = useSelector((state) => state.addProduct);


const { userId, isAuthenticated } = useSelector((state) => state.userInfo);
console.log(userId);
const handleAddToCart = () => {
  if (!isAuthenticated) {
    toast.error("Please login to add to cart", {
      style: { borderRadius: "10px", background: "#333", color: "#fff" },
    });
    return;
  }
  if(product.stock <= 0)
  {
    toast.error("Product is out of stock", {
      style: { borderRadius: "10px", background: "#333", color: "#fff" },
    });
    return;
  }

  dispatch(
    addToCart({
      userId,
      productId: product._id,
      quantity: 1,
    })
  )
    .unwrap()
    .then(() => {
      toast.success("Cart Added!", {
      style: { borderRadius: "10px", background: "#333", color: "#fff" },
    });
      navigate("/cart");
    })
    .catch(() => {
      toast.error("Failed to add to cart", {
        style: { borderRadius: "10px", background: "#333", color: "#fff" },
      });
    });
};

function handleShop() {
  if (!isAuthenticated) {
    toast.error("Please login to shop", {
      style: { borderRadius: "10px", background: "#333", color: "#fff" },
    });
    return;
  }

  dispatch(createOrder({ userId, items: [{ productId: product._id,productname:product.productname, quantity: 1, price: product.price, image: product.images[0].image }], totalAmount: product.price })).unwrap()
    .then(() => {
      toast.success("Order Successful", {
       style: { borderRadius: "10px", background: "#333", color: "#fff" },
      });
      setTimeout(() => {
        navigate("/orders");
      }, 1000);
    })
    .catch(() => {
      toast.error("Failed to create order", {
        style: { borderRadius: "10px", background: "#333", color: "#fff" },
      });
    });
  }

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  const image = product?.images?.[0]?.image;



  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!product) return null;

  return (
    <>
      <Navbar />
      <div className="product-detail-container">
        <div className="product-detail-left">
          <img
            src={`http://localhost:3000/uploads/${image}`}
            alt={product.productname}
            className="product-detail-img"
          />
        </div>
        <div className="product-detail-right">
          <h2>{product.productname}</h2>
          
          <p>{product.description}</p>
          <h3>₹{product.price}</h3>
          <p>Category: {product.category}</p>
          <p>Seller: {product.seller}</p>
          <p className={`product-status ${product.stock > 0 ? "in-stock" : "out-of-stock"}`}>
            Status: {product.stock > 0 ? "In Stock" : "Out of Stock"}
          </p>
          <div className="product-buttons">
            <button className="add-to-cart-btn" onClick={handleAddToCart} disabled={product.stock <= 0}>
              Add to Cart
            </button>
            <button className="shop-now-btn"  onClick={handleShop} disabled={product.stock <= 0}>Shop Now</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
