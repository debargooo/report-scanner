from transformers import AutoModelForImageClassification, AutoImageProcessor, pipeline

def get_pneumonia_model():
    """
    Load and return the bone fracture detection model.
    """
    pipe = pipeline("image-classification", model="dima806/chest_xray_pneumonia_detection")
    processor = AutoImageProcessor.from_pretrained("dima806/chest_xray_pneumonia_detection")
    model = AutoModelForImageClassification.from_pretrained("dima806/chest_xray_pneumonia_detection")
    
    return pipe, processor