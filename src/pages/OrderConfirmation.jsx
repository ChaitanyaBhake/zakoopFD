import { useLocation, useNavigate } from 'react-router-dom';

const OrderConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userName = location.state?.userName;

  return (
    <div className="flex flex-col justify-center items-center h-screen text-center px-4">
      {userName ? (
        <>
          <h1 className="text-3xl font-bold mb-4">
            Thank you, {userName}!
          </h1>
          <p className="text-lg mb-6">
            Your order has been placed successfully.
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Go Back to Home
          </button>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-4">
            Looks so empty
          </h1>
          <p className="text-md mb-6">
            You haven't placed any order yet.
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
          >
            Place an Order
          </button>
        </>
      )}
    </div>
  );
};

export default OrderConfirmationPage;
