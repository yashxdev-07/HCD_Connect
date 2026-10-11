import React from 'react';
import { 
  Building2, 
  MapPin, 
  User, 
  Mail, 
  Cpu, 
  CheckCircle, 
  AlertCircle, 
  ArrowRight, 
  ShieldCheck, 
  Users 
} from 'lucide-react';

export default function LabCard({ lab, onSelectLab }) {
  const isDemo = !lab.isVerified || lab.isDemo;

  return (
    <div className="card lab-card">
      {/* Top Bar with Lab Code and Status */}
      <div className="card-top-bar">
        <span className="lab-code-badge">{lab.code}</span>
        {isDemo ? (
          <span className="badge badge-demo" title={lab.verificationNote}>
            <AlertCircle size={12} className="badge-icon-left" />
            <span>Demo Data</span>
          </span>
        ) : (
          <span className="badge badge-verified" title={lab.verificationNote}>
            <ShieldCheck size={12} className="badge-icon-left" />
            <span>Verified Facility</span>
          </span>
        )}
      </div>

      {/* Lab Name */}
      <h3 className="lab-title" onClick={() => onSelectLab(lab)}>
        {lab.name}
      </h3>

      {/* Campus Location */}
      <div className="lab-location-row">
        <MapPin size={14} className="text-accent flex-shrink-0" />
        <span className="room-name">{lab.room}</span>
      </div>

      {/* Director & Role */}
      <div className="lab-director-box">
        <User size={14} className="text-muted flex-shrink-0" />
        <div className="director-text">
          <div className="director-primary">
            <span className="director-label">Director:</span>
            <span className="director-name">{lab.director}</span>
          </div>
          <span className="director-role-sub">{lab.directorRole}</span>
        </div>
      </div>

      {/* Research Description */}
      <p className="card-desc">{lab.description}</p>

      {/* Equipment Highlights */}
      <div className="lab-equipment-section">
        <div className="equipment-header">
          <Cpu size={14} className="text-accent flex-shrink-0" />
          <span>Key Equipment & Infrastructure:</span>
        </div>
        <div className="equipment-chips">
          {lab.equipment.slice(0, 3).map((item, idx) => (
            <span key={idx} className="equipment-chip">
              {item}
            </span>
          ))}
          {lab.equipment.length > 3 && (
            <span className="equipment-chip equipment-more">
              +{lab.equipment.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="card-footer">
        <div className="lab-stats">
          <Users size={13} className="text-muted flex-shrink-0" />
          <span>{lab.studentCount} Active Researchers</span>
        </div>

        <button 
          onClick={() => onSelectLab(lab)} 
          className="btn btn-secondary btn-sm"
        >
          <span>View Profile</span>
          <ArrowRight size={13} />
        </button>
      </div>
    </div>
  );
}
