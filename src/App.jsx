import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  Button, 
  Form, 
  InputGroup 
} from 'react-bootstrap';

import TopBar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import MobileHome from './components/MobileHome';
import EventCard from './components/EventCard';
import ProjectCard from './components/ProjectCard';
import HcdInfoView from './components/HcdInfoView';
import CollabModal from './components/CollabModal';
import DetailModal from './components/DetailModal';
import './App.css';

import { 
  INITIAL_EVENTS, 
  INITIAL_PROJECTS, 
  INITIAL_LABS, 
  INITIAL_FACULTY 
} from './data/mockData';

export default function App() {
  const MOBILE_BREAKPOINT = 600;

  // Mobile Screen Detection (<= 600px)
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth <= MOBILE_BREAKPOINT;
    }
    return false;
  });

  // Navigation State (defaults to 'home' on mobile <= 600px, 'info' on desktop > 600px)
  const [activeTab, setActiveTab] = useState(() => {
    if (typeof window !== 'undefined' && window.innerWidth <= MOBILE_BREAKPOINT) {
      return 'home';
    }
    return 'info';
  });

  useEffect(() => {
    const handleResize = () => {
      const mobileNow = window.innerWidth <= MOBILE_BREAKPOINT;
      setIsMobile((prev) => {
        if (prev !== mobileNow) {
          if (mobileNow) {
            // When resizing to mobile width, reveal the mobile-first homepage
            setActiveTab('home');
          } else {
            // When returning to desktop, default to info
            setActiveTab(curr => curr === 'home' ? 'info' : curr);
          }
        }
        return mobileNow;
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Datasets
  const [events, setEvents] = useState(INITIAL_EVENTS);
  const [projects] = useState(INITIAL_PROJECTS);
  const [labs] = useState(INITIAL_LABS);
  const [faculty] = useState(INITIAL_FACULTY);

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [eventCategoryFilter, setEventCategoryFilter] = useState('All');
  const [eventStatusFilter, setEventStatusFilter] = useState('All'); // 'All' | 'Upcoming' | 'Ongoing' | 'Completed'
  const [projectStatusFilter, setProjectStatusFilter] = useState('All');
  const [verifiedOnlyFilter, setVerifiedOnlyFilter] = useState(false);

  // Modals state
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

  return (
    <div className="d-flex flex-column min-vh-100" style={{ backgroundColor: 'var(--hcd-light-bg)', paddingTop: '64px' }}>
      {/* 1. COMPACT TOPBAR (Application Header with Untouched Logo) */}
      <TopBar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isMobile={isMobile}
      />

      {/* 2. APP BODY: Exactly 3 Navigation Options in Sidebar + Central Content Area */}
      <div className="d-flex flex-row flex-grow-1 position-relative">
        <Sidebar 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* Central Content Canvas */}
        <main className={`hcd-main-content ${isMobile && activeTab === 'home' ? 'p-2 pt-3' : 'p-3 p-md-4'}`}>
          <Container fluid="xl" className="px-1 px-md-3">

            {/* Back button on mobile when inside detailed views */}
            {isMobile && activeTab !== 'home' && (
              <div className="mb-3 d-flex align-items-center justify-content-between">
                <button
                  type="button"
                  onClick={() => setActiveTab('home')}
                  className="btn btn-sm d-inline-flex align-items-center gap-2 fw-bold px-3 py-1.5 rounded-pill"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    color: '#115E59',
                    border: '1.5px solid #CDEEF1',
                    fontSize: '0.82rem',
                    boxShadow: 'inset 0 1px 1px rgba(255,255,255,1), 0 2px 8px rgba(17, 94, 89, 0.1)',
                    borderRadius: '24px',
                    backdropFilter: 'blur(6px)',
                    WebkitBackdropFilter: 'blur(6px)',
                    fontWeight: 600
                  }}
                  aria-label="Back to Mobile Overview"
                >
                  <i className="bi bi-arrow-left-circle-fill fs-6" aria-hidden="true"></i>
                  <span>Back to Overview</span>
                </button>
                <span 
                  className="badge rounded-pill fw-semibold px-2.5 py-1.5"
                  style={{ backgroundColor: '#E5EFF2', color: '#115E59', border: '1px solid #CDEEF1', fontSize: '0.72rem' }}
                >
                  📍 4th Floor · R&D Bldg
                </span>
              </div>
            )}
            
            {/* =========================================================
                SCREEN 0: MOBILE OVERVIEW HOME (Matches Reference Image)
               ========================================================= */}
            {isMobile && activeTab === 'home' && (
              <MobileHome onNavigate={(tab) => setActiveTab(tab)} />
            )}

            {/* =========================================================
                SCREEN 1: HCD INFORMATION (Directory & Level 4 Labs/Faculty)
               ========================================================= */}
            {((activeTab === 'info' || (!isMobile && activeTab === 'home') || activeTab === 'labs') && (!isMobile || activeTab !== 'home')) && (
              <HcdInfoView 
                labs={labs}
                searchQuery={searchQuery}
                onSelectLab={(l) => handleOpenDetail(l, 'lab')}
              />
            )}

            {/* =========================================================
                SCREEN 2: EVENTS & ACTIVITIES (Clean Public View)
               ========================================================= */}
            {activeTab === 'events' && (
              <div className="hcd-fade-in">
                {/* Page Header */}
                <div className="page-header-box">
                  <div>
                    <h1 className="fw-bold mb-2" style={{ color: 'var(--hcd-charcoal)', fontSize: '1.8rem', letterSpacing: '-0.03em', lineHeight: 1.15 }}>
                      Events & Activities
                    </h1>
                    <p style={{ color: 'var(--hcd-body)', fontSize: '0.92rem', lineHeight: 1.65, margin: 0 }}>
                      Discover academic workshops, guest lectures, capstone critiques, and research seminars across IIIT Delhi studios.
                    </p>
                  </div>
                </div>

                {/* Filter Toolbar */}
                <Card className="filter-toolbar-card">
                  <Row className="g-2 g-md-3 align-items-center">
                    {/* 1. Search events */}
                    <Col md={5}>
                      <InputGroup>
                        <InputGroup.Text className="bg-light border-end-0 text-muted" style={{ borderColor: 'var(--hcd-border)' }}>
                          <i className="bi bi-search"></i>
                        </InputGroup.Text>
                        <Form.Control
                          type="text"
                          placeholder="Search events by title, room, or speaker..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="border-start-0 ps-0"
                          style={{ borderColor: 'var(--hcd-border)' }}
                        />
                      </InputGroup>
                    </Col>

                    {/* 2. Category filter */}
                    <Col sm={6} md={3}>
                      <Form.Select
                        value={eventCategoryFilter}
                        onChange={(e) => setEventCategoryFilter(e.target.value)}
                      >
                        <option value="All">All Categories</option>
                        <option value="Workshop">Workshops</option>
                        <option value="Guest Lecture">Guest Lectures</option>
                        <option value="Seminar">Research Seminars</option>
                        <option value="Exhibition">Exhibitions</option>
                        <option value="Hackathon">Hackathons</option>
                      </Form.Select>
                    </Col>

                    {/* 3. Schedule/status filter */}
                    <Col sm={6} md={2}>
                      <Form.Select
                        value={eventStatusFilter}
                        onChange={(e) => setEventStatusFilter(e.target.value)}
                      >
                        <option value="All">All Schedules</option>
                        <option value="Upcoming">Upcoming Only</option>
                        <option value="Ongoing">Ongoing (Scheduled)</option>
                        <option value="Completed">Completed</option>
                      </Form.Select>
                    </Col>

                    {/* 4. Verified-only filter */}
                    <Col md={2}>
                      <Button
                        type="button"
                        variant={verifiedOnlyFilter ? "primary" : "secondary"}
                        onClick={() => setVerifiedOnlyFilter(!verifiedOnlyFilter)}
                        className="w-100 d-inline-flex align-items-center justify-content-center gap-2 fw-semibold"
                      >
                        <i className="bi bi-patch-check-fill" style={{ color: verifiedOnlyFilter ? '#FFFFFF' : '#059669' }}></i>
                        <span>Verified Only</span>
                      </Button>
                    </Col>
                  </Row>
                </Card>

                {/* Events Grid */}
                {filteredEvents.length === 0 ? (
                  <Card className="p-5 text-center hcd-card bg-white my-4">
                    <div className="text-warning mb-3">
                      <i className="bi bi-exclamation-triangle-fill fs-1"></i>
                    </div>
                    <h4 className="fw-bold mb-2" style={{ color: 'var(--hcd-charcoal)' }}>No Matching Events Found</h4>
                    <p className="small mb-3" style={{ color: 'var(--hcd-body)' }}>
                      Try clearing your search query or adjusting your category/schedule filter.
                    </p>
                    <div>
                      <Button 
                        variant="secondary" 
                        size="sm"
                        onClick={() => { setSearchQuery(''); setEventCategoryFilter('All'); setEventStatusFilter('All'); setVerifiedOnlyFilter(false); }}
                      >
                        Reset All Filters
                      </Button>
                    </div>
                  </Card>
                ) : (
                  <Row xs={1} md={2} lg={3} className="g-4">
                    {filteredEvents.map(evt => (
                      <Col key={evt.id}>
                        <EventCard 
                          event={evt}
                          onRsvpToggle={handleRsvpToggle}
                          onSelectEvent={(e) => handleOpenDetail(e, 'event')}
                        />
                      </Col>
                    ))}
                  </Row>
                )}
              </div>
            )}

            {/* =========================================================
                SCREEN 3: PROJECTS & COLLABORATION
               ========================================================= */}
            {activeTab === 'projects' && (
              <div>
<div className="hcd-fade-in">
  {/* Header */}
  <div className="page-header-box">
    <div>
      <h1 className="fw-bold mb-2" style={{ color: 'var(--hcd-charcoal)', fontSize: '1.8rem', letterSpacing: '-0.03em', lineHeight: 1.15 }}>
        Projects & Collaboration
      </h1>
      <p style={{ color: 'var(--hcd-body)', fontSize: '0.92rem', lineHeight: 1.65, margin: 0 }}>
        Explore faculty-led research projects seeking student researchers and collaborative assistants.
      </p>
    </div>
  </div>
</div>

                {/* Filter Toolbar */}
                <Card className="filter-toolbar-card">
                  <Row className="g-2 g-md-3 align-items-center">
                    <Col md={6}>
                      <InputGroup>
                        <InputGroup.Text className="bg-light border-end-0 text-muted" style={{ borderColor: 'var(--hcd-border)' }}>
                          <i className="bi bi-search"></i>
                        </InputGroup.Text>
                        <Form.Control
                          type="text"
                          placeholder="Search projects by title, domain, skills (e.g. React, Unity), or supervisor..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="border-start-0 ps-0"
                          style={{ borderColor: 'var(--hcd-border)' }}
                        />
                      </InputGroup>
                    </Col>

                    <Col sm={7} md={3}>
                      <Form.Select
                        value={projectStatusFilter}
                        onChange={(e) => setProjectStatusFilter(e.target.value)}
                      >
                        <option value="All">All Collaboration Statuses</option>
                        <option value="Open">Collab Open Only</option>
                        <option value="Limited">Limited Spots</option>
                        <option value="Closed">Team Full</option>
                      </Form.Select>
                    </Col>

                    <Col sm={5} md={3}>
                      <Button
                        type="button"
                        variant={verifiedOnlyFilter ? "primary" : "secondary"}
                        onClick={() => setVerifiedOnlyFilter(!verifiedOnlyFilter)}
                        className="w-100 d-inline-flex align-items-center justify-content-center gap-2 fw-semibold"
                      >
                        <i className="bi bi-patch-check-fill" style={{ color: verifiedOnlyFilter ? '#FFFFFF' : '#059669' }}></i>
                        <span>Verified Projects Only</span>
                      </Button>
                    </Col>
                  </Row>
                </Card>

                {/* Projects Grid */}
                {filteredProjects.length === 0 ? (
                  <Card className="p-5 text-center hcd-card bg-white my-4">
                    <div className="text-warning mb-3">
                      <i className="bi bi-exclamation-triangle-fill fs-1"></i>
                    </div>
                    <h4 className="fw-bold mb-2" style={{ color: 'var(--hcd-charcoal)' }}>No Research Projects Found</h4>
                    <p className="small mb-3" style={{ color: 'var(--hcd-body)' }}>
                      No project entries match your current search query or collaboration status filter.
                    </p>
                    <div>
                      <Button 
                        variant="secondary" 
                        size="sm"
                        onClick={() => { setSearchQuery(''); setProjectStatusFilter('All'); setVerifiedOnlyFilter(false); }}
                      >
                        Clear Filters
                      </Button>
                    </div>
                  </Card>
                ) : (
                  <Row xs={1} md={2} lg={3} className="g-4">
                    {filteredProjects.map(proj => (
                      <Col key={proj.id}>
                        <ProjectCard 
                          project={proj}
                          onOpenCollab={handleOpenCollab}
                          onSelectProject={(p) => handleOpenDetail(p, 'project')}
                        />
                      </Col>
                    ))}
                  </Row>
                )}
              </div>
            )}
          </Container>

          {/* Compact In-App Footer */}
          <Footer onSwitchTab={setActiveTab} />
        </main>
      </div>

      {/* =========================================================
          MODALS & OVERLAYS (Preserved Student Interactions)
         ========================================================= */}

      {/* 1. Project Collaboration Application Modal */}
      <CollabModal 
        isOpen={!!selectedCollabProject}
        project={selectedCollabProject}
        onClose={() => setSelectedCollabProject(null)}
        currentUser={null}
      />

      {/* 2. Universal Detailed Inspection Modal */}
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