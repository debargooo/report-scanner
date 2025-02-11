from flask import Blueprint, request, jsonify
import os
from models.tumor_model import tumor_model
from utils.image_preprocessing import preprocess_image

BASE_DIR = os.path.dirname(os.path.abspath(__file__))  # This gets the path of 'backend' folder
UPLOAD_FOLDER = os.path.join(BASE_DIR, "uploads")
os.makedirs(UPLOAD_FOLDER, exist_ok=True)  # Ensure folder exists

tumor_detection_bp = Blueprint('tumor_detection', __name__)

@tumor_detection_bp.route('/api/mri-result', methods=['POST'])
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
        prediction = tumor_model.predict(processed_img)[0]  # Get prediction (0 or 1)
        
        result = "TUMOR DETECTED" if prediction == 1 else "NO TUMOR DETECTED"
        print(f"✅ Prediction result: {result}")

    except Exception as e:
        print(f"❌ Error during processing: {e}")
        result = f"Error processing image: {str(e)}"

    # Remove saved image after processing
    if os.path.exists(image_path):
        os.remove(image_path)
        print("🗑️ Uploaded image deleted after processing.")
    else:
        print("⚠️ Warning: File not found, skipping deletion!")

    return jsonify({"prediction": result})
