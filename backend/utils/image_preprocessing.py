import cv2
import numpy as np
from PIL import Image
import torch
from transformers import AutoImageProcessor
processor = AutoImageProcessor.from_pretrained("Heem2/bone-fracture-detection-using-xray")
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
    m_img = img_numeric.reshape(1, 160*160*3)  # Reshape for model input

    print("✅ Image preprocessed successfully.")
    return m_img
def preprocess_image_pil(image_path):
    """
    Preprocess image using PIL for model inference.
    """
    print(f"📷 Loading image (PIL) from: {image_path}")
    try:
        image = Image.open(image_path)  # Convert to RGB
        print("✅ Image preprocessed using PIL.")
        return image
    except Exception as e:
        raise ValueError(f"❌ Error processing image: {str(e)}")
