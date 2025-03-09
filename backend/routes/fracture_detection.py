from flask import Blueprint, request, jsonify
import os
from models.fracture_model import get_bone_fracture_model
from utils.image_preprocessing import preprocess_image_pil

# Initialize Flask Blueprint
fracture_bp = Blueprint("fracture", __name__)

# Load model once
pipe, processor = get_bone_fracture_model()

# Upload folder
BASE_DIR = os.path.dirname(os.path.abspath(__file__))  # This gets the path of 'backend' folder
UPLOAD_FOLDER = os.path.join(BASE_DIR, "uploads")
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@fracture_bp.route('/api/fracture-detection', methods=['POST'])
def detect_fracture():
    """
    API route for bone fracture detection.
    """
    print("📩 Received POST request for bone fracture detection.")

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

        result_text = "FRACTURED" if confidence >= 0.80 and prediction == "fractured" else "NOT FRACTURED"
        print(f"✅ Prediction: {result_text}")

    except Exception as e:
        return jsonify({"error": f"Processing error: {str(e)}"}), 500

    # Delete uploaded image after processing
    if os.path.exists(image_path):
        os.remove(image_path)
        print("🗑️ Uploaded image deleted after processing.")
    else:
        print("⚠️ Warning: File not found, skipping deletion!")

    return jsonify({"prediction": result_text, "confidence": confidence})
