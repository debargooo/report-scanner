from transformers import AutoModelForImageClassification, AutoImageProcessor, pipeline

def get_skin_cancer_model():
    """
    Load and return the bone fracture detection model.
    """
    pipe = pipeline("image-classification", model="NeuronZero/SkinCancerClassifier")
    processor = AutoImageProcessor.from_pretrained("NeuronZero/SkinCancerClassifier")
    model = AutoModelForImageClassification.from_pretrained("NeuronZero/SkinCancerClassifier")
    
    return pipe, processor