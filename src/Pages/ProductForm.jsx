import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { addNewProduct, updateProduct } from '../features/adminSlice';

const ProductForm = ({ product }) => {
  const dispatch = useDispatch();

  const initialValues = product || {
    title: '',
    price: '',
    description: '',
    image: '',
    category: '',
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Required'),
    price: Yup.number().required('Required'),
    description: Yup.string().required('Required'),
    image: Yup.string().required('Required'),
    category: Yup.string().required('Required'),
  });

  const handleSubmit = (values) => {
    if (product) {
      dispatch(updateProduct({ id: product.id, product: values }));
    } else {
      dispatch(addNewProduct(values));
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {() => (
   <Form className="space-y-6 bg-gray-100 p-6 rounded-lg shadow-lg mt-4">
   <div>
     <label htmlFor="title" className="block text-gray-700 font-semibold">Title</label>
     <Field name="title" type="text" className="border border-gray-300 rounded p-2 w-full mt-2" />
     <ErrorMessage name="title" component="div" className="text-red-500" />
   </div>
   <div>
     <label htmlFor="price" className="block text-gray-700 font-semibold">Price</label>
     <Field name="price" type="number" className="border border-gray-300 rounded p-2 w-full" />
     <ErrorMessage name="price" component="div" className="text-red-500" />
   </div>
   <div>
     <label htmlFor="description" className="block text-gray-700 font-semibold">Description</label>
     <Field name="description" type="text" className="border border-gray-300 rounded p-2 w-full" />
     <ErrorMessage name="description" component="div" className="text-red-500" />
   </div>
   <div>
     <label htmlFor="image" className="block text-gray-700 font-semibold">Image URL</label>
     <Field name="image" type="text" className="border border-gray-300 rounded p-2 w-full" />
     <ErrorMessage name="image" component="div" className="text-red-500" />
   </div>
   <div>
     <label htmlFor="category" className="block text-gray-700 font-semibold">Category</label>
     <Field name="category" type="text" className="border border-gray-300 rounded p-2 w-full" />
     <ErrorMessage name="category" component="div" className="text-red-500" />
   </div>
   <button 
     type="submit" 
     className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
   >
     {product ? 'Update Product' : 'Add Product'}
   </button>
 </Form>
 
      )}
    </Formik>
  );
};

export default ProductForm;
