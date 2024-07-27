import React, { lazy } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';

const CoffeeTypes = lazy(() => import('./components/pages/CoffeeTypes'));

const App = () =>
  <Router>
    <Routes>
      <Route path='/' element={<Navigate to='/coffee-types' replace={true} />} />
      <Route path='/coffee-types' element={<CoffeeTypes />} />
    </Routes>
  </Router>

export default App;
