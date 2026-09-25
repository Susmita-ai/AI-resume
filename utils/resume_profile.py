def build_resume_profile(
    name,
    email,
    phone,
    skills,
    education,
    experience,
    experience_years,
    projects,
    certifications,
    score,
    predicted_role
):
    """
    Create one structured profile for the analyzed resume.
    """

    return {
        "name": name,
        "email": email,
        "phone": phone,

        "skills": skills,
        "education": education,

        "experience": experience,
        "experience_years": experience_years,

        "projects": projects,

        "certifications": certifications,

        "resume_score": score,

        "predicted_job_role": predicted_role
    }