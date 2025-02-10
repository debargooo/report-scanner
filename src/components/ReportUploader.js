import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bloodTestIcon from '../assets/bloodtest.jpg';
import mriIcon from '../assets/mri.jpg';
import xrayIcon from '../assets/xray.png';
import mriImg from '../assets/Y16.JPG';
import skinCancer from '../assets/skinCancer.png'
import pneumonia from '../assets/pneumonia.jpg'
import radiologist_4 from '../assets/radiologist_4.jpg'
import breastCancer from '../assets/breastCancer.jpg'
import kidney from '../assets/kidney.jpg'


const ReportUploader = () => {
  
  const [mriImage, setMriImage] = useState(null);
  const [xrayImage, setXrayImage] = useState(null);

  const navigate = useNavigate();

  const handleFileChange = (e, setFile) => {
    setFile(e.target.files[0]);
  };

  return (
    <section className="py-20 bg-gray-50">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-12">Upload Your Medical Reports</h1>

      {/* Flex Container for Sections */}
      <div className="grid grid-cols-3 justify-center gap-8 max-w-7xl mx-auto">
        {/* Blood Test Section */}
        

 {/* MRI Section */}
<div className="flex-1 min-w-[300px] max-w-sm bg-white shadow-md rounded-lg p-6">
  <img src={mriIcon} alt="MRI" className="w-[20rem] h-[20rem] mx-auto mb-4 object-cover" />
  <h2 className="text-2xl font-bold text-blue-600 mb-2 text-center">Brain Tumor</h2>
  <p className="text-gray-600 text-center mb-4">Upload your MRI scan (Image only).</p>
  <input
    type="file"
    accept="image/*"
    onChange={(e) => handleFileChange(e, setMriImage)}
    className="block w-full text-gray-700 border border-gray-300 rounded-md p-2 mb-4"
  />
  {mriImage && (
    <p className="text-gray-700 text-center">Uploaded: {mriImage.name}</p>
  )}
  <button
    className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 mt-4"
    onClick={() => navigate('/mri-report', { state: { mriImage: mriImage } })} // Pass the image file as state
  >
    Show Report
  </button>
</div>


        {/* X-Ray Section */}
        <div className="flex-1 min-w-[300px] max-w-sm bg-white shadow-md rounded-lg p-6">
          <img src={radiologist_4} alt="X-Ray" className="w-[20rem] h-[20rem] mx-auto mb-4 object-cover" />
          <h2 className="text-2xl font-bold text-blue-600 mb-2 text-center">Bone Fracture</h2>
          <p className="text-gray-600 text-center mb-4">Bone Fracture (Image only).</p>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, setXrayImage)}
            className="block w-full text-gray-700 border border-gray-300 rounded-md p-2 mb-4"
          />
          {xrayImage && (
            <p className="text-gray-700 text-center">Uploaded: {xrayImage.name}</p>
          )}
          <button
            className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 mt-4"
            onClick={() => navigate('/xray-report')}
          >
            Show Report
          </button>
        </div>

        <div className="flex-1 min-w-[300px] max-w-sm bg-white shadow-md rounded-lg p-6">
          <img src={skinCancer} alt="X-Ray" className="w-[20rem] h-[20rem] mx-auto mb-4 object-cover" />
          <h2 className="text-2xl font-bold text-blue-600 mb-2 text-center">Skin Cancer</h2>
          <p className="text-gray-600 text-center mb-4">Bone Fracture (Image only).</p>
          <input
            type="file"
            accept="image/*"
            className="block w-full text-gray-700 border border-gray-300 rounded-md p-2 mb-4"
          />
          {xrayImage && (
            <p className="text-gray-700 text-center">Uploaded: {xrayImage.name}</p>
          )}
          <button
            className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 mt-4"
            onClick={() => navigate('/skin-cancer')}
          >
            Show Report
          </button>
        </div>

        <div className="flex-1 min-w-[300px] max-w-sm bg-white shadow-md rounded-lg p-6">
          <img src={pneumonia} alt="X-Ray" className="w-[20rem] h-[20rem] mx-auto mb-4 object-cover" />
          <h2 className="text-2xl font-bold text-blue-600 mb-2 text-center">Pneumonia</h2>
          <p className="text-gray-600 text-center mb-4">Bone Fracture (Image only).</p>
          <input
            type="file"
            accept="image/*"
            className="block w-full text-gray-700 border border-gray-300 rounded-md p-2 mb-4"
          />
          {xrayImage && (
            <p className="text-gray-700 text-center">Uploaded: {xrayImage.name}</p>
          )}
          <button
            className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 mt-4"
            onClick={() => navigate('/pneumonia')}
          >
            Show Report
          </button>
        </div>
        
        
        <div className="flex-1 min-w-[300px] max-w-sm bg-white shadow-md rounded-lg p-6">
          <img src={breastCancer} alt="X-Ray" className="w-[20rem] h-[20rem] mx-auto mb-4 object-cover" />
          <h2 className="text-2xl font-bold text-blue-600 mb-2 text-center">Breast Cancer</h2>
          <p className="text-gray-600 text-center mb-4">Breast Cancer (Image only).</p>
          <input
            type="file"
            accept="image/*"
            className="block w-full text-gray-700 border border-gray-300 rounded-md p-2 mb-4"
          />
          {xrayImage && (
            <p className="text-gray-700 text-center">Uploaded: {xrayImage.name}</p>
          )}
          <button
            className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 mt-4"
            onClick={() => navigate('/pneumonia')}
          >
            Show Report
          </button>
        </div>

        <div className="flex-1 min-w-[300px] max-w-sm bg-white shadow-md rounded-lg p-6">
          <img src={kidney} alt="X-Ray" className="w-[20rem] h-[20rem] mx-auto mb-4 object-cover" />
          <h2 className="text-2xl font-bold text-blue-600 mb-2 text-center">kidney MRI</h2>
          <p className="text-gray-600 text-center mb-4">Breast Cancer (Image only).</p>
          <input
            type="file"
            accept="image/*"
            className="block w-full text-gray-700 border border-gray-300 rounded-md p-2 mb-4"
          />
          {xrayImage && (
            <p className="text-gray-700 text-center">Uploaded: {xrayImage.name}</p>
          )}
          <button
            className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 mt-4"
            onClick={() => navigate('/pneumonia')}
          >
            Show Report
          </button>
        </div>
      </div>
    </section>
  );
};

export default ReportUploader;