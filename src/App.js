import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Footer from './components/Footer';
import BloodTestReport from './pages/BloodTestReport';
import MRIReport from './pages/MRIReport';

const App = () => {
  
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/blood-test-report" element={<BloodTestReport />} />
        <Route path="/mri-report" element={<MRIReport />} />
      </Routes>
      <Footer/>
    </Router>
  );
};

export default App;
