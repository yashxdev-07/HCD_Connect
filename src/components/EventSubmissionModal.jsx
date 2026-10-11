import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  MapPin, 
  Clock, 
  User, 
  Mail, 
  FileText, 
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export default function EventSubmissionModal({ isOpen, onClose, onSubmitProposal, currentUser }) {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Workshop',
    date: '',
    time: '03:00 PM - 05:00 PM IST',
    room: 'Design Studio - Academic Building',
    description: '',
    submittedBy: currentUser ? currentUser.name : '',
    submitterEmail: currentUser ? currentUser.email : '',
    facultySponsor: 'Dr. Aman Parnami',
    capacity: 40,
  });

  const [submittedStatus, setSubmittedStatus] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.date || !formData.description) return;

    const newSubmission = {
      id: `sub-${Date.now()}`,
      title: formData.title,
      category: formData.category,
      date: formData.date,
      time: formData.time,
      room: formData.room,
      capacity: Number(formData.capacity) || 30,
      description: formData.description,
      submittedBy: formData.submittedBy || 'Anonymous Student',
      submitterEmail: formData.submitterEmail || 'student@iiitd.ac.in',
      facultySponsor: formData.facultySponsor,
      status: 'Pending',
      timestamp: new Date().toLocaleString(),
    };

    onSubmitProposal(newSubmission);
    setSubmittedStatus(true);
    setTimeout(() => {
      setSubmittedStatus(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content submission-modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2>Propose an Academic Event</h2>
            <p className="modal-subtitle">
              Submit a workshop, guest speaker session, or reading circle for HCD department approval.
            </p>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        {submittedStatus ? (
          <div className="submission-success-banner">
            <CheckCircle size={44} className="text-emerald" />
            <h3>Proposal Submitted Successfully!</h3>
            <p>
              Your proposal has been routed to the HCD Department Review Queue. The faculty coordinator will review your room booking and description.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="submission-form">
            <div className="form-group">
              <label className="form-label">Event Title *</label>
              <input
                type="text"
                name="title"
                required
                placeholder="e.g. Generative AI Tools in UI/UX Research"
                value={formData.title}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label">Event Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="Workshop">Hands-on Workshop</option>
                  <option value="Guest Lecture">Guest Lecture</option>
                  <option value="Seminar">Research Seminar</option>
                  <option value="Exhibition">Design Critique / Exhibition</option>
                  <option value="Hackathon">Design Sprint / Hackathon</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Proposed Date *</label>
                <input
                  type="date"
                  name="date"
                  required
                  value={formData.date}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label">Time Slot</label>
                <input
                  type="text"
                  name="time"
                  placeholder="e.g. 02:00 PM - 04:00 PM IST"
                  value={formData.time}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Target Campus Venue / Room</label>
                <input
                  type="text"
                  name="room"
                  placeholder="e.g. R&D A-301, Academic B-105, Online"
                  value={formData.room}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Full Description & Agenda *</label>
              <textarea
                name="description"
                rows="3"
                required
                placeholder="Detail the target audience, prerequisites, speaker background, and session learning outcomes..."
                value={formData.description}
                onChange={handleChange}
                className="form-textarea"
              />
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label">Faculty Sponsor / Mentor</label>
                <select
                  name="facultySponsor"
                  value={formData.facultySponsor}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="Dr. Aman Parnami">Dr. Aman Parnami</option>
                  <option value="Dr. Grace Eden">Dr. Grace Eden</option>
                  <option value="Dr. Pushpendra Singh">Dr. Pushpendra Singh</option>
                  <option value="Dr. Rajiv Ratn Shah">Dr. Rajiv Ratn Shah</option>
                  <option value="HCD Student Guild">HCD Student Guild</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Expected Attendee Capacity</label>
                <input
                  type="number"
                  name="capacity"
                  min="5"
                  max="300"
                  value={formData.capacity}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label">Organizer Name</label>
                <input
                  type="text"
                  name="submittedBy"
                  placeholder="Your Name / Club Name"
                  value={formData.submittedBy}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Contact Email</label>
                <input
                  type="email"
                  name="submitterEmail"
                  placeholder="yourname@iiitd.ac.in"
                  value={formData.submitterEmail}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-modal-actions">
              <button type="button" onClick={onClose} className="btn btn-secondary">
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Submit for Approval
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
