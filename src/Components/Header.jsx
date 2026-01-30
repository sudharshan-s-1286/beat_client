import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from 'antd';
import { LogoutOutlined, CustomerServiceFilled } from '@ant-design/icons';

const Header = ({ isAuth, setIsAuth }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    setIsAuth(false);
    localStorage.removeItem("token");
    navigate("/signin", { replace: true });
  };

  // Helper to determine active link
  const isActive = (path) => location.pathname === path;
  const linkClasses = (path) => `text-lg font-medium transition-colors duration-300 ${isActive(path) ? 'text-red-500' : 'text-gray-300 hover:text-red-400'}`;

  return (
    <header className="bg-black/95 text-white py-4 px-6 md:px-10 flex justify-between items-center shadow-md border-b border-neutral-800 sticky top-0 z-50 backdrop-blur-md">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 group">
        <CustomerServiceFilled className="text-3xl text-red-600 group-hover:scale-110 transition-transform" />
        <span className="text-2xl font-bold tracking-tighter">BEAT</span>
      </Link>

      {/* Navigation */}
      <nav className="hidden md:flex items-center gap-8">
        {isAuth ? (
          <>
            <Link to="/" className={linkClasses('/')}>Home</Link>
            <Link to="/music" className={linkClasses('/music')}>Music</Link>
            <Link to="/favorites" className={linkClasses('/favorites')}>Favorites</Link>
          </>
        ) : (
          <>
            <Link to="/" className={linkClasses('/')}>Home</Link>
            <Link to="/about" className={linkClasses('/about')}>About</Link>
            <Link to="/contact" className={linkClasses('/contact')}>Contact</Link>
          </>
        )}
      </nav>

      {/* Auth Buttons */}
      <div className="flex items-center gap-4">
        {!isAuth && (
          <Link to="/signin">
            <Button
              type="primary"
              variant="outlined"
              className="signin-btn font-bold px-6 py-2 rounded-full border-2 transition-all h-10 flex items-center"
              style={{
                backgroundColor: 'transparent',
                color: 'white',
                borderColor: 'white'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'red';
                e.currentTarget.style.color = 'black';
                e.currentTarget.style.borderColor = 'red';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = 'white';
                e.currentTarget.style.borderColor = 'white';
              }}
            >
              Sign in
            </Button>
          </Link>
        )}

        {isAuth ? (
          <Button
            type="primary"
            danger
            icon={<LogoutOutlined />}
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 border-none font-semibold rounded-full px-6 h-10 shadow-lg shadow-red-600/20 transition-all"
            style={{ backgroundColor: '#dc2626' }}
          >
            Logout
          </Button>
        ) : (
          <Link to="/signup">
            <Button
              className="bg-red-600 border-none rounded-full px-8 font-extrabold text-base h-11 transition-all"
              style={{ backgroundColor: '#dc2626', color: 'white' }}
            >
              Sign up
            </Button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;