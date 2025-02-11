import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const SkinCancerReport = () => {
  const { state } = useLocation(); // Get the passed skin image
  const [selectedFile, setSelectedFile] = useState(state?.skinImage || null);
  const [prediction, setPrediction] = useState("");
  const [confidence, setConfidence] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  // Display preview of received image
  useEffect(() => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  }, [selectedFile]);

  // Automatically upload image for prediction
  useEffect(() => {
    if (selectedFile) {
      handleUpload();
    }
  }, [selectedFile]);

  // Handle file upload and prediction request
  const handleUpload = async () => {
    if (!selectedFile) {
      setPrediction("No image received.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      console.log("📤 Uploading image to Flask API...");
      const response = await axios.post("http://127.0.0.1:5000/api/skin-cancer-detection", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("✅ Response received:", response.data);
      setPrediction(response.data.prediction);
      setConfidence(response.data.confidence);
    } catch (error) {
      console.error("❌ Error uploading image:", error);
      setPrediction("Error processing image.");
      setConfidence(null);
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-12">
        Skin Cancer Detection Report
      </h1>

      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        {/* Display Uploaded Skin Image */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">Uploaded Skin Image</h2>
          {previewImage && (
            <img
              src={previewImage}
              alt="Skin Image Preview"
              className="w-full max-w-[20rem] mx-auto mb-6 object-cover border rounded-md"
            />
          )}
        </div>

        {/* Prediction Result */}
        {prediction && (
          <div className="mt-8 text-center">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Prediction Result</h2>
            <p className="text-lg font-bold text-gray-800">
              {prediction} {confidence !== null && `(${(confidence * 100).toFixed(2)}% accuracy)`}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default SkinCancerReport;
