import type { FC } from 'react';
import { resumeData } from '../data/resumeData';
import './CanvasLayout.css';
import { Briefcase, GraduationCap, Code2, Server, Award } from 'lucide-react';

const CanvasLayout: FC = () => {
  return (
    <div className="canvas-container">
      <div className="canvas-header">
        <h1>{resumeData.personal.name}</h1>
        <p>{resumeData.personal.title}</p>
        <div className="canvas-links">
          <a href={`mailto:${resumeData.personal.email}`}>{resumeData.personal.email}</a>
          <a href={`https://${resumeData.personal.linkedin}`} target="_blank" rel="noreferrer">LinkedIn</a>
          <a href={`https://${resumeData.personal.leetcode}`} target="_blank" rel="noreferrer">LeetCode</a>
        </div>
      </div>

      <div className="canvas-grid">
        {/* Experience Node */}
        <div className="canvas-node glass-panel span-2">
          <div className="node-header">
            <Briefcase className="node-icon" />
            <h2>Experience Architecture</h2>
          </div>
          <div className="node-body">
            {resumeData.experience.map(exp => (
              <div key={exp.id} className="timeline-item">
                <div className="timeline-dot"></div>
                <h3>{exp.company}</h3>
                <span className="badge">{exp.role}</span>
                <span className="date">{exp.startDate} - {exp.endDate}</span>
                <ul>
                  {exp.highlights.slice(0, 3).map((h, i) => <li key={i}>{h}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Node */}
        <div className="canvas-node glass-panel">
          <div className="node-header">
            <Server className="node-icon" />
            <h2>Tech Stack</h2>
          </div>
          <div className="node-body">
            {resumeData.skills.map((s, i) => (
              <div key={i} className="skill-group">
                <h4>{s.category}</h4>
                <div className="tags">
                  {s.items.map((item, j) => (
                    <span key={j} className="tag">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education Node */}
        <div className="canvas-node glass-panel">
          <div className="node-header">
            <GraduationCap className="node-icon" />
            <h2>Education</h2>
          </div>
          <div className="node-body">
            {resumeData.education.map(edu => (
              <div key={edu.id} className="edu-item">
                <h3>{edu.degree}</h3>
                <p>{edu.institution}</p>
                <p className="subtext">{edu.details}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Projects Node */}
        <div className="canvas-node glass-panel">
          <div className="node-header">
            <Code2 className="node-icon" />
            <h2>Core Projects</h2>
          </div>
          <div className="node-body">
            {resumeData.projects.map(p => (
              <div key={p.id} className="project-item">
                <h3>{p.title}</h3>
                <p>{p.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements Node */}
        <div className="canvas-node glass-panel span-2">
          <div className="node-header">
            <Award className="node-icon" />
            <h2>Milestones & Achievements</h2>
          </div>
          <div className="node-body achievements">
            {resumeData.achievements.map((a, i) => (
              <div key={i} className="achievement-item">
                <div className="check-circle">✓</div>
                <p>{a}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
      
      {/* SVG for connecting lines - abstract representation */}
      <svg className="canvas-lines" xmlns="http://www.w3.org/2000/svg">
        <path d="M 300 150 Q 500 150 500 300 T 700 300" stroke="var(--border-color)" strokeWidth="2" fill="none" strokeDasharray="5,5" />
      </svg>
    </div>
  );
};

export default CanvasLayout;
