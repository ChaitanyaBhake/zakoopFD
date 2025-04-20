import { AiOutlineShoppingCart } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {

  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartCount = cartItems?.reduce((acc, item) => acc + item.quantity, 0);
  const navItems = [
    { name: 'Home', route: '/' },
    { name: 'Store', route: '/store/:storeName' },
    { name: 'Cart', route: '/cart' },
    {
      name: 'Order',
      route: '/order-confirmation',
    },
  ];

  return (
    <nav className="p-5 bg-amber-200 fixed w-full flex justify-between">
      <ul className='flex gap-6'>
        {navItems.map((item, index) => (
          <li key={index}>
            <Link to={item.route}>{item.name}</Link>
          </li>
        ))}
      </ul>

      <Link to="/cart" className="relative">
        <AiOutlineShoppingCart size={30} className="text-gray-800" />
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </Link>
    </nav>
  );
};

export default Navbar;
