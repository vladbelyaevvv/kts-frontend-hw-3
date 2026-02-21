import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ProductsPage from '@/pages/ProductsPage/ProductsPage';
import ProductPage from '@/pages/ProductPage/ProductPage';
import AboutPage from '@/pages/AboutPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {<Route path="/" element={<ProductsPage />} />}
        <Route path="/product/:documentId" element={<ProductPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
