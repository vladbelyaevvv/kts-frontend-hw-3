import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ProductsPage from '@/pages/ProductsPage/ProductsPage';
import ProductPage from '@/pages/ProductPage/ProductPage';
import AboutPage from '@/pages/AboutPage';
import ProfilePage from '@/pages/ProfilePage';
import AuthPage from '@/pages/AuthPage';
import CartPage from '@/pages/CartPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="/product/:documentId" element={<ProductPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/auth/signin" element={<AuthPage mode="signIn" />} />
        <Route path="/auth/signup" element={<AuthPage mode="signUp" />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
