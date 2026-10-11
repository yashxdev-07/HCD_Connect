import React, { useState } from 'react';
import { 
  X, 
  Send, 
  CheckCircle, 
  User, 
  Mail, 
  Hash, 
  Link as LinkIcon, 
  FileText,
  Briefcase
} from 'lucide-react';

export default function CollabModal({ isOpen, onClose, project, currentUser }) {
  const [formData, setFormData] = useState({
    studentName: currentUser ? currentUser.name : '',
    studentEmail: currentUser ? currentUser.email : '',
    rollNo: currentUser ? currentUser.rollNo : '',
    year: 'B.Tech CS+D 3rd Year',
    portfolioUrl: '',
    statement: '',
    hoursPerWeek: '10-12 hrs/week',
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen || !project) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content collab-modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2>Apply to Collaborate</h2>
            <p className="modal-subtitle">
              Express interest in joining <strong>{project.title}</strong> under {project.supervisor}.
            </p>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        {submitted ? (
          <div className="submission-success-banner">
            <CheckCircle size={44} className="text-emerald" />
            <h3>Application Dispatched!</h3>
            <p>
              Your profile and statement have been forwarded to <strong>{project.supervisorEmail}</strong>. 
              The project leads will review your portfolio and reach out regarding interview slots.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="collab-form">
            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label">Student Name *</label>
                <div className="input-with-icon">
                  <User size={15} className="input-icon" />
                  <input
                    type="text"
                    name="studentName"
                    required
                    value={formData.studentName}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">IIITD Email *</label>
                <div className="input-with-icon">
                  <Mail size={15} className="input-icon" />
                  <input
                    type="email"
                    name="studentEmail"
                    required
                    value={formData.studentEmail}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
              </div>
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label">Roll Number *</label>
                <div className="input-with-icon">
                  <Hash size={15} className="input-icon" />
                  <input
                    type="text"
                    name="rollNo"
                    required
                    placeholder="e.g. 2024HCD504"
                    value={formData.rollNo}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Current Cohort / Standing</label>
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="B.Tech CS+D 2nd Year">B.Tech CS+D 2nd Year</option>
                  <option value="B.Tech CS+D 3rd Year">B.Tech CS+D 3rd Year</option>
                  <option value="B.Tech CS+D 4th Year">B.Tech CS+D 4th Year</option>
                  <option value="M.Des 1st Year">M.Des 1st Year</option>
                  <option value="M.Des 2nd Year">M.Des 2nd Year</option>
                  <option value="Ph.D. Scholar">Ph.D. Scholar</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Portfolio / GitHub / Figma Link</label>
              <div className="input-with-icon">
                <LinkIcon size={15} className="input-icon" />
                <input
                  type="url"
                  name="portfolioUrl"
                  placeholder="https://behance.net/yourprofile or https://github.com/..."
                  value={formData.portfolioUrl}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Why do you want to work on this project? *</label>
              <textarea
                name="statement"
                rows="3"
                required
                placeholder="Highlight your experience with relevant tools (e.g. Unity, React, physical hardware), past coursework, and motivation..."
                value={formData.statement}
                onChange={handleChange}
                className="form-textarea"
              />
            </div>

            <div className="form-modal-actions">
              <button type="button" onClick={onClose} className="btn btn-secondary">
                Cancel
              </button>
              <button type="submit" className="btn btn-accent">
                <Send size={14} />
                <span>Submit Expression of Interest</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
