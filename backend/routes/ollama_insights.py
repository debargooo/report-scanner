from flask import Blueprint, jsonify, request
from ollama import chat, ChatResponse

# Default message template
default = "in less than 60 words with no bold or italics"

# Create Blueprint for Skin Cancer Insights
ollama_skin_cancer_insights = Blueprint('ollama_skin_cancer_insights', __name__)

@ollama_skin_cancer_insights.route('/api/ollama-skin-cancer-insights', methods=['GET'])
def skin_cancer_insights():
    prediction = request.args.get('prediction', '').replace('+', ' ')

    # Generate insights for different skin cancer types
    if prediction == 'Melanoma':
        response = chat(model='llama3.2', messages=[{'role': 'user', 'content': f"What are the treatment and preventive measures for Melanoma? {default}"}])
        return jsonify({"insights": response['message']['content']})
    elif prediction == 'Nevus':
        response = chat(model='llama3.2', messages=[{'role': 'user', 'content': f"What are the treatment and preventive measures for Nevus? {default}"}])
        return jsonify({"insights": response['message']['content']})
    elif prediction == 'Benign Keratosis-like Lesions':
        response = chat(model='llama3.2', messages=[{'role': 'user', 'content': f"What are the treatment and preventive measures for Benign Keratosis-like Lesions? {default}"}])
        return jsonify({"insights": response['message']['content']})
    elif prediction == 'Basal Cell Carcinoma':
        response = chat(model='llama3.2', messages=[{'role': 'user', 'content': f"What are the treatment and preventive measures for Basal Cell Carcinoma? {default}"}])
        return jsonify({"insights": response['message']['content']})
    elif prediction == 'Squamous Cell Carcinoma':
        response = chat(model='llama3.2', messages=[{'role': 'user', 'content': f"What are the treatment and preventive measures for Squamous Cell Carcinoma? {default}"}])
        return jsonify({"insights": response['message']['content']})
    elif prediction == 'Actinic Keratosis':
        response = chat(model='llama3.2', messages=[{'role': 'user', 'content': f"What are the treatment and preventive measures for Actinic Keratosis? {default}"}])
        return jsonify({"insights": response['message']['content']})
    elif prediction == 'Dermatofibroma':
        response = chat(model='llama3.2', messages=[{'role': 'user', 'content': f"What are the treatment and preventive measures for Dermatofibroma? {default}"}])
        return jsonify({"insights": response['message']['content']})
    elif prediction == 'Vascular Lesion':
        response = chat(model='llama3.2', messages=[{'role': 'user', 'content': f"What are the treatment and preventive measures for Vascular Lesion? {default}"}])
        return jsonify({"insights": response['message']['content']})
    else:
        response = chat(model='llama3.2', messages=[{'role': 'user', 'content': f"Congratulations! No skin cancer detected. How to stay protected from skin cancer in the future? {default}"}])
        return jsonify({"insights": response['message']['content']})

# Create Blueprint for Pneumonia Insights
ollama_pneumonia_insights = Blueprint('ollama_pneumonia_insights', __name__)

@ollama_pneumonia_insights.route('/api/ollama-pneumonia-insights', methods=['GET'])
def pneumonia_insights():
    prediction = request.args.get('prediction', '').replace('+', ' ')

    # Generate insights based on pneumonia prediction
    if prediction == 'PNEUMONIA':
        response = chat(model='llama3.2', messages=[{'role': 'user', 'content': f"What are the treatment and preventive measures for Pneumonia? {default}"}])
        return jsonify({"insights": response['message']['content']})
    else:
        response = chat(model='llama3.2', messages=[{'role': 'user', 'content': f"Congratulations! No pneumonia detected. How to stay protected from pneumonia in the future? {default}"}])
        return jsonify({"insights": response['message']['content']})

# Create Blueprint for Fracture Insights
ollama_fracture_insights = Blueprint('ollama_fracture_insights', __name__)

@ollama_fracture_insights.route('/api/ollama-fracture-insights', methods=['GET'])
def fracture_insights():
    prediction = request.args.get('prediction', '').replace('+', ' ')

    # Generate insights based on fracture prediction
    if prediction == 'FRACTURED':
        response = chat(model='llama3.2', messages=[{'role': 'user', 'content': f"What are the treatment and preventive measures for Fractures? {default}"}])
        return jsonify({"insights": response['message']['content']})
    else:
        response = chat(model='llama3.2', messages=[{'role': 'user', 'content': f"Congratulations! No fracture detected. How to stay protected from fractures in the future? {default}"}])
        return jsonify({"insights": response['message']['content']})

# Create Blueprint for Tumor Insights
ollama_tumor_insights = Blueprint('ollama_tumor_insights', __name__)

@ollama_tumor_insights.route('/api/ollama-tumor-insights', methods=['GET'])
def tumor_insights():
    prediction = request.args.get('prediction', '').replace('+', ' ')

    # Generate insights based on tumor prediction
    if prediction == 'TUMOR DETECTED':
        response = chat(model='llama3.2', messages=[{'role': 'user', 'content': f"What are the treatment and preventive measures for Tumors? {default}"}])
        return jsonify({"insights": response['message']['content']})
    else:
        response = chat(model='llama3.2', messages=[{'role': 'user', 'content': f"Congratulations! No tumor detected. How to stay protected from tumors in the future? {default}"}])
        return jsonify({"insights": response['message']['content']})
