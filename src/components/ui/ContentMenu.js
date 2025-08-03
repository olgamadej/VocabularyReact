import React from "react";
import "./ContentMenu.scss";

const ContentMenu = () => {
  return (
    <div className="content-menu-container">
      <div className="content-menu-left">
        <div className="content-top-left hero-card">
          <h3>Begin Your Journey</h3>
          <p>
            Book a lesson at your convenience and take the first step towards
            fluency.
          </p>
        </div>
        <a href="#games-section" className="content-top-middle hero-card">
          <h3>Learn by Playing</h3>
          <p>Pick a topic and sharpen your vocabulary with my quick games.</p>
        </a>
        <div className="content-top-right hero-card">
          <h3>Vocabulary Search</h3>
          <p>Find expressions easily with my interactive search tool.</p>
        </div>
      </div>
      <div className="content-menu-right">
        <div className="content-bottom-left hero-card">
          <h3>Improve Your Grammar</h3>
          <p>Get tips and guidance on grammar rules and usage.</p>
        </div>
        <div className="content-bottom-right hero-card">
          <h3>Support My Quest</h3>
          <p>
            Help me keep this project alive and growing — every contribution
            counts.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContentMenu;
