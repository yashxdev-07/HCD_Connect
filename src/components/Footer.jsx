import React from 'react';

export default function Footer({ onSwitchTab }) {
  const year = new Date().getFullYear();

  return (
    <footer className="hcd-footer">
      <div className="hcd-footer-inner">

        {/* TOP ROW */}
        <div className="hcd-footer-top">

          {/* Brand block */}
          <div className="hcd-footer-brand">
            <div className="hcd-footer-logo">
              <i className="bi bi-mortarboard-fill"></i>
            </div>
            <div>
              <div className="hcd-footer-brand-name">
                HCD<span>CONNECT</span>
              </div>
              <div className="hcd-footer-brand-sub">IIIT Delhi · Human-Centered Design</div>
            </div>
          </div>

          {/* Nav links */}
          <nav className="hcd-footer-nav" aria-label="Footer navigation">
            <span className="hcd-footer-nav-label">Explore</span>
            <button
              type="button"
              className="hcd-footer-link"
              onClick={() => onSwitchTab('info')}
            >
              <i className="bi bi-info-circle"></i>
              HCD Information
            </button>
            <button
              type="button"
              className="hcd-footer-link"
              onClick={() => onSwitchTab('rooms')}
            >
              <i className="bi bi-map"></i>
              Room Information
            </button>
            <button
              type="button"
              className="hcd-footer-link"
              onClick={() => onSwitchTab('projects')}
            >
              <i className="bi bi-briefcase"></i>
              Projects &amp; Collaboration
            </button>
          </nav>

          {/* Info block */}
          <div className="hcd-footer-info">
            <span className="hcd-footer-nav-label">Location</span>
            <div className="hcd-footer-info-row">
              <i className="bi bi-geo-alt-fill" style={{ color: 'var(--hcd-cyan)' }}></i>
              <span>4th Floor, R&amp;D Building</span>
            </div>
            <div className="hcd-footer-info-row">
              <i className="bi bi-building" style={{ color: 'var(--hcd-cyan)' }}></i>
              <span>IIIT Delhi, Okhla Phase III</span>
            </div>
            <div className="hcd-footer-info-row">
              <i className="bi bi-shield-check" style={{ color: '#10B981' }}></i>
              <span>Verified badge-certified entries</span>
            </div>
          </div>
        </div>

        {/* BOTTOM ROW */}
        <div className="hcd-footer-bottom">
          <span className="hcd-footer-copy">© {year} IIIT Delhi HCD Connect. Research Platform.</span>
          <div className="hcd-footer-status">
            <span className="hcd-footer-live-dot"></span>
            <span>Platform Active</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
