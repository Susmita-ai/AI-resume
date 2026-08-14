import re


def extract_name(text):
    """
    Simple name extraction without spaCy.
    Looks at the first few non-empty lines of the resume.
    """

    lines = [
        line.strip()
        for line in text.splitlines()
        if line.strip()
    ]

    for line in lines[:10]:

        # Ignore common resume headings
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

        if line.lower() in ignored:
            continue

        # Name should generally contain only letters/spaces
        if re.fullmatch(
            r"[A-Za-z]+(?:\s+[A-Za-z]+){1,3}",
            line
        ):
            return line

    return "Not Found"


def extract_email(text):
    match = re.search(
        r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}",
        text
    )

    return match.group(0) if match else "Not Found"


def extract_phone(text):
    match = re.search(
        r"\+?\d[\d\s\-]{8,15}\d",
        text
    )

    return match.group(0) if match else "Not Found"


SKILL_SET = [
    "python",
    "java",
    "c",
    "c++",
    "sql",
    "machine learning",
    "deep learning",
    "tensorflow",
    "keras",
    "pandas",
    "numpy",
    "matplotlib",
    "seaborn",
    "streamlit",
    "flask",
    "django",
    "git",
    "github"
]


def extract_skills(text):

    text = text.lower()

    skills = [
        skill
        for skill in SKILL_SET
        if skill in text
    ]

    return list(set(skills))


def extract_education(text):

    education = [
        "b.tech",
        "btech",
        "m.tech",
        "mtech",
        "bca",
        "mca",
        "b.sc",
        "m.sc",
        "bachelor",
        "master",
        "phd",
        "diploma"
    ]

    text = text.lower()

    found = [
        edu
        for edu in education
        if edu in text
    ]

    return list(set(found))