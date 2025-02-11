import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const MRIReport = () => {
  const { state } = useLocation();
  const [selectedFile, setSelectedFile] = useState(state?.mriImage || null);
  const [prediction, setPrediction] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(false);
  const [insightLoading, setInsightLoading] = useState(false);

  // Display preview of the uploaded image & trigger prediction
  useEffect(() => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(selectedFile);

      // Auto-upload & predict when file is selected
      handleUpload(selectedFile);
    }
  }, [selectedFile]);

  // Handle image upload and prediction
  const handleUpload = async (file) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    setLoading(true);

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
    setLoading(false);
  };

  // Fetch Insights from ollama-tumor-insight API
  const fetchInsights = async () => {
    if (!prediction) return;

    setInsightLoading(true);
    try {
      console.log("🔍 Fetching insights...");
      const response = await axios.get("http://127.0.0.1:5000/api/ollama-tumor-insights", {
        params: { prediction },
      });
      console.log("✅ Insights received:", response.data);
      setInsights(response.data.insights);
    } catch (error) {
      console.error("❌ Error fetching insights:", error);
      setInsights("Failed to retrieve insights.");
    }
    setInsightLoading(false);
  };

  return (
    <section className="py-16 px-4 sm:px-8 bg-gradient-to-b from-white to-teal-100 flex flex-col items-center">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 bg-gradient-to-r from-blue-400 to-blue-700 text-transparent bg-clip-text mb-12">
        MRI Report - Brain Tumor Detection
      </h1>

      <div className="max-w-4xl w-full bg-white shadow-xl rounded-xl p-6 sm:p-10">
        {/* Display Uploaded MRI Image */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Uploaded MRI Image</h2>
          {previewImage && (
            <img
              src={previewImage}
              alt="MRI Image Preview"
              className="w-full max-w-[20rem] mx-auto mb-6 object-cover border border-blue-300 rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
            />
          )}
        </div>

        {/* Prediction Result */}
        {loading ? (
          <div className="text-center text-xl font-bold text-gray-700">Processing...</div>
        ) : (
          prediction && (
            <div
              className={`mt-8 text-center p-6 rounded-lg shadow-xl border-2 ${
                prediction === "TUMOR DETECTED"
                  ? "bg-red-100 border-red-500 text-red-700 animate-pulse"
                  : "bg-green-100 border-green-500 text-green-700"
              }`}
            >
              <h2 className="text-2xl font-semibold mb-4">Prediction Result</h2>
              <p className="text-3xl font-extrabold uppercase tracking-wide">{prediction}</p>
            </div>
          )
        )}

        {/* View Insights Button */}
        {prediction && (
          <div className="mt-6 text-center">
            <button
              onClick={fetchInsights}
              className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-transform duration-300 
              hover:scale-105 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={insightLoading}
            >
              {insightLoading ? "Fetching Insights..." : "View Insights"}
            </button>
          </div>
        )}

        {/* Insights Display */}
        {insights && (
          <div className="mt-8 bg-gray-100 p-6 rounded-lg shadow-lg border border-gray-300">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Medical Insights</h2>
            <p className="text-gray-700 text-lg">{insights}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default MRIReport;
