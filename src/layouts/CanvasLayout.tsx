import { useState } from 'react';
import { resumeData, type ArchitectureNode } from '../data/resumeData';
import Navbar from '../components/Navbar';
import { useTab } from '../context/TabContext';
import { 
  Network, 
  Activity, 
  Server, 
  Database, 
  Cpu, 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  Radio, 
  Sliders, 
  ChevronRight,
  Mail,
  FolderGit2,
  Briefcase
} from 'lucide-react';
import './CanvasLayout.css';

export const CanvasLayout = () => {
  const { activeTab } = useTab();
  const [selectedNodeId, setSelectedNodeId] = useState<string>('exp-aeo');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [isTrafficSimulating, setIsTrafficSimulating] = useState<boolean>(true);

  const selectedNode = resumeData.architectureNodes.find((n) => n.id === selectedNodeId) || resumeData.architectureNodes[0];

  const categories = [
    { id: 'all', label: 'All Modules' },
    { id: 'service', label: 'Recent Experience' },
    { id: 'gateway', label: 'Past Experience' },
    { id: 'database', label: 'Academic & Foundation' },
    { id: 'observability', label: 'Cloud & Infrastructure' }
  ];

  const filteredNodes = filterCategory === 'all' 
    ? resumeData.architectureNodes 
    : resumeData.architectureNodes.filter((n) => n.category === filterCategory);

  const getNodeColor = (cat: ArchitectureNode['category']) => {
    switch (cat) {
      case 'gateway': return { color: '#22d3ee', borderColor: 'rgba(34, 211, 238, 0.5)', background: 'rgba(8, 51, 68, 0.4)' };
      case 'service': return { color: '#34d399', borderColor: 'rgba(52, 211, 153, 0.5)', background: 'rgba(6, 78, 59, 0.4)' };
      case 'streaming': return { color: '#fbbf24', borderColor: 'rgba(251, 191, 36, 0.5)', background: 'rgba(120, 53, 15, 0.4)' };
      case 'cache': return { color: '#c084fc', borderColor: 'rgba(192, 132, 252, 0.5)', background: 'rgba(88, 28, 135, 0.4)' };
      case 'database': return { color: '#60a5fa', borderColor: 'rgba(96, 165, 250, 0.5)', background: 'rgba(30, 58, 138, 0.4)' };
      case 'observability': return { color: '#fb7185', borderColor: 'rgba(251, 113, 133, 0.5)', background: 'rgba(136, 19, 55, 0.4)' };
      default: return { color: '#cbd5e1', borderColor: 'rgba(148, 163, 184, 0.5)', background: 'rgba(30, 41, 59, 0.4)' };
    }
  };

  const getNodeIcon = (cat: ArchitectureNode['category']) => {
    switch (cat) {
      case 'gateway': return ShieldCheck;
      case 'service': return Cpu;
      case 'streaming': return Radio;
      case 'cache': return Zap;
      case 'database': return Database;
      case 'observability': return Activity;
      default: return Server;
    }
  };

  return (
    <div className="canvas-theme-wrapper">
      <Navbar />
      <div className="canvas-container canvas-grid-pattern">
        <div className="canvas-max-w">
          
          {activeTab === 'about' && (
            <>
              {/* Canvas Header & Filter Controls */}
              <div className="canvas-panel canvas-header-panel">
                <div>
                  <div className="canvas-mono-label text-emerald">
                    <Network className="w-4 h-4" />
                    <span>PROFESSIONAL EXPERIENCE TOPOLOGY</span>
                  </div>
                  <h1 className="canvas-title">
                    Ankit Sharma - Career & Skills Mapping
                  </h1>
                  <p className="canvas-subtitle">
                    A conceptual map of my professional journey, highlighting key roles, foundational education, and core infrastructure skills. Select any node to explore detailed contributions.
                  </p>
                </div>

                <div className="canvas-controls">
                  <button
                    onClick={() => setIsTrafficSimulating(!isTrafficSimulating)}
                    className={`canvas-btn-simulate ${isTrafficSimulating ? 'active' : 'paused'}`}
                  >
                    <span className={`status-dot ${isTrafficSimulating ? 'active' : 'paused'}`} />
                    <span>{isTrafficSimulating ? 'Status: Actively Building' : 'Status: Paused'}</span>
                  </button>

                  <div className="canvas-metrics-badge">
                    <Activity size={14} className="text-cyan" />
                    <span>Years of Experience: <strong>2+ Years</strong></span>
                  </div>
                </div>
              </div>

              {/* Filter Badges Bar */}
              <div className="canvas-filters">
                <span className="canvas-mono-label text-slate-muted" style={{ marginRight: '0.5rem' }}>Subsystem:</span>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setFilterCategory(cat.id)}
                    className={`canvas-filter-btn ${filterCategory === cat.id ? 'active' : 'inactive'}`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Main Interactive Stage */}
              <div className="canvas-main-grid">
                {/* Node Grid Layout */}
                <div>
                  <div className="canvas-panel" style={{ padding: '1.5rem', position: 'relative' }}>
                    <div className="canvas-mono-label text-slate-muted" style={{ borderBottom: '1px solid var(--border-slate)', paddingBottom: '0.75rem', marginBottom: '1.25rem', justifyContent: 'space-between' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Sliders size={14} className="text-emerald" />
                        <span>CAREER & SKILL NODES ({filteredNodes.length})</span>
                      </span>
                      <span>SELECT TO INSPECT</span>
                    </div>

                    <div className="canvas-nodes-container">
                      {filteredNodes.map((node) => {
                        const isSelected = selectedNode.id === node.id;
                        const Icon = getNodeIcon(node.category);
                        const styles = getNodeColor(node.category);

                        return (
                          <div
                            key={node.id}
                            onClick={() => setSelectedNodeId(node.id)}
                            className={`canvas-node-card ${isSelected ? 'selected' : ''}`}
                          >
                            {isTrafficSimulating && (
                              <div style={{ position: 'absolute', top: 0, right: 0, width: '4rem', height: '4rem', overflow: 'hidden', pointerEvents: 'none' }}>
                                <div className="status-dot active" style={{ position: 'absolute', top: '0.75rem', right: '0.75rem' }} />
                              </div>
                            )}

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                              <div className="node-icon-wrapper" style={{ ...styles }}>
                                <Icon size={16} />
                              </div>
                              <span className="node-protocol-badge">
                                {node.protocol.split('/')[0]}
                              </span>
                            </div>

                            <div style={{ marginTop: '0.75rem' }}>
                              <h3 className="node-title">
                                <span>{node.name}</span>
                                <ChevronRight size={14} className="text-slate-muted" style={{ transform: isSelected ? 'translateX(4px)' : 'none', color: isSelected ? '#34d399' : '' }} />
                              </h3>
                              <p className="node-desc">
                                {node.description}
                              </p>
                            </div>

                            <div className="node-metrics">
                              <span className="text-cyan">{node.throughput}</span>
                              <span className="text-emerald">{node.p99Latency}</span>
                            </div>

                            <div className="node-tech-list">
                              {node.tech.slice(0, 3).map((t) => (
                                <span key={t} className="node-tech-tag">
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="data-flow-container">
                      <div className="canvas-mono-label text-slate-muted" style={{ marginBottom: '0.75rem' }}>
                        <Activity size={14} className="text-emerald" />
                        <span>CAREER PROGRESSION TIMELINE:</span>
                      </div>
                      <div className="data-flow-track">
                        <span className="flow-step" style={{ background: 'rgba(30, 58, 138, 0.4)', borderColor: 'rgba(96, 165, 250, 0.3)', color: '#93c5fd' }}>
                          BCA Degree (2022)
                        </span>
                        <ArrowRight size={14} className="text-slate-muted" />
                        <span className="flow-step" style={{ background: 'rgba(30, 58, 138, 0.4)', borderColor: 'rgba(96, 165, 250, 0.3)', color: '#93c5fd' }}>
                          MCA Degree (2024)
                        </span>
                        <ArrowRight size={14} className="text-slate-muted" />
                        <span className="flow-step" style={{ background: 'rgba(8, 51, 68, 0.4)', borderColor: 'rgba(34, 211, 238, 0.3)', color: '#67e8f9' }}>
                          Beepkart (SDE I)
                        </span>
                        <ArrowRight size={14} className="text-slate-muted" />
                        <span className="flow-step" style={{ background: 'rgba(6, 78, 59, 0.4)', borderColor: 'rgba(52, 211, 153, 0.3)', color: '#6ee7b7' }}>
                          AEO (SDE I)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Subsystem Inspector Panel */}
                <div className="canvas-panel canvas-inspector">
                  <div className="inspector-header">
                    <div>
                      <span className="inspector-category-badge">
                        {selectedNode.category.toUpperCase()} NODE
                      </span>
                      <h2 className="inspector-title">{selectedNode.name}</h2>
                      <div className="inspector-context">Context: {selectedNode.implementedAt}</div>
                    </div>

                    <div style={{ textAlign: 'right', fontFamily: 'monospace' }}>
                      <div className="inspector-stat-label">TIMELINE</div>
                      <div className="inspector-stat-val text-cyan">{selectedNode.throughput}</div>
                    </div>
                  </div>

                  <div className="inspector-stats">
                    <div className="inspector-stat-box">
                      <div className="inspector-stat-label">ROLE / DOMAIN</div>
                      <div className="inspector-stat-val">{selectedNode.protocol}</div>
                    </div>
                    <div className="inspector-stat-box">
                      <div className="inspector-stat-label">LOCATION / METRIC</div>
                      <div className="inspector-stat-val text-emerald">{selectedNode.p99Latency}</div>
                    </div>
                  </div>

                  <div className="inspector-desc">
                    {selectedNode.description}
                  </div>

                  <div>
                    <div className="inspector-section-title text-cyan">
                      <Cpu size={14} />
                      <span>KEY CONTRIBUTIONS & ACHIEVEMENTS</span>
                    </div>
                    <div className="inspector-list">
                      {selectedNode.keyDecisions.map((dec, idx) => (
                        <div key={idx} className="inspector-list-item">
                          <span className="text-emerald font-bold" style={{ marginTop: '0.125rem' }}>§</span>
                          <span>{dec}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="inspector-section-title text-amber">
                      <ShieldCheck size={14} />
                      <span>CORE FOCUS AREAS</span>
                    </div>
                    <div className="resilience-tags">
                      {selectedNode.resiliencePatterns.map((pat) => (
                        <span key={pat} className="resilience-tag">
                          {pat}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div style={{ paddingTop: '0.75rem', borderTop: '1px solid var(--border-slate)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div className="inspector-stat-label">TECHNOLOGY STACK:</div>
                    <div className="node-tech-list">
                      {selectedNode.tech.map((t) => (
                        <span key={t} className="node-tech-tag">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'projects' && (
            <div className="canvas-panel">
               <div className="canvas-mono-label text-cyan" style={{ borderBottom: '1px solid var(--border-slate)', paddingBottom: '0.75rem', marginBottom: '1.5rem' }}>
                <FolderGit2 size={16} />
                <span>PROJECT REGISTRY</span>
              </div>
              
              <div className="projects-grid">
                {resumeData.projects.map((proj) => (
                  <div key={proj.id} className="project-card">
                    <h3 className="project-title">
                      <Database size={16} className="text-emerald" />
                      {proj.title}
                    </h3>
                    <p className="project-desc">
                      {proj.description}
                    </p>
                    {/* @ts-ignore */}
                    {proj.link && (
                      <a href={proj.link} target="_blank" className="project-link">
                        Access Repository <ArrowRight size={12} />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="canvas-panel contact-panel">
              <div className="contact-icon-wrapper">
                <Activity size={32} className="text-emerald" />
              </div>
              <h2 className="canvas-title">Establish Connection</h2>
              <p className="canvas-subtitle" style={{ margin: '0.5rem auto 2.5rem' }}>
                Open to discussing system design, distributed architectures, and complex backend engineering challenges.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '24rem', margin: '0 auto' }}>
                <a href={`mailto:${resumeData.personal.email}`} className="contact-link">
                  <Mail size={20} className="text-emerald" />
                  <span style={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>{resumeData.personal.email}</span>
                </a>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <a href={`https://${resumeData.personal.linkedin}`} target="_blank" rel="noreferrer" className="contact-link">
                    <Briefcase size={20} style={{ color: '#0a66c2' }} />
                    <span style={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>LinkedIn</span>
                  </a>
                  <a href={`https://${resumeData.personal.leetcode}`} target="_blank" rel="noreferrer" className="contact-link">
                    <Database size={20} className="text-amber" />
                    <span style={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>LeetCode</span>
                  </a>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default CanvasLayout;
