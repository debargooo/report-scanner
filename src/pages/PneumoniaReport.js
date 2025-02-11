import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const PneumoniaReport = () => {
  const { state } = useLocation(); // Get the passed X-ray image
  const [selectedFile, setSelectedFile] = useState(state?.pneumoniaImage || null);
  const [prediction, setPrediction] = useState("");
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
      console.log("📤 Uploading X-ray image to Flask API...");
      const response = await axios.post("http://127.0.0.1:5000/api/pneumonia-detection", formData, {
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
        Pneumonia Detection Report
      </h1>

      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        {/* Display Uploaded X-ray Image */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">Uploaded X-ray Image</h2>
          {previewImage && (
            <img
              src={previewImage}
              alt="X-ray Image Preview"
              className="w-full max-w-[20rem] mx-auto mb-6 object-cover border rounded-md"
              
            />
          )}
        </div>

        {/* Prediction Result */}
        {prediction && (
          <div className="mt-8 text-center">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Prediction Result</h2>
            <p
              className={`text-lg font-bold ${
                prediction === "PNEUMONIA" ? "text-red-600" : "text-green-600"
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

export default PneumoniaReport;
