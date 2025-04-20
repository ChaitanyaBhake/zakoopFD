import { useDispatch, useSelector } from 'react-redux';
import {
  addToCart,
  updateQuantity,
} from '../slices/cartSlice.js'; 
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';


const StorePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { storeName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [storeExists, setStoreExists] = useState(true); 

  const cartItems = useSelector(
    (state) => state.cart.cartItems || []
  );

  // Fetch products for the particular store
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_BASE_URL
        }products/store/${storeName}`
      );
      const data = await response.json();

      if (response.ok && data.products) {
        setProducts(data.products);
        setStoreExists(true);
        setLoading(false);
      } else {
        setStoreExists(false); 
        setLoading(false);
      }
    } catch (error) {
      console.log(`Error fetching products: ${error}`);
      setStoreExists(false); 
      setLoading(false);
    }
  };

  useEffect(() => {
    if (storeName) {
      fetchProducts();
    }
  }, [storeName]);

  const handleAddToCart = (product) => {
    const productWithStore = { ...product, storeDisplayName: storeName };
    dispatch(addToCart(productWithStore));
  };

  const handleQuantityChange = (
    productId,
    change
  ) => {
    dispatch(updateQuantity({ productId, change }));
  };

  if (loading) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 text-white">
        <div className="text-2xl font-semibold">
          Loading Products...
        </div>
      </div>
    );
  }

  if (!storeName || !storeExists) {
    return (
      <div className="text-center text-3xl font-bold my-6 line-clamp-2">
        Please select a store from the Home page to start shopping!
      </div>
    );
  }

  return (
    <div className="text-white max-w-7xl mx-auto p-6">
      <div className="text-center text-3xl font-bold my-6">
        {storeName}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => {
          const isProductInCart = cartItems.some(
            (item) => item._id === product._id
          );
          const productInCart = cartItems.find(
            (item) => item._id === product._id
          );
          const quantity = productInCart?.quantity || 0;

          return (
            <div
              key={product._id}
              className="bg-gradient-to-r from-red-800 via-orange-300 to-yellow- text-white rounded-xl shadow-lg p-5 hover:scale-105 transform transition-all duration-300 cursor-pointer"
            >
              <h2 className="text-xl font-bold mb-2">{product.name}</h2>
              <p className="text-sm mb-1">Price: ₹{product.price}</p>
              <p className="text-sm mb-3">Quantity: {product.quantity}</p>

              {/* Add to Cart Button */}
              {!isProductInCart ? (
                <button
                  onClick={() => handleAddToCart(product)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1.5 px-4 rounded"
                >
                  Add to Cart
                </button>
              ) : (
                // Display quantity controls if the product is in the cart
                <div className="flex items-center space-x-2 mt-3">
                  <button
                    onClick={() => handleQuantityChange(product._id, -1)}
                    className="bg-gray-600 text-white rounded px-2 py-1"
                  >
                    -
                  </button>
                  <p className="text-white">{quantity}</p>
                  <button
                    onClick={() => handleQuantityChange(product._id, 1)}
                    className="bg-gray-600 text-white rounded px-2 py-1"
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* View Cart Button */}
      <div className="text-center mt-6">
        <button
          onClick={() => navigate('/cart')}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded"
        >
          View Cart
        </button>
      </div>
    </div>
  );
};

export default StorePage;
