import React from 'react';
import { MapPin, Mail, Phone, GraduationCap, ShieldAlert, ExternalLink } from 'lucide-react';

export default function Footer({ onSwitchTab }) {
  return (
    <footer className="footer-wrapper">
      <div className="container footer-content">
        <div className="footer-grid">
          {/* COLUMN 1: Logo & Platform Mission */}
          <div className="footer-col footer-col-brand">
            <div className="footer-brand">
              <div className="brand-logo-icon">
                <GraduationCap size={20} className="logo-svg" />
              </div>
              <div className="brand-text-block">
                <span className="brand-title">HCD CONNECT</span>
                <span className="brand-subtitle">IIIT Delhi</span>
              </div>
            </div>
            <p className="footer-desc">
              The collaborative research and discovery platform for the Department of Human-Centered Design at IIIT Delhi. Connecting undergraduate, graduate, and faculty researchers across computing and design disciplines.
            </p>
            <div className="footer-demo-callout">
              <ShieldAlert size={14} className="flex-shrink-0 text-amber" />
              <span>
                Demonstration data is clearly labeled. Official records are marked with the Verified badge.
              </span>
            </div>
          </div>

          {/* COLUMN 2: Quick Links */}
          <div className="footer-col">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li>
                <button type="button" onClick={() => onSwitchTab('home')}>Home</button>
              </li>
              <li>
                <button type="button" onClick={() => onSwitchTab('events')}>Events & Activities</button>
              </li>
              <li>
                <button type="button" onClick={() => onSwitchTab('projects')}>Projects & Collaboration</button>
              </li>
              <li>
                <button type="button" onClick={() => onSwitchTab('labs')}>Labs & Research</button>
              </li>
            </ul>
          </div>

          {/* COLUMN 3: Platform Information */}
          <div className="footer-col">
            <h4 className="footer-heading">Platform Info</h4>
            <ul className="footer-links">
              <li>
                <button type="button" onClick={() => onSwitchTab('home')}>About HCD Connect</button>
              </li>
              <li>
                <button type="button" onClick={() => onSwitchTab('projects')}>Research Opportunities</button>
              </li>
              <li>
                <button type="button" onClick={() => onSwitchTab('projects')}>Collaboration Guidelines</button>
              </li>
              <li>
                <a href="https://iiitd.ac.in" target="_blank" rel="noopener noreferrer">
                  IIIT Delhi Main Portal <ExternalLink size={12} className="meta-inline-icon" />
                </a>
              </li>
            </ul>
          </div>

          {/* COLUMN 4: Department Information */}
          <div className="footer-col">
            <h4 className="footer-heading">Department Information</h4>
            <div className="footer-contact-item">
              <MapPin size={15} className="contact-icon flex-shrink-0" />
              <span>
                Dept. of Human-Centered Design, R&D Building, IIIT-Delhi, Okhla Phase III, New Delhi - 110020
              </span>
            </div>
            <div className="footer-contact-item">
              <Mail size={15} className="contact-icon flex-shrink-0" />
              <a href="mailto:hcd-office@iiitd.ac.in" className="footer-contact-link">
                hcd-office@iiitd.ac.in
              </a>
            </div>
            <div className="footer-contact-item">
              <Phone size={15} className="contact-icon flex-shrink-0" />
              <span>+91-11-26907400</span>
            </div>
          </div>
        </div>

        {/* BOTTOM DIVIDER & COPYRIGHT */}
        <div className="footer-bottom-bar">
          <p>© {new Date().getFullYear()} Department of Human-Centered Design, IIIT Delhi. All rights reserved.</p>
          <p className="footer-credits">Academic Research & Discovery Portal</p>
        </div>
      </div>
    </footer>
  );
}
