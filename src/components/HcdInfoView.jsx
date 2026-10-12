import React, { useState, useMemo } from 'react';
import { Row, Col, Card, Form, InputGroup, Button } from 'react-bootstrap';

export default function HcdInfoView({
  labs = [],
  searchQuery = '',
  onSelectLab
}) {
  const [labSearch, setLabSearch] = useState('');

  // Combine global topbar search query with local directory search
  const effectiveQuery = (labSearch || searchQuery).trim().toLowerCase();

  // Filter laboratories by name, room, theme, or faculty director
  const filteredLabs = useMemo(() => {
    return labs.filter(lab => {
      if (!effectiveQuery) return true;
      const matchName = lab.name?.toLowerCase().includes(effectiveQuery);
      const matchShortName = lab.shortName?.toLowerCase().includes(effectiveQuery);
      const matchRoom = lab.room?.toLowerCase().includes(effectiveQuery);
      const matchTheme = lab.theme?.toLowerCase().includes(effectiveQuery);
      const matchDirector = lab.director?.toLowerCase().includes(effectiveQuery);
      const matchExpertise = lab.expertise?.some(e => e.toLowerCase().includes(effectiveQuery));
      return matchName || matchShortName || matchRoom || matchTheme || matchDirector || matchExpertise;
    });
  }, [labs, effectiveQuery]);

  return (
    <div className="hcd-info-page py-2 pb-5">
      {/* =========================================================
          A. DEPARTMENT LOCATION & PAGE HEADING
          (Compact, balanced, no oversized "LEVEL 04")
         ========================================================= */}
      <div className="mb-4">
        {/* Location pill — uses hcd-location-pill CSS class */}
        <div className="d-none d-sm-flex align-items-center gap-2 mb-3">
          <span className="hcd-location-pill">
            <i className="bi bi-buildings-fill" style={{ color: 'var(--hcd-cyan)', fontSize: '0.78rem' }} aria-hidden="true"></i>
            <span style={{ fontSize: '0.72rem', letterSpacing: '0.03em', color: 'var(--hcd-charcoal)', fontWeight: 700 }}>HCD Department</span>
            <span style={{ color: 'rgba(32,43,46,0.2)', fontWeight: 300 }}>·</span>
            <i className="bi bi-geo-alt-fill" style={{ color: 'var(--hcd-cyan)', fontSize: '0.75rem' }} aria-hidden="true"></i>
            <span style={{ fontSize: '0.72rem', color: '#15797F', fontWeight: 600 }}>4th Floor · R&D Building · IIIT Delhi</span>
          </span>
        </div>

        {/* Page Title & Subtitle */}
        <h1
          style={{ color: 'var(--hcd-charcoal)', letterSpacing: '-0.03em', lineHeight: 1.15, fontSize: '1.8rem', fontWeight: 800 }}
          className="mb-2"
        >
          HCD Information
        </h1>
        <p style={{ fontSize: '0.92rem', maxWidth: '600px', lineHeight: 1.65, color: 'var(--hcd-body)', margin: 0 }}>
          Explore the HCD Department's research laboratories, faculty directory, and research areas at IIIT Delhi.
        </p>
      </div>

      {/* =========================================================
          B. FACULTY VISIT NOTICE BANNER
         ========================================================= */}
      {/* Notice banner — glassmorphism tinted */}
      <div
        className="hcd-notice-banner p-3 p-md-4 mb-4 d-flex gap-3 align-items-center"
        role="region"
        aria-label="Faculty Visit Notice"
      >
        {/* Icon circle — clay style */}
        <div className="hcd-notice-icon-wrap" aria-hidden="true">
          <i className="bi bi-envelope-check-fill" style={{ fontSize: '1.1rem' }}></i>
        </div>

        <div className="min-w-0 flex-grow-1">
          <div
            className="fw-bold mb-1 d-flex align-items-center gap-2"
            style={{ color: '#12686E', fontSize: '0.88rem', letterSpacing: '-0.01em' }}
          >
            <i className="bi bi-info-circle-fill" style={{ fontSize: '0.8rem', color: 'var(--hcd-cyan)' }} aria-hidden="true"></i>
            Faculty Visit Notice
          </div>
          <p className="mb-0" style={{ color: 'var(--hcd-charcoal)', lineHeight: 1.6, fontSize: '0.84rem' }}>
            Students are requested to email the concerned professor before visiting their office.
            Please arrange your visit by email and confirm the professor's availability in advance.
          </p>
        </div>
      </div>

      {/* =========================================================
          C. LABORATORY DIRECTORY HEADING & SEARCH
         ========================================================= */}
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-2 mb-3">
        <div>
          <h2
            style={{ color: 'var(--hcd-charcoal)', fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '4px' }}
          >
            Laboratory Directory
          </h2>
          <p style={{ fontSize: '0.82rem', color: 'var(--hcd-body)', margin: 0, lineHeight: 1.5 }}>
            5 research laboratories on the 4th Floor · CDNM Building Sign
          </p>
        </div>

        <div style={{ maxWidth: '300px', width: '100%' }}>
          <InputGroup size="sm">
            <InputGroup.Text className="bg-white border-end-0 text-muted" style={{ borderColor: 'var(--hcd-border)' }}>
              <i className="bi bi-search"></i>
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Search by name, room, area..."
              value={labSearch}
              onChange={(e) => setLabSearch(e.target.value)}
              className="border-start-0 ps-0"
              style={{ borderColor: 'var(--hcd-border)', fontSize: '0.85rem' }}
              aria-label="Search laboratory directory"
            />
            {labSearch && (
              <Button 
                variant="outline-secondary" 
                onClick={() => setLabSearch('')}
                className="border-start-0"
                style={{ borderColor: 'var(--hcd-border)' }}
                aria-label="Clear directory search"
              >
                <i className="bi bi-x"></i>
              </Button>
            )}
          </InputGroup>
        </div>
      </div>

      {/* =========================================================
          D. LABORATORY CARDS
          (Spacious 2-column on desktop, single-column on mobile)
         ========================================================= */}
      {filteredLabs.length === 0 ? (
        <Card className="p-4 text-center border bg-white rounded-4 shadow-sm" style={{ borderColor: 'var(--hcd-border)' }}>
          <div className="text-muted mb-2">
            <i className="bi bi-search fs-2"></i>
          </div>
          <p className="small text-muted mb-2">
            No laboratories match your query "{effectiveQuery}".
          </p>
          <div>
            <Button size="sm" variant="secondary" onClick={() => setLabSearch('')}>
              Clear Search
            </Button>
          </div>
        </Card>
      ) : (
        <Row xs={1} lg={2} className="g-3 g-md-4">
          {filteredLabs.map((lab) => (
            <Col key={lab.id}>
              <Card 
                className="h-100 border bg-white hcd-lab-directory-card"
                style={{ 
                  borderRadius: '18px', 
                  borderColor: 'var(--hcd-border)',
                  boxShadow: '0 1px 4px rgba(32, 43, 46, 0.04)',
                  transition: 'all 0.2s ease',
                  overflow: 'hidden'
                }}
              >
                <Card.Body className="p-3.5 p-md-4 d-flex flex-column">
                  {/* Top Row: Room-number badge & Directory status indicator */}
                  <div className="d-flex align-items-center justify-content-between gap-2 mb-2.5 flex-wrap">
                    <span 
                      className="badge rounded-pill fw-semibold border d-inline-flex align-items-center gap-1.5"
                      style={{ 
                        backgroundColor: '#EBF8F9', 
                        color: '#15797F', 
                        borderColor: '#BCE7EA', 
                        fontSize: '0.76rem',
                        padding: '0.35rem 0.75rem'
                      }}
                    >
                      <i className="bi bi-door-closed-fill" style={{ color: 'var(--hcd-cyan)' }}></i>
                      <span>Room {lab.room}</span>
                    </span>

                    <span 
                      className="badge rounded-pill fw-medium"
                      style={{
                        backgroundColor: lab.isLeadConfirmed ? '#ECFDF5' : '#F8FAFC',
                        color: lab.isLeadConfirmed ? '#059669' : '#64748B',
                        borderColor: lab.isLeadConfirmed ? '#A7F3D0' : '#E2E8F0',
                        fontSize: '0.7rem',
                        padding: '0.25rem 0.55rem'
                      }}
                    >
                      {lab.isLeadConfirmed ? (
                        <>
                          <i className="bi bi-check-circle-fill me-1"></i>
                          <span>Lead Verified</span>
                        </>
                      ) : (
                        <span>Directory Listing</span>
                      )}
                    </span>
                  </div>

                  {/* Laboratory Name */}
                  <h3 
                    className="fs-5 fw-bold mb-2" 
                    style={{ 
                      color: 'var(--hcd-charcoal)', 
                      lineHeight: 1.35, 
                      letterSpacing: '-0.01em',
                      wordBreak: 'break-word'
                    }}
                  >
                    {lab.name}
                  </h3>

                  {/* Research Area Description */}
                  <div className="mb-3 flex-grow-1">
                    <p
                      className="mb-0"
                      style={{ lineHeight: 1.62, fontSize: '0.84rem', color: 'var(--hcd-body)' }}
                    >
                      {lab.theme}
                    </p>
                  </div>

                  {/* Faculty Lead Row with Cyan-and-White Profile Icon + View Details Action */}
                  <div 
                    className="pt-3 border-top d-flex align-items-center justify-content-between flex-wrap gap-2 mt-auto"
                    style={{ borderColor: 'var(--hcd-border)' }}
                  >
                    <div className="d-flex align-items-center gap-2 min-w-0" style={{ flex: '1 1 160px' }}>
                      {/* Cyan-and-White Faculty Icon with High Contrast */}
                      <div 
                        className="d-inline-flex align-items-center justify-content-center rounded-circle flex-shrink-0"
                        style={{
                          width: '32px',
                          height: '32px',
                          backgroundColor: 'var(--hcd-cyan)',
                          color: '#FFFFFF',
                          boxShadow: '0 2px 5px rgba(41, 182, 190, 0.25)'
                        }}
                        aria-hidden="true"
                      >
                        <i className="bi bi-person-fill" style={{ fontSize: '0.95rem', color: '#FFFFFF' }}></i>
                      </div>

                      <div className="min-w-0 flex-grow-1">
                        <div className="text-muted lh-1" style={{ fontSize: '0.72rem' }}>
                          Faculty lead:
                        </div>
                        <div 
                          className="fw-semibold text-truncate mt-0.5"
                          style={{ 
                            fontSize: '0.84rem',
                            color: lab.isLeadConfirmed ? 'var(--hcd-charcoal)' : '#7C8A90',
                            fontStyle: lab.isLeadConfirmed ? 'normal' : 'italic'
                          }}
                        >
                          {lab.director}
                        </div>
                      </div>
                    </div>

                    {/* View Details Action Button */}
                    <Button
                      variant="light"
                      size="sm"
                      onClick={() => onSelectLab && onSelectLab(lab)}
                      className="btn-details-slim fw-semibold d-inline-flex align-items-center gap-1.5 flex-shrink-0"
                      style={{
                        backgroundColor: 'var(--hcd-light-bg)',
                        borderColor: 'var(--hcd-border)',
                        color: 'var(--hcd-charcoal)',
                        borderRadius: '10px',
                        fontSize: '0.8rem',
                        padding: '0.4rem 0.85rem'
                      }}
                      aria-label={`View details for ${lab.name}`}
                    >
                      <span>View details</span>
                      <i className="bi bi-arrow-right" style={{ color: 'var(--hcd-cyan)' }}></i>
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}
