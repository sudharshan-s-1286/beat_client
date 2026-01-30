import React, { useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './Components/Header';
import Home from './Pages/Home';
import About from './Pages/About';
import Contact from './Pages/Contact';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import Music from './Pages/Music';
import Favorites from './Pages/Favorites';
import BottomPlayer from './Components/BottomPlayer';
import { PlayerProvider } from './Context/PlayerContext';

// Protected Route Component
const ProtectedRoute = ({ isAuth, children }) => {
  if (!isAuth) {
    return <Navigate to="/signin" replace />;
  }
  return children;
};

// Authenticated Route Component (redirects to /music if already logged in)
const PublicOnlyRoute = ({ isAuth, children }) => {
  if (isAuth) {
    return <Navigate to="/music" replace />;
  }
  return children;
};

const App = () => {
  // Initialize state from local storage securely
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem("token"));
  const location = useLocation();

  // Hide Player on Auth Pages
  const hidePlayerRoutes = ['/signin', '/signup'];
  const showPlayer = isAuth && !hidePlayerRoutes.includes(location.pathname);

  return (
    <PlayerProvider>
      <div className="min-h-screen bg-black text-white font-sans">
        <Header isAuth={isAuth} setIsAuth={setIsAuth} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          <Route
            path="/signin"
            element={
              <PublicOnlyRoute isAuth={isAuth}>
                <SignIn setIsAuth={setIsAuth} />
              </PublicOnlyRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicOnlyRoute isAuth={isAuth}>
                <SignUp setIsAuth={setIsAuth} />
              </PublicOnlyRoute>
            }
          />

          <Route
            path="/music"
            element={
              <ProtectedRoute isAuth={isAuth}>
                <Music />
              </ProtectedRoute>
            }
          />
          <Route
            path="/favorites"
            element={
              <ProtectedRoute isAuth={isAuth}>
                <Favorites />
              </ProtectedRoute>
            }
          />
        </Routes>

        {showPlayer && <BottomPlayer />}
      </div>
    </PlayerProvider>
  );
};

export default App;