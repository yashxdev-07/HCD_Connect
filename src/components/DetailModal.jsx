import React from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Mail, 
  CheckCircle, 
  AlertCircle, 
  ShieldCheck, 
  Users, 
  Cpu, 
  Tag, 
  BookmarkCheck,
  Send
} from 'lucide-react';

export default function DetailModal({ item, type, onClose, onRsvpToggle, onOpenCollab }) {
  if (!item) return null;

  const isDemo = !item.isVerified || item.isDemo;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content detail-modal-box" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div className="detail-header-meta">
            <div className="detail-tags-row">
              {type === 'event' && <span className="badge badge-category">{item.category}</span>}
              {type === 'project' && <span className="badge badge-category">{item.researchArea}</span>}
              {type === 'lab' && <span className="lab-code-badge">{item.code}</span>}

              {isDemo ? (
                <span className="badge badge-demo">
                  <AlertCircle size={12} />
                  Demo Record - Pending Verification
                </span>
              ) : (
                <span className="badge badge-verified">
                  <ShieldCheck size={12} />
                  Verified Department Listing
                </span>
              )}
            </div>
            <h2 className="detail-main-title">{item.title || item.name}</h2>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        {/* Modal Body Based on Type */}
        <div className="detail-modal-body">
          {/* EVENT TYPE */}
          {type === 'event' && (
            <>
              <div className="detail-highlights-grid">
                <div className="highlight-cell">
                  <Calendar size={18} className="text-accent" />
                  <div>
                    <span className="highlight-label">Date</span>
                    <span className="highlight-value">{item.date}</span>
                  </div>
                </div>
                <div className="highlight-cell">
                  <Clock size={18} className="text-accent" />
                  <div>
                    <span className="highlight-label">Time</span>
                    <span className="highlight-value">{item.time}</span>
                  </div>
                </div>
                <div className="highlight-cell">
                  <MapPin size={18} className="text-accent" />
                  <div>
                    <span className="highlight-label">Campus Room</span>
                    <span className="highlight-value">{item.room}</span>
                  </div>
                </div>
                <div className="highlight-cell">
                  <Users size={18} className="text-accent" />
                  <div>
                    <span className="highlight-label">Audience Capacity</span>
                    <span className="highlight-value">{item.attendeesCount} / {item.capacity} Registered</span>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h4 className="detail-section-title">Session Overview & Description</h4>
                <p className="detail-text">{item.description}</p>
              </div>

              <div className="detail-section">
                <h4 className="detail-section-title">Session Host & Key Speaker</h4>
                <p className="detail-text speaker-highlight">{item.speaker}</p>
              </div>

              <div className="detail-section">
                <h4 className="detail-section-title">Faculty & TA Contacts</h4>
                <div className="contacts-detail-grid">
                  <div className="contact-card">
                    <User size={16} className="text-muted" />
                    <div>
                      <span className="contact-title">{item.facultyContact.name}</span>
                      <span className="contact-sub">{item.facultyContact.role}</span>
                      <a href={`mailto:${item.facultyContact.email}`} className="contact-link">
                        <Mail size={13} /> {item.facultyContact.email}
                      </a>
                    </div>
                  </div>

                  {item.taContact && (
                    <div className="contact-card">
                      <User size={16} className="text-muted" />
                      <div>
                        <span className="contact-title">{item.taContact.name}</span>
                        <span className="contact-sub">{item.taContact.role}</span>
                        <a href={`mailto:${item.taContact.email}`} className="contact-link">
                          <Mail size={13} /> {item.taContact.email}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="detail-modal-footer">
                <button
                  onClick={() => onRsvpToggle(item.id)}
                  className={`btn ${item.isRsvp ? 'btn-success' : 'btn-primary'}`}
                >
                  {item.isRsvp ? (
                    <>
                      <BookmarkCheck size={16} />
                      <span>RSVP Confirmed</span>
                    </>
                  ) : (
                    <span>Register / RSVP for this Session</span>
                  )}
                </button>
              </div>
            </>
          )}

          {/* PROJECT TYPE */}
          {type === 'project' && (
            <>
              <div className="detail-highlights-grid">
                <div className="highlight-cell">
                  <User size={18} className="text-accent" />
                  <div>
                    <span className="highlight-label">Faculty Supervisor</span>
                    <span className="highlight-value">{item.supervisor}</span>
                  </div>
                </div>
                <div className="highlight-cell">
                  <MapPin size={18} className="text-accent" />
                  <div>
                    <span className="highlight-label">Lab Affiliation</span>
                    <span className="highlight-value">{item.labAffiliation || 'HCD Department'}</span>
                  </div>
                </div>
                <div className="highlight-cell">
                  <Users size={18} className="text-accent" />
                  <div>
                    <span className="highlight-label">Open Positions</span>
                    <span className="highlight-value">{item.openRoles}</span>
                  </div>
                </div>
                <div className="highlight-cell">
                  <BookmarkCheck size={18} className="text-accent" />
                  <div>
                    <span className="highlight-label">Funding & Term</span>
                    <span className="highlight-value">{item.funding} ({item.duration})</span>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h4 className="detail-section-title">Project Mission & Abstract</h4>
                <p className="detail-text">{item.description}</p>
              </div>

              <div className="detail-section">
                <h4 className="detail-section-title">Prerequisites & Technical Stack</h4>
                <div className="skills-tags">
                  {item.skillsRequired.map((skill, idx) => (
                    <span key={idx} className="skill-chip">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="detail-modal-footer">
                {item.status !== 'Closed' && (
                  <button
                    onClick={() => {
                      onClose();
                      onOpenCollab(item);
                    }}
                    className="btn btn-accent"
                  >
                    <Send size={15} />
                    <span>Apply for Collaboration Slot</span>
                  </button>
                )}
                <a
                  href={`mailto:${item.supervisorEmail}`}
                  className="btn btn-secondary"
                >
                  <Mail size={15} />
                  <span>Email Principal Investigator</span>
                </a>
              </div>
            </>
          )}

          {/* LAB TYPE */}
          {type === 'lab' && (
            <>
              <div className="detail-highlights-grid">
                <div className="highlight-cell">
                  <MapPin size={18} className="text-accent" />
                  <div>
                    <span className="highlight-label">Location</span>
                    <span className="highlight-value">{item.room}</span>
                  </div>
                </div>
                <div className="highlight-cell">
                  <User size={18} className="text-accent" />
                  <div>
                    <span className="highlight-label">Lab Director</span>
                    <span className="highlight-value">{item.director}</span>
                  </div>
                </div>
                <div className="highlight-cell">
                  <Users size={18} className="text-accent" />
                  <div>
                    <span className="highlight-label">Active Team</span>
                    <span className="highlight-value">{item.studentCount} Ph.D. / M.Des Scholars</span>
                  </div>
                </div>
                <div className="highlight-cell">
                  <Cpu size={18} className="text-accent" />
                  <div>
                    <span className="highlight-label">Running Projects</span>
                    <span className="highlight-value">{item.activeProjects} Research Tracks</span>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h4 className="detail-section-title">Research Theme & Vision</h4>
                <p className="theme-text-box">{item.theme}</p>
                <p className="detail-text" style={{ marginTop: '0.75rem' }}>{item.description}</p>
              </div>

              <div className="detail-section">
                <h4 className="detail-section-title">Laboratory Infrastructure & Equipment</h4>
                <ul className="equipment-full-list">
                  {item.equipment.map((eq, idx) => (
                    <li key={idx} className="equipment-item">
                      <Cpu size={14} className="text-accent" />
                      <span>{eq}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="detail-section">
                <h4 className="detail-section-title">Official Department Registry Note</h4>
                <p className="verification-note-text">{item.verificationNote}</p>
              </div>

              <div className="detail-modal-footer">
                <a
                  href={`mailto:${item.email}?subject=Inquiry regarding HCD Lab: ${encodeURIComponent(item.name)}`}
                  className="btn btn-primary"
                >
                  <Mail size={15} />
                  <span>Contact Lab Coordinator ({item.email})</span>
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
