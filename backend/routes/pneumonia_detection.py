from flask import Blueprint, request, jsonify
import os
from models.pneumonia_model import get_pneumonia_model
from utils.image_preprocessing import preprocess_image_pil

# Initialize Flask Blueprint
pneumonia_detection_bp = Blueprint("pneumonia_detection", __name__)

# Load model once
pipe, processor = get_pneumonia_model()

# Upload folder
BASE_DIR = os.path.dirname(os.path.abspath(__file__))  # This gets the path of 'backend' folder
UPLOAD_FOLDER = os.path.join(BASE_DIR, "uploads")
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@pneumonia_detection_bp.route('/api/pneumonia-detection', methods=['POST'])
def detect_pneumonia():
    """
    API route for pneumonia detection.
    """
    print("📩 Received POST request for pneumonia detection.")

    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    image = request.files["image"]
    image_path = os.path.join(UPLOAD_FOLDER, image.filename)
    image.save(image_path)

    try:
        # Preprocess image
        processed_img = preprocess_image_pil(image_path)
        print("🔍 Making prediction...")

        # Classify image
        results = pipe(processed_img)
        prediction = results[0]['label']
        confidence = results[0]['score']
        
        # Delete uploaded image after processing
        if os.path.exists(image_path):
            os.remove(image_path)
            print("🗑️ Uploaded image deleted after processing.")
        else:
            print("⚠️ Warning: File not found, skipping deletion!")
        
        return jsonify({"prediction": prediction, "confidence": confidence})

    except Exception as e:
        return jsonify({"error": f"Processing error: {str(e)}"}), 500
