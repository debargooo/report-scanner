import joblib
import os
def load_tumor_model():
    print("🔄 Loading tumor detection model...")
    base_dir = os.path.dirname(os.path.abspath(__file__)) 
    model_path = os.path.join(base_dir,"tumor_detection.pkl")
    model = joblib.load(model_path)
    print("✅ Model loaded successfully.")
    return model

tumor_model = load_tumor_model()
