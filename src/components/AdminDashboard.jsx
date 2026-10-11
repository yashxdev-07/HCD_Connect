import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CheckCircle, 
  XCircle, 
  Calendar, 
  MapPin, 
  Clock, 
  User, 
  Mail, 
  AlertCircle, 
  Filter, 
  Layers, 
  Briefcase,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';

export default function AdminDashboard({
  submissions,
  onApproveSubmission,
  onRejectSubmission,
  events,
  onToggleEventVerification,
  projects,
  onToggleProjectVerification,
  labs,
  onToggleLabVerification,
  onSwitchTab
}) {
  const [adminSection, setAdminSection] = useState('submissions'); // 'submissions' | 'verify_events' | 'verify_labs' | 'verify_projects'

  const pendingSubmissions = submissions.filter(s => s.status === 'Pending');

  return (
    <div className="admin-dashboard-container">
      {/* Admin Header */}
      <div className="admin-header-banner">
        <div className="admin-header-left">
          <div className="admin-shield-icon">
            <ShieldCheck size={32} className="text-cyan" />
          </div>
          <div>
            <h2>Department Administration Portal</h2>
            <p>Review event proposals, moderate listings, and verify departmental labs & research.</p>
          </div>
        </div>
        <div className="admin-stats-summary">
          <div className="stat-pill">
            <span className="stat-pill-num">{pendingSubmissions.length}</span>
            <span className="stat-pill-label">Pending Reviews</span>
          </div>
          <div className="stat-pill">
            <span className="stat-pill-num">{events.length}</span>
            <span className="stat-pill-label">Published Events</span>
          </div>
          <div className="stat-pill">
            <span className="stat-pill-num">{labs.length}</span>
            <span className="stat-pill-label">Registered Labs</span>
          </div>
        </div>
      </div>

      {/* Admin Subnav */}
      <div className="admin-subnav-tabs">
        <button
          className={`admin-subnav-btn ${adminSection === 'submissions' ? 'active' : ''}`}
          onClick={() => setAdminSection('submissions')}
        >
          <Calendar size={16} />
          <span>Pending Event Submissions ({pendingSubmissions.length})</span>
        </button>
        <button
          className={`admin-subnav-btn ${adminSection === 'verify_events' ? 'active' : ''}`}
          onClick={() => setAdminSection('verify_events')}
        >
          <CheckCircle size={16} />
          <span>Events Audit ({events.length})</span>
        </button>
        <button
          className={`admin-subnav-btn ${adminSection === 'verify_projects' ? 'active' : ''}`}
          onClick={() => setAdminSection('verify_projects')}
        >
          <Briefcase size={16} />
          <span>Projects Audit ({projects.length})</span>
        </button>
        <button
          className={`admin-subnav-btn ${adminSection === 'verify_labs' ? 'active' : ''}`}
          onClick={() => setAdminSection('verify_labs')}
        >
          <Layers size={16} />
          <span>Labs Registry Audit ({labs.length})</span>
        </button>
      </div>

      {/* SECTION 1: Pending Submissions */}
      {adminSection === 'submissions' && (
        <div className="admin-content-area">
          <div className="section-title-row">
            <div>
              <h3>Event Proposals Awaiting Review</h3>
              <p className="section-subtext">
                Approved events are automatically published to the student Events feed.
              </p>
            </div>
          </div>

          {pendingSubmissions.length === 0 ? (
            <div className="empty-state-box">
              <CheckCircle size={44} className="text-emerald" />
              <h4>All caught up!</h4>
              <p>There are no pending submissions in the queue.</p>
              <button 
                onClick={() => onSwitchTab('events')}
                className="btn btn-secondary btn-sm"
                style={{ marginTop: '0.75rem' }}
              >
                Go to Public Events Page
              </button>
            </div>
          ) : (
            <div className="submissions-list">
              {pendingSubmissions.map((sub) => (
                <div key={sub.id} className="submission-card">
                  <div className="sub-header-bar">
                    <span className="badge badge-category">{sub.category}</span>
                    <span className="sub-timestamp">Submitted: {sub.timestamp}</span>
                  </div>

                  <h4 className="sub-title">{sub.title}</h4>
                  <p className="sub-desc">{sub.description}</p>

                  <div className="sub-meta-grid">
                    <div className="sub-meta-item">
                      <Calendar size={14} className="text-muted" />
                      <span>{sub.date}</span>
                    </div>
                    <div className="sub-meta-item">
                      <Clock size={14} className="text-muted" />
                      <span>{sub.time}</span>
                    </div>
                    <div className="sub-meta-item">
                      <MapPin size={14} className="text-muted" />
                      <span>{sub.room}</span>
                    </div>
                    <div className="sub-meta-item">
                      <User size={14} className="text-muted" />
                      <span>By: {sub.submittedBy} ({sub.submitterEmail})</span>
                    </div>
                  </div>

                  <div className="sub-sponsor-note">
                    <strong>Faculty Sponsor: </strong> {sub.facultySponsor || 'None Specified'}
                  </div>

                  <div className="sub-actions">
                    <button
                      onClick={() => onApproveSubmission(sub.id)}
                      className="btn btn-success btn-sm"
                    >
                      <CheckCircle size={15} />
                      <span>Approve & Publish to Events</span>
                    </button>
                    <button
                      onClick={() => onRejectSubmission(sub.id)}
                      className="btn btn-danger btn-sm"
                    >
                      <XCircle size={15} />
                      <span>Reject Proposal</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SECTION 2: Events Audit */}
      {adminSection === 'verify_events' && (
        <div className="admin-content-area">
          <div className="section-title-row">
            <div>
              <h3>Events Verification & Visibility</h3>
              <p className="section-subtext">
                Toggle verification badges for published departmental events.
              </p>
            </div>
          </div>

          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Event Title</th>
                  <th>Category</th>
                  <th>Date & Room</th>
                  <th>Faculty Lead</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {events.map((evt) => (
                  <tr key={evt.id}>
                    <td>
                      <strong>{evt.title}</strong>
                    </td>
                    <td>
                      <span className="badge badge-category">{evt.category}</span>
                    </td>
                    <td>
                      <div>{evt.date}</div>
                      <small className="text-muted">{evt.room}</small>
                    </td>
                    <td>{evt.facultyContact?.name || evt.speaker}</td>
                    <td>
                      {evt.isVerified ? (
                        <span className="badge badge-verified">Verified</span>
                      ) : (
                        <span className="badge badge-demo">Demo Data</span>
                      )}
                    </td>
                    <td>
                      <button
                        onClick={() => onToggleEventVerification(evt.id)}
                        className="btn btn-secondary btn-sm"
                      >
                        {evt.isVerified ? 'Mark as Demo' : 'Mark as Verified'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SECTION 3: Projects Audit */}
      {adminSection === 'verify_projects' && (
        <div className="admin-content-area">
          <div className="section-title-row">
            <div>
              <h3>Research Projects Audit</h3>
              <p className="section-subtext">Manage verification flags for capstone and faculty research.</p>
            </div>
          </div>

          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Project Name</th>
                  <th>Supervisor</th>
                  <th>Research Domain</th>
                  <th>Collab Status</th>
                  <th>Verification</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((proj) => (
                  <tr key={proj.id}>
                    <td><strong>{proj.title}</strong></td>
                    <td>{proj.supervisor}</td>
                    <td>{proj.researchArea}</td>
                    <td>
                      <span className={`badge badge-${proj.status.toLowerCase()}`}>{proj.status}</span>
                    </td>
                    <td>
                      {proj.isVerified ? (
                        <span className="badge badge-verified">Verified</span>
                      ) : (
                        <span className="badge badge-demo">Demo Data</span>
                      )}
                    </td>
                    <td>
                      <button
                        onClick={() => onToggleProjectVerification(proj.id)}
                        className="btn btn-secondary btn-sm"
                      >
                        {proj.isVerified ? 'Mark as Demo' : 'Mark as Verified'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SECTION 4: Labs Registry Audit */}
      {adminSection === 'verify_labs' && (
        <div className="admin-content-area">
          <div className="section-title-row">
            <div>
              <h3>Department Research Labs Audit</h3>
              <p className="section-subtext">Audit official physical spaces vs student incubator proposals.</p>
            </div>
          </div>

          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Lab Code & Name</th>
                  <th>Director</th>
                  <th>Location</th>
                  <th>Equipment Count</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {labs.map((lab) => (
                  <tr key={lab.id}>
                    <td>
                      <div><strong>{lab.name}</strong></div>
                      <small className="lab-code-badge">{lab.code}</small>
                    </td>
                    <td>{lab.director}</td>
                    <td>{lab.room}</td>
                    <td>{lab.equipment.length} Items Listed</td>
                    <td>
                      {lab.isVerified ? (
                        <span className="badge badge-verified">Verified Facility</span>
                      ) : (
                        <span className="badge badge-demo">Demo Data</span>
                      )}
                    </td>
                    <td>
                      <button
                        onClick={() => onToggleLabVerification(lab.id)}
                        className="btn btn-secondary btn-sm"
                      >
                        {lab.isVerified ? 'Mark as Demo' : 'Verify Facility'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
