import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteProduct } from '../features/adminSlice';

const ProductList = ({ products, setSelectedProduct }) => { 
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  const handleEdit = (product) => {
    setSelectedProduct(product); 
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div key={product.id} className="border rounded shadow-md p-4">
          <div className="flex flex-col items-center">
            <img src={product.image} alt={product.title} className="w-full h-2/6 object-cover mb-4" />
            <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
            <p className="text-gray-500 mb-2">${product.price}</p>
            <p className="text-gray-700 mb-4">{product.category}</p>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit(product)}
                className="bg-yellow-500 text-white px-4 py-2 rounded"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
