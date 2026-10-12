import React from 'react';
import { Card, Badge, Button } from 'react-bootstrap';

export default function LabCard({ lab, onSelectLab }) {
  const isDemo = !lab.isVerified || lab.isDemo;

  return (
    <Card className="h-100 hcd-card d-flex flex-column">
      <Card.Body className="p-4 d-flex flex-column">

        {/* TOP ROW: Room Code & Verification Status */}
        <div className="d-flex align-items-center justify-content-between gap-2 flex-wrap mb-3">
          {/* Room code chip — clay style */}
          <div
            className="d-inline-flex align-items-center gap-1 font-monospace fw-bold"
            style={{
              background: 'linear-gradient(135deg, var(--hcd-charcoal) 0%, #2D3B3F 100%)',
              color: '#FFFFFF',
              borderRadius: '8px',
              padding: '0.3rem 0.7rem',
              fontSize: '0.78rem',
              letterSpacing: '0.03em',
              boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.1), 0 2px 6px rgba(32,43,46,0.25)'
            }}
          >
            <i className="bi bi-door-closed-fill" style={{ fontSize: '0.72rem', opacity: 0.75 }} aria-hidden="true"></i>
            {lab.code}
          </div>

          {isDemo ? (
            <Badge
              bg="warning-subtle"
              className="text-warning-emphasis border border-warning-subtle d-inline-flex align-items-center gap-1"
              title={lab.verificationNote}
            >
              <i className="bi bi-exclamation-triangle-fill" style={{ fontSize: '0.62rem' }} aria-hidden="true"></i>
              <span>To confirm</span>
            </Badge>
          ) : (
            <Badge
              bg="success-subtle"
              className="text-success-emphasis border border-success-subtle d-inline-flex align-items-center gap-1"
              title={lab.verificationNote}
            >
              <i className="bi bi-shield-fill-check" style={{ fontSize: '0.62rem' }} aria-hidden="true"></i>
              <span>Verified</span>
            </Badge>
          )}
        </div>

        {/* LAB NAME */}
        <Card.Title
          className="fw-bold mb-2 line-clamp-2"
          onClick={() => onSelectLab(lab)}
          style={{
            cursor: 'pointer',
            color: 'var(--hcd-charcoal)',
            lineHeight: 1.3,
            fontSize: '1.05rem',
            letterSpacing: '-0.015em'
          }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter') onSelectLab(lab); }}
          aria-label={`View details for ${lab.name}`}
        >
          {lab.name}
        </Card.Title>

        {/* RESEARCH THEME BADGE */}
        <div className="mb-3">
          <span
            className="badge badge-category d-inline-flex align-items-center gap-1"
            style={{ fontSize: '0.74rem', padding: '0.35rem 0.7rem', maxWidth: '100%', whiteSpace: 'normal', textAlign: 'left' }}
          >
            <i className="bi bi-compass-fill" style={{ color: 'var(--hcd-cyan)', flexShrink: 0 }} aria-hidden="true"></i>
            <span>{lab.theme}</span>
          </span>
        </div>

        {/* METADATA STACK */}
        <div className="metadata-stack mb-3">
          <div className="metadata-row">
            <i className="bi bi-geo-alt-fill" aria-hidden="true"></i>
            <span style={{ color: 'var(--hcd-body)', fontSize: '0.82rem' }}>Location:</span>
            <span className="fw-semibold" style={{ color: 'var(--hcd-charcoal)' }}>{lab.room}</span>
          </div>

          <div className="metadata-row">
            <i className="bi bi-person-fill" aria-hidden="true"></i>
            <span style={{ color: 'var(--hcd-body)', fontSize: '0.82rem' }}>Director:</span>
            <span
              className="fw-semibold"
              style={{
                color: lab.isLeadConfirmed ? 'var(--hcd-charcoal)' : '#7C8A90',
                fontStyle: lab.isLeadConfirmed ? 'normal' : 'italic'
              }}
            >
              {lab.director}
            </span>
          </div>

          {lab.directorRole && (
            <div className="metadata-row" style={{ paddingLeft: '32px' }}>
              <span style={{ color: 'var(--hcd-body)', fontSize: '0.78rem', fontStyle: 'italic' }}>
                {lab.directorRole}
              </span>
            </div>
          )}
        </div>

        {/* DESCRIPTION */}
        <Card.Text
          className="line-clamp-2 mb-3"
          style={{ color: 'var(--hcd-body)', lineHeight: 1.65, fontSize: '0.85rem' }}
        >
          {lab.description}
        </Card.Text>

        {/* EQUIPMENT CHIPS */}
        <div className="mb-3">
          <div
            className="d-flex align-items-center gap-1 mb-2"
            style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--hcd-body)' }}
          >
            <i className="bi bi-cpu-fill" style={{ color: 'var(--hcd-cyan)', fontSize: '0.82rem' }} aria-hidden="true"></i>
            <span>Key Equipment</span>
          </div>
          <div className="d-flex flex-wrap gap-1">
            {lab.equipment.slice(0, 3).map((item, idx) => (
              <span key={idx} className="skill-tag">
                {item}
              </span>
            ))}
            {lab.equipment.length > 3 && (
              <span
                className="skill-tag"
                style={{ background: 'rgba(229,233,235,0.8)', color: 'var(--hcd-charcoal)', fontStyle: 'italic' }}
              >
                +{lab.equipment.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* BOTTOM ACTIONS */}
        <div
          className="mt-auto pt-3 d-flex justify-content-between align-items-center gap-2"
          style={{ borderTop: '1px solid rgba(221,227,230,0.7)' }}
        >
          {/* Researcher count chip */}
          <div
            className="d-flex align-items-center gap-2"
            style={{
              background: 'linear-gradient(135deg, rgba(235,248,249,0.7) 0%, rgba(243,245,246,0.5) 100%)',
              border: '1px solid rgba(41,182,190,0.15)',
              borderRadius: '8px',
              padding: '0.3rem 0.65rem',
            }}
          >
            <i className="bi bi-people-fill" style={{ color: 'var(--hcd-cyan)', fontSize: '0.9rem' }} aria-hidden="true"></i>
            <span style={{ fontSize: '0.8rem', color: 'var(--hcd-body)', fontWeight: 600 }}>
              <strong style={{ color: 'var(--hcd-charcoal)' }}>{lab.studentCount}</strong>
              <span style={{ fontWeight: 400 }}> Researchers</span>
            </span>
          </div>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => onSelectLab(lab)}
            className="d-inline-flex align-items-center gap-1"
            style={{ borderRadius: '9px', paddingLeft: '0.7rem', paddingRight: '0.7rem', fontSize: '0.825rem' }}
            aria-label={`View details for ${lab.name}`}
          >
            <span>View Details</span>
            <i className="bi bi-arrow-right" aria-hidden="true"></i>
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
