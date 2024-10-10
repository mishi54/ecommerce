import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/productsSlice';
import ProductCard from '../components/ProductCard';
import myImage from '../assets/c.png';
import "../style/landingpage.css";
import Footer from './Footer';
import Category from '../components/Category';

const LandingPage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="container mx-auto p-0">
   <div className="bg-silver-800 text-yellow-600 p-6 overflow-hidden mt-0">
      <div className="animate-ticker">
        <h1 className="text-4xl font-bold">
          Welcome to Our Store! Shop Now for the Best Deals!
        </h1> 
      </div>
    </div>
      <img src={myImage} alt="Description" className="w-full h-50 m-0" />
      <Category className="mt-3 mb-4"/>
      <h2 className="text-5xl font-bold text-center text-blue-950 m-2">
         All Products
        </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Footer/>
    </div>
  );
};

export default LandingPage;
