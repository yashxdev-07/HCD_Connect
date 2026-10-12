import React from 'react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const navItems = [
    {
      id: 'info',
      label: 'HCD Information',
      shortLabel: 'HCD Info',
      icon: 'bi-info-circle',
      activeIcon: 'bi-info-circle-fill',
      description: 'Labs & faculty directory'
    },
    {
      id: 'rooms',
      label: 'Room Information',
      shortLabel: 'Rooms',
      icon: 'bi-map',
      activeIcon: 'bi-map-fill',
      description: '4th Floor room & lab map'
    },
    {
      id: 'projects',
      label: 'Projects & Collab',
      shortLabel: 'Projects',
      icon: 'bi-briefcase',
      activeIcon: 'bi-briefcase-fill',
      description: 'Research roles'
    },
  ];

  return (
    <>
      {/* ── DESKTOP SIDEBAR ─────────────────────────── */}
      <aside className="hcd-sidebar" aria-label="Main Navigation">
        <div className="hcd-sidebar-sticky">

          {/* Top accent bar */}
          <div className="hcd-sidebar-accent-bar"></div>

          {/* Nav section */}
          <div className="hcd-sidebar-section">
            <div className="hcd-sidebar-section-label">Navigation</div>

            <nav className="hcd-sidebar-nav" role="navigation" aria-label="Primary">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveTab(item.id)}
                    className={`hcd-sidebar-item ${isActive ? 'is-active' : ''}`}
                    aria-current={isActive ? 'page' : undefined}
                    title={item.description}
                  >
                    <span className="hcd-sidebar-indicator" aria-hidden="true"></span>
                    <span className="hcd-sidebar-icon-wrap" aria-hidden="true">
                      <i className={`bi ${isActive ? item.activeIcon : item.icon}`}></i>
                    </span>
                    <span className="hcd-sidebar-label">{item.label}</span>
                    {isActive && (
                      <i className="bi bi-chevron-right hcd-sidebar-arrow" aria-hidden="true"></i>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Divider */}
          <div className="hcd-sidebar-divider"></div>

          {/* Department info card */}
          <div className="hcd-sidebar-section">
            <div className="hcd-sidebar-section-label">Department</div>
            <div className="hcd-sidebar-dept-card">
              <div className="hcd-sidebar-dept-name">HCD Department</div>
              <div className="hcd-sidebar-dept-row">
                <i className="bi bi-geo-alt-fill"></i>
                <span>4th Floor · R&amp;D Building</span>
              </div>
              <div className="hcd-sidebar-dept-row">
                <i className="bi bi-building"></i>
                <span>IIIT Delhi</span>
              </div>
            </div>
          </div>

          {/* Spacer */}
          <div style={{ flex: 1 }}></div>

          {/* Footer status */}
          <div className="hcd-sidebar-footer">
            <span className="status-live-dot" aria-hidden="true"></span>
            <div className="hcd-sidebar-footer-text">
              <span className="hcd-sidebar-footer-title">HCD Connect</span>
              <span className="hcd-sidebar-footer-sub">Active Platform Session</span>
            </div>
          </div>

        </div>
      </aside>

      {/* ── MOBILE BOTTOM NAV ─────────────────────────── */}
      <nav className="hcd-mobile-bottom-bar" aria-label="Mobile Navigation">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveTab(isActive ? 'home' : item.id)}
              className={`hcd-mobile-nav-item ${isActive ? 'is-active' : ''}`}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
            >
              <div className="hcd-mobile-icon-bg">
                <i className={`bi ${isActive ? item.activeIcon : item.icon}`} aria-hidden="true"></i>
              </div>
              <span className="hcd-mobile-label">{item.shortLabel}</span>
              {isActive && <span className="hcd-mobile-dot" aria-hidden="true"></span>}
            </button>
          );
        })}
      </nav>
    </>
  );
}
