from flask import Flask, request, jsonify
import random
from review_classifier_service import Review_Classifier_Service
from flask_cors import CORS
import os
import numpy as np


app = Flask(__name__)
CORS(app)
cprs=CORS(app,resources={r"/*":{"origins":"http://localhost:3000"}})


@app.route("/predict_review", methods=["POST"])
def predict_review():

    # get audio-file and save
    review_text_json = request.get_json()
    review_text = review_text_json["review"]

    # invoke Music classfier service
    rcs = Review_Classifier_Service()

    # make_prediction
    prediction = rcs.predict_review(review_text)
    # prediction=prediction.tolist()
    print("Prediction is from server", prediction)

    # remove audio-file after predicting
    # os.remove(file_name)
    prediction = prediction.tolist()[0]

    # send back the predicted keyword in json format
    data = {"predictions": prediction}

    return jsonify(data)


if __name__ == "__main__":
    app.run(debug=True)
