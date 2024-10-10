import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const Checkout = ({ cartItems }) => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    address: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
  });

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Checkout</h2>
      <Formik
        initialValues={{ name: '', address: '', email: '' }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          const orderDetails = {
            user: values,
            products: cartItems,
          };
          localStorage.setItem('orderDetails', JSON.stringify(orderDetails));
          navigate('/user');
        }}
      >
        {() => (
          <Form className="space-y-4">
            <div>
              <label htmlFor="name">Name</label>
              <Field name="name" type="text" className="border p-2 w-full" />
              <ErrorMessage name="name" component="div" className="text-red-500" />
            </div>
            <div>
              <label htmlFor="address">Address</label>
              <Field name="address" type="text" className="border p-2 w-full" />
              <ErrorMessage name="address" component="div" className="text-red-500" />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <Field name="email" type="email" className="border p-2 w-full" />
              <ErrorMessage name="email" component="div" className="text-red-500" />
            </div>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
              Submit Order
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Checkout;
