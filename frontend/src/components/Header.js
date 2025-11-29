import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-section">
          <div className="logo-icon">📊</div>
          <div>
            <h1 className="title">InsightVista</h1>
            <p className="subtitle">Data Visualization Dashboard</p>
          </div>
        </div>
        <div className="header-info">
          <div className="info-badge">
            <span className="badge-label">Real-time Analytics</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
