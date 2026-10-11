import React from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Mail, 
  CheckCircle, 
  AlertCircle, 
  Users, 
  ArrowRight,
  BookmarkCheck
} from 'lucide-react';

export default function EventCard({ event, onRsvpToggle, onSelectEvent }) {
  const isDemo = !event.isVerified || event.isDemo;

  // Derive scheduled status from date (Current date context: 2026-10-11)
  const getScheduledStatus = (dateStr) => {
    try {
      const todayStr = '2026-10-11';
      if (dateStr > todayStr) {
        return { label: 'Upcoming', badgeClass: 'badge-upcoming' };
      } else if (dateStr === todayStr) {
        return { label: 'Ongoing (Scheduled)', badgeClass: 'badge-ongoing' };
      } else {
        return { label: 'Completed', badgeClass: 'badge-completed' };
      }
    } catch {
      return { label: 'Scheduled', badgeClass: 'badge-upcoming' };
    }
  };

  const statusInfo = getScheduledStatus(event.date);

  return (
    <article className="academic-card event-academic-card">
      {/* 1. TOP ROW: Category, Scheduled Status, Verification */}
      <div className="card-top-row">
        <div className="card-top-left-badges">
          <span className="badge badge-category">{event.category}</span>
          <span className={`badge ${statusInfo.badgeClass}`}>
            ● {statusInfo.label}
          </span>
        </div>

        {isDemo ? (
          <span className="badge badge-demo" title="Demonstration Event Record">
            <AlertCircle size={12} className="flex-shrink-0" />
            <span>Demo Data</span>
          </span>
        ) : (
          <span className="badge badge-verified" title="Verified IIITD Department Event">
            <CheckCircle size={12} className="flex-shrink-0" />
            <span>Verified</span>
          </span>
        )}
      </div>

      {/* 2. TITLE */}
      <h3 className="card-heading" onClick={() => onSelectEvent(event)}>
        {event.title}
      </h3>

      {/* 3. LOGISTICS ROW: Date, Time, Room */}
      <div className="card-logistics-box">
        <div className="logistics-item">
          <Calendar size={14} className="logistics-icon text-accent" />
          <span className="logistics-value">{event.date}</span>
        </div>
        <div className="logistics-item">
          <Clock size={14} className="logistics-icon text-accent" />
          <span className="logistics-value">{event.time}</span>
        </div>
        <div className="logistics-item">
          <MapPin size={14} className="logistics-icon text-accent" />
          <span className="logistics-value venue-room-text">{event.room}</span>
        </div>
      </div>

      {/* 4. DESCRIPTION (Line Clamped) */}
      <p className="card-description-clamped" title={event.description}>
        {event.description}
      </p>

      {/* 5. CONTACTS: Faculty & TA */}
      <div className="card-metadata-list">
        <div className="metadata-row">
          <User size={14} className="metadata-icon" />
          <span className="metadata-label">Organizer:</span>
          <span className="metadata-value-strong">{event.facultyContact.name}</span>
          <a 
            href={`mailto:${event.facultyContact.email}?subject=Question regarding ${encodeURIComponent(event.title)}`}
            className="metadata-email-link"
            title={`Email ${event.facultyContact.name}`}
          >
            <Mail size={13} className="flex-shrink-0" />
            <span className="sr-only-text">Email</span>
          </a>
        </div>

        {event.taContact && (
          <div className="metadata-row">
            <User size={14} className="metadata-icon" />
            <span className="metadata-label">TA Contact:</span>
            <span className="metadata-value">{event.taContact.name}</span>
            <a 
              href={`mailto:${event.taContact.email}?subject=TA Inquiry: ${encodeURIComponent(event.title)}`}
              className="metadata-email-link"
              title={`Email ${event.taContact.name}`}
            >
              <Mail size={13} className="flex-shrink-0" />
              <span className="sr-only-text">Email</span>
            </a>
          </div>
        )}
      </div>

      {/* 6. BOTTOM ACTIONS & RSVP */}
      <div className="card-bottom-actions">
        <div className="event-seats-meta">
          <Users size={14} className="text-light flex-shrink-0" />
          <span className="seats-count-text">
            <strong>{event.attendeesCount}</strong> / {event.capacity} seats
          </span>
        </div>

        <div className="card-action-group">
          <button
            onClick={() => onRsvpToggle(event.id)}
            className={`btn btn-sm ${event.isRsvp ? 'btn-success' : 'btn-primary'}`}
          >
            {event.isRsvp ? (
              <>
                <BookmarkCheck size={13} />
                <span>RSVPed</span>
              </>
            ) : (
              <span>RSVP</span>
            )}
          </button>

          <button 
            onClick={() => onSelectEvent(event)} 
            className="btn btn-secondary btn-sm"
            title="View full event details"
          >
            <span>View Details</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </article>
  );
}
