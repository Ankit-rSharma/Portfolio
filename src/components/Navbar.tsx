import React from 'react';
import { useTab, type TabState } from '../context/TabContext';
import ThemeSwitcher from './ThemeSwitcher';
import './Navbar.css';

const Navbar: React.FC = () => {
  const { activeTab, setActiveTab } = useTab();

  const tabs: { id: TabState; label: string }[] = [
    { id: 'about', label: 'About Me' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <nav className="global-navbar">
      <div className="navbar-container">
        <div className="navbar-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`navbar-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="navbar-actions">
          <ThemeSwitcher />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
