import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Homepage = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchStores = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_BASE_URL}stores`
      );
      const data = await response.json();

      if (response.ok) {
        setStores(data.stores);
        setLoading(false);
      }
    } catch (error) {
      console.log(`Error fetching stores: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const handleStoreClick = (storeName) => {
    navigate(`/store/${storeName}`);
  };

  useEffect(() => {
    fetchStores();
  }, []);

  if (loading) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 text-white">
        <div className="text-2xl font-semibold">
          Loading Hyperlocal Stores...
        </div>
      </div>
    );
  }

  return (
    <div className="text-white max-w-7xl mx-auto">
      <div className="text-center text-3xl font-bold my-6">
        Hyperlocal Stores
      </div>

      <div className="">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {stores.map((store) => (
            <div
              key={store._id}
              className="bg-gradient-to-r from-red-800 via-orange-300 to-yellow- text-gray-800 rounded-xl shadow-lg p-5 hover:scale-105 transition-all duration-300 cursor-pointer"
              onClick={() => handleStoreClick(store.name)}
            >
              <h2 className="text-xl font-bold mb-2 text-white">
                {store.name}
              </h2>
              <p className="text-sm  text-white">
                {store.location}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
