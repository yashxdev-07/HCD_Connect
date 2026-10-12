import React, { useState } from 'react';
import { Modal, Form, Row, Col, Button } from 'react-bootstrap';

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
    <Modal show={isOpen} onHide={onClose} size="lg" centered backdrop="static">
      <Modal.Header closeButton className="border-bottom" style={{ borderColor: 'var(--hcd-border)' }}>
        <div>
          <Modal.Title className="fw-bold fs-5 d-flex align-items-center gap-2" style={{ color: 'var(--hcd-charcoal)' }}>
            <i className="bi bi-calendar-plus" style={{ color: 'var(--hcd-cyan)' }}></i>
            <span>Propose an Academic Event</span>
          </Modal.Title>
          <div className="small mt-1" style={{ color: 'var(--hcd-body)' }}>
            Submit a workshop, guest speaker session, or reading circle for departmental review.
          </div>
        </div>
      </Modal.Header>

      <Modal.Body className="p-4">
        {submittedStatus ? (
          <div className="text-center py-4">
            <i className="bi bi-check-circle-fill text-success fs-1 mb-2 d-block"></i>
            <h4 className="fw-bold" style={{ color: 'var(--hcd-charcoal)' }}>Proposal Submitted Successfully!</h4>
            <p className="small mb-0" style={{ color: 'var(--hcd-body)' }}>
              Your proposal has been routed to the HCD Review Queue. An administrator will review your room booking and schedule.
            </p>
          </div>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className="small fw-semibold" style={{ color: 'var(--hcd-charcoal)' }}>Event Title *</Form.Label>
              <Form.Control
                type="text"
                name="title"
                required
                placeholder="e.g. Generative AI Tools in UI/UX Research"
                value={formData.title}
                onChange={handleChange}
              />
            </Form.Group>

            <Row className="g-3 mb-3">
              <Col md={6}>
                <Form.Label className="small fw-semibold" style={{ color: 'var(--hcd-charcoal)' }}>Event Category</Form.Label>
                <Form.Select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="Workshop">Hands-on Workshop</option>
                  <option value="Guest Lecture">Guest Lecture</option>
                  <option value="Seminar">Research Seminar</option>
                  <option value="Critique">Capstone Critique</option>
                  <option value="Hackathon">Designathon</option>
                </Form.Select>
              </Col>

              <Col md={6}>
                <Form.Label className="small fw-semibold" style={{ color: 'var(--hcd-charcoal)' }}>Proposed Date *</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  required
                  value={formData.date}
                  onChange={handleChange}
                />
              </Col>
            </Row>

            <Row className="g-3 mb-3">
              <Col md={6}>
                <Form.Label className="small fw-semibold" style={{ color: 'var(--hcd-charcoal)' }}>Timing</Form.Label>
                <Form.Control
                  type="text"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                />
              </Col>

              <Col md={6}>
                <Form.Label className="small fw-semibold" style={{ color: 'var(--hcd-charcoal)' }}>Venue / Room</Form.Label>
                <Form.Select
                  name="room"
                  value={formData.room}
                  onChange={handleChange}
                >
                  <option value="Design Studio - Academic Building">Design Studio - Academic Building</option>
                  <option value="Tinkerers' Lab - R&D 4th Floor">Tinkerers' Lab - R&D 4th Floor</option>
                  <option value="C01 Seminar Hall - Old Academic">C01 Seminar Hall - Old Academic</option>
                  <option value="Auditorium - Academic Complex">Auditorium - Academic Complex</option>
                  <option value="Online / Google Meet">Online / Google Meet</option>
                </Form.Select>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label className="small fw-semibold" style={{ color: 'var(--hcd-charcoal)' }}>Event Description & Agenda *</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                required
                placeholder="Describe the goals, target participants, and software/hardware prerequisites..."
                value={formData.description}
                onChange={handleChange}
              />
            </Form.Group>

            <Row className="g-3 mb-3">
              <Col md={6}>
                <Form.Label className="small fw-semibold" style={{ color: 'var(--hcd-charcoal)' }}>Faculty Sponsor / Advisor</Form.Label>
                <Form.Control
                  type="text"
                  name="facultySponsor"
                  value={formData.facultySponsor}
                  onChange={handleChange}
                />
              </Col>

              <Col md={6}>
                <Form.Label className="small fw-semibold" style={{ color: 'var(--hcd-charcoal)' }}>Target Capacity</Form.Label>
                <Form.Control
                  type="number"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleChange}
                />
              </Col>
            </Row>

            <Row className="g-3 mb-4">
              <Col md={6}>
                <Form.Label className="small fw-semibold" style={{ color: 'var(--hcd-charcoal)' }}>Organizer Name</Form.Label>
                <Form.Control
                  type="text"
                  name="submittedBy"
                  placeholder="Your Name / Club Name"
                  value={formData.submittedBy}
                  onChange={handleChange}
                />
              </Col>

              <Col md={6}>
                <Form.Label className="small fw-semibold" style={{ color: 'var(--hcd-charcoal)' }}>Contact Email</Form.Label>
                <Form.Control
                  type="email"
                  name="submitterEmail"
                  placeholder="yourname@iiitd.ac.in"
                  value={formData.submitterEmail}
                  onChange={handleChange}
                />
              </Col>
            </Row>

            <div className="d-flex justify-content-end gap-2 pt-2 border-top" style={{ borderColor: 'var(--hcd-border)' }}>
              <Button variant="outline-secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                Submit for Approval
              </Button>
            </div>
          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
}
