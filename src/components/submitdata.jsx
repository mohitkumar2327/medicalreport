// SubmittedData.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './submiteddata.css';

const SubmittedData = () => {
  const [formData, setFormData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem('medicalFormData');
    if (stored) {
      setFormData(JSON.parse(stored));
    }
  }, []);

  const formatLabel = (key) =>
    key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());

  const handleClear = () => {
    localStorage.removeItem('medicalFormData');
    setFormData(null);
    navigate('/homepage');
  };

  if (!formData) {
    return (
      <div className="submitted-wrapper">
        <h2>No data found.</h2>
        <button className="button-dark" onClick={() => navigate('/homepage')}>
          Back to Form
        </button>
      </div>
    );
  }

  return (
    <div className="submitted-wrapper">
      <h2>Submitted Medical Details</h2>
      {Object.entries(formData).map(([key, value]) => (
        <div key={key} className="submitted-row">
          <strong>{formatLabel(key)}:</strong>
          <div className="submitted-value">{value || 'N/A'}</div>
        </div>
      ))}

      <div className="button-group">
        <button className="button-dark" onClick={() => navigate('/homepage')}>
          Edit
        </button>
        <button className="button-dark" onClick={handleClear}>
          Clear All
        </button>
      </div>
    </div>
  );
};

export default SubmittedData;
