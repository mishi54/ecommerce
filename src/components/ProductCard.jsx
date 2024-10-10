import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cartSlice';
import { Link, Navigate,useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; 
import '../style/Card.css';

const ProductCard = ({ product }) => {
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
  
  return (
    <div className="p-4 md:p-6 lg:p-18">
      <div className="h-full border border-gray-300 rounded-xl overflow-hidden shadow-md cursor-pointer rdx">
        <img
          className="lg:h-96 h-96 md:h-60 w-full object-cover"
          src={product.image}
          alt={product.title}
        />
        <div className="p-4 md:p-6">
          <h2 className="tracking-widest text-xs title-font font-bold text-gray-600 mb-1">
            {product.category}
          </h2>
          <h1 className="title-font text-base md:text-lg font-bold text-gray-900 mb-3 text-center">
            {product.title.length > 25 ? `${product.title.substring(0, 25)}...` : product.title}
          </h1>
          <h1 className="title-font text-base md:text-lg font-bold text-gray-900 mb-3 text-center">
            ₹{product.price}
          </h1>
  
          <div className="flex justify-center">
            <button
              onClick={handleAddToCart} 
              className="bg-green-400 hover:bg-pink-600 w-1/2 md:w-1/2 lg:w-1/3 text-white py-2 rounded-lg font-bold"
            >
              Add To Cart
            </button>
          </div>
          <div className="flex justify-center">
            <Link to={`/products/${product.id}`} className="product-link text-center block bg-blue-500 text-white py-2 mt-2 rounded w-1/2 md:w-1/2 lg:w-1/3 hover:bg-gray-600">
              Product Detail
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
