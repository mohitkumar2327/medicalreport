import React from 'react';
import { jsPDF } from 'jspdf';

const DownloadPDFButton = () => {
  const handleDownload = () => {
    const data = JSON.parse(localStorage.getItem("medicalFormData"));

    if (!data) {
      alert("No form data found.");
      return;
    }

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Medical Report", 20, 20);

    let y = 30;
    Object.entries(data).forEach(([key, value]) => {
      doc.setFontSize(12);
      doc.text(`${key}: ${value || "N/A"}`, 20, y);
      y += 10;
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    });

    doc.save("medical-report.pdf");
  };

  return (
    <button
      onClick={handleDownload}
      className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
      📥 Download PDF
    </button>
  );
};

export default DownloadPDFButton;
