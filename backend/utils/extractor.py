import re
from datetime import datetime


# ==================================================
# NAME
# ==================================================

def extract_name(text):
    """
    Extract candidate name from the first few lines.
    """

    lines = [
        line.strip()
        for line in text.splitlines()
        if line.strip()
    ]

    ignored = {
        "resume",
        "curriculum vitae",
        "cv",
        "profile",
        "personal details",
        "contact",
        "summary",
        "objective"
    }

    for line in lines[:10]:

        if line.lower() in ignored:
            continue

        if re.fullmatch(
            r"[A-Za-z]+(?:\s+[A-Za-z]+){1,3}",
            line
        ):
            return line

    return "Not Found"


# ==================================================
# EMAIL
# ==================================================

def extract_email(text):
    """
    Extract email address from resume.
    """

    match = re.search(
        r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}",
        text
    )

    return match.group(0) if match else "Not Found"


# ==================================================
# PHONE
# ==================================================

def extract_phone(text):
    """
    Extract phone number from resume.
    """

    match = re.search(
        r"\+?\d[\d\s\-]{8,15}\d",
        text
    )

    return match.group(0) if match else "Not Found"


# ==================================================
# SKILLS
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
    "data science"
]


def extract_skills(text):
    """
    Extract known technical skills from resume.
    """

    text_lower = text.lower()

    found_skills = []

    for skill in SKILL_SET:

        pattern = rf"(?<![a-z0-9]){re.escape(skill.lower())}(?![a-z0-9])"

        if re.search(pattern, text_lower):

            found_skills.append(skill)

    return sorted(
        list(set(found_skills))
    )


# ==================================================
# EDUCATION
# ==================================================

def extract_education(text):
    """
    Extract education keywords/degrees.
    """

    education = [
        "b.tech",
        "btech",
        "m.tech",
        "mtech",
        "bca",
        "mca",
        "b.sc",
        "bsc",
        "m.sc",
        "msc",
        "bachelor",
        "master",
        "phd",
        "diploma"
    ]

    text_lower = text.lower()

    return sorted(
        list(
            set(
                edu
                for edu in education
                if edu in text_lower
            )
        )
    )


# ==================================================
# SECTION HELPER
# ==================================================

def extract_section(
    text,
    section_names,
    stop_sections
):
    """
    Generic helper used to extract a resume section.
    """

    lines = [
        line.strip()
        for line in text.splitlines()
        if line.strip()
    ]

    start = None

    section_names_lower = [
        section.lower()
        for section in section_names
    ]

    stop_sections_lower = [
        section.lower()
        for section in stop_sections
    ]

    for i, line in enumerate(lines):

        if line.lower() in section_names_lower:

            start = i + 1
            break

    if start is None:

        return []

    results = []

    for line in lines[start:]:

        if line.lower() in stop_sections_lower:

            break

        results.append(line)

    return results


# ==================================================
# EXPERIENCE
# ==================================================

def extract_experience(text):
    """
    Extract Experience section.
    """

    return extract_section(

        text,

        [
            "experience",
            "work experience",
            "professional experience",
            "employment",
            "work history"
        ],

        [
            "education",
            "skills",
            "projects",
            "certifications",
            "achievements",
            "languages",
            "interests",
            "references"
        ]
    )


# ==================================================
# PROJECTS
# ==================================================

def extract_projects(text):
    """
    Extract Projects section.
    """

    return extract_section(

        text,

        [
            "projects",
            "academic projects",
            "personal projects",
            "project experience"
        ],

        [
            "education",
            "skills",
            "experience",
            "certifications",
            "achievements",
            "languages",
            "interests",
            "references"
        ]
    )


# ==================================================
# CERTIFICATIONS
# ==================================================

def extract_certifications(text):
    """
    Extract Certifications section.
    """

    return extract_section(

        text,

        [
            "certifications",
            "certificates",
            "professional certifications"
        ],

        [
            "education",
            "skills",
            "experience",
            "projects",
            "achievements",
            "languages",
            "interests",
            "references"
        ]
    )


# ==================================================
# EXPERIENCE YEARS
# ==================================================

def extract_experience_years(text):
    """
    Extract approximate years of professional experience.
    """

    text_lower = text.lower()

    # --------------------------------------------------
    # Direct statements
    # Example:
    # 2 years of experience
    # 3+ years experience
    # 1.5 years of experience
    # --------------------------------------------------

    patterns = [

        r"(\d+(?:\.\d+)?)\s*\+?\s*years?\s+of\s+experience",

        r"(\d+(?:\.\d+)?)\s*\+?\s*years?\s+experience",

        r"experience\s*[:\-]?\s*(\d+(?:\.\d+)?)\s*\+?\s*years?"
    ]

    for pattern in patterns:

        match = re.search(
            pattern,
            text_lower
        )

        if match:

            return float(
                match.group(1)
            )


    # --------------------------------------------------
    # Date-range based calculation
    # Example:
    # June 2023 - Present
    # Jan 2022 - Dec 2024
    # --------------------------------------------------

    month_pattern = (
        r"(jan(?:uary)?|"
        r"feb(?:ruary)?|"
        r"mar(?:ch)?|"
        r"apr(?:il)?|"
        r"may|"
        r"jun(?:e)?|"
        r"jul(?:y)?|"
        r"aug(?:ust)?|"
        r"sep(?:t(?:ember)?)?|"
        r"oct(?:ober)?|"
        r"nov(?:ember)?|"
        r"dec(?:ember)?)"
    )

    date_pattern = re.compile(
        rf"({month_pattern[1:-1]})\s+(\d{{4}})"
        rf"\s*[-–]\s*"
        rf"(present|{month_pattern[1:-1]})"
        rf"(?:\s+(\d{{4}}))?",
        re.IGNORECASE
    )

    matches = date_pattern.findall(text_lower)

    month_map = {

        "jan": 1,
        "january": 1,

        "feb": 2,
        "february": 2,

        "mar": 3,
        "march": 3,

        "apr": 4,
        "april": 4,

        "may": 5,

        "jun": 6,
        "june": 6,

        "jul": 7,
        "july": 7,

        "aug": 8,
        "august": 8,

        "sep": 9,
        "sept": 9,
        "september": 9,

        "oct": 10,
        "october": 10,

        "nov": 11,
        "november": 11,

        "dec": 12,
        "december": 12
    }

    total_months = 0

    current_date = datetime.now()

    for match in matches:

        start_month_name = match[0].lower()
        start_year = int(match[1])

        end_text = match[2].lower()

        start_month = month_map[
            start_month_name
        ]

        if end_text == "present":

            end_month = current_date.month
            end_year = current_date.year

        else:

            end_month = month_map[
                end_text
            ]

            end_year = (
                int(match[3])
                if match[3]
                else start_year
            )

        months = (
            (end_year - start_year) * 12
            + (end_month - start_month)
            + 1
        )

        if months > 0:

            total_months += months

    if total_months > 0:

        return round(
            total_months / 12,
            1
        )

    return 0.0
