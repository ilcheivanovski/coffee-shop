import React, { lazy } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';

const CoffeeShopPage = lazy(() => import('./components/pages/CoffeeShopPage'));

const App = () => (
  <Router>
    <Routes>
      <Route path='/' element={<Navigate to='/coffee-shop' replace={true} />} />
      <Route path='/coffee-shop' element={<CoffeeShopPage />} />
    </Routes>
  </Router>
);

export default App;
