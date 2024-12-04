import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 

// Importing images
import LogisticRegressionConfusionMatrix from "../assets/LogisticRegression_confusion_matrix.png";
import RandomForestConfusionMatrix from "../assets/Randomforest_confusion_matrix.png";
import ConfusionMatrixFraudDetection from "../assets/confusion_matrix_fraud_detection.png";
import CorrelationHeatmap from "../assets/correlation_heatmap.png";
import CreditCardFraudPieChart from "../assets/credit_card_fraud_pie_chart_matplotlib.png";
import EmploymentStatusCB from "../assets/employment_status_CB_fraud_distribution.png";
import EmploymentStatusCC from "../assets/employment_status_CC_fraud_distribution.png";
import EmploymentStatusCD from "../assets/employment_status_CD_fraud_distribution.png";
import EmploymentStatusCE from "../assets/employment_status_CE_fraud_distribution.png";
import EmploymentStatusCF from "../assets/employment_status_CF_fraud_distribution.png";
import EmploymentStatusCG from "../assets/employment_status_CG_fraud_distribution.png";
import FeatureImportanceTop10 from "../assets/feature_importance_top10.png";
import FraudRateByEmploymentStatus from "../assets/fraud_rate_by_employment_status.png";
import FraudVsNonFraudByIncomeGroup from "../assets/fraud_vs_non_fraud_by_income_group.png";
import FraudVsNonFraudByCreditRiskScore from "../assets/fraud_vs_nonfraud_by_credit_risk_score.png";
import IncomeGroupFraudDistribution from "../assets/income_group_fraud_distribution.png";
import ModelPerformanceComparison from "../assets/model_performance_comparison.png";
import NameEmailSimilarityDistribution from "../assets/name_email_similarity_distribution.png";
import NumberOfCustomersByAge from "../assets/number_of_customers_by_age.png";
import XGBoostConfusionMatrix from "../assets/xgboost_confusion_matrix.png";

function HomePage() {
  const [popupImage, setPopupImage] = useState(null);
  const navigate = useNavigate(); // Hook to navigate

  // Grouping images by categories
  const categories = [
    {
      title: "Model Performance",
      images: [
        {
          name: LogisticRegressionConfusionMatrix,
          title: "Logistic Regression Confusion Matrix",
        },
        {
          name: RandomForestConfusionMatrix,
          title: "Random Forest Confusion Matrix",
        },
        {
          name: ConfusionMatrixFraudDetection,
          title: "Fraud Detection Confusion Matrix",
        },
        { name: XGBoostConfusionMatrix, title: "XGBoost Confusion Matrix" },
        {
          name: ModelPerformanceComparison,
          title: "Model Performance Comparison",
        },
      ],
    },
    {
      title: "Fraud Detection Visuals",
      images: [
        { name: CreditCardFraudPieChart, title: "Credit Card Fraud Pie Chart" },
        {
          name: EmploymentStatusCB,
          title: "Fraud Distribution by Employment Status (CB)",
        },
        {
          name: EmploymentStatusCC,
          title: "Fraud Distribution by Employment Status (CC)",
        },
        {
          name: EmploymentStatusCD,
          title: "Fraud Distribution by Employment Status (CD)",
        },
        {
          name: EmploymentStatusCE,
          title: "Fraud Distribution by Employment Status (CE)",
        },
        {
          name: EmploymentStatusCF,
          title: "Fraud Distribution by Employment Status (CF)",
        },
        {
          name: EmploymentStatusCG,
          title: "Fraud Distribution by Employment Status (CG)",
        },
        {
          name: IncomeGroupFraudDistribution,
          title: "Income Group Fraud Distribution",
        },
        {
          name: FraudRateByEmploymentStatus,
          title: "Fraud Rate by Employment Status",
        },
        {
          name: FraudVsNonFraudByIncomeGroup,
          title: "Fraud vs Non-Fraud by Income Group",
        },
        {
          name: FraudVsNonFraudByCreditRiskScore,
          title: "Fraud vs Non-Fraud by Credit Risk Score",
        },
      ],
    },
    {
      title: "Feature Importance & Correlation",
      images: [
        { name: FeatureImportanceTop10, title: "Top 10 Feature Importances" },
        { name: CorrelationHeatmap, title: "Correlation Heatmap" },
      ],
    },
    {
      title: "Other Visuals",
      images: [
        {
          name: NameEmailSimilarityDistribution,
          title: "Name-Email Similarity Distribution",
        },
        { name: NumberOfCustomersByAge, title: "Number of Customers by Age" },
      ],
    },
  ];

  const openPopup = (image) => {
    setPopupImage(image);
  };

  const closePopup = () => {
    setPopupImage(null);
  };

  // Logout function with routing
  const handleLogout = () => {
    console.log("Logging out...");
    // Navigate to the login page after logout
    navigate("/");
  };

  // Navigate to fraud prediction page
  const goToFraudPredictionPage = () => {
    navigate("/predict-fraud");
  };

  return (
    <div className="home-container">
      {/* Logout Button */}
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>

      <h1>Fraud Detection Visualizations</h1>

      {/* Button to go to the fraud prediction form page */}
      <button
        className="fraud-prediction-button"
        onClick={goToFraudPredictionPage}
      >
        Go to Fraud Prediction Form
      </button>

      {/* Loop through categories and display each category with its respective images */}
      {categories.map((category, index) => (
        <div key={index} className="category-section">
          <h2 className="category-title">{category.title}</h2>
          <div className="image-grid">
            {category.images.map((image, idx) => (
              <div
                key={idx}
                className="image-card"
                onClick={() => openPopup(image)}
              >
                <img src={image.name} alt={image.title} className="image" />
                <div className="image-overlay">
                  <div className="image-title">{image.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Popup Modal */}
      {popupImage && (
        <div className="popup" onClick={closePopup}>
          <div className="popup-content">
            <button className="close-popup" onClick={closePopup}>
              X
            </button>
            <img
              src={popupImage.name}
              alt={popupImage.title}
              className="popup-image"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
