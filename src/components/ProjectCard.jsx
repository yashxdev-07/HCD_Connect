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
  Clock
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
    <article className="academic-card project-academic-card">
      {/* 1. TOP ROW: Status and Verification */}
      <div className="card-top-row">
        {getStatusBadge(project.status)}
        {isDemo ? (
          <span className="badge badge-demo" title="Demonstration Project Record">
            <AlertCircle size={12} className="flex-shrink-0" />
            <span>Demo Data</span>
          </span>
        ) : (
          <span className="badge badge-verified" title="Verified IIITD Department Project">
            <CheckCircle size={12} className="flex-shrink-0" />
            <span>Verified Project</span>
          </span>
        )}
      </div>

      {/* 2. TITLE */}
      <h3 className="card-heading" onClick={() => onSelectProject(project)}>
        {project.title}
      </h3>

      {/* 3. RESEARCH AREA */}
      <div className="card-domain-row">
        <span className="badge badge-category">
          <Layers size={12} className="flex-shrink-0" />
          <span>{project.researchArea}</span>
        </span>
      </div>

      {/* 4. DESCRIPTION (Line Clamped) */}
      <p className="card-description-clamped" title={project.description}>
        {project.description}
      </p>

      {/* 5. METADATA ROWS: Faculty, Contact, Positions, Duration */}
      <div className="card-metadata-list">
        <div className="metadata-row">
          <User size={14} className="metadata-icon" />
          <span className="metadata-label">Supervisor:</span>
          <span className="metadata-value-strong">{project.supervisor}</span>
        </div>

        <div className="metadata-row">
          <Mail size={14} className="metadata-icon" />
          <span className="metadata-label">Contact:</span>
          <a 
            href={`mailto:${project.supervisorEmail}?subject=Inquiry regarding HCD Project: ${encodeURIComponent(project.title)}`}
            className="metadata-email-link"
            title={`Email ${project.supervisor}`}
          >
            {project.supervisorEmail}
          </a>
        </div>

        {project.openRoles && (
          <div className="metadata-row">
            <Users size={14} className="metadata-icon" />
            <span className="metadata-label">Positions:</span>
            <span className="metadata-value">{project.openRoles}</span>
          </div>
        )}

        {project.duration && (
          <div className="metadata-row">
            <Clock size={14} className="metadata-icon" />
            <span className="metadata-label">Duration:</span>
            <span className="metadata-value">{project.duration}</span>
          </div>
        )}
      </div>

      {/* 6. SKILLS: Individual Tags */}
      <div className="card-skills-section">
        <span className="skills-section-label">Required Skills & Tech:</span>
        <div className="skills-chip-list">
          {project.skillsRequired.map((skill, idx) => (
            <span key={idx} className="skill-chip">
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* 7. BOTTOM ACTIONS */}
      <div className="card-bottom-actions">
        {project.status !== 'Closed' && (
          <button
            onClick={() => onOpenCollab(project)}
            className="btn btn-primary btn-sm"
            title="Submit expression of interest to join this project"
          >
            <Send size={13} />
            <span>Collaborate</span>
          </button>
        )}

        <button 
          onClick={() => onSelectProject(project)}
          className="btn btn-secondary btn-sm"
          title="View detailed project brief"
        >
          <span>View Details</span>
          <ArrowRight size={13} />
        </button>
      </div>
    </article>
  );
}
