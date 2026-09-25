from utils.extractor import (
    extract_certifications,
    extract_experience,
    extract_projects,
)


SAMPLE_TEXT = """
John Doe

EXPERIENCE
Software Engineer at ABC Company
Developed Python applications

PROJECTS
AI Resume Analyzer
Built a resume analysis system using Python

CERTIFICATIONS
AWS Cloud Practitioner

EDUCATION
B.Tech Computer Science
"""


def test_extract_resume_sections():
    assert extract_experience(SAMPLE_TEXT) == [
        "Software Engineer at ABC Company",
        "Developed Python applications",
    ]
    assert extract_projects(SAMPLE_TEXT) == [
        "AI Resume Analyzer",
        "Built a resume analysis system using Python",
    ]
    assert extract_certifications(SAMPLE_TEXT) == ["AWS Cloud Practitioner"]
