import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bloodTestIcon from '../assets/bloodtest.jpg';
import mriIcon from '../assets/mri.jpg';
import xrayIcon from '../assets/xray.png';
import mriImg from '../assets/Y16.JPG'; 

const ReportUploader = () => {
  const [bloodTestFile, setBloodTestFile] = useState(null);
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
      <div className="flex flex-wrap justify-center gap-8 max-w-7xl mx-auto">
        {/* Blood Test Section */}
        <div className="flex-1 min-w-[300px] max-w-sm bg-white shadow-md rounded-lg p-6">
          <img src={bloodTestIcon} alt="Blood Test" className="w-[20rem] h-[20rem] mx-auto mb-4 object-cover" />
          <h2 className="text-2xl font-bold text-blue-600 mb-2 text-center">Blood Test</h2>
          <p className="text-gray-600 text-center mb-4">Upload your blood test report (PDF or Image).</p>
          <input
            type="file"
            accept=".pdf,image/*"
            onChange={(e) => handleFileChange(e, setBloodTestFile)}
            className="block w-full text-gray-700 border border-gray-300 rounded-md p-2 mb-4"
          />
          {bloodTestFile && (
            <p className="text-gray-700 text-center">Uploaded: {bloodTestFile.name}</p>
          )}
          <button
            className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 mt-4"
            onClick={() => navigate('/blood-test-report')}
          >
            Show Report
          </button>
        </div>

 {/* MRI Section */}
<div className="flex-1 min-w-[300px] max-w-sm bg-white shadow-md rounded-lg p-6">
  <img src={mriIcon} alt="MRI" className="w-[20rem] h-[20rem] mx-auto mb-4 object-cover" />
  <h2 className="text-2xl font-bold text-blue-600 mb-2 text-center">MRI</h2>
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
          <img src={xrayIcon} alt="X-Ray" className="w-[20rem] h-[20rem] mx-auto mb-4 object-cover" />
          <h2 className="text-2xl font-bold text-blue-600 mb-2 text-center">X-Ray</h2>
          <p className="text-gray-600 text-center mb-4">Upload your X-Ray scan (Image only).</p>
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
      </div>
    </section>
  );
};

export default ReportUploader;