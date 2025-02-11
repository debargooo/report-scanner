from transformers import AutoModelForImageClassification, AutoImageProcessor, pipeline

def get_bone_fracture_model():
    """
    Load and return the bone fracture detection model.
    """
    processor = AutoImageProcessor.from_pretrained("Heem2/bone-fracture-detection-using-xray")
    model = AutoModelForImageClassification.from_pretrained("Heem2/bone-fracture-detection-using-xray")
    pipe = pipeline("image-classification", model="Heem2/bone-fracture-detection-using-xray")
    
    return pipe, processor
