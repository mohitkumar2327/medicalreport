import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';

const Homepage = () => {
  const [submittedData, setSubmittedData] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = new FormData(e.target);
    const data = Object.fromEntries(form.entries());

    setSubmittedData(data); // Optional if you want to show on the same page
    // ✅ Save to localStorage
    localStorage.setItem("medicalFormData", JSON.stringify(data));
    
    navigate("/submitted");
  };

  return (
    <div className="homepage">
      <div className="home-container">
        <h1>Medical Details Form</h1>

        <form onSubmit={handleSubmit}>
          {/* Basic Info */}
          <label>Name*</label>
          <input type="text" name="name" required />

          <label>Email*</label>
          <input type="email" name="email" required />

          <label>Contact*</label>
          <input type="tel" name="contact" required />

          <label>Gender*</label>
          <div>
            <label><input type="radio" name="gender" value="male" required /> Male</label>
            <label><input type="radio" name="gender" value="female" /> Female</label>
            <label><input type="radio" name="gender" value="other" /> Other</label>
          </div>

          <h3>Past Medical History</h3>
          <label>Chronic Illnesses:</label>
          <textarea name="chronicIllnesses" />

          <label>Hospitalizations:</label>
          <textarea name="hospitalizations" />

          <h3>Surgical History</h3>
          <label>Surgeries:</label>
          <textarea name="surgeries" />

          <h3>Family History</h3>
          <label>Diseases in Family:</label>
          <textarea name="familyDiseases" />

          <h3>Social History</h3>
          <label>Occupation:</label>
          <input type="text" name="occupation" />

          <label>Do you smoke?</label>
          <select name="smoking">
            <option value="">Select</option>
            <option value="no">No</option>
            <option value="yes">Yes</option>
            <option value="former">Former Smoker</option>
          </select>

          <label>Do you drink alcohol?</label>
          <select name="alcohol">
            <option value="">Select</option>
            <option value="no">No</option>
            <option value="occasionally">Occasionally</option>
            <option value="frequently">Frequently</option>
          </select>

          <h3>Medication & Allergies</h3>
          <label>Current Medications:</label>
          <textarea name="medications" />

          <label>Allergies:</label>
          <textarea name="allergies" />

          <h3>Immunization History</h3>
          <label>Vaccines Received:</label>
          <textarea name="vaccinations" />

          <h3>Psychiatric History</h3>
          <label>Mental Health Conditions:</label>
          <textarea name="mentalHealth" />

          <br />
          <button type="submit">Submit</button>
        </form>

        {/* Display Submitted Data */}
        {submittedData && (
          <div className="submitted-data" style={{ marginTop: "30px", padding: "15px", border: "1px solid #ccc" }}>
            <h2>Submitted Details</h2>
            {Object.entries(submittedData).map(([key, value]) => (
              <p key={key}><strong>{key}:</strong> {value || 'N/A'}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Homepage;

