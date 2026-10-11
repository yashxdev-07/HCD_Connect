import React from 'react';
import { 
  User, 
  Mail, 
  CheckCircle, 
  AlertCircle, 
  Send, 
  ArrowRight,
  Layers,
  Users,
  Clock,
  Sparkles
} from 'lucide-react';

export default function ProjectCard({ project, onOpenCollab, onSelectProject }) {
  const isDemo = !project.isVerified || project.isDemo;

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Open':
        return <span className="badge badge-open">● Collab Open</span>;
      case 'Limited':
        return <span className="badge badge-limited">▲ Limited Spots</span>;
      case 'Closed':
        return <span className="badge badge-closed">■ Team Full</span>;
      default:
        return <span className="badge">{status}</span>;
    }
  };

  return (
    <div className="card project-card">
      {/* Top Bar */}
      <div className="card-top-bar">
        {getStatusBadge(project.status)}
        {isDemo ? (
          <span className="badge badge-demo" title="Unverified demonstration project">
            <AlertCircle size={12} className="badge-icon-left" />
            <span>Demo Data</span>
          </span>
        ) : (
          <span className="badge badge-verified" title="Verified IIITD HCD Research Project">
            <CheckCircle size={12} className="badge-icon-left" />
            <span>Verified</span>
          </span>
        )}
      </div>

      {/* Project Title */}
      <h3 className="project-title" onClick={() => onSelectProject(project)}>
        {project.title}
      </h3>

      {/* Research Domain Pill */}
      <div className="project-meta-row">
        <Layers size={14} className="text-accent flex-shrink-0" />
        <span className="project-domain-label">{project.researchArea}</span>
      </div>

      {/* Project Description */}
      <p className="card-desc">{project.description}</p>

      {/* Supervisor Details Box */}
      <div className="supervisor-box">
        <div className="supervisor-meta">
          <User size={14} className="text-muted flex-shrink-0" />
          <span className="supervisor-label">Faculty PI:</span>
          <span className="supervisor-name">{project.supervisor}</span>
        </div>
        <div className="supervisor-email-row">
          <a 
            href={`mailto:${project.supervisorEmail}?subject=Inquiry regarding HCD Project: ${encodeURIComponent(project.title)}`}
            className="contact-email-link"
            title={`Email ${project.supervisor}`}
          >
            <Mail size={13} className="flex-shrink-0" />
            <span className="email-address-text">{project.supervisorEmail}</span>
          </a>
        </div>
      </div>

      {/* Required Skills & Technologies */}
      <div className="skills-section">
        <span className="skills-heading">Skills & Technologies:</span>
        <div className="skills-tags">
          {project.skillsRequired.map((skill, idx) => (
            <span key={idx} className="skill-chip">
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Dedicated Roles Callout Banner (Separated from buttons to prevent text crushing) */}
      <div className="project-roles-callout">
        <Users size={14} className="text-accent flex-shrink-0" />
        <div className="roles-callout-text">
          <span className="roles-label">Positions:</span> {project.openRoles}
        </div>
      </div>

      {/* Card Footer: Timeline on Left, Actions on Right */}
      <div className="card-footer">
        <div className="project-timeline-meta" title={project.duration}>
          <Clock size={13} className="text-muted flex-shrink-0" />
          <span className="timeline-text">{project.duration.split('(')[0].trim()}</span>
        </div>

        <div className="card-actions">
          {project.status !== 'Closed' && (
            <button
              onClick={() => onOpenCollab(project)}
              className="btn btn-accent btn-sm"
              title="Submit expression of interest to join this research team"
            >
              <Send size={13} />
              <span>Collaborate</span>
            </button>
          )}

          <button 
            onClick={() => onSelectProject(project)}
            className="btn btn-secondary btn-sm"
          >
            <span>Details</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}
