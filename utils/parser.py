import pdfplumber


def extract_text_from_pdf(pdf_path):
    """
    Extract text from a text-based PDF.
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
    Image OCR is not enabled in the Vercel deployment yet.
    """

    raise RuntimeError(
        "Image resume analysis is currently unavailable. "
        "Please upload a PDF resume."
    )
