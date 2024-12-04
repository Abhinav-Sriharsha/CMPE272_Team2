from flask import Flask, request, jsonify
import xgboost as xgb
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing

# Load the pre-trained XGBoost model at startup
model = xgb.Booster()
model.load_model('Website/server/xgboost_fraud_detection_model.model')

@app.route('/predict-fraud', methods=['POST'])
def predict_fraud():
    try:
        # Get JSON data from request
        data = request.get_json()

        required_features = [
            'income_group', 'name_email_similarity_group', 'prev_address_months_count', 
            'current_address_months_count', 'customer_age', 'days_since_request', 
            'intended_balcon_amount', 'zip_count_4w', 'velocity_6h', 'velocity_24h', 
            'velocity_4w', 'bank_branch_count_8w', 'date_of_birth_distinct_emails_4w', 
            'credit_risk_score', 'email_is_free', 'phone_home_valid', 'phone_mobile_valid', 
            'bank_months_count', 'has_other_cards', 'proposed_credit_limit', 'foreign_request', 
            'session_length_in_minutes', 'keep_alive_session', 'device_distinct_emails_8w', 
            'device_fraud_count', 'month', 'payment_type_AB', 'payment_type_AC', 'payment_type_AD', 
            'payment_type_AE', 'employment_status_CB', 'employment_status_CC', 'employment_status_CD', 
            'employment_status_CE', 'employment_status_CF', 'employment_status_CG', 'housing_status_BB', 
            'housing_status_BC', 'housing_status_BD', 'housing_status_BE', 'housing_status_BF', 
            'housing_status_BG', 'source_TELEAPP', 'device_os_macintosh', 'device_os_other', 'device_os_windows', 
            'device_os_x11'
        ]

        # Check for missing features
        missing_features = [feature for feature in required_features if feature not in data]
        if missing_features:
            return jsonify({
                'error': 'Missing required input fields', 
                'missing_features': missing_features
            }), 400

        # Prepare input data as a list of numerical values
        input_data = []
        for feature in required_features:
            try:
                value = float(data[feature]) if '.' in str(data[feature]) else int(data[feature])
                input_data.append(value)
            except ValueError:
                return jsonify({
                    'error': f'Invalid value for feature "{feature}". Expected a numerical value.'
                }), 400

        # Convert input data to DMatrix for prediction
        dmatrix = xgb.DMatrix([input_data], feature_names=required_features)

        # Make predictions using the preloaded model
        prediction = model.predict(dmatrix)

        # Format the prediction result
        result = {
            'fraud_probability': float(prediction[0]),
            'fraud_prediction': 1 if prediction[0] > 0.5 else 0  # Threshold at 0.5
        }

        return jsonify({
            'success': True,
            'predictions': result
        })

    except Exception as e:
        return jsonify({
            'error': 'Failed to make prediction',
            'details': str(e)
        }), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=3000)