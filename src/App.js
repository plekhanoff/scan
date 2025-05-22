import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './components/MainPage';
import LoginComponent from './components/LoginComponent';
import SearchPage from './components/SearchPage';
import ResultsPage from './components/ResultsPage';
import FAQPage from './components/FAQPage';
import TariffsPage from './components/TariffsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/search/results" element={<ResultsPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/tariffs" element={<TariffsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
