import React from 'react';
import Features from '../components/Features';
import Testimonial from '../components/Testimonial';
import Hero from '../components/Hero';
import ReportUploader from '../components/ReportUploader';

const Home = () => {



  return (
    <>
     <Hero/>
     <div className="container mx-auto p-4">
<ReportUploader/>
<Features/>
<Testimonial/>
</div>
    </>
   
  );
};

export default Home;
