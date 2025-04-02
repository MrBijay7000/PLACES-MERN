// src/shared/components/ErrorPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./ErrorPage.css"; // Ensure you have the corresponding CSS file

const ErrorPage = () => {
  return (
    <div className="error-container">
      <h1 className="error-title">Oops! Something Went Wrong.</h1>
      <p className="error-message">
        We couldn't find the page you're looking for.
      </p>
      <Link to="/" className="back-home-link">
        Go Back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
