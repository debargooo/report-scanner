import React from 'react';
import heroImage from '../assets/20369.jpg';  // Import the image

const Hero = () => (
    <section className="bg-blue-100 py-40 text-center relative"> {/* Increased padding */}
      {/* Text content with higher z-index */}
      <div className="relative z-10">
        <h1 className="text-4xl font-bold text-white mb-4">Your Medical Reports, Simplified</h1>
        <p className="text-white text-lg mb-6">
          Upload, view, and analyze your medical reports with ease.
        </p>
        <button className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700">
          Get Started
        </button>
      </div>

      {/* Image and Black Filter */}
      <div className="absolute top-0 left-0 w-full h-full">
        <img
          src={heroImage}  // Use the imported image here
          alt="Hero Image"
          className="w-full h-full object-cover"
        />
        {/* Black filter */}
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60"></div>
      </div>
    </section>
);

export default Hero;
