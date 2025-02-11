from flask import Flask
from flask_cors import CORS
from routes.tumor_detection import tumor_detection_bp
from routes.fracture_detection import fracture_bp
from routes.skin_cancer_detection import skin_cancer_classify_bp
from routes.pneumonia_detection import pneumonia_detection_bp
from routes.ollama_insights import ollama_skin_cancer_insights, ollama_pneumonia_insights, ollama_fracture_insights, ollama_tumor_insights
app = Flask(__name__)
CORS(app)  # Enable CORS

# Register Blueprints
app.register_blueprint(fracture_bp)
app.register_blueprint(tumor_detection_bp)
app.register_blueprint(skin_cancer_classify_bp)
app.register_blueprint(pneumonia_detection_bp)
app.register_blueprint(ollama_skin_cancer_insights)
app.register_blueprint(ollama_pneumonia_insights)
app.register_blueprint(ollama_fracture_insights)
app.register_blueprint(ollama_tumor_insights)
if __name__ == '__main__':
    app.run(debug=True)
