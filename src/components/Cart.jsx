import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, decrementQuantity, incrementQuantity, deleteFromCart } from '../features/cartSlice';
import { Trash } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [quantities, setQuantities] = useState({});

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success("Item removed from cart");
  };

  const handleIncrement = (id) => {
    setQuantities((prev) => ({ ...prev, [id]: (prev[id] || 1) + 1 }));
  };

  const handleDecrement = (id) => {
    setQuantities((prev) => {
      const currentQuantity = prev[id] || 1;
      return {
        ...prev,
        [id]: currentQuantity > 1 ? currentQuantity - 1 : 1, 
      };
    });
  };

  const cartItemTotal = Object.values(quantities).reduce((total, qty) => total + qty, 0);
  const cartTotal = cartItems.reduce((total, item) => total + item.price * (quantities[item.id] || 1), 0);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const [addressInfo, setAddressInfo] = useState({
    name: "",
    address: "",
    pincode: "",
    mobileNumber: "",
  });

  const buyNowFunction = () => {
    if (Object.values(addressInfo).some(field => field === "")) {
      return toast.error("All fields are required");
    }

    // Proceed to handle the order submission here
  };

  const handleCheckout = () => {
    if (!user) {
      toast.error("Please log in to proceed to checkout.");
      navigate('/login');
    }
    else{
      navigate('/checkout');
    }
  };

  return (
    <div className="container mx-auto px-4 max-w-7xl lg:px-0">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Shopping Cart</h1>
      <section className="rounded-lg bg-white mt-8">
        <h2 className="sr-only">Items in your shopping cart</h2>
        <ul role="list" className="divide-y divide-gray-200">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <li key={item.id} className="flex py-6">
                <div className="flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-24 w-24 rounded-md object-contain object-center"
                  />
                </div>
                <div className="ml-4 flex flex-1 flex-col justify-between">
                  <div className="relative pr-9">
                    <div className="flex justify-between">
                      <h3 className="text-sm font-semibold text-black">{item.title}</h3>
                    </div>
                    <div className="mt-1 flex items-end">
                      <p className="text-sm font-medium text-gray-900">${item.price}</p>
                    </div>
                  </div>
                  <div className="mb-2 flex">
                    <div className="min-w-24 flex">
                      <button onClick={() => handleDecrement(item.id)} type="button" className="h-7 w-7">-</button>
                      <input
                        type="text"
                        className="mx-1 h-7 w-9 rounded-md border text-center"
                        value={quantities[item.id] || 1} 
                        readOnly
                      />
                      <button onClick={() => handleIncrement(item.id)} type="button" className="flex h-7 w-7 items-center justify-center">+</button>
                    </div>
                    <div className="ml-6 flex text-sm">
                      <button onClick={() => deleteCart(item)} type="button" className="flex items-center space-x-1 px-2 py-1 pl-0">
                        <Trash size={12} className="text-red-500" />
                        <span className="text-xs font-medium text-red-500">Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <p>Your cart is empty.</p>
          )}
        </ul>
      </section>
      <section className="mt-16 rounded-md bg-white p-4">
        <h2 className="border-b border-gray-200 text-lg font-medium text-gray-900">Price Details</h2>
        <div>
          <dl className="space-y-1 py-4">
            <div className="flex items-center justify-between">
              <dt className="text-sm text-gray-800">Price ({cartItemTotal} items)</dt>
              <dd className="text-sm font-medium text-gray-900">${cartTotal.toFixed(2)}</dd>
            </div>
            <div className="flex items-center justify-between py-4">
              <dt className="flex text-sm text-gray-800">Delivery Charges</dt>
              <dd className="text-sm font-medium text-green-700">Free</dd>
            </div>
            <div className="flex items-center justify-between border-t border-dashed py-4">
              <dt className="text-base font-medium text-gray-900">Total Amount</dt>
              <dd className="text-base font-medium text-gray-900">${cartTotal.toFixed(2)}</dd>
            </div>
          </dl>
          <button
            onClick={handleCheckout}
            className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
          >
            Proceed to Checkout
          </button>
        </div>
      </section>
    </div>
  );
};

export default Cart;
