import React from "react";
import './MainTitle.scss';
import logo from "../../img/logo.png";

const MainTitle = () => {
  return (
    <div className="center">
      <div className="logo-container">        
        <div className="logo-first-line">
          <h2>&nbsp;&nbsp;&nbsp;&nbsp;Welcome to </h2>
          <a className="logo" href="#"> <img src={logo} alt="Alex's Language Corner"></img> </a>
        </div>
      </div>
      <div className="sub-tagline">
        <h3>Learn&nbsp; French or English&nbsp; with Ease</h3>
      </div>
      <div className="sub-about">
      <button className="free-materials-button">
          Explore Free Materials
      </button>
      <p className="content-menu-text">
      « Le langage est la peinture de nos pensées. » <br />
“Language is the painting of our thoughts.”<br/>
<br/>
<span>Molière</span> 
      </p>
      </div>
    </div>
  );
};

export default MainTitle;
