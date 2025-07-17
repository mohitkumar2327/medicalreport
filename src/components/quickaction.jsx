// src/components/QuickActions.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './quickaction.css';

const actions = [
  {
    title: "📝 Fill New Medical Form",
    desc: "Submit your latest medical information.",
    route: "/homepage",
  },
  {
    title: "📄 View Submitted Details",
    desc: "Check and verify your submitted data.",
    route: "/submitted",
  },
  {
    title: "📤 Share with Doctor",
    desc: "Generate a report for your physician.",
    route: "#", // placeholder
  },
  {
    title: "🧾 Download Report (Coming Soon)",
    desc: "Export your medical history as PDF.",
    route: "#",
  },
];

const Quickactions = () => {
  const navigate = useNavigate();

  return (
    <div className="quick-actions">
      <div className="quick-actions-grid">
        {actions.map((action, idx) => (
          <div
            key={idx}
            className="quick-action-card"
            onClick={() => action.route !== "#" && navigate(action.route)}
          >
            <h3>{action.title}</h3>
            <p>{action.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Quickactions;