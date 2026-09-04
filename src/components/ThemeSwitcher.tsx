import React from 'react';
import { useTheme } from '../context/ThemeContext';
import type { ThemeLayout } from '../context/ThemeContext';
import { Terminal, Network, FileText } from 'lucide-react';
import './ThemeSwitcher.css';

const ThemeSwitcher: React.FC = () => {
  const { layoutTheme, setLayoutTheme } = useTheme();

  const themes: { id: ThemeLayout; icon: React.ReactNode; label: string }[] = [
    { id: 'terminal', icon: <Terminal size={18} />, label: 'Terminal' },
    { id: 'canvas', icon: <Network size={18} />, label: 'Architecture' },
    { id: 'minimal', icon: <FileText size={18} />, label: 'Minimal Doc' },
  ];

  return (
    <div className="theme-switcher-container">
      <div className="theme-switcher">
        {themes.map((theme) => (
          <button
            key={theme.id}
            className={`theme-btn ${layoutTheme === theme.id ? 'active' : ''}`}
            onClick={() => setLayoutTheme(theme.id)}
            title={`Switch to ${theme.label} view`}
          >
            {theme.icon}
            <span className="theme-label">{theme.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeSwitcher;
