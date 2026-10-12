import React from 'react';

export default function MobileHome({ onNavigate }) {
  return (
    <div className="mobile-home-container px-3 py-2 pb-5">
      {/* =========================================================
          1. TOP BADGES (IIIT Delhi + You are here location)
         ========================================================= */}
      <div className="d-flex align-items-center justify-content-between gap-2 mb-3">
        <span 
          className="badge rounded-pill fw-semibold d-inline-flex align-items-center gap-1.5 px-3 py-1.5 text-white"
          style={{ 
            backgroundColor: '#202B2E', 
            fontSize: '0.74rem', 
            letterSpacing: '0.04em' 
          }}
        >
          <span style={{ color: '#29B6BE', fontSize: '0.8rem' }}>●</span>
          <span>IIIT DELHI</span>
        </span>

        <span 
          className="badge rounded-pill fw-semibold d-inline-flex align-items-center gap-1.5 px-3 py-1.5"
          style={{ 
            backgroundColor: '#A2D2DF', 
            color: '#115E59', 
            fontSize: '0.74rem',
            letterSpacing: '0.02em'
          }}
        >
          <i className="bi bi-geo-alt-fill" style={{ fontSize: '0.8rem' }}></i>
          <span>You are here</span>
        </span>
      </div>

      {/* =========================================================
          2. HERO CARD: LEVEL FOUR · 04 · HCD DEPARTMENT
         ========================================================= */}
      <div 
        className="mobile-hero-card p-4 mb-3 position-relative overflow-hidden text-white shadow-sm"
        style={{
          backgroundColor: '#115E59',
          borderRadius: '30px',
          boxShadow: '0 8px 24px rgba(17, 94, 89, 0.22)'
        }}
      >
        <div className="position-relative" style={{ zIndex: 2, maxWidth: '62%' }}>
          <div 
            className="text-uppercase fw-bold mb-1" 
            style={{ 
              fontSize: '0.72rem', 
              letterSpacing: '0.12em', 
              color: '#99F6E4' 
            }}
          >
            Level Four
          </div>

          <div 
            className="fw-bolder lh-1 mb-2" 
            style={{ 
              fontSize: 'clamp(3.5rem, 14vw, 4.4rem)', 
              letterSpacing: '-0.04em',
              lineHeight: 0.95
            }}
          >
            04
          </div>

          <div 
            className="fw-bold" 
            style={{ 
              fontSize: 'clamp(1.15rem, 4.8vw, 1.35rem)',
              lineHeight: 1.25, 
              color: '#FFFFFF' 
            }}
          >
            HCD Department
          </div>
        </div>

        {/* Decorative Geometric SVG Character & Shapes (Directly from Reference Image) */}
        <div 
          className="position-absolute end-0 bottom-0 pointer-events-none"
          style={{ width: '150px', height: '140px', zIndex: 1 }}
          aria-hidden="true"
        >
          <svg viewBox="0 0 150 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-100 h-100">
            {/* Small white floating planet */}
            <circle cx="115" cy="30" r="12" fill="#FFFFFF" opacity="0.9" />
            <circle cx="112" cy="74" r="4" fill="#FFFFFF" opacity="0.8" />
            {/* Soft teal circle */}
            <circle cx="75" cy="50" r="8" fill="#5EEAD4" opacity="0.7" />
            {/* Dark background mountain */}
            <polygon points="120,140 145,95 155,140" fill="#0F3F3B" />
            {/* Friendly Smiling Teal Character */}
            <circle cx="95" cy="120" r="46" fill="#99F6E4" />
            {/* Eyes */}
            <circle cx="82" cy="112" r="3.2" fill="#115E59" />
            <circle cx="108" cy="112" r="3.2" fill="#115E59" />
            {/* Smile */}
            <path d="M 88 120 Q 95 127 102 120" stroke="#115E59" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          </svg>
        </div>
      </div>

      {/* =========================================================
          3. CARD 01 — HCD INFORMATION
         ========================================================= */}
      <div 
        onClick={() => onNavigate('info')}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onNavigate('info'); }}
        className="mobile-nav-card p-4 mb-3 position-relative overflow-hidden cursor-pointer shadow-sm transition-transform"
        style={{
          backgroundColor: '#A2D2DF',
          borderRadius: '28px',
          color: '#1E293B',
          cursor: 'pointer'
        }}
        aria-label="Open HCD Information"
      >
        <div className="d-flex align-items-start justify-content-between mb-3">
          {/* Badge 01 */}
          <span 
            className="badge rounded-pill fw-bold text-white d-inline-flex align-items-center justify-content-center"
            style={{ 
              backgroundColor: '#202B2E', 
              fontSize: '0.8rem', 
              width: '38px', 
              height: '24px' 
            }}
          >
            01
          </span>

          {/* Room Map Illustration Card (From Reference Image) */}
          <div 
            className="bg-white rounded-4 p-2 shadow-sm d-flex flex-column gap-1"
            style={{ width: '84px', height: '68px' }}
            aria-hidden="true"
          >
            <div className="d-flex gap-1 h-50">
              <div className="w-50 rounded-2" style={{ backgroundColor: '#115E59' }}></div>
              <div className="w-50 rounded-2 d-flex align-items-center justify-content-center" style={{ backgroundColor: '#F0F9FF' }}>
                <i className="bi bi-geo-alt-fill" style={{ color: '#115E59', fontSize: '0.85rem' }}></i>
              </div>
            </div>
            <div className="d-flex gap-1 h-50">
              <div className="w-50 rounded-2 border" style={{ backgroundColor: '#FFFFFF', borderColor: '#E2E8F0' }}></div>
              <div className="w-50 rounded-2" style={{ backgroundColor: '#202B2E' }}></div>
            </div>
          </div>
        </div>

        {/* Content Heading & Subtitle */}
        <h3 className="fs-3 fw-bolder mb-1 text-dark" style={{ letterSpacing: '-0.02em', color: '#1E293B' }}>
          HCD Information
        </h3>
        <p className="mb-3 text-muted fw-medium" style={{ fontSize: '0.88rem', maxWidth: '78%', lineHeight: 1.4, color: '#334155' }}>
          Explore labs, rooms and faculty information.
        </p>

        {/* Arrow Action Button */}
        <div className="d-flex align-items-center justify-content-between pt-1">
          <span className="badge rounded-pill bg-white text-dark fw-semibold" style={{ fontSize: '0.72rem', padding: '0.35rem 0.65rem' }}>
            5 Verified Labs · A-413 to A-418
          </span>

          <div 
            className="rounded-circle d-flex align-items-center justify-content-center text-white shadow-sm flex-shrink-0"
            style={{ width: '44px', height: '44px', backgroundColor: '#202B2E' }}
          >
            <i className="bi bi-arrow-right fs-5"></i>
          </div>
        </div>
      </div>

      {/* =========================================================
          4. CARD 02 — EVENTS
         ========================================================= */}
      <div 
        onClick={() => onNavigate('events')}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onNavigate('events'); }}
        className="mobile-nav-card p-4 mb-3 position-relative overflow-hidden cursor-pointer shadow-sm transition-transform"
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '28px',
          border: '1px solid #E2E8F0',
          color: '#1E293B',
          cursor: 'pointer'
        }}
        aria-label="Open Events"
      >
        <div className="d-flex align-items-start justify-content-between mb-3">
          {/* Badge 02 */}
          <span 
            className="badge rounded-pill fw-bold text-white d-inline-flex align-items-center justify-content-center"
            style={{ 
              backgroundColor: '#202B2E', 
              fontSize: '0.8rem', 
              width: '38px', 
              height: '24px' 
            }}
          >
            02
          </span>

          {/* Calendar Graphic Illustration */}
          <div 
            className="rounded-4 p-2 d-flex flex-column align-items-center justify-content-center"
            style={{ width: '84px', height: '68px', backgroundColor: '#F0FAFA', border: '1px solid #CDEEF1' }}
            aria-hidden="true"
          >
            <div className="w-100 rounded-1 text-center py-0.5 text-white fw-bold mb-1" style={{ backgroundColor: '#29B6BE', fontSize: '0.62rem', letterSpacing: '0.05em' }}>
              CALENDAR
            </div>
            <i className="bi bi-calendar3-event-fill" style={{ color: '#15797F', fontSize: '1.4rem' }}></i>
          </div>
        </div>

        {/* Content Heading & Subtitle */}
        <h3 className="fs-3 fw-bolder mb-1" style={{ letterSpacing: '-0.02em', color: '#1E293B' }}>
          Events
        </h3>
        <p className="mb-3 text-muted fw-medium" style={{ fontSize: '0.88rem', maxWidth: '78%', lineHeight: 1.4, color: '#475569' }}>
          Discover upcoming workshops, seminars, and critiques.
        </p>

        {/* Arrow Action Button */}
        <div className="d-flex align-items-center justify-content-between pt-1">
          <span className="badge rounded-pill fw-semibold" style={{ backgroundColor: '#F1F5F9', color: '#475569', fontSize: '0.72rem', padding: '0.35rem 0.65rem' }}>
            Academic Sessions & Seminars
          </span>

          <div 
            className="rounded-circle d-flex align-items-center justify-content-center text-white shadow-sm flex-shrink-0"
            style={{ width: '44px', height: '44px', backgroundColor: '#202B2E' }}
          >
            <i className="bi bi-arrow-right fs-5"></i>
          </div>
        </div>
      </div>

      {/* =========================================================
          5. CARD 03 — PROJECTS & COLLABORATION
         ========================================================= */}
      <div 
        onClick={() => onNavigate('projects')}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onNavigate('projects'); }}
        className="mobile-nav-card p-4 mb-4 position-relative overflow-hidden cursor-pointer shadow-sm transition-transform"
        style={{
          backgroundColor: '#202B2E',
          borderRadius: '28px',
          color: '#FFFFFF',
          cursor: 'pointer'
        }}
        aria-label="Open Projects & Collaboration"
      >
        <div className="d-flex align-items-start justify-content-between mb-3">
          {/* Badge 03 */}
          <span 
            className="badge rounded-pill fw-bold d-inline-flex align-items-center justify-content-center"
            style={{ 
              backgroundColor: '#A2D2DF', 
              color: '#202B2E', 
              fontSize: '0.8rem', 
              width: '38px', 
              height: '24px' 
            }}
          >
            03
          </span>

          {/* Friendly Collaboration Circles (From Reference Image) */}
          <div 
            className="position-relative d-flex align-items-center"
            style={{ width: '92px', height: '56px' }}
            aria-hidden="true"
          >
            {/* Teal circle */}
            <div 
              className="rounded-circle position-absolute"
              style={{ width: '40px', height: '40px', backgroundColor: '#29B6BE', left: 0 }}
            ></div>
            {/* Light teal circle with eyes & smile */}
            <div 
              className="rounded-circle position-absolute d-flex flex-column align-items-center justify-content-center"
              style={{ width: '44px', height: '44px', backgroundColor: '#5EEAD4', left: '24px', zIndex: 1 }}
            >
              <div className="d-flex gap-1.5 mb-0.5">
                <div style={{ width: '3px', height: '3px', backgroundColor: '#202B2E', borderRadius: '50%' }}></div>
                <div style={{ width: '3px', height: '3px', backgroundColor: '#202B2E', borderRadius: '50%' }}></div>
              </div>
              <div style={{ width: '7px', height: '3px', borderBottom: '1.5px solid #202B2E', borderRadius: '0 0 4px 4px' }}></div>
            </div>
            {/* White happy friend circle */}
            <div 
              className="rounded-circle position-absolute d-flex flex-column align-items-center justify-content-center shadow-sm"
              style={{ width: '34px', height: '34px', backgroundColor: '#FFFFFF', left: '56px', zIndex: 2 }}
            >
              <div className="d-flex gap-1 mb-0.5">
                <div style={{ width: '2.5px', height: '2.5px', backgroundColor: '#202B2E', borderRadius: '50%' }}></div>
                <div style={{ width: '2.5px', height: '2.5px', backgroundColor: '#202B2E', borderRadius: '50%' }}></div>
              </div>
              <div style={{ width: '5px', height: '2.5px', borderBottom: '1.5px solid #202B2E', borderRadius: '0 0 3px 3px' }}></div>
            </div>
          </div>
        </div>

        {/* Content Heading & Subtitle */}
        <h3 className="fs-3 fw-bolder mb-1 text-white" style={{ letterSpacing: '-0.02em' }}>
          Projects & Collaboration
        </h3>
        <p className="mb-3 fw-medium" style={{ fontSize: '0.88rem', maxWidth: '78%', lineHeight: 1.4, color: '#CBD5E1' }}>
          Explore research projects and collaboration opportunities.
        </p>

        {/* Arrow Action Button */}
        <div className="d-flex align-items-center justify-content-between pt-1">
          <span className="badge rounded-pill fw-semibold" style={{ backgroundColor: '#2D3B3F', color: '#99F6E4', fontSize: '0.72rem', padding: '0.35rem 0.65rem' }}>
            Faculty & Student Open Roles
          </span>

          <div 
            className="rounded-circle d-flex align-items-center justify-content-center shadow-sm flex-shrink-0"
            style={{ width: '44px', height: '44px', backgroundColor: '#92CBD5', color: '#202B2E' }}
          >
            <i className="bi bi-arrow-right fs-5 fw-bold"></i>
          </div>
        </div>
      </div>

      {/* =========================================================
          6. BOTTOM FOOTER TEXT (From Reference Image)
         ========================================================= */}
      <div className="text-center pt-2 pb-4">
        <p className="mb-0 fw-semibold" style={{ fontSize: '0.78rem', color: '#567A83', letterSpacing: '0.02em' }}>
          Level 4 corridor · IIIT Delhi
        </p>
      </div>
    </div>
  );
}
