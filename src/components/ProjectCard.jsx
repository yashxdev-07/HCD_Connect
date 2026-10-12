import React from 'react';
import { Card, Badge, Button } from 'react-bootstrap';

export default function ProjectCard({ project, onOpenCollab, onSelectProject }) {
  const isDemo = !project.isVerified || project.isDemo;

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Open':
        return (
          <Badge
            bg="success-subtle"
            className="text-success-emphasis border border-success-subtle d-inline-flex align-items-center gap-1"
          >
            <span
              style={{ width: '6px', height: '6px', borderRadius: '50%', display: 'inline-block', background: '#059669' }}
              aria-hidden="true"
            />
            Collab Open
          </Badge>
        );
      case 'Limited':
        return (
          <Badge
            bg="warning-subtle"
            className="text-warning-emphasis border border-warning-subtle d-inline-flex align-items-center gap-1"
          >
            <i className="bi bi-exclamation-circle-fill" style={{ fontSize: '0.6rem' }} aria-hidden="true"></i>
            Limited Spots
          </Badge>
        );
      case 'Closed':
        return (
          <Badge
            bg="secondary-subtle"
            className="text-secondary-emphasis border border-secondary-subtle d-inline-flex align-items-center gap-1"
          >
            <i className="bi bi-lock-fill" style={{ fontSize: '0.6rem' }} aria-hidden="true"></i>
            Team Full
          </Badge>
        );
      default:
        return <Badge bg="light" text="dark">{status}</Badge>;
    }
  };

  return (
    <Card className="h-100 hcd-card d-flex flex-column">
      <Card.Body className="p-4 d-flex flex-column">

        {/* TOP ROW: Badges */}
        <div className="d-flex align-items-center justify-content-between gap-2 flex-wrap mb-3">
          <div className="d-flex align-items-center gap-1 flex-wrap">
            <span className="badge badge-category d-inline-flex align-items-center gap-1">
              <i className="bi bi-layers-fill" style={{ fontSize: '0.65rem' }} aria-hidden="true"></i>
              <span>{project.researchArea}</span>
            </span>
            {getStatusBadge(project.status)}
          </div>

          {isDemo ? (
            <Badge
              bg="warning-subtle"
              className="text-warning-emphasis border border-warning-subtle d-inline-flex align-items-center gap-1"
              title="Demonstration Project Record"
            >
              <i className="bi bi-exclamation-triangle-fill" style={{ fontSize: '0.65rem' }} aria-hidden="true"></i>
              <span>Demo</span>
            </Badge>
          ) : (
            <Badge
              bg="success-subtle"
              className="text-success-emphasis border border-success-subtle d-inline-flex align-items-center gap-1"
              title="Verified Department Project"
            >
              <i className="bi bi-patch-check-fill" style={{ fontSize: '0.65rem' }} aria-hidden="true"></i>
              <span>Verified</span>
            </Badge>
          )}
        </div>

        {/* TITLE */}
        <Card.Title
          className="fw-bold mb-3 line-clamp-2"
          onClick={() => onSelectProject(project)}
          style={{
            cursor: 'pointer',
            color: 'var(--hcd-charcoal)',
            lineHeight: 1.3,
            fontSize: '1.05rem',
            letterSpacing: '-0.015em'
          }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter') onSelectProject(project); }}
          aria-label={`View details for ${project.title}`}
        >
          {project.title}
        </Card.Title>

        {/* METADATA STACK */}
        <div className="metadata-stack mb-3">
          <div className="metadata-row">
            <i className="bi bi-person-badge-fill" aria-hidden="true"></i>
            <span style={{ color: 'var(--hcd-body)', fontSize: '0.82rem' }}>Supervisor:</span>
            <span className="fw-semibold" style={{ color: 'var(--hcd-charcoal)' }}>{project.supervisor}</span>
          </div>

          <div className="metadata-row">
            <i className="bi bi-envelope-fill" aria-hidden="true"></i>
            <a
              href={`mailto:${project.supervisorEmail}?subject=Inquiry regarding HCD Project: ${encodeURIComponent(project.title)}`}
              className="text-decoration-none fw-medium text-truncate"
              style={{ color: 'var(--hcd-cyan)', fontSize: '0.82rem' }}
              title={`Email ${project.supervisor}`}
            >
              {project.supervisorEmail}
            </a>
          </div>

          {project.openRoles && (
            <div className="metadata-row">
              <i className="bi bi-people-fill" aria-hidden="true"></i>
              <span style={{ color: 'var(--hcd-body)', fontSize: '0.82rem' }}>Positions:</span>
              <span className="fw-medium" style={{ color: 'var(--hcd-charcoal)', fontSize: '0.82rem' }}>{project.openRoles}</span>
            </div>
          )}

          {project.duration && (
            <div className="metadata-row">
              <i className="bi bi-clock-fill" aria-hidden="true"></i>
              <span style={{ color: 'var(--hcd-body)', fontSize: '0.82rem' }}>Timeline:</span>
              <span className="fw-medium" style={{ color: 'var(--hcd-charcoal)', fontSize: '0.82rem' }}>{project.duration}</span>
            </div>
          )}
        </div>

        {/* DESCRIPTION */}
        <Card.Text
          className="line-clamp-2 mb-3"
          style={{ color: 'var(--hcd-body)', lineHeight: 1.65, fontSize: '0.85rem' }}
        >
          {project.description}
        </Card.Text>

        {/* SKILLS TAGS */}
        <div className="mb-3">
          <div
            className="d-flex align-items-center gap-1 mb-2"
            style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--hcd-body)' }}
          >
            <i className="bi bi-stars" style={{ color: 'var(--hcd-cyan)', fontSize: '0.82rem' }} aria-hidden="true"></i>
            <span>Required Skills</span>
          </div>
          <div className="d-flex flex-wrap gap-1">
            {project.skillsRequired.map((skill, idx) => (
              <span key={idx} className="skill-tag">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* BOTTOM ACTIONS */}
        <div
          className="mt-auto pt-3 d-flex justify-content-between align-items-center gap-2"
          style={{ borderTop: '1px solid rgba(221,227,230,0.7)' }}
        >
          {project.status !== 'Closed' ? (
            <Button
              variant="primary"
              size="sm"
              onClick={() => onOpenCollab(project)}
              className="d-inline-flex align-items-center gap-1 fw-semibold"
              style={{ borderRadius: '9px', paddingLeft: '0.85rem', paddingRight: '0.85rem', fontSize: '0.825rem' }}
            >
              <i className="bi bi-send-fill" aria-hidden="true"></i>
              <span>Collaborate</span>
            </Button>
          ) : (
            <div
              className="d-inline-flex align-items-center gap-1"
              style={{
                background: 'rgba(241,245,249,0.9)',
                border: '1px solid rgba(226,232,240,0.9)',
                borderRadius: '8px',
                padding: '0.3rem 0.75rem',
                fontSize: '0.8rem',
                color: 'var(--hcd-body)',
                fontWeight: 600
              }}
            >
              <i className="bi bi-lock-fill" style={{ fontSize: '0.75rem' }} aria-hidden="true"></i>
              <span>Closed</span>
            </div>
          )}

          <Button
            variant="secondary"
            size="sm"
            onClick={() => onSelectProject(project)}
            className="d-inline-flex align-items-center gap-1 ms-auto"
            style={{ borderRadius: '9px', paddingLeft: '0.7rem', paddingRight: '0.7rem', fontSize: '0.825rem' }}
            aria-label={`View full details for ${project.title}`}
          >
            <span>Details</span>
            <i className="bi bi-arrow-right" aria-hidden="true"></i>
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
