from flask import Flask,request,jsonify
from flask_cors import CORS  # Import CORS
import numpy as np
import cv2
import os
import joblib

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
model = joblib.load("tumor_detection.pkl")
print("✅ Model loaded successfully.")

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)  # Ensure the folder exists
print(f"📂 Upload folder set to: {UPLOAD_FOLDER}")

@app.route('/api/blood-test-report', methods=['GET'])
def get_blood_test_report():
    data = {
        "bloodTestData": [
            {"name": "Glucose", "values": [0.739597, 0.121786, 0.452539, 0.136609, 0.176737]},
            {"name": "Cholesterol", "values": [0.650198, 0.023058, 0.116135, 0.015605, 0.752220]},
            {"name": "Hemoglobin", "values": [0.713631, 0.944893, 0.544560, 0.419957, 0.971779]},
            {"name": "Platelets", "values": [0.868491, 0.905372, 0.400640, 0.191487, 0.785286]},
            {"name": "White Blood Cells (WBC)", "values": [0.687433, 0.507711, 0.294538, 0.081168, 0.443880]},
            {"name": "Red Blood Cells (RBC)", "values": [0.529895, 0.403033, 0.382021, 0.166214, 0.439851]},
            {"name": "Heart Rate", "values": [0.939485, 0.666368, 0.431704, 0.225756, 0.841412]}
        ],
        "diseases": [
            {"name": "Healthy", "riskLevel": "low"},
            {"name": "Diabetes", "riskLevel": "high"},
            {"name": "Thalasse", "riskLevel": "medium"},
            {"name": "Anemia", "riskLevel": "medium"},
            {"name": "Thalasse", "riskLevel": "medium"}
        ]
    }
    return jsonify(data)

def preprocess_image(image_path):
    """Preprocess image to match the input format of the model."""
    print(f"📷 Loading image from: {image_path}")
    img = cv2.imread(image_path)

    if img is None:
        print("❌ Error: Image not found or format not supported.")
        raise ValueError("Error loading image. Ensure the file format is correct.")

    print("🔄 Resizing image to (160x160)...")
    img = cv2.resize(img, (160, 160))
    
    img_numeric = np.array(img)
    m_img = img_numeric.reshape(1, 160*160*3)  # Reshape for the model

    print("✅ Image preprocessed successfully.")
    return m_img

@app.route('/api/mri-result', methods=['POST'])
def get_tumor_data():
    print("📩 Received POST request for MRI result.")

    if "image" not in request.files:
        print("❌ Error: No image found in request.")
        return jsonify({"error": "No image uploaded"}), 400

    image = request.files["image"]
    image_path = os.path.join(UPLOAD_FOLDER, image.filename)
    
    print(f"📂 Saving uploaded image to: {image_path}")
    image.save(image_path)

    try:
        # Preprocess and predict
        processed_img = preprocess_image(image_path)
        print("🔍 Making prediction...")
        prediction = model.predict(processed_img)[0]  # Get prediction (0 or 1)
        
        result = "Tumor Detected" if prediction == 1 else "No Tumor Detected"
        print(f"✅ Prediction result: {result}")

    except Exception as e:
        print(f"❌ Error during processing: {e}")
        result = f"Error processing image: {str(e)}"

    # Remove saved image after processing
    os.remove(image_path)
    print("🗑️ Uploaded image deleted after processing.")

    return jsonify({"prediction": result})
if __name__ == '__main__':
    app.run(debug=True)