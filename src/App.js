import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Footer from './components/Footer';
import FractureReport from './pages/FractureReport';
import MRIReport from './pages/MRIReport';
import SkinCancerReport from './pages/SkinCancerReport';
import PneumoniaReport from './pages/PneumoniaReport';
import Login from './pages/Login';
import Register from './pages/Register';

const App = () => {
  
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/mri-report" element={<MRIReport />} />
        <Route path="/xray-report" element={<FractureReport />} />
        <Route path='/skin-cancer' element={<SkinCancerReport/>}/>
        <Route path='/pneumonia' element={<PneumoniaReport/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
      <Footer/>
    </Router>
  );
};

export default App;
