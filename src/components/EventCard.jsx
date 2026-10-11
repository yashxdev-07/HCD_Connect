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

  return (
    <div className={`card event-card ${event.featured ? 'card-featured' : ''}`}>
      {/* Top Meta Badges */}
      <div className="card-top-bar">
        <span className="badge badge-category">{event.category}</span>
        {isDemo ? (
          <span className="badge badge-demo" title="Unverified demonstration record">
            <AlertCircle size={12} className="badge-icon-left" />
            <span>Demo Data</span>
          </span>
        ) : (
          <span className="badge badge-verified" title="Verified by IIITD HCD Department">
            <CheckCircle size={12} className="badge-icon-left" />
            <span>Verified Event</span>
          </span>
        )}
      </div>

      {/* Title & Description */}
      <h3 className="event-title" onClick={() => onSelectEvent(event)}>
        {event.title}
      </h3>
      <p className="card-desc">{event.description}</p>

      {/* Date, Time, Venue Block */}
      <div className="event-logistics">
        <div className="logistic-item">
          <Calendar size={14} className="logistics-icon text-accent flex-shrink-0" />
          <span className="logistic-text">{event.date}</span>
        </div>
        <div className="logistic-item">
          <Clock size={14} className="logistics-icon text-accent flex-shrink-0" />
          <span className="logistic-text">{event.time}</span>
        </div>
        <div className="logistic-item logistic-room">
          <MapPin size={14} className="logistics-icon text-accent flex-shrink-0" />
          <span className="logistic-text room-name">{event.room}</span>
        </div>
      </div>

      {/* Contact Details: Faculty & TA */}
      <div className="event-contacts-box">
        <div className="contact-row">
          <User size={13} className="text-muted flex-shrink-0" />
          <div className="contact-info">
            <span className="contact-label">Faculty:</span>
            <span className="contact-name">{event.facultyContact.name}</span>
            <a 
              href={`mailto:${event.facultyContact.email}?subject=Question regarding ${encodeURIComponent(event.title)}`} 
              className="contact-email-link"
              title={`Email ${event.facultyContact.name}`}
            >
              <Mail size={12} className="flex-shrink-0" />
              <span className="sr-only-text">Email</span>
            </a>
          </div>
        </div>

        {event.taContact && (
          <div className="contact-row">
            <User size={13} className="text-muted flex-shrink-0" />
            <div className="contact-info">
              <span className="contact-label">TA:</span>
              <span className="contact-name">{event.taContact.name}</span>
              <a 
                href={`mailto:${event.taContact.email}?subject=TA Inquiry: ${encodeURIComponent(event.title)}`} 
                className="contact-email-link"
                title={`Email ${event.taContact.name}`}
              >
                <Mail size={12} className="flex-shrink-0" />
                <span className="sr-only-text">Email</span>
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Card Footer: Attendees & Action buttons */}
      <div className="card-footer">
        <div className="attendees-counter">
          <Users size={14} className="text-muted flex-shrink-0" />
          <span className="attendees-text">
            <strong>{event.attendeesCount}</strong> / {event.capacity} seats
          </span>
        </div>

        <div className="card-actions">
          <button
            onClick={() => onRsvpToggle(event.id)}
            className={`btn btn-sm ${event.isRsvp ? 'btn-success' : 'btn-primary'}`}
          >
            {event.isRsvp ? (
              <>
                <BookmarkCheck size={14} />
                <span>RSVPed</span>
              </>
            ) : (
              <span>RSVP</span>
            )}
          </button>
          
          <button 
            onClick={() => onSelectEvent(event)} 
            className="btn btn-secondary btn-sm"
            title="View complete event brief"
          >
            <span>Details</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}
