import React, { useState } from 'react';
import { Modal, Form, Nav, Button, Alert, InputGroup, Row, Col } from 'react-bootstrap';
import { DEMO_USERS } from '../data/mockData';

export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rollNo: '',
    program: 'B.Tech CS+D',
    password: '',
    interests: '',
  });
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError('Please fill in all required fields.');
      return;
    }

    if (mode === 'login') {
      if (formData.email.toLowerCase().includes('admin')) {
        onLoginSuccess(DEMO_USERS[1]);
      } else {
        onLoginSuccess({
          id: `usr-${Date.now()}`,
          name: formData.email.split('@')[0].replace('.', ' '),
          email: formData.email,
          rollNo: '2024HCD999',
          role: 'student',
          program: 'M.Des Human-Centered Design',
          interests: ['UX Research', 'Interaction Design'],
          avatar: formData.email.slice(0, 2).toUpperCase()
        });
      }
    } else {
      if (!formData.name || !formData.rollNo) {
        setError('Please provide your name and student roll number.');
        return;
      }

      onLoginSuccess({
        id: `usr-${Date.now()}`,
        name: formData.name,
        email: formData.email,
        rollNo: formData.rollNo,
        role: 'student',
        program: formData.program,
        interests: formData.interests ? formData.interests.split(',').map(s => s.trim()) : ['Design'],
        avatar: formData.name.slice(0, 2).toUpperCase()
      });
    }

    onClose();
  };

  const handleQuickDemo = (role) => {
    if (role === 'student') {
      onLoginSuccess(DEMO_USERS[0]);
    } else {
      onLoginSuccess(DEMO_USERS[1]);
    }
    onClose();
  };

  return (
    <Modal show={isOpen} onHide={onClose} centered backdrop="static">
      <Modal.Header closeButton className="border-bottom" style={{ borderColor: 'var(--hcd-border)' }}>
        <Modal.Title className="fw-bold fs-5 d-flex align-items-center gap-2" style={{ color: 'var(--hcd-charcoal)' }}>
          <i className="bi bi-mortarboard-fill" style={{ color: 'var(--hcd-cyan)' }}></i>
          <span>{mode === 'login' ? 'Sign In to HCD Connect' : 'Student Portal Registration'}</span>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="p-4">
        {/* TAB SWITCHER */}
        <Nav variant="pills" className="nav-fill mb-3 p-1 rounded-3 border" style={{ backgroundColor: 'var(--hcd-light-bg)', borderColor: 'var(--hcd-border)', borderRadius: '12px' }}>
          <Nav.Item>
            <Nav.Link 
              active={mode === 'login'} 
              onClick={() => { setMode('login'); setError(''); }}
              className="py-1 small fw-semibold cursor-pointer d-flex align-items-center justify-content-center gap-1"
              style={{
                backgroundColor: mode === 'login' ? 'var(--hcd-cyan)' : 'transparent',
                color: mode === 'login' ? '#FFFFFF' : 'var(--hcd-body)',
                borderRadius: '8px'
              }}
            >
              <i className="bi bi-box-arrow-in-right"></i>
              <span>Sign In</span>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link 
              active={mode === 'register'} 
              onClick={() => { setMode('register'); setError(''); }}
              className="py-1 small fw-semibold cursor-pointer d-flex align-items-center justify-content-center gap-1"
              style={{
                backgroundColor: mode === 'register' ? 'var(--hcd-cyan)' : 'transparent',
                color: mode === 'register' ? '#FFFFFF' : 'var(--hcd-body)',
                borderRadius: '8px'
              }}
            >
              <i className="bi bi-person-plus"></i>
              <span>Create Account</span>
            </Nav.Link>
          </Nav.Item>
        </Nav>

        {error && (
          <Alert variant="danger" className="py-2 small d-flex align-items-center gap-2">
            <i className="bi bi-exclamation-octagon-fill"></i>
            <span>{error}</span>
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          {mode === 'register' && (
            <>
              <Form.Group className="mb-3">
                <Form.Label className="small fw-semibold" style={{ color: 'var(--hcd-body)' }}>Full Name *</Form.Label>
                <InputGroup>
                  <InputGroup.Text className="bg-light border-end-0 text-muted" style={{ borderColor: 'var(--hcd-border)' }}><i className="bi bi-person"></i></InputGroup.Text>
                  <Form.Control
                    type="text"
                    name="name"
                    required
                    placeholder="e.g. Arjun Sharma"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="border-start-0 ps-0"
                    style={{ borderColor: 'var(--hcd-border)' }}
                  />
                </InputGroup>
              </Form.Group>

              <Row className="g-2 mb-3">
                <Col md={6}>
                  <Form.Label className="small fw-semibold" style={{ color: 'var(--hcd-body)' }}>IIITD Roll Number *</Form.Label>
                  <InputGroup>
                    <InputGroup.Text className="bg-light border-end-0 text-muted" style={{ borderColor: 'var(--hcd-border)' }}><i className="bi bi-hash"></i></InputGroup.Text>
                    <Form.Control
                      type="text"
                      name="rollNo"
                      required
                      placeholder="e.g. 2024HCD501"
                      value={formData.rollNo}
                      onChange={handleInputChange}
                      className="border-start-0 ps-0"
                      style={{ borderColor: 'var(--hcd-border)' }}
                    />
                  </InputGroup>
                </Col>
                <Col md={6}>
                  <Form.Label className="small fw-semibold" style={{ color: 'var(--hcd-body)' }}>Academic Program</Form.Label>
                  <Form.Select
                    name="program"
                    value={formData.program}
                    onChange={handleInputChange}
                    style={{ borderColor: 'var(--hcd-border)' }}
                  >
                    <option value="B.Tech CS+D">B.Tech CS+D</option>
                    <option value="M.Des HCD">M.Des HCD</option>
                    <option value="Ph.D. HCD">Ph.D. HCD</option>
                    <option value="Visiting Fellow">Visiting Fellow</option>
                  </Form.Select>
                </Col>
              </Row>
            </>
          )}

          <Form.Group className="mb-3">
            <Form.Label className="small fw-semibold" style={{ color: 'var(--hcd-body)' }}>IIIT Delhi Email *</Form.Label>
            <InputGroup>
              <InputGroup.Text className="bg-light border-end-0 text-muted" style={{ borderColor: 'var(--hcd-border)' }}><i className="bi bi-envelope"></i></InputGroup.Text>
              <Form.Control
                type="email"
                name="email"
                required
                placeholder="yourname@iiitd.ac.in"
                value={formData.email}
                onChange={handleInputChange}
                className="border-start-0 ps-0"
                style={{ borderColor: 'var(--hcd-border)' }}
              />
            </InputGroup>
            <Form.Text style={{ fontSize: '0.75rem', color: 'var(--hcd-body)' }}>
              Institutional @iiitd.ac.in address
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="small fw-semibold" style={{ color: 'var(--hcd-body)' }}>Password *</Form.Label>
            <InputGroup>
              <InputGroup.Text className="bg-light border-end-0 text-muted" style={{ borderColor: 'var(--hcd-border)' }}><i className="bi bi-lock"></i></InputGroup.Text>
              <Form.Control
                type={showPassword ? 'text' : 'password'}
                name="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={handleInputChange}
                className="border-start-0 ps-0"
                style={{ borderColor: 'var(--hcd-border)' }}
              />
              <Button 
                variant="secondary" 
                onClick={() => setShowPassword(!showPassword)}
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                <i className={showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'}></i>
              </Button>
            </InputGroup>
          </Form.Group>

          {mode === 'register' && (
            <Form.Group className="mb-3">
              <Form.Label className="small fw-semibold" style={{ color: 'var(--hcd-body)' }}>Research Interests</Form.Label>
              <Form.Control
                type="text"
                name="interests"
                placeholder="e.g. Tangible UI, XR, Medical Device UX"
                value={formData.interests}
                onChange={handleInputChange}
                style={{ borderColor: 'var(--hcd-border)' }}
              />
            </Form.Group>
          )}

          <Button type="submit" variant="primary" className="w-100 py-2 fw-semibold">
            {mode === 'login' ? 'Sign In to Portal' : 'Complete Registration'}
          </Button>
        </Form>

        {/* DEMO PROFILES */}
        <div className="mt-4 pt-3 border-top" style={{ borderColor: 'var(--hcd-border)' }}>
          <div className="text-center small fw-semibold text-uppercase mb-2" style={{ fontSize: '0.7rem', letterSpacing: '0.04em', color: 'var(--hcd-body)' }}>
            Quick Test with Demo Profiles
          </div>
          <Row className="g-2">
            <Col sm={6}>
              <Button
                variant="secondary"
                size="sm"
                className="w-100 d-flex align-items-center justify-content-center gap-1"
                onClick={() => handleQuickDemo('student')}
              >
                <i className="bi bi-person-circle" style={{ color: 'var(--hcd-cyan)' }}></i>
                <span>Demo Student (Arjun)</span>
              </Button>
            </Col>
            <Col sm={6}>
              <Button
                variant="secondary"
                size="sm"
                className="w-100 d-flex align-items-center justify-content-center gap-1"
                onClick={() => handleQuickDemo('admin')}
              >
                <i className="bi bi-shield-check text-warning"></i>
                <span>Faculty Admin (Dept Desk)</span>
              </Button>
            </Col>
          </Row>
        </div>
      </Modal.Body>
    </Modal>
  );
}
