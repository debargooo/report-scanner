import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const MRIReport = () => {
  const { state } = useLocation(); // Use the location state to get the passed image
  const [selectedFile, setSelectedFile] = useState(state?.mriImage || null); // Get the image from the state
  const [prediction, setPrediction] = useState("");
  const [previewImage, setPreviewImage] = useState(null);

  // Display preview of the uploaded image
  useEffect(() => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  }, [selectedFile]);

  // Handle file upload and prediction request
  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      console.log("📤 Uploading image to Flask API...");
      const response = await axios.post("http://127.0.0.1:5000/api/mri-result", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("✅ Response received:", response.data);
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error("❌ Error uploading image:", error);
      setPrediction("Error processing image.");
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-12">
        MRI Report - Brain Tumor Detection
      </h1>

      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        {/* Display MRI Image */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">Uploaded MRI Image</h2>
          {previewImage && (
            <img
              src={previewImage}
              alt="Preview"
              className="w-full max-w-[20rem] mx-auto mb-6 object-cover border rounded-md"
            />
          )}
          <button
            onClick={handleUpload}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Upload & Predict
          </button>
        </div>

        {/* Prediction Result */}
        {prediction && (
          <div className="mt-8 text-center">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Prediction Result</h2>
            <p
              className={`text-lg font-bold ${
                prediction === "Tumor Detected" ? "text-red-600" : "text-green-600"
              }`}
            >
              {prediction}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default MRIReport;
