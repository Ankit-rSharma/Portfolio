import type { FC } from 'react';
import { resumeData } from '../data/resumeData';
import Navbar from '../components/Navbar';
import { useTab } from '../context/TabContext';
import './MinimalDocLayout.css';

const MinimalDocLayout: FC = () => {
  const { activeTab } = useTab();

  return (
    <div className="minimal-theme-wrapper flex-col">
      <Navbar />
      <div className="doc-container">
        <header className="doc-header">
          <h1>{resumeData.personal.name}</h1>
          <p className="doc-title">{resumeData.personal.title}</p>
        </header>

        {activeTab === 'about' && (
          <>
            <section className="doc-section">
              <h2>Professional Summary</h2>
              <p>{resumeData.personal.summary}</p>
            </section>

            <div className="doc-divider"></div>

            <section className="doc-section">
              <h2>Technical Skills & Core Competencies</h2>
              <div className="doc-skills">
                {resumeData.skills.map((skillGroup, index) => (
                  <div key={index} className="skill-row">
                    <span className="skill-category">{skillGroup.category}:</span>
                    <span className="skill-items">{skillGroup.items.join(', ')}</span>
                  </div>
                ))}
              </div>
            </section>

            <div className="doc-divider"></div>

            <section className="doc-section">
              <h2>Professional Experience</h2>
              {resumeData.experience.map(exp => (
                <div key={exp.id} className="doc-exp-block">
                  <div className="doc-exp-header">
                    <h3>{exp.role}</h3>
                    <span className="doc-exp-date">{exp.startDate} &ndash; {exp.endDate}</span>
                  </div>
                  <div className="doc-exp-subheader">
                    <span className="doc-company">{exp.company}</span>
                    <span className="doc-location"> | {exp.location}</span>
                  </div>
                  <ul className="doc-list">
                    {exp.highlights.map((highlight, index) => (
                      <li key={index}>{highlight}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>

            <div className="doc-divider"></div>

            <section className="doc-section">
              <h2>Education & Achievements</h2>
              {resumeData.education.map(edu => (
                <div key={edu.id} className="doc-edu-block">
                  <div className="doc-edu-header">
                    <h3>{edu.degree}</h3>
                    <span className="doc-edu-date">{edu.duration}</span>
                  </div>
                  <div className="doc-edu-subheader">
                    <span>{edu.institution}</span>
                    <span> | {edu.details}</span>
                  </div>
                </div>
              ))}
              <ul className="doc-list mt-4">
                {resumeData.achievements.map((achievement, index) => (
                  <li key={index}>{achievement}</li>
                ))}
              </ul>
            </section>
          </>
        )}

        {activeTab === 'projects' && (
          <section className="doc-section">
            <h2>System Architecture & Key Projects</h2>
            {resumeData.projects.map(proj => (
              <div key={proj.id} className="doc-proj-block">
                <h3>{proj.title}</h3>
                <p>{proj.description}</p>
                {/* @ts-ignore */}
                {proj.link && <a href={proj.link} target="_blank" style={{ fontSize: '0.95rem', fontWeight: 500, marginTop: '0.25rem', display: 'inline-block' }}>View Architecture &rarr;</a>}
              </div>
            ))}
          </section>
        )}

        {activeTab === 'contact' && (
          <section className="doc-section text-center">
            <h2>Contact & Links</h2>
            <div className="doc-meta" style={{ marginTop: '2rem', fontSize: '1.1rem' }}>
              <a href={`mailto:${resumeData.personal.email}`}>{resumeData.personal.email}</a>
              <span>&middot;</span>
              <span>{resumeData.personal.phone}</span>
              <span>&middot;</span>
              <a href={`https://${resumeData.personal.linkedin}`} target="_blank" rel="noreferrer">LinkedIn</a>
              <span>&middot;</span>
              <a href={`https://${resumeData.personal.leetcode}`} target="_blank" rel="noreferrer">LeetCode</a>
            </div>
          </section>
        )}

        <footer className="doc-footer">
          <p>Generated dynamically from raw data architecture.</p>
        </footer>
      </div>
    </div>
  );
};

export default MinimalDocLayout;
