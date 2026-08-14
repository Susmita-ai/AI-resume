import os
import joblib
import pandas as pd

BASE_DIR = os.path.dirname(
    os.path.dirname(os.path.abspath(__file__))
)

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

    df = pd.DataFrame([features])

    encoded_prediction = model.predict(df)[0]

    return label_encoder.inverse_transform(
        [encoded_prediction]
    )[0]
