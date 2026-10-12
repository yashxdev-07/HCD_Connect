import React, { useState } from 'react';
import { Row, Col, Card, Nav, Table, Badge, Button } from 'react-bootstrap';

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
    <div className="py-4">
      {/* 1. ADMIN HEADER BANNER */}
      <Card 
        className="text-white border-0 shadow-sm p-4 mb-4 rounded-3"
        style={{ backgroundColor: 'var(--hcd-charcoal)' }}
      >
        <Row className="align-items-center g-3">
          <Col md={7}>
            <div className="d-flex align-items-center gap-3">
              <div 
                className="rounded-circle p-3 d-flex align-items-center justify-content-center"
                style={{ backgroundColor: 'rgba(41, 182, 190, 0.2)', color: 'var(--hcd-cyan)', width: '56px', height: '56px' }}
              >
                <i className="bi bi-shield-check fs-2"></i>
              </div>
              <div>
                <h3 className="text-white fw-bold mb-1">Department Administration Portal</h3>
                <p className="small mb-0" style={{ color: '#D1D5DB' }}>
                  Review event proposals, moderate listings, and verify departmental labs & research.
                </p>
              </div>
            </div>
          </Col>

          <Col md={5}>
            <Row className="g-2 text-center">
              <Col xs={4}>
                <div 
                  className="p-2 rounded border"
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.08)', borderColor: 'rgba(255, 255, 255, 0.15)' }}
                >
                  <div className="fs-4 fw-bold" style={{ color: 'var(--hcd-cyan)' }}>{pendingSubmissions.length}</div>
                  <div className="small" style={{ fontSize: '0.7rem', color: '#D1D5DB' }}>Pending</div>
                </div>
              </Col>
              <Col xs={4}>
                <div 
                  className="p-2 rounded border"
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.08)', borderColor: 'rgba(255, 255, 255, 0.15)' }}
                >
                  <div className="fs-4 fw-bold text-white">{events.length}</div>
                  <div className="small" style={{ fontSize: '0.7rem', color: '#D1D5DB' }}>Events</div>
                </div>
              </Col>
              <Col xs={4}>
                <div 
                  className="p-2 rounded border"
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.08)', borderColor: 'rgba(255, 255, 255, 0.15)' }}
                >
                  <div className="fs-4 fw-bold text-white">{labs.length}</div>
                  <div className="small" style={{ fontSize: '0.7rem', color: '#D1D5DB' }}>Labs</div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>

      {/* 2. SUBNAV TABS */}
      <Nav variant="tabs" className="mb-4 border-bottom" style={{ borderColor: 'var(--hcd-border)' }}>
        <Nav.Item>
          <Nav.Link 
            active={adminSection === 'submissions'} 
            onClick={() => setAdminSection('submissions')}
            className="d-flex align-items-center gap-2 fw-semibold cursor-pointer"
            style={{
              color: adminSection === 'submissions' ? 'var(--hcd-cyan)' : 'var(--hcd-body)',
              borderBottomColor: adminSection === 'submissions' ? 'var(--hcd-cyan)' : 'transparent',
              borderBottomWidth: adminSection === 'submissions' ? '2px' : '1px'
            }}
          >
            <i className="bi bi-inbox"></i>
            <span>Pending Proposals</span>
            {pendingSubmissions.length > 0 && (
              <Badge bg="danger" pill>{pendingSubmissions.length}</Badge>
            )}
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link 
            active={adminSection === 'verify_events'} 
            onClick={() => setAdminSection('verify_events')}
            className="d-flex align-items-center gap-2 fw-semibold cursor-pointer"
            style={{
              color: adminSection === 'verify_events' ? 'var(--hcd-cyan)' : 'var(--hcd-body)',
              borderBottomColor: adminSection === 'verify_events' ? 'var(--hcd-cyan)' : 'transparent',
              borderBottomWidth: adminSection === 'verify_events' ? '2px' : '1px'
            }}
          >
            <i className="bi bi-calendar-check"></i>
            <span>Events Audit ({events.length})</span>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link 
            active={adminSection === 'verify_projects'} 
            onClick={() => setAdminSection('verify_projects')}
            className="d-flex align-items-center gap-2 fw-semibold cursor-pointer"
            style={{
              color: adminSection === 'verify_projects' ? 'var(--hcd-cyan)' : 'var(--hcd-body)',
              borderBottomColor: adminSection === 'verify_projects' ? 'var(--hcd-cyan)' : 'transparent',
              borderBottomWidth: adminSection === 'verify_projects' ? '2px' : '1px'
            }}
          >
            <i className="bi bi-briefcase"></i>
            <span>Projects Audit ({projects.length})</span>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link 
            active={adminSection === 'verify_labs'} 
            onClick={() => setAdminSection('verify_labs')}
            className="d-flex align-items-center gap-2 fw-semibold cursor-pointer"
            style={{
              color: adminSection === 'verify_labs' ? 'var(--hcd-cyan)' : 'var(--hcd-body)',
              borderBottomColor: adminSection === 'verify_labs' ? 'var(--hcd-cyan)' : 'transparent',
              borderBottomWidth: adminSection === 'verify_labs' ? '2px' : '1px'
            }}
          >
            <i className="bi bi-layers"></i>
            <span>Labs Registry Audit ({labs.length})</span>
          </Nav.Link>
        </Nav.Item>
      </Nav>

      {/* 3. CONTENT AREAS */}
      {/* SECTION 1: Submissions Queue */}
      {adminSection === 'submissions' && (
        <div>
          <div className="mb-3">
            <h5 className="fw-bold mb-1" style={{ color: 'var(--hcd-charcoal)' }}>Event Proposals Awaiting Review</h5>
            <p className="small mb-0" style={{ color: 'var(--hcd-body)' }}>
              Approved events are instantly published to the student Events feed.
            </p>
          </div>

          {pendingSubmissions.length === 0 ? (
            <Card className="text-center p-5 border bg-white" style={{ borderColor: 'var(--hcd-border)' }}>
              <i className="bi bi-check-circle-fill text-success fs-1 mb-2"></i>
              <h5 className="fw-bold" style={{ color: 'var(--hcd-charcoal)' }}>All caught up!</h5>
              <p className="small mb-3" style={{ color: 'var(--hcd-body)' }}>There are no pending submissions in the queue.</p>
              <div>
                <Button variant="outline-primary" size="sm" onClick={() => onSwitchTab('events')}>
                  Go to Public Events Page
                </Button>
              </div>
            </Card>
          ) : (
            <div className="d-flex flex-column gap-3">
              {pendingSubmissions.map((sub) => (
                <Card key={sub.id} className="border shadow-sm p-4 bg-white" style={{ borderColor: 'var(--hcd-border)' }}>
                  <div className="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-2">
                    <Badge className="badge-category">
                      {sub.category}
                    </Badge>
                    <span className="small" style={{ color: 'var(--hcd-body)' }}>Submitted: {sub.timestamp}</span>
                  </div>

                  <h5 className="fw-bold mb-2" style={{ color: 'var(--hcd-charcoal)' }}>{sub.title}</h5>
                  <p className="small mb-3" style={{ color: 'var(--hcd-body)', lineHeight: 1.6 }}>{sub.description}</p>

                  <div className="p-3 rounded border mb-3" style={{ backgroundColor: 'var(--hcd-light-bg)', borderColor: 'var(--hcd-border)' }}>
                    <Row className="g-2 small" style={{ color: 'var(--hcd-charcoal)' }}>
                      <Col sm={6} md={3}>
                        <i className="bi bi-calendar3 me-2" style={{ color: 'var(--hcd-cyan)' }}></i>
                        <span>{sub.date}</span>
                      </Col>
                      <Col sm={6} md={3}>
                        <i className="bi bi-clock me-2" style={{ color: 'var(--hcd-cyan)' }}></i>
                        <span>{sub.time}</span>
                      </Col>
                      <Col sm={6} md={3}>
                        <i className="bi bi-geo-alt me-2" style={{ color: 'var(--hcd-cyan)' }}></i>
                        <span>{sub.room}</span>
                      </Col>
                      <Col sm={6} md={3}>
                        <i className="bi bi-person me-2" style={{ color: 'var(--hcd-cyan)' }}></i>
                        <span>{sub.submittedBy}</span>
                      </Col>
                    </Row>
                  </div>

                  <div className="small mb-3" style={{ color: 'var(--hcd-body)' }}>
                    <strong>Faculty Sponsor: </strong> {sub.facultySponsor || 'None Specified'}
                  </div>

                  <div className="d-flex gap-2">
                    <Button 
                      variant="success" 
                      size="sm"
                      onClick={() => onApproveSubmission(sub.id)}
                      className="d-inline-flex align-items-center gap-1"
                    >
                      <i className="bi bi-check-lg"></i>
                      <span>Approve & Publish</span>
                    </Button>
                    <Button 
                      variant="danger" 
                      size="sm"
                      onClick={() => onRejectSubmission(sub.id)}
                      className="d-inline-flex align-items-center gap-1"
                    >
                      <i className="bi bi-x-lg"></i>
                      <span>Reject Proposal</span>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SECTION 2: Events Audit */}
      {adminSection === 'verify_events' && (
        <Card className="border shadow-sm p-0 overflow-hidden bg-white" style={{ borderColor: 'var(--hcd-border)', borderRadius: 'var(--hcd-radius-lg)' }}>
          <div className="p-3 border-bottom" style={{ backgroundColor: 'var(--hcd-light-bg)', borderColor: 'var(--hcd-border)' }}>
            <h6 className="fw-bold mb-0" style={{ color: 'var(--hcd-charcoal)' }}>Events Verification & Visibility</h6>
          </div>
          <div className="table-responsive">
            <Table hover align="middle" className="mb-0 small">
              <thead style={{ backgroundColor: 'var(--hcd-light-bg)' }}>
                <tr>
                  <th style={{ color: 'var(--hcd-charcoal)' }}>Event Title</th>
                  <th style={{ color: 'var(--hcd-charcoal)' }}>Category</th>
                  <th style={{ color: 'var(--hcd-charcoal)' }}>Date & Room</th>
                  <th style={{ color: 'var(--hcd-charcoal)' }}>Faculty Lead</th>
                  <th style={{ color: 'var(--hcd-charcoal)' }}>Status</th>
                  <th style={{ color: 'var(--hcd-charcoal)' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {events.map((evt) => (
                  <tr key={evt.id}>
                    <td className="fw-semibold" style={{ color: 'var(--hcd-charcoal)' }}>{evt.title}</td>
                    <td>
                      <Badge className="badge-category">
                        {evt.category}
                      </Badge>
                    </td>
                    <td>
                      <div style={{ color: 'var(--hcd-charcoal)' }}>{evt.date}</div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--hcd-body)' }}>{evt.room}</span>
                    </td>
                    <td style={{ color: 'var(--hcd-charcoal)' }}>{evt.facultyContact?.name || evt.speaker}</td>
                    <td>
                      {evt.isVerified ? (
                        <Badge bg="success-subtle" className="text-success-emphasis border border-success-subtle">Verified</Badge>
                      ) : (
                        <Badge bg="warning-subtle" className="text-warning-emphasis border border-warning-subtle">Demo Data</Badge>
                      )}
                    </td>
                    <td>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => onToggleEventVerification(evt.id)}
                      >
                        {evt.isVerified ? 'Mark Demo' : 'Verify'}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card>
      )}

      {/* SECTION 3: Projects Audit */}
      {adminSection === 'verify_projects' && (
        <Card className="border shadow-sm p-0 overflow-hidden bg-white" style={{ borderColor: 'var(--hcd-border)', borderRadius: 'var(--hcd-radius-lg)' }}>
          <div className="p-3 border-bottom" style={{ backgroundColor: 'var(--hcd-light-bg)', borderColor: 'var(--hcd-border)' }}>
            <h6 className="fw-bold mb-0" style={{ color: 'var(--hcd-charcoal)' }}>Research Projects Audit</h6>
          </div>
          <div className="table-responsive">
            <Table hover align="middle" className="mb-0 small">
              <thead style={{ backgroundColor: 'var(--hcd-light-bg)' }}>
                <tr>
                  <th style={{ color: 'var(--hcd-charcoal)' }}>Project Name</th>
                  <th style={{ color: 'var(--hcd-charcoal)' }}>Supervisor</th>
                  <th style={{ color: 'var(--hcd-charcoal)' }}>Domain</th>
                  <th style={{ color: 'var(--hcd-charcoal)' }}>Collab Status</th>
                  <th style={{ color: 'var(--hcd-charcoal)' }}>Status</th>
                  <th style={{ color: 'var(--hcd-charcoal)' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((proj) => (
                  <tr key={proj.id}>
                    <td className="fw-semibold" style={{ color: 'var(--hcd-charcoal)' }}>{proj.title}</td>
                    <td style={{ color: 'var(--hcd-charcoal)' }}>{proj.supervisor}</td>
                    <td>
                      <Badge className="badge-category">
                        {proj.researchArea}
                      </Badge>
                    </td>
                    <td>
                      <Badge bg={proj.status === 'Open' ? 'success' : proj.status === 'Limited' ? 'warning' : 'secondary'}>
                        {proj.status}
                      </Badge>
                    </td>
                    <td>
                      {proj.isVerified ? (
                        <Badge bg="success-subtle" className="text-success-emphasis border border-success-subtle">Verified</Badge>
                      ) : (
                        <Badge bg="warning-subtle" className="text-warning-emphasis border border-warning-subtle">Demo Data</Badge>
                      )}
                    </td>
                    <td>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => onToggleProjectVerification(proj.id)}
                      >
                        {proj.isVerified ? 'Mark Demo' : 'Verify'}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card>
      )}

      {/* SECTION 4: Labs Registry Audit */}
      {adminSection === 'verify_labs' && (
        <Card className="border shadow-sm p-0 overflow-hidden bg-white" style={{ borderColor: 'var(--hcd-border)', borderRadius: 'var(--hcd-radius-lg)' }}>
          <div className="p-3 border-bottom" style={{ backgroundColor: 'var(--hcd-light-bg)', borderColor: 'var(--hcd-border)' }}>
            <h6 className="fw-bold mb-0" style={{ color: 'var(--hcd-charcoal)' }}>Department Research Labs Audit</h6>
          </div>
          <div className="table-responsive">
            <Table hover align="middle" className="mb-0 small">
              <thead style={{ backgroundColor: 'var(--hcd-light-bg)' }}>
                <tr>
                  <th style={{ color: 'var(--hcd-charcoal)' }}>Lab Code & Name</th>
                  <th style={{ color: 'var(--hcd-charcoal)' }}>Director</th>
                  <th style={{ color: 'var(--hcd-charcoal)' }}>Room</th>
                  <th style={{ color: 'var(--hcd-charcoal)' }}>Equipment Count</th>
                  <th style={{ color: 'var(--hcd-charcoal)' }}>Status</th>
                  <th style={{ color: 'var(--hcd-charcoal)' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {labs.map((lab) => (
                  <tr key={lab.id}>
                    <td>
                      <div className="fw-semibold" style={{ color: 'var(--hcd-charcoal)' }}>{lab.name}</div>
                      <Badge className="font-monospace mt-1 text-white" style={{ backgroundColor: 'var(--hcd-charcoal)' }}>{lab.code}</Badge>
                    </td>
                    <td style={{ color: 'var(--hcd-charcoal)' }}>{lab.director}</td>
                    <td style={{ color: 'var(--hcd-charcoal)' }}>{lab.room}</td>
                    <td style={{ color: 'var(--hcd-body)' }}>{lab.equipment.length} Items Listed</td>
                    <td>
                      {lab.isVerified ? (
                        <Badge bg="success-subtle" className="text-success-emphasis border border-success-subtle">Verified Facility</Badge>
                      ) : (
                        <Badge bg="warning-subtle" className="text-warning-emphasis border border-warning-subtle">Demo Data</Badge>
                      )}
                    </td>
                    <td>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => onToggleLabVerification(lab.id)}
                      >
                        {lab.isVerified ? 'Mark Demo' : 'Verify'}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card>
      )}
    </div>
  );
}
