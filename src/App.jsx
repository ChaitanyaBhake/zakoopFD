import './App.css';
import { Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import StorePage from './pages/StorePage';
import CartPage from './pages/CartPage';
import OrderConfirmationPage from './pages/OrderConfirmation';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <div className='pt-[70px] bg-slate-900 min-h-screen text-white bg-[url("https://images.pexels.com/photos/5965667/pexels-photo-5965667.jpeg")] bg-no-repeat bg-cover bg-center'>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route
            path="/store/:storeName"
            element={<StorePage />}
          />
          <Route path="/cart" element={<CartPage />} />
          <Route
            path="/order-confirmation"
            element={<OrderConfirmationPage />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
