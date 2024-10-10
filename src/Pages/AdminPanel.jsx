import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCategories,
  fetchProductsByCategory,
} from '../features/adminSlice';
import ProductForm from './ProductForm';
import ProductList from './ProductList';
import myImage from '../assets/jewelry.png';
import myImg from '../assets/clothes.png';
import LogoutButton from '../components/Button';

const AdminPanel = () => {
  const dispatch = useDispatch();
  const { categories, products } = useSelector((state) => state.admin);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null); 
  const [adminInfo, setAdminInfo] = useState({});
  useEffect(() => {
    const adminData = localStorage.getItem('users');
    if (adminData) {
      const parsedData = JSON.parse(adminData);
      setAdminInfo(parsedData[0]); 
    }
    dispatch(fetchCategories());
  }, [dispatch]);
  const handleCategorySelect = (category) => {
    setSelectedCategory(category); 
    dispatch(fetchProductsByCategory(category));
  };
  const categoriesData = [
    {
      image: myImg,
      name: "men's clothing",
    },
    {
      image: myImage,
      name: 'jewelery',
    },
    {
      image: 'https://cdn-icons-png.flaticon.com/256/7648/7648246.png',
      name: 'electronics',
    },
    {
      image: 'https://cdn-icons-png.flaticon.com/256/11833/11833323.png',
      name: "women's clothing",
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Admin Panel</h1>
      {adminInfo && (
        <div className="bg-blue-800 p-4 rounded-md shadow-md mb-6 text-center">
          <h2 className="text-4xl font-bold text-white">Welcome, {adminInfo.username}</h2>
          <p className="text-md font-bold text-white">Email: {adminInfo.email}</p>
          <p className="text-md font-bold text-white">Role: {adminInfo.role}</p>
          <LogoutButton/>
        </div>
      )}

      <div>
        <h2 className="text-xl font-bold mb-2">Manage Categories</h2>
        <div className="flex justify-center">
          <ul className="list-none flex space-x-6">
            {categoriesData.map((category) => (
              <li
                key={category.name}
                className="cursor-pointer text-center font-bold"
                onClick={() => handleCategorySelect(category.name)}
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-24 h-24 mx-auto mb-2 flex justify-center"
                />
                <span className="text-sm">{category.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">
          Products in {selectedCategory || 'Selected Category'}
        </h2>
        {products && products.length > 0 ? (
          <>
            <ProductList products={products} setSelectedProduct={setSelectedProduct} />
            <h2 className="text-4xl font-bold mb-2 mt-4 text-center text-blue-800">Form</h2>
            <ProductForm product={selectedProduct} />
          </>
        ) : (
          <p>No products available for this category.</p>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
