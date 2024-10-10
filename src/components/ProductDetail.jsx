import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../style/productdetail.css'; 
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cartSlice';
import { Link, Navigate,useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; 
import Navbar from '../Pages/Header';
import Footer from '../Pages/Footer';
const ProductDetail = () => {
  const dispatch = useDispatch();
  const { user } = useAuth(); 
  const navigate = useNavigate();
  const handleAddToCart = () => {
    console.log("Current User: ", user);
    if (!user) {
      navigate("/login");
    } else {
      dispatch(addToCart(product));
    }
  };
  
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data = await response.json();
      setProduct(data);
    };

    fetchProduct();
  }, [id]);

  if (!product) return <div className="loading">Loading...</div>;

  return (
    <>
    <Navbar/>
    <div className="product-detail-container">
      <img src={product.image} alt={product.title} className="product-image" />
      <div className="product-info">
        <h2 className="product-title">{product.title}</h2>
        <p className="product-price">${product.price}</p>
        <p className="product-description">{product.description}</p>
        <p className="product-category">Category: {product.category}</p>
        <p className="product-rating">Rating: {product.rating.rate} ({product.rating.count} reviews)</p>
        <button className="add-to-cart-button" onClick={handleAddToCart} >Add to Cart</button>
      </div>
    </div>
    <Footer/>
    </>  );
};

export default ProductDetail;