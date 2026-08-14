import re


def extract_name(text):
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

    return list(set(
        skill
        for skill in SKILL_SET
        if skill in text
    ))


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

    return list(set(
        edu
        for edu in education
        if edu in text
    ))
