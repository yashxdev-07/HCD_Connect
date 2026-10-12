import React from 'react';
import { Modal, Badge, Row, Col, Button, Card } from 'react-bootstrap';

export default function DetailModal({ item, type, onClose, onRsvpToggle, onOpenCollab }) {
  if (!item) return null;

  const isDemo = !item.isVerified || item.isDemo;

  return (
    <Modal show={true} onHide={onClose} size="lg" centered backdrop="static" scrollable>
      <Modal.Header closeButton className="border-bottom" style={{ borderColor: 'var(--hcd-border)' }}>
        <div className="w-100 pe-3">
          <div className="d-flex align-items-center gap-2 mb-2 flex-wrap">
            {type === 'event' && (
              <span className="badge badge-category">
                {item.category}
              </span>
            )}
            {type === 'project' && (
              <span className="badge badge-category">
                {item.researchArea}
              </span>
            )}
            {type === 'lab' && (
              <span 
                className="badge rounded-pill fw-semibold border d-inline-flex align-items-center gap-1.5"
                style={{ backgroundColor: '#EBF8F9', color: '#15797F', borderColor: '#BCE7EA', fontSize: '0.78rem' }}
              >
                <i className="bi bi-door-closed-fill" style={{ color: 'var(--hcd-cyan)' }}></i>
                <span>Room {item.room}</span>
              </span>
            )}
            {type === 'faculty' && (
              <span className="badge" style={{ backgroundColor: '#E0F7F9', color: '#177C82' }}>
                {item.designation || 'Faculty Profile'}
              </span>
            )}

            {type === 'lab' ? (
              item.isLeadConfirmed ? (
                <span className="badge rounded-pill fw-semibold" style={{ backgroundColor: '#ECFDF5', color: '#059669', fontSize: '0.74rem' }}>
                  <i className="bi bi-check-circle-fill me-1"></i>
                  <span>Confirmed in Directory</span>
                </span>
              ) : (
                <span className="badge rounded-pill fw-medium" style={{ backgroundColor: '#F1F5F9', color: '#475569', fontSize: '0.74rem' }}>
                  <i className="bi bi-card-checklist me-1"></i>
                  <span>Directory Listed ({item.room})</span>
                </span>
              )
            ) : isDemo ? (
              <Badge bg="warning-subtle" className="text-warning-emphasis border border-warning-subtle d-inline-flex align-items-center gap-1">
                <i className="bi bi-exclamation-triangle"></i>
                <span>Demo Data Record</span>
              </Badge>
            ) : (
              <Badge bg="success-subtle" className="text-success-emphasis border border-success-subtle d-inline-flex align-items-center gap-1">
                <i className="bi bi-shield-check"></i>
                <span>Verified Department Listing</span>
              </Badge>
            )}
          </div>
          <Modal.Title className="fw-bold fs-4" style={{ color: 'var(--hcd-charcoal)' }}>
            {item.title || item.name}
          </Modal.Title>
        </div>
      </Modal.Header>

      <Modal.Body className="p-4">
        {/* EVENT TYPE */}
        {type === 'event' && (
          <div>
            <Row className="g-2 mb-4">
              <Col xs={6} md={3}>
                <div className="p-2 rounded border text-center" style={{ backgroundColor: 'var(--hcd-light-bg)', borderColor: 'var(--hcd-border)', borderRadius: '10px' }}>
                  <div className="small fw-semibold text-uppercase" style={{ fontSize: '0.7rem', color: 'var(--hcd-body)' }}>Date</div>
                  <div className="fw-bold small" style={{ color: 'var(--hcd-charcoal)' }}>{item.date}</div>
                </div>
              </Col>
              <Col xs={6} md={3}>
                <div className="p-2 rounded border text-center" style={{ backgroundColor: 'var(--hcd-light-bg)', borderColor: 'var(--hcd-border)', borderRadius: '10px' }}>
                  <div className="small fw-semibold text-uppercase" style={{ fontSize: '0.7rem', color: 'var(--hcd-body)' }}>Time</div>
                  <div className="fw-bold small" style={{ color: 'var(--hcd-charcoal)' }}>{item.time}</div>
                </div>
              </Col>
              <Col xs={6} md={3}>
                <div className="p-2 rounded border text-center" style={{ backgroundColor: 'var(--hcd-light-bg)', borderColor: 'var(--hcd-border)', borderRadius: '10px' }}>
                  <div className="small fw-semibold text-uppercase" style={{ fontSize: '0.7rem', color: 'var(--hcd-body)' }}>Venue</div>
                  <div className="fw-bold small" style={{ color: 'var(--hcd-charcoal)' }}>{item.room}</div>
                </div>
              </Col>
              <Col xs={6} md={3}>
                <div className="p-2 rounded border text-center" style={{ backgroundColor: 'var(--hcd-light-bg)', borderColor: 'var(--hcd-border)', borderRadius: '10px' }}>
                  <div className="small fw-semibold text-uppercase" style={{ fontSize: '0.7rem', color: 'var(--hcd-body)' }}>Seats</div>
                  <div className="fw-bold small" style={{ color: 'var(--hcd-charcoal)' }}>{item.attendeesCount} / {item.capacity}</div>
                </div>
              </Col>
            </Row>

            <div className="mb-4">
              <h6 className="fw-bold text-uppercase small" style={{ letterSpacing: '0.04em', color: 'var(--hcd-body)' }}>Session Overview</h6>
              <p style={{ color: 'var(--hcd-charcoal)', lineHeight: 1.6 }}>{item.description}</p>
            </div>

            <div className="mb-4">
              <h6 className="fw-bold text-uppercase small" style={{ letterSpacing: '0.04em', color: 'var(--hcd-body)' }}>Speaker / Host</h6>
              <div className="fw-semibold" style={{ color: 'var(--hcd-charcoal)' }}>{item.speaker}</div>
            </div>

            <div className="mb-4">
              <h6 className="fw-bold text-uppercase small" style={{ letterSpacing: '0.04em', color: 'var(--hcd-body)' }}>Faculty & TA Contacts</h6>
              <Row className="g-2">
                <Col md={6}>
                  <Card className="border p-3" style={{ backgroundColor: 'var(--hcd-light-bg)', borderColor: 'var(--hcd-border)', borderRadius: '12px' }}>
                    <div className="fw-bold" style={{ color: 'var(--hcd-charcoal)' }}>{item.facultyContact.name}</div>
                    <div className="small" style={{ color: 'var(--hcd-body)' }}>{item.facultyContact.role}</div>
                    <a href={`mailto:${item.facultyContact.email}`} className="small text-decoration-none mt-1 d-inline-flex align-items-center gap-1" style={{ color: 'var(--hcd-cyan)' }}>
                      <i className="bi bi-envelope"></i>
                      <span>{item.facultyContact.email}</span>
                    </a>
                  </Card>
                </Col>
                {item.taContact && (
                  <Col md={6}>
                    <Card className="border p-3" style={{ backgroundColor: 'var(--hcd-light-bg)', borderColor: 'var(--hcd-border)', borderRadius: '12px' }}>
                      <div className="fw-bold" style={{ color: 'var(--hcd-charcoal)' }}>{item.taContact.name}</div>
                      <div className="small" style={{ color: 'var(--hcd-body)' }}>{item.taContact.role}</div>
                      <a href={`mailto:${item.taContact.email}`} className="small text-decoration-none mt-1 d-inline-flex align-items-center gap-1" style={{ color: 'var(--hcd-cyan)' }}>
                        <i className="bi bi-envelope"></i>
                        <span>{item.taContact.email}</span>
                      </a>
                    </Card>
                  </Col>
                )}
              </Row>
            </div>

            <div className="pt-3 border-top d-flex justify-content-between align-items-center" style={{ borderColor: 'var(--hcd-border)' }}>
              <Button 
                variant={item.isRsvp ? "success" : "primary"}
                onClick={() => onRsvpToggle(item.id)}
                className="d-inline-flex align-items-center gap-2 fw-semibold px-3"
              >
                <i className={item.isRsvp ? "bi bi-check-circle-fill" : "bi bi-bookmark-plus"}></i>
                <span>{item.isRsvp ? "RSVP Confirmed" : "RSVP for this Session"}</span>
              </Button>
              <Button variant="secondary" onClick={onClose}>
                Close
              </Button>
            </div>
          </div>
        )}

        {/* PROJECT TYPE */}
        {type === 'project' && (
          <div>
            <Row className="g-2 mb-4">
              <Col xs={6} md={3}>
                <div className="p-2 rounded border text-center" style={{ backgroundColor: 'var(--hcd-light-bg)', borderColor: 'var(--hcd-border)', borderRadius: '10px' }}>
                  <div className="small fw-semibold text-uppercase" style={{ fontSize: '0.7rem', color: 'var(--hcd-body)' }}>Supervisor</div>
                  <div className="fw-bold small" style={{ color: 'var(--hcd-charcoal)' }}>{item.supervisor}</div>
                </div>
              </Col>
              <Col xs={6} md={3}>
                <div className="p-2 rounded border text-center" style={{ backgroundColor: 'var(--hcd-light-bg)', borderColor: 'var(--hcd-border)', borderRadius: '10px' }}>
                  <div className="small fw-semibold text-uppercase" style={{ fontSize: '0.7rem', color: 'var(--hcd-body)' }}>Lab Affiliation</div>
                  <div className="fw-bold small" style={{ color: 'var(--hcd-charcoal)' }}>{item.labAffiliation || 'HCD Dept'}</div>
                </div>
              </Col>
              <Col xs={6} md={3}>
                <div className="p-2 rounded border text-center" style={{ backgroundColor: 'var(--hcd-light-bg)', borderColor: 'var(--hcd-border)', borderRadius: '10px' }}>
                  <div className="small fw-semibold text-uppercase" style={{ fontSize: '0.7rem', color: 'var(--hcd-body)' }}>Open Roles</div>
                  <div className="fw-bold small" style={{ color: 'var(--hcd-charcoal)' }}>{item.openRoles || 'N/A'}</div>
                </div>
              </Col>
              <Col xs={6} md={3}>
                <div className="p-2 rounded border text-center" style={{ backgroundColor: 'var(--hcd-light-bg)', borderColor: 'var(--hcd-border)', borderRadius: '10px' }}>
                  <div className="small fw-semibold text-uppercase" style={{ fontSize: '0.7rem', color: 'var(--hcd-body)' }}>Timeline</div>
                  <div className="fw-bold small" style={{ color: 'var(--hcd-charcoal)' }}>{item.duration}</div>
                </div>
              </Col>
            </Row>

            <div className="mb-4">
              <h6 className="fw-bold text-uppercase small" style={{ letterSpacing: '0.04em', color: 'var(--hcd-body)' }}>Project Abstract</h6>
              <p style={{ color: 'var(--hcd-charcoal)', lineHeight: 1.6 }}>{item.description}</p>
            </div>

            <div className="mb-4">
              <h6 className="fw-bold text-uppercase small" style={{ letterSpacing: '0.04em', color: 'var(--hcd-body)' }}>Required Skills & Tech</h6>
              <div className="d-flex flex-wrap gap-1">
                {item.skillsRequired.map((skill, idx) => (
                  <span key={idx} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-top d-flex justify-content-between align-items-center" style={{ borderColor: 'var(--hcd-border)' }}>
              {item.status !== 'Closed' && (
                <Button 
                  variant="primary"
                  onClick={() => {
                    onClose();
                    onOpenCollab(item);
                  }}
                  className="d-inline-flex align-items-center gap-2 fw-semibold px-3"
                >
                  <i className="bi bi-send"></i>
                  <span>Apply to Collaborate</span>
                </Button>
              )}
              <a 
                href={`mailto:${item.supervisorEmail}`} 
                className="btn btn-secondary d-inline-flex align-items-center gap-2 ms-auto"
              >
                <i className="bi bi-envelope"></i>
                <span>Email PI ({item.supervisorEmail})</span>
              </a>
            </div>
          </div>
        )}

        {/* LAB TYPE */}
        {type === 'lab' && (
          <div>
            {/* Quick Location & Directory Overview Strip */}
            <div 
              className="p-3 mb-4 rounded-3 border d-flex align-items-center justify-content-between flex-wrap gap-2"
              style={{ backgroundColor: 'var(--hcd-light-bg)', borderColor: 'var(--hcd-border)' }}
            >
              <div className="d-flex align-items-center gap-2">
                <i className="bi bi-geo-alt-fill" style={{ color: 'var(--hcd-cyan)', fontSize: '1.1rem' }}></i>
                <div>
                  <div className="small text-muted lh-1" style={{ fontSize: '0.72rem' }}>Location</div>
                  <div className="fw-bold small" style={{ color: 'var(--hcd-charcoal)' }}>
                    Room {item.room} · R&D Building (4th Floor)
                  </div>
                </div>
              </div>

              <div className="d-flex align-items-center gap-2">
                <i className="bi bi-card-text text-muted" style={{ fontSize: '1.1rem' }}></i>
                <div>
                  <div className="small text-muted lh-1" style={{ fontSize: '0.72rem' }}>Directory Source</div>
                  <div className="fw-semibold small" style={{ color: 'var(--hcd-charcoal)' }}>
                    CDNM Signboard ({item.room})
                  </div>
                </div>
              </div>
            </div>

            {/* Research Focus & Scope */}
            <div className="mb-4">
              <h6 className="fw-bold text-uppercase small mb-2" style={{ letterSpacing: '0.04em', color: '#8E9A9F', fontSize: '0.72rem' }}>
                Research Focus & Scope
              </h6>
              <div 
                className="p-3 rounded-3 border fw-semibold small mb-2"
                style={{ backgroundColor: '#F0FAFA', borderColor: '#CDEEF1', color: '#12686E', fontSize: '0.85rem' }}
              >
                <i className="bi bi-lightbulb-fill me-1.5" style={{ color: 'var(--hcd-cyan)' }}></i>
                {item.theme}
              </div>
              <p style={{ color: 'var(--hcd-charcoal)', lineHeight: 1.6, fontSize: '0.88rem' }}>
                {item.description}
              </p>
            </div>

            {/* FACULTY LEAD & CONTACT DETAILS */}
            <div className="mb-4">
              <h6 className="fw-bold text-uppercase small mb-2" style={{ letterSpacing: '0.04em', color: '#8E9A9F', fontSize: '0.72rem' }}>
                Faculty Lead & Office Details
              </h6>
              
              <Card 
                className="border p-3.5 rounded-3" 
                style={{ 
                  backgroundColor: 'var(--hcd-white)', 
                  borderColor: 'var(--hcd-border)',
                  boxShadow: '0 1px 3px rgba(32, 43, 46, 0.03)'
                }}
              >
                {/* Faculty Lead Row with Cyan-and-White Profile Icon */}
                <div className="d-flex align-items-start gap-3 mb-3">
                  <div 
                    className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                    style={{ 
                      width: '46px', 
                      height: '46px', 
                      backgroundColor: 'var(--hcd-cyan)', 
                      color: '#FFFFFF',
                      boxShadow: '0 2px 6px rgba(41, 182, 190, 0.3)'
                    }}
                    aria-label="Faculty profile"
                  >
                    <i className="bi bi-person-fill" style={{ fontSize: '1.45rem', color: '#FFFFFF' }}></i>
                  </div>
                  <div className="flex-grow-1 min-w-0">
                    <div className="d-flex align-items-center gap-2 flex-wrap">
                      <div className="fw-bold fs-5 mb-0" style={{ color: 'var(--hcd-charcoal)' }}>
                        {item.director}
                      </div>
                      {item.isLeadConfirmed ? (
                        <span className="badge rounded-pill" style={{ backgroundColor: '#ECFDF5', color: '#059669', fontSize: '0.7rem' }}>
                          ● Confirmed Lead
                        </span>
                      ) : (
                        <span className="badge rounded-pill" style={{ backgroundColor: '#F1F5F9', color: '#64748B', fontSize: '0.7rem' }}>
                          Assignment to be confirmed
                        </span>
                      )}
                    </div>
                    <div className="small text-muted mt-0.5" style={{ fontSize: '0.82rem' }}>
                      {item.directorRole}
                    </div>
                  </div>
                </div>

                {/* Office Location & Office Hours Grid */}
                <Row className="g-2 mb-3">
                  <Col sm={6}>
                    <div className="p-2.5 rounded border" style={{ backgroundColor: 'var(--hcd-light-bg)', borderColor: 'var(--hcd-border)' }}>
                      <div className="small text-muted lh-1 mb-1" style={{ fontSize: '0.72rem' }}>Office Location</div>
                      <div className="fw-semibold small d-flex align-items-center gap-1.5" style={{ color: 'var(--hcd-charcoal)' }}>
                        <i className="bi bi-door-closed" style={{ color: 'var(--hcd-cyan)' }}></i>
                        <span>{item.office || 'Information to be confirmed'}</span>
                      </div>
                    </div>
                  </Col>
                  <Col sm={6}>
                    <div className="p-2.5 rounded border" style={{ backgroundColor: 'var(--hcd-light-bg)', borderColor: 'var(--hcd-border)' }}>
                      <div className="small text-muted lh-1 mb-1" style={{ fontSize: '0.72rem' }}>Office Hours</div>
                      <div className="fw-semibold small d-flex align-items-center gap-1.5" style={{ color: 'var(--hcd-charcoal)' }}>
                        <i className="bi bi-clock" style={{ color: 'var(--hcd-cyan)' }}></i>
                        <span>{item.officeHours || 'Information to be confirmed'}</span>
                      </div>
                    </div>
                  </Col>
                </Row>

                {/* Research Expertise Chips */}
                {item.expertise && item.expertise.length > 0 && (
                  <div className="mb-3">
                    <div className="small fw-semibold text-muted mb-1.5" style={{ fontSize: '0.75rem' }}>
                      Research Expertise:
                    </div>
                    <div className="d-flex flex-wrap gap-1">
                      {item.expertise.map((exp, idx) => (
                        <span key={idx} className="skill-pill" style={{ fontSize: '0.74rem' }}>
                          {exp}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Official Contact / Mailto */}
                <div className="pt-2 border-top d-flex align-items-center justify-content-between flex-wrap gap-2" style={{ borderColor: 'var(--hcd-border)' }}>
                  <div className="d-flex align-items-center gap-2">
                    <span className="small text-muted" style={{ fontSize: '0.78rem' }}>Official Email:</span>
                    {item.email ? (
                      <a 
                        href={`mailto:${item.email}`}
                        className="fw-semibold small d-inline-flex align-items-center gap-1 text-decoration-none"
                        style={{ color: 'var(--hcd-cyan)' }}
                      >
                        <i className="bi bi-envelope-fill"></i>
                        <span>{item.email}</span>
                      </a>
                    ) : (
                      <span className="small text-muted fst-italic" style={{ fontSize: '0.8rem' }}>
                        Information to be confirmed
                      </span>
                    )}
                  </div>
                </div>
              </Card>
            </div>

            {/* Visit Notice Reminder inside Modal */}
            <div 
              className="p-3 mb-4 rounded-3 border d-flex align-items-start gap-2.5"
              style={{ backgroundColor: '#F0FAFA', borderColor: '#CDEEF1', color: '#12686E', fontSize: '0.82rem' }}
            >
              <i className="bi bi-info-circle-fill flex-shrink-0 mt-0.5" style={{ color: 'var(--hcd-cyan)' }}></i>
              <div>
                <strong>Student Visit Notice:</strong> Students are requested to email the concerned professor before visiting their office and confirm availability in advance.
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-3 border-top d-flex justify-content-between align-items-center" style={{ borderColor: 'var(--hcd-border)' }}>
              {item.email ? (
                <a 
                  href={`mailto:${item.email}`} 
                  className="btn btn-primary d-inline-flex align-items-center gap-2 fw-semibold px-3"
                  style={{ backgroundColor: 'var(--hcd-cyan)', borderColor: 'var(--hcd-cyan)' }}
                >
                  <i className="bi bi-envelope-fill"></i>
                  <span>Email Faculty Lead ({item.email})</span>
                </a>
              ) : (
                <span className="small text-muted fst-italic">
                  Email will be listed upon faculty assignment verification
                </span>
              )}
              <Button variant="secondary" onClick={onClose}>
                Close
              </Button>
            </div>
          </div>
        )}

        {/* FACULTY TYPE */}
        {type === 'faculty' && (
          <div>
            <Row className="g-2 mb-4">
              <Col xs={6} md={3}>
                <div className="p-2 rounded border text-center" style={{ backgroundColor: 'var(--hcd-light-bg)', borderColor: 'var(--hcd-border)', borderRadius: '10px' }}>
                  <div className="small fw-semibold text-uppercase" style={{ fontSize: '0.7rem', color: 'var(--hcd-body)' }}>Office Location</div>
                  <div className="fw-bold small" style={{ color: 'var(--hcd-charcoal)' }}>{item.office}</div>
                </div>
              </Col>
              <Col xs={6} md={3}>
                <div className="p-2 rounded border text-center" style={{ backgroundColor: 'var(--hcd-light-bg)', borderColor: 'var(--hcd-border)', borderRadius: '10px' }}>
                  <div className="small fw-semibold text-uppercase" style={{ fontSize: '0.7rem', color: 'var(--hcd-body)' }}>Office Hours</div>
                  <div className="fw-bold small" style={{ color: 'var(--hcd-charcoal)' }}>{item.officeHours || 'By Appointment'}</div>
                </div>
              </Col>
              <Col xs={6} md={3}>
                <div className="p-2 rounded border text-center" style={{ backgroundColor: 'var(--hcd-light-bg)', borderColor: 'var(--hcd-border)', borderRadius: '10px' }}>
                  <div className="small fw-semibold text-uppercase" style={{ fontSize: '0.7rem', color: 'var(--hcd-body)' }}>Building</div>
                  <div className="fw-bold small" style={{ color: 'var(--hcd-charcoal)' }}>R&D (4th Floor)</div>
                </div>
              </Col>
              <Col xs={6} md={3}>
                <div className="p-2 rounded border text-center" style={{ backgroundColor: 'var(--hcd-light-bg)', borderColor: 'var(--hcd-border)', borderRadius: '10px' }}>
                  <div className="small fw-semibold text-uppercase" style={{ fontSize: '0.7rem', color: 'var(--hcd-body)' }}>Affiliated Lab</div>
                  <div className="fw-bold small" style={{ color: 'var(--hcd-charcoal)' }}>{item.labAffiliation || 'HCD Dept'}</div>
                </div>
              </Col>
            </Row>

            {/* Visit notice banner */}
            <div 
              className="p-3 mb-4 rounded border d-flex align-items-center gap-2"
              style={{ backgroundColor: '#EFF6FF', borderColor: '#BFDBFE', color: '#1E40AF', fontSize: '0.825rem' }}
            >
              <i className="bi bi-info-circle-fill flex-shrink-0 fs-6"></i>
              <div>
                <strong>Visiting Notice:</strong> Students are requested to email the professor in advance to arrange an appointment before visiting their office.
              </div>
            </div>

            <div className="mb-4">
              <h6 className="fw-bold text-uppercase small" style={{ letterSpacing: '0.04em', color: 'var(--hcd-body)' }}>Academic Profile & Focus</h6>
              <p style={{ color: 'var(--hcd-charcoal)', lineHeight: 1.6 }}>{item.bio}</p>
            </div>

            <div className="mb-4">
              <h6 className="fw-bold text-uppercase small" style={{ letterSpacing: '0.04em', color: 'var(--hcd-body)' }}>Research Expertise</h6>
              <div className="d-flex flex-wrap gap-1">
                {(item.expertise || []).map((exp, idx) => (
                  <span key={idx} className="skill-tag">
                    {exp}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-top d-flex justify-content-between align-items-center" style={{ borderColor: 'var(--hcd-border)' }}>
              <a 
                href={`mailto:${item.email}`} 
                className="btn btn-primary d-inline-flex align-items-center gap-2 fw-semibold px-3"
              >
                <i className="bi bi-envelope-fill"></i>
                <span>Email Professor ({item.email})</span>
              </a>
              <Button variant="secondary" onClick={onClose}>
                Close
              </Button>
            </div>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
}
