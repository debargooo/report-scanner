import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const FractureReport = () => {
  const { state } = useLocation();
  const [selectedFile, setSelectedFile] = useState(state?.xrayImage || null);
  const [prediction, setPrediction] = useState("");
  const [confidence, setConfidence] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [insights, setInsights] = useState(""); // Store insights from Ollama API
  const [loadingInsights, setLoadingInsights] = useState(false); // Track insights fetching

  // Display the preview of the received image
  useEffect(() => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  }, [selectedFile]);

  // Automatically send image for prediction
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
      const response = await axios.post("http://127.0.0.1:5000/api/fracture-detection", formData, {
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

  // Fetch Insights from Ollama API
  const fetchInsights = async () => {
    if (!prediction) return;

    setLoadingInsights(true);
    setInsights(""); // Clear previous insights

    try {
      console.log("📡 Fetching insights from Ollama API...");
      const response = await axios.get("http://127.0.0.1:5000/api/ollama-fracture-insights", {
        params: { prediction },
      });

      console.log("✅ Insights received:", response.data);
      setInsights(response.data.insights);
    } catch (error) {
      console.error("❌ Error fetching insights:", error);
      setInsights("Failed to retrieve insights. Please try again.");
    } finally {
      setLoadingInsights(false);
    }
  };

  return (
    <section className="py-16 px-4 sm:px-8 bg-gradient-to-b from-white to-teal-100 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-bold text-center text-[#1e3a8a] mb-10 animate-fadeIn">
        Fracture Detection Report
      </h1>

      <div className="w-full max-w-3xl bg-white shadow-2xl rounded-2xl p-6 md:p-8 border border-gray-200">
        {/* Display X-ray Image */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-semibold text-[#1e3a8a] mb-4">Uploaded X-ray Image</h2>
          {previewImage && (
            <img
              src={previewImage}
              alt="X-ray Preview"
              className="w-full max-w-[20rem] mx-auto mb-6 object-cover border border-gray-300 rounded-xl shadow-lg 
                         transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
            />
          )}
        </div>

        {/* Prediction Result */}
        {prediction && (
          <div className="mt-8 text-center animate-fadeIn">
            <h2 className="text-2xl font-semibold text-[#1e3a8a] mb-4">Prediction Result</h2>
            <p
              className={`text-xl md:text-2xl font-bold px-5 py-3 rounded-lg inline-block shadow-md transition ${
                prediction === "FRACTURED"
                  ? "bg-red-100 text-red-700 border border-red-400"
                  : "bg-green-100 text-green-700 border border-green-400"
              }`}
            >
              {prediction} 
              {confidence !== null && ` (${(confidence * 100).toFixed(2)}% accuracy)`}
            </p>
          </div>
        )}

        {/* View Insights Button */}
        {prediction && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={fetchInsights}
              className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-transform duration-300 
                         hover:scale-105 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loadingInsights}
            >
              {loadingInsights ? "Fetching Insights..." : "View Insights"}
            </button>
          </div>
        )}

        {/* Display Insights */}
        {insights && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-[#1e3a8a] mb-2">Medical Insights</h2>
            <p className="text-gray-800">{insights}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FractureReport;
