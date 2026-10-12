import React, { useState } from 'react';
import { Modal, Form, Row, Col, Button } from 'react-bootstrap';

export default function CollabModal({ isOpen, onClose, project, currentUser }) {
  const [formData, setFormData] = useState({
    studentName: currentUser ? currentUser.name : '',
    studentEmail: currentUser ? currentUser.email : '',
    rollNo: currentUser ? currentUser.rollNo : '',
    year: 'B.Tech CS+D 3rd Year',
    portfolioUrl: '',
    statement: '',
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
    <Modal show={isOpen} onHide={onClose} size="lg" centered backdrop="static">
      <Modal.Header closeButton className="border-bottom" style={{ borderColor: 'var(--hcd-border)' }}>
        <div>
          <Modal.Title className="fw-bold fs-5 d-flex align-items-center gap-2" style={{ color: 'var(--hcd-charcoal)' }}>
            <i className="bi bi-person-lines-fill" style={{ color: 'var(--hcd-cyan)' }}></i>
            <span>Apply to Collaborate</span>
          </Modal.Title>
          <div className="small mt-1" style={{ color: 'var(--hcd-body)' }}>
            Express interest in joining <strong style={{ color: 'var(--hcd-charcoal)' }}>{project.title}</strong> under {project.supervisor}.
          </div>
        </div>
      </Modal.Header>

      <Modal.Body className="p-4">
        {submitted ? (
          <div className="text-center py-4">
            <i className="bi bi-send-check-fill text-success fs-1 mb-2 d-block"></i>
            <h4 className="fw-bold" style={{ color: 'var(--hcd-charcoal)' }}>Application Dispatched!</h4>
            <p className="small mb-0" style={{ color: 'var(--hcd-body)' }}>
              Your profile has been forwarded to <strong>{project.supervisorEmail}</strong>. The principal investigator will review your submission and contact you.
            </p>
          </div>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Row className="g-3 mb-3">
              <Col md={6}>
                <Form.Label className="small fw-semibold" style={{ color: 'var(--hcd-charcoal)' }}>Student Name *</Form.Label>
                <Form.Control
                  type="text"
                  name="studentName"
                  required
                  value={formData.studentName}
                  onChange={handleChange}
                />
              </Col>

              <Col md={6}>
                <Form.Label className="small fw-semibold" style={{ color: 'var(--hcd-charcoal)' }}>IIITD Email *</Form.Label>
                <Form.Control
                  type="email"
                  name="studentEmail"
                  required
                  value={formData.studentEmail}
                  onChange={handleChange}
                />
              </Col>
            </Row>

            <Row className="g-3 mb-3">
              <Col md={6}>
                <Form.Label className="small fw-semibold" style={{ color: 'var(--hcd-charcoal)' }}>Roll Number *</Form.Label>
                <Form.Control
                  type="text"
                  name="rollNo"
                  required
                  placeholder="e.g. 2024HCD504"
                  value={formData.rollNo}
                  onChange={handleChange}
                />
              </Col>

              <Col md={6}>
                <Form.Label className="small fw-semibold" style={{ color: 'var(--hcd-charcoal)' }}>Current Standing</Form.Label>
                <Form.Select
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                >
                  <option value="B.Tech CS+D 2nd Year">B.Tech CS+D 2nd Year</option>
                  <option value="B.Tech CS+D 3rd Year">B.Tech CS+D 3rd Year</option>
                  <option value="B.Tech CS+D 4th Year">B.Tech CS+D 4th Year</option>
                  <option value="M.Des 1st Year">M.Des 1st Year</option>
                  <option value="M.Des 2nd Year">M.Des 2nd Year</option>
                  <option value="Ph.D. Scholar">Ph.D. Scholar</option>
                </Form.Select>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label className="small fw-semibold" style={{ color: 'var(--hcd-charcoal)' }}>Portfolio / GitHub / Figma Link</Form.Label>
              <Form.Control
                type="url"
                name="portfolioUrl"
                placeholder="https://github.com/... or https://behance.net/..."
                value={formData.portfolioUrl}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="small fw-semibold" style={{ color: 'var(--hcd-charcoal)' }}>Statement of Interest & Relevant Coursework *</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="statement"
                required
                placeholder="Describe your background with relevant tools (e.g. Unity, React, physical computing), and what you hope to achieve..."
                value={formData.statement}
                onChange={handleChange}
              />
            </Form.Group>

            <div className="d-flex justify-content-end gap-2 pt-2 border-top" style={{ borderColor: 'var(--hcd-border)' }}>
              <Button variant="outline-secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" className="d-inline-flex align-items-center gap-1">
                <i className="bi bi-send"></i>
                <span>Submit Expression of Interest</span>
              </Button>
            </div>
          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
}
