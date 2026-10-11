import React from 'react';
import { 
  MapPin, 
  User, 
  Cpu, 
  CheckCircle, 
  AlertCircle, 
  ArrowRight, 
  ShieldCheck, 
  Users,
  Compass
} from 'lucide-react';

export default function LabCard({ lab, onSelectLab }) {
  const isDemo = !lab.isVerified || lab.isDemo;

  return (
    <article className="academic-card lab-academic-card">
      {/* 1. TOP ROW: Lab Code & Verification Status */}
      <div className="card-top-row">
        <span className="lab-code-pill">{lab.code}</span>
        {isDemo ? (
          <span className="badge badge-demo" title="Unverified laboratory incubator / demo entry">
            <AlertCircle size={12} className="flex-shrink-0" />
            <span>Status to confirm</span>
          </span>
        ) : (
          <span className="badge badge-verified" title="Officially verified departmental facility">
            <ShieldCheck size={12} className="flex-shrink-0" />
            <span>Verified Facility</span>
          </span>
        )}
      </div>

      {/* 2. LAB NAME */}
      <h3 className="card-heading" onClick={() => onSelectLab(lab)}>
        {lab.name}
      </h3>

      {/* 3. RESEARCH FOCUS / THEME */}
      <div className="card-domain-row">
        <span className="badge badge-category">
          <Compass size={12} className="flex-shrink-0" />
          <span>{lab.theme}</span>
        </span>
      </div>

      {/* 4. DESCRIPTION (Line Clamped) */}
      <p className="card-description-clamped" title={lab.description}>
        {lab.description}
      </p>

      {/* 5. METADATA ROWS: Room & Faculty Director */}
      <div className="card-metadata-list">
        <div className="metadata-row">
          <MapPin size={14} className="metadata-icon" />
          <span className="metadata-label">Location:</span>
          <span className="metadata-value">{lab.room}</span>
        </div>

        <div className="metadata-row">
          <User size={14} className="metadata-icon" />
          <span className="metadata-label">Director:</span>
          <span className="metadata-value-strong">{lab.director}</span>
          <span className="metadata-sub-text">({lab.directorRole})</span>
        </div>
      </div>

      {/* 6. EQUIPMENT CHIPS */}
      <div className="card-skills-section">
        <span className="skills-section-label">
          <Cpu size={12} className="meta-inline-icon" />
          Equipment & Tools:
        </span>
        <div className="skills-chip-list">
          {lab.equipment.slice(0, 3).map((item, idx) => (
            <span key={idx} className="skill-chip">
              {item}
            </span>
          ))}
          {lab.equipment.length > 3 && (
            <span className="skill-chip skill-chip-more">
              +{lab.equipment.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* 7. BOTTOM ACTIONS */}
      <div className="card-bottom-actions">
        <div className="lab-team-meta">
          <Users size={14} className="text-light flex-shrink-0" />
          <span className="team-count-text">{lab.studentCount} Researchers</span>
        </div>

        <button 
          onClick={() => onSelectLab(lab)} 
          className="btn btn-secondary btn-sm"
          title="View comprehensive laboratory profile"
        >
          <span>View Details</span>
          <ArrowRight size={13} />
        </button>
      </div>
    </article>
  );
}
