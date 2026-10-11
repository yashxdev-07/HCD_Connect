import React from 'react';
import { MapPin, Mail, Phone, ExternalLink, GraduationCap, ShieldAlert } from 'lucide-react';

export default function Footer({ onSwitchTab }) {
  return (
    <footer className="footer-wrapper">
      <div className="container footer-content">
        <div className="footer-grid">
          {/* Col 1: About Department */}
          <div className="footer-col">
            <div className="footer-brand">
              <GraduationCap size={24} className="text-cyan" />
              <h3>HCD CONNECT</h3>
            </div>
            <p className="footer-desc">
              Central hub for events, research labs, undergraduate & graduate capstone projects, 
              and interdisciplinary collaboration at the Department of Human-Centered Design, 
              IIIT Delhi.
            </p>
            <div className="demo-notice-box">
              <ShieldAlert size={16} className="text-amber" />
              <span>
                Demo data items are clearly tagged. Real departmental listings are marked with the Verified badge.
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="footer-col">
            <h4 className="footer-heading">Portals & Navigation</h4>
            <ul className="footer-links">
              <li>
                <button onClick={() => onSwitchTab('home')}>Department Overview</button>
              </li>
              <li>
                <button onClick={() => onSwitchTab('events')}>Academic & Club Events</button>
              </li>
              <li>
                <button onClick={() => onSwitchTab('projects')}>Projects & Call for Collaborators</button>
              </li>
              <li>
                <button onClick={() => onSwitchTab('labs')}>Research Labs & Facilities</button>
              </li>
            </ul>
          </div>

          {/* Col 3: Academic Programs */}
          <div className="footer-col">
            <h4 className="footer-heading">HCD Programs at IIITD</h4>
            <ul className="footer-links">
              <li>
                <a href="https://iiitd.ac.in" target="_blank" rel="noopener noreferrer">
                  B.Tech in Computer Science & Design (CS+D) <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <a href="https://iiitd.ac.in" target="_blank" rel="noopener noreferrer">
                  Master of Design (M.Des in HCD) <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <a href="https://iiitd.ac.in" target="_blank" rel="noopener noreferrer">
                  Ph.D. in Human-Centered Design <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <a href="https://iiitd.ac.in" target="_blank" rel="noopener noreferrer">
                  Design Summer Internships & Visiting Fellowships <ExternalLink size={12} />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Campus Contact */}
          <div className="footer-col">
            <h4 className="footer-heading">Department Location</h4>
            <div className="footer-contact-item">
              <MapPin size={16} className="contact-icon" />
              <span>
                R&D Building & Academic Block, IIIT Delhi, Okhla Industrial Estate Phase III, New Delhi - 110020
              </span>
            </div>
            <div className="footer-contact-item">
              <Mail size={16} className="contact-icon" />
              <span>hcd-office@iiitd.ac.in</span>
            </div>
            <div className="footer-contact-item">
              <Phone size={16} className="contact-icon" />
              <span>+91-11-26907400</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Department of Human-Centered Design, Indraprastha Institute of Information Technology Delhi (IIIT-Delhi). All rights reserved.</p>
          <p className="footer-credits">Crafted for IIITD Students, Researchers & Faculty Pairings</p>
        </div>
      </div>
    </footer>
  );
}
