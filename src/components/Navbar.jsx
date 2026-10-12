import React from 'react';

export default function HcdNavbar({
  _activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  isMobile
}) {
  return (
    <header className="hcd-topbar" role="banner">
      <div className="hcd-topbar-inner">

        {/* LEFT: Brand */}
        <div
          className="hcd-brand"
          onClick={() => setActiveTab(isMobile ? 'home' : 'info')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setActiveTab(isMobile ? 'home' : 'info'); }}
          aria-label="Go to HCD Home"
        >
          <div className="hcd-brand-icon" aria-hidden="true">
            <i className="bi bi-mortarboard-fill"></i>
          </div>
          <div className="hcd-brand-text">
            <div className="hcd-brand-name">
              <span>HCD</span><span className="hcd-brand-accent">CONNECT</span>
            </div>
            <div className="hcd-brand-sub">
              <span className="hcd-brand-badge">IIIT Delhi</span>
              <span className="d-none d-sm-inline hcd-brand-caption">Research Hub</span>
            </div>
          </div>
        </div>

        {/* CENTER: Search */}
        <div className="hcd-search-wrap d-none d-md-block">
          <div className="hcd-search-inner">
            <i className="bi bi-search hcd-search-icon" aria-hidden="true"></i>
            <input
              type="search"
              className="hcd-search-input"
              placeholder="Search projects, labs, rooms, faculty, skills..."
              value={searchQuery || ''}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Global platform search"
              id="global-search-input"
            />
            {searchQuery && (
              <button
                type="button"
                className="hcd-search-clear"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                <i className="bi bi-x-circle-fill"></i>
              </button>
            )}
          </div>
        </div>

        {/* RIGHT: Badges & Actions */}
        <div className="hcd-topbar-right">
          {/* Location pill */}
          <span className="hcd-location-pill d-none d-md-inline-flex">
            <i className="bi bi-geo-alt-fill" aria-hidden="true"></i>
            <span>R&amp;D Building · 4th Floor</span>
          </span>
          <span className="hcd-location-pill d-inline-flex d-md-none" style={{ '--pill-color': '#115E59', '--pill-bg': '#CDEEF1' }}>
            <i className="bi bi-geo-alt-fill" aria-hidden="true"></i>
            <span>4F · R&amp;D</span>
          </span>

          {/* Status dot */}
          <div className="hcd-topbar-status d-none d-lg-flex">
            <span className="status-live-dot"></span>
            <span className="hcd-topbar-status-text">Live</span>
          </div>
        </div>

      </div>
    </header>
  );
}
