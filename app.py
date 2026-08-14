import os
import shutil
import uuid

from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware


from utils.parser import (
    extract_text_from_pdf,
    extract_text_from_image
)

from utils.extractor import (
    extract_name,
    extract_email,
    extract_phone,
    extract_skills,
    extract_education
)

from utils.predictor import predict_job_role
from utils.scorer import calculate_score


# --------------------------------------------------
# FastAPI Application
# --------------------------------------------------

app = FastAPI(
    title="AI Resume Analyzer API",
    description="AI-powered Resume Analysis and Job Role Prediction API",
    version="1.0.0"
)


# --------------------------------------------------
# CORS
# --------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --------------------------------------------------
# Upload Folder
# --------------------------------------------------

UPLOAD_FOLDER = "/tmp/uploads"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)


# --------------------------------------------------
# Home Route
# --------------------------------------------------

@app.get("/")
def home():

    return {
        "message": "AI Resume Analyzer API is running",
        "status": "success"
    }


# --------------------------------------------------
# Resume Analysis API
# --------------------------------------------------

@app.post("/analyze-resume")
async def analyze_resume(
    file: UploadFile = File(...)
):

    # ----------------------------------------------
    # 1. Check file
    # ----------------------------------------------

    if not file.filename:
        raise HTTPException(
            status_code=400,
            detail="No file uploaded."
        )


    # ----------------------------------------------
    # 2. Check extension
    # ----------------------------------------------

    file_extension = (
        file.filename
        .split(".")[-1]
        .lower()
    )

    allowed_extensions = {
        "pdf",
        "jpg",
        "jpeg",
        "png"
    }

    if file_extension not in allowed_extensions:

        raise HTTPException(
            status_code=400,
            detail=(
                "Invalid file format. "
                "Only PDF, JPG, JPEG and PNG are allowed."
            )
        )


    # ----------------------------------------------
    # 3. Create unique filename
    # ----------------------------------------------

    unique_filename = (
        f"{uuid.uuid4()}.{file_extension}"
    )

    file_path = os.path.join(
        UPLOAD_FOLDER,
        unique_filename
    )


    # ----------------------------------------------
    # 4. Save uploaded file
    # ----------------------------------------------

    try:

        with open(file_path, "wb") as buffer:

            shutil.copyfileobj(
                file.file,
                buffer
            )

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=f"Could not save file: {str(e)}"
        )


    # ----------------------------------------------
    # 5. Extract text
    # ----------------------------------------------

    resume_text = ""

    try:

        if file_extension == "pdf":

            resume_text = extract_text_from_pdf(
                file_path
            )

        else:

            resume_text = extract_text_from_image(
                file_path
            )

    except Exception as e:

        if os.path.exists(file_path):
            os.remove(file_path)

        raise HTTPException(
            status_code=400,
            detail=f"Could not read resume: {str(e)}"
        )


    # ----------------------------------------------
    # 6. Check extracted text
    # ----------------------------------------------

    if not resume_text or not resume_text.strip():

        if os.path.exists(file_path):
            os.remove(file_path)

        raise HTTPException(
            status_code=400,
            detail=(
                "Could not extract text from resume. "
                "Please upload a readable resume."
            )
        )


    # ----------------------------------------------
    # 7. Extract resume information
    # ----------------------------------------------

    try:

        name = extract_name(
            resume_text
        )

        email = extract_email(
            resume_text
        )

        phone = extract_phone(
            resume_text
        )

        skills = extract_skills(
            resume_text
        )

        education = extract_education(
            resume_text
        )

    except Exception as e:

        if os.path.exists(file_path):
            os.remove(file_path)

        raise HTTPException(
            status_code=500,
            detail=f"Information extraction failed: {str(e)}"
        )


    # ----------------------------------------------
    # 8. Calculate resume score
    # ----------------------------------------------

    try:

        score = calculate_score(
            skills,
            education
        )

    except Exception as e:

        score = 0

        print(
            f"Score calculation failed: {e}"
        )


    # ----------------------------------------------
    # 9. Prepare model input
    # ----------------------------------------------

    resume_data = {

        "Skills": ", ".join(skills),

        "Experience (Years)": 2,

        "Education": (
            education[0]
            if education
            else "b.tech"
        ),

        "Certifications": "No",

        "Salary Expectation ($)": 50000,

        "Projects Count": 3,

        "AI Score (0-100)": score
    }


    # ----------------------------------------------
    # 10. Predict job role
    # ----------------------------------------------

    predicted_role = "Not Available"

    try:

        predicted_role = predict_job_role(
            resume_data
        )

    except Exception as e:

        print(
            f"Prediction failed: {e}"
        )


    # ----------------------------------------------
    # 11. Delete uploaded file
    # ----------------------------------------------

    if os.path.exists(file_path):

        os.remove(file_path)


    # ----------------------------------------------
    # 12. Return JSON response
    # ----------------------------------------------

    return {

        "success": True,

        "message": "Resume analyzed successfully",

        "data": {

            "name": name,

            "email": email,

            "phone": phone,

            "education": education,

            "skills": skills,

            "resume_score": score,

            "predicted_job_role": predicted_role

        }
    }