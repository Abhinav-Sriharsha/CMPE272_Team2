import React, { useState } from "react";
import axios from "axios";
import "./Fraud.css";

const FraudPredictionForm = () => {
  const [formData, setFormData] = useState({
    income_group: "",
    name_email_similarity_group: "",
    prev_address_months_count: "",
    current_address_months_count: "",
    customer_age: "",
    days_since_request: "",
    intended_balcon_amount: "",
    zip_count_4w: "",
    velocity_6h: "",
    velocity_24h: "",
    velocity_4w: "",
    bank_branch_count_8w: "",
    date_of_birth_distinct_emails_4w: "",
    credit_risk_score: "",
    email_is_free: "",
    phone_home_valid: "",
    phone_mobile_valid: "",
    bank_months_count: "",
    has_other_cards: "",
    proposed_credit_limit: "",
    foreign_request: "",
    session_length_in_minutes: "",
    keep_alive_session: "",
    device_distinct_emails_8w: "",
    device_fraud_count: "",
    month: "",
    payment_type_AB: "",
    payment_type_AC: "",
    payment_type_AD: "",
    payment_type_AE: "",
    employment_status_CB: "",
    employment_status_CC: "",
    employment_status_CD: "",
    employment_status_CE: "",
    employment_status_CF: "",
    employment_status_CG: "",
    housing_status_BB: "",
    housing_status_BC: "",
    housing_status_BD: "",
    housing_status_BE: "",
    housing_status_BF: "",
    housing_status_BG: "",
    source_TELEAPP: "",
    device_os_macintosh: "",
    device_os_other: "",
    device_os_windows: "",
    device_os_x11: "",
  });

  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState("");

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message
    setPrediction(null); // Reset previous prediction

    try {
      const response = await axios.post(
        "http://localhost:3000/predict-fraud",
        formData
      );
      if (response.data.success) {
        setPrediction(response.data.predictions);
      }
    } catch (err) {
      setError("Failed to make prediction. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="predict-fraud-container">
      <h2>Fraud Prediction Form</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          <div key={key} className="form-group">
            <label htmlFor={key}>{key.replace(/_/g, " ").toUpperCase()}:</label>
            <input
              type="number"
              name={key}
              id={key}
              value={formData[key]}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
        ))}
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>

      {prediction && (
        <div className="prediction-results">
          <h3>Prediction Results:</h3>
          <p>Fraud Probability: {prediction.fraud_probability}</p>
          <p>
            Fraud Prediction:{" "}
            {prediction.fraud_prediction === 1 ? "Fraud" : "No Fraud"}
          </p>
        </div>
      )}

      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default FraudPredictionForm;
