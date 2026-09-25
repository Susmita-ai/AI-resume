import os
import tempfile

from app import UPLOAD_FOLDER
from backend.utils.ats_analyzer import analyze_ats


def test_ats_analysis_reports_matches_and_gaps():
    result = analyze_ats(
        "Python developer with machine learning and SQL experience.",
        ["python", "machine learning", "sql"],
        "Required skills: Python, Machine Learning, SQL, Docker.",
    )

    assert result["matched_skills"] == ["machine learning", "python", "sql"]
    assert result["missing_skills"] == ["docker"]
    assert result["skill_match_percentage"] == 75.0
    assert 0 <= result["ats_score"] <= 100


def test_upload_folder_uses_system_temp_directory():
    expected = os.path.join(tempfile.gettempdir(), "resume_uploads")
    assert os.path.normpath(UPLOAD_FOLDER) == os.path.normpath(expected)
