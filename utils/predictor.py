import os
import joblib
import pandas as pd

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

MODEL_PATH = os.path.join(
    BASE_DIR,
    "ai_resume",
    "model",
    "model.pkl"
)

ENCODER_PATH = os.path.join(
    BASE_DIR,
    "ai_resume",
    "model",
    "label_encoder.pkl"
)

model = joblib.load(MODEL_PATH)
label_encoder = joblib.load(ENCODER_PATH)


def predict_job_role(features):
    """
    features: dict with keys matching the columns used in train_model.py:
        Skills, Experience (Years), Education, Certifications,
        Salary Expectation ($), Projects Count, AI Score (0-100)
    """

    df = pd.DataFrame([features])

    encoded_prediction = model.predict(df)[0]

    job_role = label_encoder.inverse_transform(
        [encoded_prediction]
    )[0]

    return job_role