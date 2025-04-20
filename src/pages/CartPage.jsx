import { useDispatch, useSelector } from 'react-redux';
import {
  updateQuantity,
  clearCart,
} from '../slices/cartSlice.js';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems, totalAmount } = useSelector(
    (state) => state.cart
  );

  // console.log(`I am cartItems`, cartItems);

  const [userName, setUserName] = useState('');

  const handleQuantityChange = (
    productId,
    storeDisplayName,
    change
  ) => {
    dispatch(
      updateQuantity({
        productId,
        change,
        storeDisplayName,
      })
    );
  };

  const handleCheckout = async () => {
    if (!userName.trim()) {
      alert('Please enter your name');
      return;
    }

    const groupedByStore = cartItems.reduce((acc, item) => {
      const storeId = item.storeName;
      if (!acc[storeId]) {
        acc[storeId] = [];
      }
      acc[storeId].push(item);
      return acc;
    }, {});

    // console.log('Hi groupBysotre here', groupedByStore);

    try {
      // Loop through each store and send the data
      for (const storeId in groupedByStore) {
        const items = groupedByStore[storeId];

        const orderPayload = {
          name: userName,
          items: items.map((item) => ({
            productId: item._id,
            quantity: item.quantity,
          })),
          storeId,
          totalPrice: totalAmount,
        };

        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_BASE_URL}orders`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderPayload),
          }
        );

        const data = await res.json();

        if (!res.ok) {
          alert('Error placing order: ' + data.message);
          console.error(data);
          return;
        }

        // console.log('Order placed successfully', data);
      }

      dispatch(clearCart());
      navigate('/order-confirmation', {
        state: { userName },
      });
    } catch (error) {
      console.error('Order failed:', error);
      alert('Failed to place order');
    }
  };

  return (
    <div className="text-white max-w-7xl mx-auto p-6">
      <div className="text-center text-3xl font-bold my-6">
        Your Cart
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cartItems.map((item) => (
          <div
            key={`${item._id}-${item.storeDisplayName}`}
            className="bg-gradient-to-r from-red-800 via-orange-300 to-yellow- text-white rounded-xl shadow-lg p-5"
          >
            <h2 className="text-xl font-bold mb-2">
              {item.name}
            </h2>
            <p className="text-sm mb-1">
              Price: ₹{item.price}
            </p>
            <p className="text-sm mb-1">
              Quantity: {item.quantity}
            </p>
            <p className="text-sm mb-3">
              Store: {item.storeDisplayName}
            </p>

            <p className="text-sm mb-3">
              Final Amount : ₹{item.price * item.quantity}
            </p>

            <div className="flex items-center space-x-2 mt-3">
              <button
                onClick={() =>
                  handleQuantityChange(
                    item._id,
                    item.storeDisplayName,
                    -1
                  )
                }
                className="bg-gray-600 text-white rounded px-2 py-1"
              >
                -
              </button>
              <p className="text-white">{item.quantity}</p>
              <button
                onClick={() =>
                  handleQuantityChange(
                    item._id,
                    item.storeDisplayName,
                    1
                  )
                }
                className="bg-gray-600 text-white rounded px-2 py-1"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Fields */}
      <div className="mb-4 mt-10">
        <div className="text-xl font-semibold mt-4 mb-1 text-black">
          Total Price: ₹ {totalAmount}
        </div>
        <p className="text-xl font-semibold mt-4 mb-1 text-black">
          Pincode:{' '}
          <span className="text-green-700 text-xl ">
            Servicable
          </span>
        </p>
        <p className="font-semibold text-black mb-3 text-xl">
          Service & Delivery In{' '}
          <span className="text-red-600">*</span>: 2-4 hours
        </p>
        <p className="font-semibold text-black mb-3 text-xl">
          Name <span className="text-red-600">*</span>
        </p>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="text-black p-2 rounded w-full"
          placeholder="Enter your name"
          required
        />
      </div>

      {/* Checkout Button */}
      <div className="text-center mt-6">
        <button
          disabled={!userName}
          onClick={handleCheckout}
          className={`${
            !userName
              ? 'bg-gray-500'
              : 'bg-green-600 hover:bg-green-700'
          } text-white font-semibold py-2 px-6 rounded`}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
