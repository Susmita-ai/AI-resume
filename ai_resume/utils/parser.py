import pdfplumber
import easyocr
from PIL import Image
import numpy as np

# Initialize OCR reader
reader = easyocr.Reader(['en'], gpu=False)


def extract_text_from_pdf(pdf_path):
    """
    Extract text from PDF using pdfplumber
    """

    text = ""

    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text()

            if page_text:
                text += page_text + "\n"

    return text


def extract_text_from_image(image_path):
    """
    Extract text from image using EasyOCR
    """

    image = np.array(Image.open(image_path))

    result = reader.readtext(image)

    text = ""

    for item in result:
        text += item[1] + " "

    return text