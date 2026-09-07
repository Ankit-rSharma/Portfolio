import { useState, useEffect, useRef } from 'react';
import type { FC, ReactNode, FormEvent } from 'react';
import { resumeData } from '../data/resumeData';
import Navbar from '../components/Navbar';
import { useTab } from '../context/TabContext';
import './TerminalLayout.css';

const TerminalLayout: FC = () => {
  const { activeTab } = useTab();
  const [history, setHistory] = useState<{ command: string; output: ReactNode }[]>([]);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  const executeCommand = (cmdStr: string) => {
    const cmd = cmdStr.trim().toLowerCase();
    if (!cmd) return;

    let output: ReactNode = null;

    switch (cmd) {
      case 'help':
        output = (
          <div>
            <p>Available commands:</p>
            <ul>
              <li><span className="highlight">whoami</span> - Display personal summary</li>
              <li><span className="highlight">skills</span> - Display technical skills</li>
              <li><span className="highlight">cat experience.md</span> - Display work experience</li>
              <li><span className="highlight">cat education.md</span> - Display education details</li>
              <li><span className="highlight">ls projects/</span> - List key projects</li>
              <li><span className="highlight">cat contact.txt</span> - Display contact details</li>
              <li><span className="highlight">clear</span> - Clear terminal history</li>
            </ul>
          </div>
        );
        break;
      case 'whoami':
        output = (
          <div>
            <p>Name: {resumeData.personal.name}</p>
            <p>Title: {resumeData.personal.title}</p>
            <br />
            <p>{resumeData.personal.summary}</p>
            <br />
            <p className="text-secondary">Run 'skills', 'cat experience.md', or 'cat education.md' for more.</p>
          </div>
        );
        break;
      case 'skills':
        output = (
          <div>
            {resumeData.skills.map((s, i) => (
              <div key={i} className="mb-2">
                <span className="text-accent">[{s.category}]</span>
                <p>{s.items.join(', ')}</p>
              </div>
            ))}
          </div>
        );
        break;
      case 'cat experience.md':
        output = (
          <div>
            {resumeData.experience.map(exp => (
              <div key={exp.id} className="mb-4">
                <h3 className="success">@ {exp.company}</h3>
                <p className="text-secondary">{exp.role} | {exp.startDate} - {exp.endDate}</p>
                <ul className="terminal-list">
                  {exp.highlights.map((h, i) => <li key={i}>{h}</li>)}
                </ul>
              </div>
            ))}
          </div>
        );
        break;
      case 'cat education.md':
        output = (
          <div>
            {resumeData.education.map(edu => (
              <div key={edu.id} className="mb-4">
                <h3 className="success">{edu.degree}</h3>
                <p>{edu.institution} | {edu.duration}</p>
                <p className="text-secondary">{edu.details}</p>
              </div>
            ))}
          </div>
        );
        break;
      case 'ls projects/':
        output = (
          <div>
            {resumeData.projects.map(p => (
              <div key={p.id} className="mb-4">
                <h3 className="success">./{p.title.toLowerCase().replace(/\s+/g, '-')}</h3>
                <p>{p.description}</p>
                {/* @ts-ignore */}
                {p.link && <a href={p.link} target="_blank" className="text-accent underline">View Project &rarr;</a>}
              </div>
            ))}
          </div>
        );
        break;
      case 'cat contact.txt':
        output = (
          <div>
            <p className="mb-2">Contact Information:</p>
            <ul className="terminal-list">
              <li>Email: <a href={`mailto:${resumeData.personal.email}`} className="text-accent">{resumeData.personal.email}</a></li>
              <li>Phone: {resumeData.personal.phone}</li>
              <li>LinkedIn: <a href={`https://${resumeData.personal.linkedin}`} target="_blank" rel="noreferrer" className="text-accent">{resumeData.personal.linkedin}</a></li>
              <li>LeetCode: <a href={`https://${resumeData.personal.leetcode}`} target="_blank" rel="noreferrer" className="text-accent">{resumeData.personal.leetcode}</a></li>
            </ul>
          </div>
        );
        break;
      case 'clear':
        setHistory([]);
        return;
      case './welcome.sh':
        output = (
          <div>
            <p className="success">Welcome to {resumeData.personal.name}'s terminal.</p>
            <p>Type <span className="highlight">'help'</span> to see available commands.</p>
          </div>
        );
        break;
      default:
        output = <p className="error">Command not found: {cmd}. Type 'help' for available commands.</p>;
    }

    setHistory(prev => [...prev, { command: cmdStr, output }]);
  };

  const handleCommand = (e: FormEvent) => {
    e.preventDefault();
    executeCommand(input);
    setInput('');
  };

  useEffect(() => {
    if (activeTab === 'about') executeCommand('whoami');
    else if (activeTab === 'projects') executeCommand('ls projects/');
    else if (activeTab === 'contact') executeCommand('cat contact.txt');
  }, [activeTab]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  return (
    <div className="terminal-theme-wrapper flex-col">
      <Navbar />
      <div className="terminal-container">
        <div className="terminal-header">
          <div className="mac-btns">
            <span className="mac-btn close"></span>
            <span className="mac-btn minimize"></span>
            <span className="mac-btn maximize"></span>
          </div>
          <div className="terminal-title">guest@{resumeData.personal.name.toLowerCase().replace(/\s+/g, '')} ~ %</div>
        </div>
        <div className="terminal-body">
          {history.map((h, i) => (
            <div key={i} className="terminal-history-item">
              <div className="cmd-line">
                <span className="prompt">guest@portfolio ~$</span> {h.command}
              </div>
              <div className="cmd-output">{h.output}</div>
            </div>
          ))}
          <form onSubmit={handleCommand} className="terminal-input-form">
            <span className="prompt">guest@portfolio ~$</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="terminal-input"
              autoFocus
              spellCheck="false"
              autoComplete="off"
            />
          </form>
          <div ref={bottomRef} />
        </div>
      </div>
    </div>
  );
};

export default TerminalLayout;
