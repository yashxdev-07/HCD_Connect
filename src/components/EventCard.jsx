import React from 'react';
import { Card, Badge, Button } from 'react-bootstrap';

export default function EventCard({ event, onRsvpToggle, onSelectEvent }) {
  const isDemo = !event.isVerified || event.isDemo;

  // Derive scheduled status from date (Current date context: 2026-10-11)
  const getScheduledStatus = (dateStr) => {
    try {
      const todayStr = '2026-10-11';
      if (dateStr > todayStr) {
        return { label: 'Upcoming', bg: 'primary-subtle', text: 'primary' };
      } else if (dateStr === todayStr) {
        return { label: 'Ongoing', bg: 'success-subtle', text: 'success-emphasis' };
      } else {
        return { label: 'Completed', bg: 'secondary-subtle', text: 'secondary' };
      }
    } catch {
      return { label: 'Scheduled', bg: 'primary-subtle', text: 'primary' };
    }
  };

  const statusInfo = getScheduledStatus(event.date);

  return (
    <Card className="h-100 hcd-card d-flex flex-column">
      <Card.Body className="p-4 d-flex flex-column">

        {/* TOP ROW: Category & Status on Left, Verification on Right */}
        <div className="d-flex align-items-center justify-content-between gap-2 flex-wrap mb-3">
          <div className="d-flex align-items-center gap-1 flex-wrap">
            <span className="badge badge-category d-inline-flex align-items-center gap-1">
              <i className="bi bi-tag-fill" style={{ fontSize: '0.65rem' }} aria-hidden="true"></i>
              {event.category}
            </span>
            <Badge
              bg={statusInfo.bg}
              className={`text-${statusInfo.text} border d-inline-flex align-items-center gap-1`}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  display: 'inline-block',
                  background: 'currentColor',
                  opacity: 0.8
                }}
                aria-hidden="true"
              />
              {statusInfo.label}
            </Badge>
          </div>

          {isDemo ? (
            <Badge
              bg="warning-subtle"
              className="text-warning-emphasis border border-warning-subtle d-inline-flex align-items-center gap-1"
              title="Demonstration Event Record"
            >
              <i className="bi bi-exclamation-triangle-fill" style={{ fontSize: '0.65rem' }} aria-hidden="true"></i>
              <span>Demo</span>
            </Badge>
          ) : (
            <Badge
              bg="success-subtle"
              className="text-success-emphasis border border-success-subtle d-inline-flex align-items-center gap-1"
              title="Verified Department Event"
            >
              <i className="bi bi-patch-check-fill" style={{ fontSize: '0.65rem' }} aria-hidden="true"></i>
              <span>Verified</span>
            </Badge>
          )}
        </div>

        {/* EVENT TITLE */}
        <Card.Title
          className="fw-bold mb-3 line-clamp-2"
          onClick={() => onSelectEvent(event)}
          style={{
            cursor: 'pointer',
            color: 'var(--hcd-charcoal)',
            lineHeight: 1.3,
            fontSize: '1.05rem',
            letterSpacing: '-0.015em'
          }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter') onSelectEvent(event); }}
          aria-label={`View details for ${event.title}`}
        >
          {event.title}
        </Card.Title>

        {/* METADATA STACK */}
        <div className="metadata-stack mb-3">
          {/* Date */}
          <div className="metadata-row">
            <i className="bi bi-calendar3" aria-hidden="true"></i>
            <span style={{ color: 'var(--hcd-body)' }}>
              <time dateTime={event.date}>{event.date}</time>
            </span>
          </div>

          {/* Time */}
          <div className="metadata-row">
            <i className="bi bi-clock" aria-hidden="true"></i>
            <span style={{ color: 'var(--hcd-body)' }}>{event.time}</span>
          </div>

          {/* Venue */}
          <div className="metadata-row">
            <i className="bi bi-geo-alt-fill" aria-hidden="true"></i>
            <span className="fw-semibold" style={{ color: 'var(--hcd-charcoal)' }}>{event.room}</span>
          </div>

          {/* Speaker */}
          <div className="metadata-row">
            <i className="bi bi-person-fill" aria-hidden="true"></i>
            <span style={{ color: 'var(--hcd-body)' }}>
              <strong style={{ color: 'var(--hcd-charcoal)' }}>{event.speaker || event.facultyContact?.name}</strong>
            </span>
          </div>

          {/* TA / Organizer */}
          {event.taContact && (
            <div className="metadata-row">
              <i className="bi bi-person-badge-fill" aria-hidden="true"></i>
              <span style={{ color: 'var(--hcd-body)' }}>Organizer:</span>
              <span className="fw-medium" style={{ color: 'var(--hcd-charcoal)' }}>{event.taContact.name}</span>
              <a
                href={`mailto:${event.taContact.email}?subject=Inquiry: ${encodeURIComponent(event.title)}`}
                className="ms-auto d-inline-flex align-items-center justify-content-center rounded-circle"
                style={{
                  color: 'var(--hcd-cyan)',
                  width: '22px',
                  height: '22px',
                  background: 'rgba(41,182,190,0.1)',
                  border: '1px solid rgba(41,182,190,0.2)',
                  textDecoration: 'none'
                }}
                title={`Email ${event.taContact.name}`}
                aria-label={`Email ${event.taContact.name}`}
              >
                <i className="bi bi-envelope-fill" style={{ fontSize: '0.68rem' }} aria-hidden="true"></i>
              </a>
            </div>
          )}
        </div>

        {/* EVENT DESCRIPTION */}
        <Card.Text
          className="line-clamp-2 mb-3"
          style={{ color: 'var(--hcd-body)', lineHeight: 1.65, fontSize: '0.85rem' }}
        >
          {event.description}
        </Card.Text>

        {/* CARD FOOTER: Attendees & Actions */}
        <div
          className="mt-auto pt-3 d-flex justify-content-between align-items-center gap-2"
          style={{ borderTop: '1px solid rgba(221,227,230,0.7)' }}
        >
          {/* Attendees count */}
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
              <strong style={{ color: 'var(--hcd-charcoal)' }}>{event.attendeesCount}</strong>
              <span style={{ color: 'var(--hcd-body)', fontWeight: 400 }}>/{event.capacity}</span>
            </span>
          </div>

          {/* Action buttons */}
          <div className="d-flex align-items-center gap-2">
            <Button
              variant={event.isRsvp ? 'success' : 'primary'}
              size="sm"
              onClick={() => onRsvpToggle(event.id)}
              className="d-inline-flex align-items-center gap-1 fw-semibold"
              style={{ borderRadius: '9px', paddingLeft: '0.8rem', paddingRight: '0.8rem', fontSize: '0.825rem' }}
              aria-pressed={event.isRsvp}
            >
              {event.isRsvp ? (
                <>
                  <i className="bi bi-check-circle-fill" aria-hidden="true"></i>
                  <span>RSVPed</span>
                </>
              ) : (
                <>
                  <i className="bi bi-bookmark-plus-fill" aria-hidden="true"></i>
                  <span>RSVP</span>
                </>
              )}
            </Button>

            <Button
              variant="secondary"
              size="sm"
              onClick={() => onSelectEvent(event)}
              className="d-inline-flex align-items-center gap-1"
              style={{ borderRadius: '9px', paddingLeft: '0.7rem', paddingRight: '0.7rem', fontSize: '0.825rem' }}
              aria-label={`View full details for ${event.title}`}
            >
              <span>Details</span>
              <i className="bi bi-arrow-right" aria-hidden="true"></i>
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
