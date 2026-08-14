import joblib
import pandas as pd

# Load trained model
model = joblib.load("model/model.pkl")

def predict_job_role(features):
    """
    features should be a dictionary
    """

    df = pd.DataFrame([features])

    prediction = model.predict(df)

    return prediction[0]