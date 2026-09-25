import os
import shutil
import tempfile
import uuid

from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from utils.parser import (
    extract_text_from_pdf
)

from utils.extractor import (
    extract_name,
    extract_email,
    extract_phone,
    extract_skills,
    extract_education,
    extract_experience,
    extract_projects,
    extract_certifications,
    extract_experience_years
)

from utils.predictor import predict_job_role
from utils.scorer import calculate_score
from utils.resume_profile import build_resume_profile
from utils.ats_analyzer import analyze_ats


# ==================================================
# FastAPI Application
# ==================================================

app = FastAPI(
    title="AI Resume Analyzer API",
    description="AI-powered Resume Analysis, ATS Analysis and Job Role Prediction API",
    version="2.1.0"
)


# ==================================================
# CORS
# ==================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ==================================================
# Upload Folder
# ==================================================

UPLOAD_FOLDER = os.path.join(
    tempfile.gettempdir(),
    "resume_uploads"
)

os.makedirs(
    UPLOAD_FOLDER,
    exist_ok=True
)


# ==================================================
# Temporary Resume Storage
# ==================================================
# Local development only.
# Later we can replace this with a database/session system.

RESUME_SESSIONS = {}


# ==================================================
# ATS Request Model
# ==================================================

class ATSRequest(BaseModel):
    job_description: str
    resume_id: str


# ==================================================
# Home Route
# ==================================================

@app.get("/")
def home():

    return {
        "message": "AI Resume Analyzer API is running",
        "status": "success",
        "version": "2.1.0"
    }


# ==================================================
# Resume Analysis API
# ==================================================

@app.post("/analyze-resume")
async def analyze_resume(
    file: UploadFile = File(...)
):

    file_path = None

    try:

        # --------------------------------------------------
        # 1. Check file
        # --------------------------------------------------

        if not file.filename:

            raise HTTPException(
                status_code=400,
                detail="No file uploaded."
            )


        # --------------------------------------------------
        # 2. Check extension
        # --------------------------------------------------

        file_extension = (
            file.filename
            .split(".")[-1]
            .lower()
        )

        allowed_extensions = {"pdf"}

        if file_extension not in allowed_extensions:

            raise HTTPException(
                status_code=400,
                detail=(
                    "Invalid file format. "
                    "Only text-based PDF files are supported."
                )
            )


        # --------------------------------------------------
        # 3. Create unique filename
        # --------------------------------------------------

        unique_filename = (
            f"{uuid.uuid4()}.{file_extension}"
        )

        file_path = os.path.join(
            UPLOAD_FOLDER,
            unique_filename
        )


        # --------------------------------------------------
        # 4. Save uploaded file
        # --------------------------------------------------

        try:

            with open(
                file_path,
                "wb"
            ) as buffer:

                shutil.copyfileobj(
                    file.file,
                    buffer
                )

        except Exception as e:

            raise HTTPException(
                status_code=500,
                detail=f"Could not save file: {str(e)}"
            )


        # --------------------------------------------------
        # 5. Extract text
        # --------------------------------------------------

        resume_text = ""

        try:

            resume_text = extract_text_from_pdf(file_path)

        except Exception as e:

            raise HTTPException(
                status_code=400,
                detail=f"Could not read resume: {str(e)}"
            )


        # --------------------------------------------------
        # 6. Check extracted text
        # --------------------------------------------------

        if not resume_text or not resume_text.strip():

            raise HTTPException(
                status_code=400,
                detail=(
                    "Could not extract text from resume. "
                    "Please upload a readable resume."
                )
            )


        # --------------------------------------------------
        # 7. Extract resume information
        # --------------------------------------------------

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

            experience = extract_experience(
                resume_text
            )

            experience_years = extract_experience_years(
                resume_text
            )

            projects = extract_projects(
                resume_text
            )

            certifications = extract_certifications(
                resume_text
            )

        except Exception as e:

            raise HTTPException(
                status_code=500,
                detail=(
                    f"Information extraction failed: {str(e)}"
                )
            )


        # --------------------------------------------------
        # 8. Calculate resume score
        # --------------------------------------------------

        try:

            score = calculate_score(
                skills,
                education
            )

        except Exception as e:

            print(
                f"Score calculation failed: {e}"
            )

            score = 0


        # --------------------------------------------------
        # 9. Prepare model input
        # --------------------------------------------------

        resume_data = {

            "Skills": ", ".join(
                skills
            ),

            "Experience (Years)": (
                experience_years
            ),

            "Education": (
                education[0]
                if education
                else "Unknown"
            ),

            "Certifications": (
                ", ".join(certifications)
                if certifications
                else "No"
            ),

            # These are not extracted yet.
            # Keep neutral values instead of fake values.
            "Salary Expectation ($)": 0,

            "Projects Count": (
                len(projects)
            ),

            "AI Score (0-100)": (
                score
            )
        }


        # --------------------------------------------------
        # 10. Predict job role
        # --------------------------------------------------

        predicted_role = "Not Available"

        try:

            predicted_role = predict_job_role(
                resume_data
            )

        except Exception as e:

            print(
                f"Prediction failed: {e}"
            )


        # --------------------------------------------------
        # 11. Store resume for ATS analysis
        # --------------------------------------------------

        resume_id = str(uuid.uuid4())
        RESUME_SESSIONS[resume_id] = {
            "text": resume_text,
            "skills": skills,
        }


        # --------------------------------------------------
        # 12. Build resume profile
        # --------------------------------------------------

        resume_profile = build_resume_profile(

            name=name,

            email=email,

            phone=phone,

            skills=skills,

            education=education,

            experience=experience,

            experience_years=experience_years,

            projects=projects,

            certifications=certifications,

            score=score,

            predicted_role=predicted_role
        )


        # --------------------------------------------------
        # 13. Return response
        # --------------------------------------------------

        return {

            "success": True,

            "message": (
                "Resume analyzed successfully"
            ),

            "data": {
                **resume_profile,
                "resume_id": resume_id,
            }
        }


    except HTTPException:

        raise


    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=(
                f"Unexpected server error: {str(e)}"
            )
        )


    finally:

        # --------------------------------------------------
        # 14. Delete temporary uploaded file
        # --------------------------------------------------

        if (
            file_path
            and os.path.exists(file_path)
        ):

            try:

                os.remove(file_path)

            except Exception as e:

                print(
                    f"Could not remove temporary file: {e}"
                )


# ==================================================
# ATS Analysis API
# ==================================================

@app.post("/ats-analysis")
def ats_analysis(
    request: ATSRequest
):

    # --------------------------------------------------
    # 1. Check resume
    # --------------------------------------------------

    resume = RESUME_SESSIONS.get(request.resume_id)

    if not resume:

        raise HTTPException(
            status_code=400,
            detail=(
                "Resume session not found. Please analyze the resume again."
            )
        )


    # --------------------------------------------------
    # 2. Check job description
    # --------------------------------------------------

    if not request.job_description.strip():

        raise HTTPException(
            status_code=400,
            detail=(
                "Job description cannot be empty."
            )
        )


    # --------------------------------------------------
    # 3. Run ATS analysis
    # --------------------------------------------------

    try:

        result = analyze_ats(

            resume_text=resume["text"],

            resume_skills=resume["skills"],

            job_description=(
                request.job_description
            )
        )

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=(
                f"ATS analysis failed: {str(e)}"
            )
        )


    # --------------------------------------------------
    # 4. Return ATS result
    # --------------------------------------------------

    return {

        "success": True,

        "message": (
            "ATS analysis completed successfully"
        ),

        "data": result
    }