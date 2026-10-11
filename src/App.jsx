import React, { useState } from 'react';
import { 
  Calendar, 
  Briefcase, 
  Layers, 
  Search, 
  ArrowRight, 
  GraduationCap, 
  Users, 
  Lightbulb, 
  ShieldCheck, 
  PlusCircle, 
  Sparkles,
  MapPin,
  Clock,
  Compass,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import EventCard from './components/EventCard';
import ProjectCard from './components/ProjectCard';
import LabCard from './components/LabCard';
import AuthModal from './components/AuthModal';
import EventSubmissionModal from './components/EventSubmissionModal';
import CollabModal from './components/CollabModal';
import DetailModal from './components/DetailModal';
import AdminDashboard from './components/AdminDashboard';

import { 
  INITIAL_EVENTS, 
  INITIAL_PROJECTS, 
  INITIAL_LABS, 
  INITIAL_SUBMISSIONS,
  DEMO_USERS 
} from './data/mockData';

export default function App() {
  // Navigation & User State
  const [activeTab, setActiveTab] = useState('home');
  const [currentUser, setCurrentUser] = useState(null); // null or user object

  // Datasets with interactive mutation capability
  const [events, setEvents] = useState(INITIAL_EVENTS);
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [labs, setLabs] = useState(INITIAL_LABS);
  const [submissions, setSubmissions] = useState(INITIAL_SUBMISSIONS);

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [eventCategoryFilter, setEventCategoryFilter] = useState('All');
  const [eventStatusFilter, setEventStatusFilter] = useState('All'); // 'All' | 'Upcoming' | 'Ongoing' | 'Completed'
  const [projectStatusFilter, setProjectStatusFilter] = useState('All');
  const [verifiedOnlyFilter, setVerifiedOnlyFilter] = useState(false);

  // Modals state
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isSubmitEventOpen, setIsSubmitEventOpen] = useState(false);
  const [selectedCollabProject, setSelectedCollabProject] = useState(null);
  const [detailModal, setDetailModal] = useState({ isOpen: false, item: null, type: null });

  // -------------------------------------------------------------
  // Handlers
  // -------------------------------------------------------------
  const handleRsvpToggle = (eventId) => {
    setEvents(prev => prev.map(evt => {
      if (evt.id === eventId) {
        const nextRsvp = !evt.isRsvp;
        return {
          ...evt,
          isRsvp: nextRsvp,
          attendeesCount: nextRsvp ? evt.attendeesCount + 1 : Math.max(0, evt.attendeesCount - 1)
        };
      }
      return evt;
    }));

    if (detailModal.isOpen && detailModal.item && detailModal.item.id === eventId) {
      setDetailModal(prev => ({
        ...prev,
        item: {
          ...prev.item,
          isRsvp: !prev.item.isRsvp,
          attendeesCount: !prev.item.isRsvp ? prev.item.attendeesCount + 1 : Math.max(0, prev.item.attendeesCount - 1)
        }
      }));
    }
  };

  const handleOpenCollab = (project) => {
    setSelectedCollabProject(project);
  };

  const handleOpenDetail = (item, type) => {
    setDetailModal({ isOpen: true, item, type });
  };

  const handleCloseDetail = () => {
    setDetailModal({ isOpen: false, item: null, type: null });
  };

  const handleSubmitProposal = (newSubmission) => {
    setSubmissions(prev => [newSubmission, ...prev]);
  };

  const handleApproveSubmission = (subId) => {
    const targetSub = submissions.find(s => s.id === subId);
    if (!targetSub) return;

    const approvedEvent = {
      id: `evt-${Date.now()}`,
      title: targetSub.title,
      category: targetSub.category,
      date: targetSub.date,
      time: targetSub.time,
      room: targetSub.room,
      capacity: targetSub.capacity,
      attendeesCount: 0,
      isRsvp: false,
      description: targetSub.description,
      speaker: targetSub.submittedBy,
      facultyContact: {
        name: targetSub.facultySponsor || 'HCD Faculty Desk',
        role: 'Faculty Coordinator',
        email: 'hcd-office@iiitd.ac.in',
      },
      taContact: {
        name: targetSub.submittedBy,
        role: 'Organizer',
        email: targetSub.submitterEmail,
      },
      isVerified: true,
      tags: [targetSub.category, 'Student Initiated'],
      featured: false,
    };

    setEvents(prev => [approvedEvent, ...prev]);
    setSubmissions(prev => prev.map(s => s.id === subId ? { ...s, status: 'Approved' } : s));
  };

  const handleRejectSubmission = (subId) => {
    setSubmissions(prev => prev.map(s => s.id === subId ? { ...s, status: 'Rejected' } : s));
  };

  const handleToggleEventVerification = (id) => {
    setEvents(prev => prev.map(e => e.id === id ? { ...e, isVerified: !e.isVerified, isDemo: e.isVerified } : e));
  };

  const handleToggleProjectVerification = (id) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, isVerified: !p.isVerified, isDemo: p.isVerified } : p));
  };

  const handleToggleLabVerification = (id) => {
    setLabs(prev => prev.map(l => l.id === id ? { ...l, isVerified: !l.isVerified, isDemo: l.isVerified } : l));
  };

  // -------------------------------------------------------------
  // Filter Logic with Scheduled Status
  // -------------------------------------------------------------
  const todayStr = '2026-10-11';

  const filteredEvents = events.filter(evt => {
    const matchesSearch = evt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          evt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          evt.room.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          evt.speaker.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = eventCategoryFilter === 'All' || evt.category === eventCategoryFilter;
    const matchesVerified = !verifiedOnlyFilter || evt.isVerified;

    let matchesStatus = true;
    if (eventStatusFilter === 'Upcoming') {
      matchesStatus = evt.date > todayStr;
    } else if (eventStatusFilter === 'Ongoing') {
      matchesStatus = evt.date === todayStr;
    } else if (eventStatusFilter === 'Completed') {
      matchesStatus = evt.date < todayStr;
    }

    return matchesSearch && matchesCategory && matchesVerified && matchesStatus;
  });

  const filteredProjects = projects.filter(proj => {
    const matchesSearch = proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          proj.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          proj.supervisor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          proj.researchArea.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          proj.skillsRequired.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = projectStatusFilter === 'All' || proj.status === projectStatusFilter;
    const matchesVerified = !verifiedOnlyFilter || proj.isVerified;
    return matchesSearch && matchesStatus && matchesVerified;
  });

  const filteredLabs = labs.filter(lab => {
    const matchesSearch = lab.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          lab.director.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          lab.theme.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          lab.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          lab.equipment.some(e => e.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesVerified = !verifiedOnlyFilter || lab.isVerified;
    return matchesSearch && matchesVerified;
  });

  const pendingCount = submissions.filter(s => s.status === 'Pending').length;
  const nextFeaturedEvent = events.find(e => e.featured) || events[0];

  return (
    <div className="app-root">
      {/* 1. Header & Navigation */}
      <Navbar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={() => setCurrentUser(null)}
        onOpenSubmitEvent={() => setIsSubmitEventOpen(true)}
        pendingSubmissionsCount={pendingCount}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* =========================================================
          TAB 1: HOMEPAGE
         ========================================================= */}
      {activeTab === 'home' && (
        <main>
          {/* Hero Section */}
          <section className="hero-section">
            <div className="container hero-grid">
              {/* LEFT Column */}
              <div className="hero-left">
                <div className="hero-eyebrow">
                  <GraduationCap size={14} className="flex-shrink-0" />
                  <span>IIIT DELHI · HUMAN-CENTERED DESIGN</span>
                </div>

                <h1 className="hero-title">
                  Connect. Create. <span className="hero-accent">Innovate.</span>
                </h1>

                <p className="hero-lead">
                  Discover research opportunities, explore departmental events, and connect with faculty and fellow students through one central HCD platform.
                </p>

                <div className="hero-actions">
                  <button 
                    onClick={() => setActiveTab('events')} 
                    className="btn btn-primary"
                  >
                    <Calendar size={16} />
                    <span>Explore Events</span>
                  </button>

                  <button 
                    onClick={() => setActiveTab('projects')} 
                    className="btn btn-secondary"
                  >
                    <Briefcase size={16} />
                    <span>Discover Projects</span>
                  </button>

                  <button 
                    onClick={() => setActiveTab('labs')} 
                    className="btn btn-outline-white"
                  >
                    <Layers size={16} />
                    <span>Browse Labs</span>
                  </button>
                </div>

                {/* Compact Statistics */}
                <div className="hero-stats-strip">
                  <div className="hero-stat-box">
                    <span className="hero-stat-number">{labs.length}</span>
                    <span className="hero-stat-label">Research Studios</span>
                  </div>
                  <div className="hero-stat-box">
                    <span className="hero-stat-number">{projects.length}</span>
                    <span className="hero-stat-label">Active Projects</span>
                  </div>
                  <div className="hero-stat-box">
                    <span className="hero-stat-number">{events.length}</span>
                    <span className="hero-stat-label">Upcoming Events</span>
                  </div>
                </div>
              </div>

              {/* RIGHT Column: Tasteful Research Feature Panel */}
              <div className="hero-right">
                <div className="hero-visual-card">
                  <div className="visual-card-top">
                    <span className="visual-floating-badge">
                      <Sparkles size={13} />
                      Research & Collaboration
                    </span>
                    <span className="visual-location-tag">
                      <MapPin size={13} className="text-accent" />
                      R&D Building · IIIT Delhi
                    </span>
                  </div>

                  <div className="visual-inner-content">
                    <span className="badge badge-category" style={{ marginBottom: '8px' }}>
                      {nextFeaturedEvent.category}
                    </span>
                    <h3 className="visual-card-title">{nextFeaturedEvent.title}</h3>
                    <div className="visual-meta-row">
                      <Clock size={13} />
                      <span>{nextFeaturedEvent.date} · {nextFeaturedEvent.time}</span>
                    </div>
                    <div className="visual-meta-row">
                      <MapPin size={13} />
                      <span>{nextFeaturedEvent.room}</span>
                    </div>
                    <div className="visual-meta-row" style={{ marginTop: '8px' }}>
                      <span>Speaker: <strong>{nextFeaturedEvent.speaker}</strong></span>
                    </div>
                  </div>

                  <div className="visual-footer-bar">
                    <button 
                      onClick={() => handleRsvpToggle(nextFeaturedEvent.id)}
                      className={`btn btn-sm ${nextFeaturedEvent.isRsvp ? 'btn-success' : 'btn-primary'}`}
                    >
                      {nextFeaturedEvent.isRsvp ? '✓ RSVP Confirmed' : 'RSVP for Session'}
                    </button>
                    <button
                      onClick={() => handleOpenDetail(nextFeaturedEvent, 'event')}
                      className="btn btn-outline-white btn-sm"
                    >
                      <span>View Details</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Three Feature Cards Section */}
          <section className="features-section">
            <div className="container">
              <div className="features-grid">
                {/* CARD 1 */}
                <div className="feature-card">
                  <div className="feature-icon-box">
                    <Lightbulb size={22} />
                  </div>
                  <h3 className="feature-title">Interdisciplinary Research</h3>
                  <p className="feature-description">
                    Explore research areas, labs, and innovative academic projects in tactile interfaces, accessibility, and spatial computing.
                  </p>
                  <button 
                    type="button" 
                    onClick={() => setActiveTab('labs')}
                    className="feature-action-btn"
                  >
                    <span>Explore Research</span>
                    <ArrowRight size={14} />
                  </button>
                </div>

                {/* CARD 2 */}
                <div className="feature-card">
                  <div className="feature-icon-box">
                    <Users size={22} />
                  </div>
                  <h3 className="feature-title">Student-Faculty Collaboration</h3>
                  <p className="feature-description">
                    Discover projects seeking student researchers and collaborators across B.Tech CS+D, M.Des, and Ph.D. programs.
                  </p>
                  <button 
                    type="button" 
                    onClick={() => setActiveTab('projects')}
                    className="feature-action-btn"
                  >
                    <span>Find Opportunities</span>
                    <ArrowRight size={14} />
                  </button>
                </div>

                {/* CARD 3 */}
                <div className="feature-card">
                  <div className="feature-icon-box">
                    <Calendar size={22} />
                  </div>
                  <h3 className="feature-title">Events & Design Activities</h3>
                  <p className="feature-description">
                    Discover seminars, workshops, presentations, and departmental activities scheduled across IIIT Delhi studios.
                  </p>
                  <button 
                    type="button" 
                    onClick={() => setActiveTab('events')}
                    className="feature-action-btn"
                  >
                    <span>View Events</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Featured Research Projects Spotlight Section */}
          <section className="page-section" style={{ background: '#FFFFFF', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)' }}>
            <div className="container">
              <div className="section-head-bar">
                <div>
                  <h2 className="section-title">Featured Research Projects</h2>
                  <p className="section-subtitle">
                    Explore research opportunities and find projects aligned with your interests.
                  </p>
                </div>
                <button 
                  onClick={() => setActiveTab('projects')} 
                  className="btn btn-secondary"
                >
                  <span>View All Projects</span>
                  <ArrowRight size={14} />
                </button>
              </div>

              <div className="grid-cards">
                {projects.slice(0, 3).map(proj => (
                  <ProjectCard 
                    key={proj.id}
                    project={proj}
                    onOpenCollab={handleOpenCollab}
                    onSelectProject={(p) => handleOpenDetail(p, 'project')}
                  />
                ))}
              </div>
            </div>
          </section>
        </main>
      )}

      {/* =========================================================
          TAB 2: EVENTS & ACTIVITIES
         ========================================================= */}
      {activeTab === 'events' && (
        <main className="page-section">
          <div className="container">
            <div className="section-head-bar">
              <div>
                <h1 className="section-title">Events & Activities</h1>
                <p className="section-subtitle">
                  Academic workshops, guest lectures, capstone critiques, and seminars at IIIT Delhi.
                </p>
              </div>
              <button 
                onClick={() => setIsSubmitEventOpen(true)}
                className="btn btn-navy"
              >
                <PlusCircle size={15} />
                <span>Submit Event Proposal</span>
              </button>
            </div>

            {/* Filter & Search Toolbar */}
            <div className="filter-toolbar">
              <div className="search-input-box">
                <Search size={15} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search events by title, room, or speaker..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
              </div>

              <div className="filter-controls-group">
                <select
                  value={eventCategoryFilter}
                  onChange={(e) => setEventCategoryFilter(e.target.value)}
                  className="filter-select"
                >
                  <option value="All">All Categories</option>
                  <option value="Workshop">Workshops</option>
                  <option value="Guest Lecture">Guest Lectures</option>
                  <option value="Seminar">Research Seminars</option>
                  <option value="Exhibition">Exhibitions</option>
                  <option value="Hackathon">Hackathons</option>
                </select>

                <select
                  value={eventStatusFilter}
                  onChange={(e) => setEventStatusFilter(e.target.value)}
                  className="filter-select"
                >
                  <option value="All">All Schedules</option>
                  <option value="Upcoming">Upcoming Only</option>
                  <option value="Ongoing">Ongoing (Scheduled)</option>
                  <option value="Completed">Completed</option>
                </select>

                <button
                  type="button"
                  onClick={() => setVerifiedOnlyFilter(!verifiedOnlyFilter)}
                  className={`filter-toggle-btn ${verifiedOnlyFilter ? 'active' : ''}`}
                >
                  <ShieldCheck size={14} />
                  <span>Verified Only</span>
                </button>
              </div>
            </div>

            {/* Events Grid */}
            {filteredEvents.length === 0 ? (
              <div className="empty-state-box">
                <AlertCircle size={40} className="text-amber" />
                <h3>No Matching Events Found</h3>
                <p>Try clearing your search query or adjusting your category/schedule filter.</p>
                <button 
                  onClick={() => { setSearchQuery(''); setEventCategoryFilter('All'); setEventStatusFilter('All'); setVerifiedOnlyFilter(false); }}
                  className="btn btn-secondary btn-sm"
                  style={{ marginTop: '8px' }}
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid-cards">
                {filteredEvents.map(evt => (
                  <EventCard 
                    key={evt.id}
                    event={evt}
                    onRsvpToggle={handleRsvpToggle}
                    onSelectEvent={(e) => handleOpenDetail(e, 'event')}
                  />
                ))}
              </div>
            )}
          </div>
        </main>
      )}

      {/* =========================================================
          TAB 3: PROJECTS & COLLABORATION
         ========================================================= */}
      {activeTab === 'projects' && (
        <main className="page-section">
          <div className="container">
            <div className="section-head-bar">
              <div>
                <h1 className="section-title">Featured Research Projects</h1>
                <p className="section-subtitle">
                  Explore research opportunities and find projects aligned with your interests.
                </p>
              </div>
            </div>

            {/* Filter Toolbar */}
            <div className="filter-toolbar">
              <div className="search-input-box">
                <Search size={15} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search projects by title, domain, skills (e.g. React, Unity), or supervisor..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
              </div>

              <div className="filter-controls-group">
                <select
                  value={projectStatusFilter}
                  onChange={(e) => setProjectStatusFilter(e.target.value)}
                  className="filter-select"
                >
                  <option value="All">All Collaboration Statuses</option>
                  <option value="Open">Collab Open Only</option>
                  <option value="Limited">Limited Spots</option>
                  <option value="Closed">Team Full</option>
                </select>

                <button
                  type="button"
                  onClick={() => setVerifiedOnlyFilter(!verifiedOnlyFilter)}
                  className={`filter-toggle-btn ${verifiedOnlyFilter ? 'active' : ''}`}
                >
                  <ShieldCheck size={14} />
                  <span>Verified Projects Only</span>
                </button>
              </div>
            </div>

            {/* Projects Grid */}
            {filteredProjects.length === 0 ? (
              <div className="empty-state-box">
                <AlertCircle size={40} className="text-amber" />
                <h3>No Research Projects Found</h3>
                <p>No project entries match your current search query or collaboration status filter.</p>
                <button 
                  onClick={() => { setSearchQuery(''); setProjectStatusFilter('All'); setVerifiedOnlyFilter(false); }}
                  className="btn btn-secondary btn-sm"
                  style={{ marginTop: '8px' }}
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid-cards">
                {filteredProjects.map(proj => (
                  <ProjectCard 
                    key={proj.id}
                    project={proj}
                    onOpenCollab={handleOpenCollab}
                    onSelectProject={(p) => handleOpenDetail(p, 'project')}
                  />
                ))}
              </div>
            )}
          </div>
        </main>
      )}

      {/* =========================================================
          TAB 4: LABS & RESEARCH
         ========================================================= */}
      {activeTab === 'labs' && (
        <main className="page-section">
          <div className="container">
            <div className="section-head-bar">
              <div>
                <h1 className="section-title">Labs & Research</h1>
                <p className="section-subtitle">
                  Explore research studios, facilities, and experimental equipment in the HCD department.
                </p>
              </div>
            </div>

            {/* Filter Toolbar */}
            <div className="filter-toolbar">
              <div className="search-input-box">
                <Search size={15} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search labs by name, theme, or equipment (e.g. Eye Tracker, PCB)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
              </div>

              <div className="filter-controls-group">
                <button
                  type="button"
                  onClick={() => setVerifiedOnlyFilter(!verifiedOnlyFilter)}
                  className={`filter-toggle-btn ${verifiedOnlyFilter ? 'active' : ''}`}
                >
                  <ShieldCheck size={14} />
                  <span>Verified Facilities Only</span>
                </button>
              </div>
            </div>

            {/* Labs Grid */}
            {filteredLabs.length === 0 ? (
              <div className="empty-state-box">
                <AlertCircle size={40} className="text-amber" />
                <h3>No Laboratories Found</h3>
                <p>No laboratory facility matches the current search keywords.</p>
                <button 
                  onClick={() => { setSearchQuery(''); setVerifiedOnlyFilter(false); }}
                  className="btn btn-secondary btn-sm"
                  style={{ marginTop: '8px' }}
                >
                  Reset Filter
                </button>
              </div>
            ) : (
              <div className="grid-cards">
                {filteredLabs.map(lab => (
                  <LabCard 
                    key={lab.id}
                    lab={lab}
                    onSelectLab={(l) => handleOpenDetail(l, 'lab')}
                  />
                ))}
              </div>
            )}
          </div>
        </main>
      )}

      {/* =========================================================
          TAB 5: ADMIN DASHBOARD
         ========================================================= */}
      {activeTab === 'admin' && (
        <main className="container">
          <AdminDashboard 
            submissions={submissions}
            onApproveSubmission={handleApproveSubmission}
            onRejectSubmission={handleRejectSubmission}
            events={events}
            onToggleEventVerification={handleToggleEventVerification}
            projects={projects}
            onToggleProjectVerification={handleToggleProjectVerification}
            labs={labs}
            onToggleLabVerification={handleToggleLabVerification}
            onSwitchTab={setActiveTab}
          />
        </main>
      )}

      {/* Universal Multi-Column Footer */}
      <Footer onSwitchTab={setActiveTab} />

      {/* =========================================================
          MODALS & OVERLAYS
         ========================================================= */}

      {/* 1. Student / Admin Authentication Modal */}
      <AuthModal 
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          if (user.role === 'admin') {
            setActiveTab('admin');
          }
        }}
      />

      {/* 2. Event Proposal Submission Modal */}
      <EventSubmissionModal 
        isOpen={isSubmitEventOpen}
        onClose={() => setIsSubmitEventOpen(false)}
        onSubmitProposal={handleSubmitProposal}
        currentUser={currentUser}
      />

      {/* 3. Project Collaboration Application Modal */}
      <CollabModal 
        isOpen={!!selectedCollabProject}
        project={selectedCollabProject}
        onClose={() => setSelectedCollabProject(null)}
        currentUser={currentUser}
      />

      {/* 4. Universal Detailed Inspection Modal */}
      <DetailModal 
        isOpen={detailModal.isOpen}
        item={detailModal.item}
        type={detailModal.type}
        onClose={handleCloseDetail}
        onRsvpToggle={handleRsvpToggle}
        onOpenCollab={handleOpenCollab}
      />
    </div>
  );
}
