from flask import Flask, jsonify
from flask_cors import CORS  # Import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/api/blood-test-report', methods=['GET'])
def get_blood_test_report():
    data = {
        "bloodTestData": [
            {"name": "Glucose", "values": [0.739597, 0.121786, 0.452539, 0.136609, 0.176737]},
            {"name": "Cholesterol", "values": [0.650198, 0.023058, 0.116135, 0.015605, 0.752220]},
            {"name": "Hemoglobin", "values": [0.713631, 0.944893, 0.544560, 0.419957, 0.971779]},
            {"name": "Platelets", "values": [0.868491, 0.905372, 0.400640, 0.191487, 0.785286]},
            {"name": "White Blood Cells (WBC)", "values": [0.687433, 0.507711, 0.294538, 0.081168, 0.443880]},
            {"name": "Red Blood Cells (RBC)", "values": [0.529895, 0.403033, 0.382021, 0.166214, 0.439851]},
            {"name": "Heart Rate", "values": [0.939485, 0.666368, 0.431704, 0.225756, 0.841412]}
        ],
        "diseases": [
            {"name": "Healthy", "riskLevel": "low"},
            {"name": "Diabetes", "riskLevel": "high"},
            {"name": "Thalasse", "riskLevel": "medium"},
            {"name": "Anemia", "riskLevel": "medium"},
            {"name": "Thalasse", "riskLevel": "medium"}
        ]
    }
    return jsonify(data)
if __name__ == '__main__':
    app.run(debug=True)