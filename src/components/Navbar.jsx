import React, { useState } from 'react';
import { 
  Home, 
  Calendar, 
  Briefcase, 
  Layers, 
  Search, 
  PlusCircle, 
  LogIn, 
  LogOut, 
  ShieldCheck, 
  User, 
  Menu, 
  X,
  GraduationCap
} from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  currentUser, 
  onOpenAuth, 
  onLogout, 
  onOpenSubmitEvent,
  pendingSubmissionsCount,
  searchQuery,
  setSearchQuery
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'labs', label: 'Labs & Research', icon: Layers },
  ];

  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="navbar-wrapper">
      <div className="container navbar-inner">
        {/* LEFT: Academic Brand */}
        <div className="navbar-brand" onClick={() => handleNavClick('home')}>
          <div className="brand-logo-icon">
            <GraduationCap size={20} className="logo-svg" />
          </div>
          <div className="brand-text-block">
            <div className="brand-title">
              HCD <span className="brand-title-accent">CONNECT</span>
            </div>
            <div className="brand-subtitle">
              IIIT Delhi · Human-Centered Design
            </div>
          </div>
        </div>

        {/* CENTER: Navigation Links with Visible Gaps */}
        <nav className="nav-desktop">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`nav-link ${isActive ? 'nav-link-active' : ''}`}
              >
                <Icon size={16} className="nav-icon" />
                <span className="nav-label">{link.label}</span>
              </button>
            );
          })}

          {currentUser && currentUser.role === 'admin' && (
            <button
              onClick={() => handleNavClick('admin')}
              className={`nav-link ${activeTab === 'admin' ? 'nav-link-active' : ''} nav-link-admin`}
            >
              <ShieldCheck size={16} className="nav-icon" />
              <span className="nav-label">Admin Hub</span>
              {pendingSubmissionsCount > 0 && (
                <span className="nav-counter-badge">{pendingSubmissionsCount}</span>
              )}
            </button>
          )}
        </nav>

        {/* RIGHT: Search, Submit Event, Auth */}
        <div className="nav-actions-desktop">
          {/* Quick Search */}
          <div className="header-search-box">
            <Search size={14} className="header-search-icon" />
            <input
              type="text"
              placeholder="Search platform..."
              value={searchQuery || ''}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (activeTab === 'home' && e.target.value.trim() !== '') {
                  setActiveTab('projects');
                }
              }}
              className="header-search-input"
            />
          </div>

          <button 
            className="btn btn-navy btn-sm"
            onClick={onOpenSubmitEvent}
            title="Propose an academic event, seminar, or workshop"
          >
            <PlusCircle size={14} />
            <span>Submit Event</span>
          </button>

          {currentUser ? (
            <div className="user-profile-menu">
              <div className="user-info-chip">
                <span className="user-avatar-circle">{currentUser.avatar || 'U'}</span>
                <div className="user-text-meta">
                  <span className="user-name">{currentUser.name.split(' ')[0]}</span>
                  <span className="user-role-tag">
                    {currentUser.role === 'admin' ? 'Admin' : 'Student'}
                  </span>
                </div>
              </div>
              <button 
                onClick={onLogout} 
                className="btn-icon-logout"
                title="Sign Out"
              >
                <LogOut size={15} />
              </button>
            </div>
          ) : (
            <button 
              className="btn btn-primary btn-sm"
              onClick={onOpenAuth}
            >
              <LogIn size={14} />
              <span>Sign In / Register</span>
            </button>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button 
          className="mobile-hamburger-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="nav-mobile-drawer">
          <div className="container mobile-drawer-inner">
            <div className="mobile-search-row">
              <Search size={16} className="text-light" />
              <input
                type="text"
                placeholder="Search events, projects, labs..."
                value={searchQuery || ''}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mobile-search-input"
              />
            </div>

            <div className="mobile-nav-links">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = activeTab === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`mobile-nav-item ${isActive ? 'active' : ''}`}
                  >
                    <Icon size={18} />
                    <span>{link.label}</span>
                  </button>
                );
              })}

              {currentUser && currentUser.role === 'admin' && (
                <button
                  onClick={() => handleNavClick('admin')}
                  className={`mobile-nav-item ${activeTab === 'admin' ? 'active' : ''}`}
                >
                  <ShieldCheck size={18} />
                  <span>Admin Hub ({pendingSubmissionsCount} pending)</span>
                </button>
              )}
            </div>

            <div className="mobile-drawer-footer">
              <button 
                className="btn btn-navy btn-full"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSubmitEvent();
                }}
              >
                <PlusCircle size={15} />
                <span>Submit Event Proposal</span>
              </button>

              {currentUser ? (
                <div className="mobile-user-status">
                  <div className="user-info-chip">
                    <span className="user-avatar-circle">{currentUser.avatar || 'U'}</span>
                    <span>{currentUser.name} ({currentUser.role})</span>
                  </div>
                  <button 
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onLogout();
                    }}
                    className="btn btn-danger btn-sm"
                  >
                    <LogOut size={14} />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <button 
                  className="btn btn-primary btn-full"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth();
                  }}
                >
                  <LogIn size={15} />
                  <span>Sign In / Student Register</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
