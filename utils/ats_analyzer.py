import re


# ==================================================
# Common Technical Skills
# ==================================================

SKILL_SET = [
    "python",
    "java",
    "c",
    "c++",
    "sql",
    "machine learning",
    "deep learning",
    "artificial intelligence",
    "tensorflow",
    "keras",
    "pytorch",
    "pandas",
    "numpy",
    "matplotlib",
    "seaborn",
    "scikit-learn",
    "streamlit",
    "flask",
    "django",
    "fastapi",
    "git",
    "github",
    "docker",
    "aws",
    "azure",
    "gcp",
    "html",
    "css",
    "javascript",
    "react",
    "node.js",
    "mongodb",
    "postgresql",
    "mysql",
    "nlp",
    "computer vision",
    "opencv",
    "data analysis",
    "data science",
    "power bi",
    "tableau",
    "excel",
    "spark",
    "hadoop",
    "mlflow"
]


# ==================================================
# Extract Skills From Text
# ==================================================

def extract_jd_skills(text):
    """
    Extract technical skills from a job description.
    """

    text = text.lower()

    found_skills = []

    for skill in SKILL_SET:

        pattern = rf"(?<![a-z0-9]){re.escape(skill.lower())}(?![a-z0-9])"

        if re.search(pattern, text):

            found_skills.append(skill)

    return sorted(
        list(set(found_skills))
    )


# ==================================================
# Extract Important Keywords
# ==================================================

def extract_keywords(text):
    """
    Extract useful words from job description.
    """

    words = re.findall(
        r"\b[a-zA-Z][a-zA-Z0-9+#.-]{2,}\b",
        text.lower()
    )

    stop_words = {
        "the",
        "and",
        "for",
        "with",
        "you",
        "your",
        "are",
        "our",
        "this",
        "that",
        "will",
        "have",
        "has",
        "from",
        "into",
        "about",
        "work",
        "working",
        "years",
        "year",
        "job",
        "role",
        "candidate",
        "experience"
    }

    keywords = [
        word
        for word in words
        if word not in stop_words
    ]

    return sorted(
        list(set(keywords))
    )


# ==================================================
# Skill Matching
# ==================================================

def calculate_skill_match(
    resume_skills,
    job_skills
):
    """
    Compare resume skills with job skills.
    """

    resume_skills_lower = {
        skill.lower()
        for skill in resume_skills
    }

    job_skills_lower = {
        skill.lower()
        for skill in job_skills
    }

    matched = sorted(
        resume_skills_lower.intersection(
            job_skills_lower
        )
    )

    missing = sorted(
        job_skills_lower.difference(
            resume_skills_lower
        )
    )

    if not job_skills_lower:

        match_percentage = 0.0

    else:

        match_percentage = (
            len(matched)
            / len(job_skills_lower)
        ) * 100

    return {
        "matched_skills": matched,
        "missing_skills": missing,
        "skill_match_percentage": round(
            match_percentage,
            2
        )
    }


# ==================================================
# Keyword Matching
# ==================================================

def calculate_keyword_match(
    resume_text,
    job_description
):
    """
    Compare important job-description keywords
    with the resume text.
    """

    resume_text_lower = resume_text.lower()

    job_keywords = extract_keywords(
        job_description
    )

    matched_keywords = []
    missing_keywords = []

    for keyword in job_keywords:

        if keyword in resume_text_lower:

            matched_keywords.append(
                keyword
            )

        else:

            missing_keywords.append(
                keyword
            )

    if not job_keywords:

        keyword_percentage = 0.0

    else:

        keyword_percentage = (
            len(matched_keywords)
            / len(job_keywords)
        ) * 100

    return {
        "matched_keywords": matched_keywords,
        "missing_keywords": missing_keywords,
        "keyword_match_percentage": round(
            keyword_percentage,
            2
        )
    }


# ==================================================
# ATS Score
# ==================================================

def calculate_ats_score(
    skill_match_percentage,
    keyword_match_percentage
):
    """
    Calculate initial ATS score.

    Skills = 60%
    Keywords = 40%
    """

    score = (
        skill_match_percentage * 0.60
        +
        keyword_match_percentage * 0.40
    )

    return round(
        min(score, 100),
        2
    )


# ==================================================
# Complete ATS Analysis
# ==================================================

def analyze_ats(
    resume_text,
    resume_skills,
    job_description
):
    """
    Perform complete ATS analysis.
    """

    job_skills = extract_jd_skills(
        job_description
    )

    skill_result = calculate_skill_match(
        resume_skills,
        job_skills
    )

    keyword_result = calculate_keyword_match(
        resume_text,
        job_description
    )

    ats_score = calculate_ats_score(
        skill_result[
            "skill_match_percentage"
        ],
        keyword_result[
            "keyword_match_percentage"
        ]
    )

    return {

        "ats_score": ats_score,

        "job_skills": job_skills,

        "matched_skills": skill_result[
            "matched_skills"
        ],

        "missing_skills": skill_result[
            "missing_skills"
        ],

        "skill_match_percentage": skill_result[
            "skill_match_percentage"
        ],

        "matched_keywords": keyword_result[
            "matched_keywords"
        ],

        "missing_keywords": keyword_result[
            "missing_keywords"
        ],

        "keyword_match_percentage": keyword_result[
            "keyword_match_percentage"
        ]
    }