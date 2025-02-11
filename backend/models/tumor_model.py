import joblib

def load_tumor_model():
    print("🔄 Loading tumor detection model...")
    model = joblib.load("E:\\MedIntel\\report-scanner\\backend\\models\\tumor_detection.pkl")
    print("✅ Model loaded successfully.")
    return model

tumor_model = load_tumor_model()
