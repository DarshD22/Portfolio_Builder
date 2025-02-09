import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PortfolioBuilder from './components/PortfolioBuilder';
import ViewPortfolio from './components/ViewPortfolio';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<PortfolioBuilder />} />
          <Route path="/portfolio/:shareableLink" element={<ViewPortfolio />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;