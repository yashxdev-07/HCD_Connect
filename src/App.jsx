import React, { useState } from 'react';
import { 
  Compass, 
  Calendar, 
  Briefcase, 
  Layers, 
  Search, 
  Filter, 
  CheckCircle, 
  AlertCircle, 
  ArrowRight, 
  Sparkles, 
  GraduationCap, 
  Users, 
  BookOpen, 
  Lightbulb, 
  ShieldCheck, 
  PlusCircle,
  ExternalLink
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
  // Navigation & State
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

    // If detail modal is open for this event, update it as well
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

  // Event submission workflow
  const handleSubmitProposal = (newSubmission) => {
    setSubmissions(prev => [newSubmission, ...prev]);
  };

  const handleApproveSubmission = (subId) => {
    const targetSub = submissions.find(s => s.id === subId);
    if (!targetSub) return;

    // Convert submission to a live event
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

  // Admin audit toggles
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
  // Filtered Lists
  // -------------------------------------------------------------
  const filteredEvents = events.filter(evt => {
    const matchesSearch = evt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          evt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          evt.room.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          evt.speaker.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = eventCategoryFilter === 'All' || evt.category === eventCategoryFilter;
    const matchesVerified = !verifiedOnlyFilter || evt.isVerified;
    return matchesSearch && matchesCategory && matchesVerified;
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
  const featuredProject = projects[0];

  return (
    <div className="app-root">
      {/* Universal Top Navigation */}
      <Navbar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={() => setCurrentUser(null)}
        onOpenSubmitEvent={() => setIsSubmitEventOpen(true)}
        pendingSubmissionsCount={pendingCount}
      />

      {/* =========================================================
          TAB 1: HOMEPAGE
         ========================================================= */}
      {activeTab === 'home' && (
        <main>
          {/* Hero Section */}
          <section className="hero-section">
            <div className="container hero-grid">
              <div className="hero-left">
                <div className="hero-badge-pill">
                  <GraduationCap size={15} />
                  <span>IIIT Delhi • Human-Centered Design Department</span>
                </div>
                <h1 className="hero-headline">
                  Connect. Create. <span>Innovate.</span>
                </h1>
                <p className="hero-description">
                  Welcome to <strong>HCD Connect</strong> — the central collaborative ecosystem 
                  bridging students, research scholars, and faculty at IIIT Delhi. 
                  Discover cutting-edge HCI research labs, join capstone projects, and explore upcoming design critiques.
                </p>

                <div className="hero-cta-buttons">
                  <button 
                    onClick={() => setActiveTab('events')} 
                    className="btn btn-accent"
                  >
                    <Calendar size={16} />
                    <span>Explore Events & Seminars</span>
                  </button>
                  <button 
                    onClick={() => setActiveTab('projects')} 
                    className="btn btn-outline-white"
                  >
                    <Briefcase size={16} />
                    <span>Find Project Collaborations</span>
                  </button>
                  <button 
                    onClick={() => setActiveTab('labs')} 
                    className="btn btn-outline-white"
                  >
                    <Layers size={16} />
                    <span>Browse Research Labs</span>
                  </button>
                </div>

                {/* Live Department Stats */}
                <div className="hero-stats-row">
                  <div className="stat-item">
                    <span className="stat-number">{labs.length}</span>
                    <span className="stat-label">Research Studios</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">{projects.length}</span>
                    <span className="stat-label">Active Projects</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">{events.length}</span>
                    <span className="stat-label">Upcoming Events</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">100%</span>
                    <span className="stat-label">IIITD Community</span>
                  </div>
                </div>
              </div>

              {/* Right Hero Spotlight Card */}
              <div className="hero-right">
                <div className="hero-spotlight-card">
                  <div className="spotlight-header">
                    <div className="spotlight-tag">
                      <Sparkles size={16} className="text-cyan" />
                      <span>Next Department Highlight</span>
                    </div>
                    {nextFeaturedEvent.isVerified ? (
                      <span className="badge badge-verified">
                        <CheckCircle size={11} /> Verified
                      </span>
                    ) : (
                      <span className="badge badge-demo">
                        <AlertCircle size={11} /> Demo Data
                      </span>
                    )}
                  </div>

                  <div className="spotlight-event-box">
                    <span className="badge badge-category" style={{ marginBottom: '0.5rem' }}>
                      {nextFeaturedEvent.category}
                    </span>
                    <h3 className="spotlight-event-title">{nextFeaturedEvent.title}</h3>
                    <div className="spotlight-meta-line">
                      <Calendar size={13} className="text-cyan" />
                      <span>{nextFeaturedEvent.date} • {nextFeaturedEvent.time}</span>
                    </div>
                    <div className="spotlight-meta-line">
                      <GraduationCap size={13} className="text-cyan" />
                      <span>{nextFeaturedEvent.room}</span>
                    </div>
                    <p className="spotlight-callout-text">
                      Speaker: <strong>{nextFeaturedEvent.speaker}</strong>
                    </p>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button 
                      onClick={() => handleRsvpToggle(nextFeaturedEvent.id)}
                      className={`btn btn-sm btn-full ${nextFeaturedEvent.isRsvp ? 'btn-success' : 'btn-primary'}`}
                    >
                      {nextFeaturedEvent.isRsvp ? '✓ RSVP Confirmed' : 'Quick RSVP'}
                    </button>
                    <button
                      onClick={() => handleOpenDetail(nextFeaturedEvent, 'event')}
                      className="btn btn-outline-white btn-sm"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Department Highlights Section */}
          <section className="page-section">
            <div className="container">
              <div className="section-head-bar" style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 2.5rem' }}>
                <h2 className="section-title">The Three Pillars of HCD at IIIT Delhi</h2>
                <p className="section-subtitle">
                  Fostering an ecosystem where technology, art, design, and psychological inquiry converge.
                </p>
              </div>

              <div className="grid-cards">
                <div className="card">
                  <div className="brand-logo-icon" style={{ marginBottom: '1rem', background: '#e0f2fe' }}>
                    <Lightbulb size={22} className="text-accent" />
                  </div>
                  <h3 style={{ marginBottom: '0.5rem', color: 'var(--primary-navy)' }}>Interdisciplinary Research</h3>
                  <p className="card-desc">
                    Explore tactile computing, affective interfaces, medical ergonomics, and inclusive AI in dedicated departmental facilities.
                  </p>
                  <button onClick={() => setActiveTab('labs')} className="btn btn-secondary btn-sm" style={{ marginTop: 'auto' }}>
                    <span>Tour the Labs</span>
                    <ArrowRight size={13} />
                  </button>
                </div>

                <div className="card">
                  <div className="brand-logo-icon" style={{ marginBottom: '1rem', background: '#ecfdf5' }}>
                    <Briefcase size={22} className="text-emerald" />
                  </div>
                  <h3 style={{ marginBottom: '0.5rem', color: 'var(--primary-navy)' }}>Student-Faculty Collaboration</h3>
                  <p className="card-desc">
                    Find capstone and independent study openings. Pair with M.Des and B.Tech CS+D peers on funded research.
                  </p>
                  <button onClick={() => setActiveTab('projects')} className="btn btn-secondary btn-sm" style={{ marginTop: 'auto' }}>
                    <span>Browse Open Positions</span>
                    <ArrowRight size={13} />
                  </button>
                </div>

                <div className="card">
                  <div className="brand-logo-icon" style={{ marginBottom: '1rem', background: '#fffbeb' }}>
                    <Calendar size={22} className="text-amber" />
                  </div>
                  <h3 style={{ marginBottom: '0.5rem', color: 'var(--primary-navy)' }}>Seminars & Design Sprints</h3>
                  <p className="card-desc">
                    Attend weekly reading groups, industry expert talks, and maker sprints hosted in the R&D Building studios.
                  </p>
                  <button onClick={() => setActiveTab('events')} className="btn btn-secondary btn-sm" style={{ marginTop: 'auto' }}>
                    <span>View Calendar</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Featured Project Callout */}
          <section className="page-section" style={{ backgroundColor: '#ffffff', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)' }}>
            <div className="container">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <span className="badge badge-open" style={{ marginBottom: '0.5rem' }}>Open Research Spotlight</span>
                  <h2 className="section-title">Collaborate on Active Research</h2>
                  <p className="section-subtitle">Principal investigators actively seeking student researchers this semester</p>
                </div>
                <button onClick={() => setActiveTab('projects')} className="btn btn-secondary">
                  <span>View All {projects.length} Projects</span>
                  <ArrowRight size={15} />
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
          TAB 2: EVENTS SECTION
         ========================================================= */}
      {activeTab === 'events' && (
        <main className="page-section">
          <div className="container">
            {/* Section Header */}
            <div className="section-head-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h1 className="section-title">Department Events & Seminars</h1>
                <p className="section-subtitle">
                  Academic workshops, guest lectures, capstone critiques, and hackathons hosted at IIIT Delhi.
                </p>
              </div>
              <button 
                onClick={() => setIsSubmitEventOpen(true)}
                className="btn btn-primary"
              >
                <PlusCircle size={16} />
                <span>Submit Event Proposal</span>
              </button>
            </div>

            {/* Filter and Search Bar */}
            <div className="filter-toolbar">
              <div className="search-input-box">
                <Search size={16} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search events by title, speaker, room, or topic..."
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

                <button
                  type="button"
                  onClick={() => setVerifiedOnlyFilter(!verifiedOnlyFilter)}
                  className={`filter-toggle-btn ${verifiedOnlyFilter ? 'active' : ''}`}
                >
                  <ShieldCheck size={15} />
                  <span>Verified Only</span>
                </button>
              </div>
            </div>

            {/* Event Cards Grid */}
            {filteredEvents.length === 0 ? (
              <div className="empty-state-box">
                <AlertCircle size={44} className="text-amber" />
                <h3>No Events Found</h3>
                <p>Try adjusting your search query or removing the category filter.</p>
                <button 
                  onClick={() => { setSearchQuery(''); setEventCategoryFilter('All'); setVerifiedOnlyFilter(false); }}
                  className="btn btn-secondary btn-sm"
                  style={{ marginTop: '0.75rem' }}
                >
                  Reset Filters
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
          TAB 3: PROJECTS SECTION
         ========================================================= */}
      {activeTab === 'projects' && (
        <main className="page-section">
          <div className="container">
            <div className="section-head-bar">
              <h1 className="section-title">Research Projects & Collaboration</h1>
              <p className="section-subtitle">
                Faculty-led initiatives, funded grants, and capstone openings for B.Tech CS+D, M.Des, and Ph.D. students.
              </p>
            </div>

            {/* Filter and Search Bar */}
            <div className="filter-toolbar">
              <div className="search-input-box">
                <Search size={16} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search projects by domain, skills (e.g. Unity, Figma), or supervisor..."
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
                  <option value="Open">Open for Collab Only</option>
                  <option value="Limited">Limited Spots</option>
                  <option value="Closed">Team Full</option>
                </select>

                <button
                  type="button"
                  onClick={() => setVerifiedOnlyFilter(!verifiedOnlyFilter)}
                  className={`filter-toggle-btn ${verifiedOnlyFilter ? 'active' : ''}`}
                >
                  <ShieldCheck size={15} />
                  <span>Verified Only</span>
                </button>
              </div>
            </div>

            {/* Projects Grid */}
            {filteredProjects.length === 0 ? (
              <div className="empty-state-box">
                <AlertCircle size={44} className="text-amber" />
                <h3>No Matching Projects Found</h3>
                <p>Try searching for different keywords or checking all collaboration statuses.</p>
                <button 
                  onClick={() => { setSearchQuery(''); setProjectStatusFilter('All'); setVerifiedOnlyFilter(false); }}
                  className="btn btn-secondary btn-sm"
                  style={{ marginTop: '0.75rem' }}
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
          TAB 4: LABS & RESEARCH SECTION
         ========================================================= */}
      {activeTab === 'labs' && (
        <main className="page-section">
          <div className="container">
            <div className="section-head-bar">
              <h1 className="section-title">Research Labs & Facilities</h1>
              <p className="section-subtitle">
                Explore specialized laboratory infrastructure, hardware tools, and studio spaces in the HCD Department at IIIT Delhi.
              </p>
            </div>

            {/* Filter and Search Bar */}
            <div className="filter-toolbar">
              <div className="search-input-box">
                <Search size={16} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search labs by name, director, or equipment (e.g. Eye Tracker, 3D Printer)..."
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
                  <ShieldCheck size={15} />
                  <span>Verified Facilities Only</span>
                </button>
              </div>
            </div>

            {/* Labs Grid */}
            {filteredLabs.length === 0 ? (
              <div className="empty-state-box">
                <AlertCircle size={44} className="text-amber" />
                <h3>No Labs Found</h3>
                <p>No laboratory matches the current filter settings.</p>
                <button 
                  onClick={() => { setSearchQuery(''); setVerifiedOnlyFilter(false); }}
                  className="btn btn-secondary btn-sm"
                  style={{ marginTop: '0.75rem' }}
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
          TAB 5: ADMIN DASHBOARD (For reviewing submissions & audits)
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

      {/* Universal Footer */}
      <Footer onSwitchTab={setActiveTab} />

      {/* =========================================================
          MODALS & DIALOGS
         ========================================================= */}

      {/* Auth Modal (Sign in / Registration) */}
      <AuthModal 
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          // If logged in as admin, switch directly to admin tab
          if (user.role === 'admin') {
            setActiveTab('admin');
          }
        }}
      />

      {/* Event Submission Modal */}
      <EventSubmissionModal 
        isOpen={isSubmitEventOpen}
        onClose={() => setIsSubmitEventOpen(false)}
        onSubmitProposal={handleSubmitProposal}
        currentUser={currentUser}
      />

      {/* Project Collaboration Modal */}
      <CollabModal 
        isOpen={!!selectedCollabProject}
        project={selectedCollabProject}
        onClose={() => setSelectedCollabProject(null)}
        currentUser={currentUser}
      />

      {/* Detail Modal (Event / Project / Lab) */}
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
