import React, { useState } from 'react';
import { 
  X, 
  LogIn, 
  UserPlus, 
  ShieldCheck, 
  GraduationCap, 
  Mail, 
  Lock, 
  User, 
  Hash, 
  Sparkles 
} from 'lucide-react';
import { DEMO_USERS } from '../data/mockData';

export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rollNo: '',
    program: 'B.Tech CS+D',
    password: '',
    interests: '',
  });
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError('Please fill in all required fields.');
      return;
    }

    if (mode === 'login') {
      // Check if it matches admin email
      if (formData.email.toLowerCase().includes('admin')) {
        onLoginSuccess(DEMO_USERS[1]);
      } else {
        onLoginSuccess({
          id: `usr-${Date.now()}`,
          name: formData.email.split('@')[0].replace('.', ' '),
          email: formData.email,
          rollNo: '2024HCD999',
          role: 'student',
          program: 'M.Des Human-Centered Design',
          interests: ['UX Research', 'Interaction Design'],
          avatar: formData.email.slice(0, 2).toUpperCase()
        });
      }
    } else {
      // Register
      if (!formData.name || !formData.rollNo) {
        setError('Please provide your name and student roll number.');
        return;
      }

      onLoginSuccess({
        id: `usr-${Date.now()}`,
        name: formData.name,
        email: formData.email,
        rollNo: formData.rollNo,
        role: 'student',
        program: formData.program,
        interests: formData.interests ? formData.interests.split(',').map(s => s.trim()) : ['Design'],
        avatar: formData.name.slice(0, 2).toUpperCase()
      });
    }

    onClose();
  };

  const handleQuickDemo = (role) => {
    if (role === 'student') {
      onLoginSuccess(DEMO_USERS[0]);
    } else {
      onLoginSuccess(DEMO_USERS[1]);
    }
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content auth-modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="auth-header-title">
            <GraduationCap size={22} className="text-accent" />
            <h2>{mode === 'login' ? 'Sign In to HCD Connect' : 'Student Portal Registration'}</h2>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="auth-tab-bar">
          <button
            type="button"
            className={`auth-tab-btn ${mode === 'login' ? 'active' : ''}`}
            onClick={() => { setMode('login'); setError(''); }}
          >
            <LogIn size={15} />
            <span>Sign In</span>
          </button>
          <button
            type="button"
            className={`auth-tab-btn ${mode === 'register' ? 'active' : ''}`}
            onClick={() => { setMode('register'); setError(''); }}
          >
            <UserPlus size={15} />
            <span>Create Student Account</span>
          </button>
        </div>

        {error && <div className="alert-error-box">{error}</div>}

        {/* Form */}
        <form onSubmit={handleSubmit} className="auth-form">
          {mode === 'register' && (
            <>
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <div className="input-with-icon">
                  <User size={16} className="input-icon" />
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="e.g. Arjun Sharma"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label">IIITD Roll Number *</label>
                  <div className="input-with-icon">
                    <Hash size={16} className="input-icon" />
                    <input
                      type="text"
                      name="rollNo"
                      required
                      placeholder="e.g. 2024HCD501"
                      value={formData.rollNo}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Academic Program</label>
                  <select
                    name="program"
                    value={formData.program}
                    onChange={handleInputChange}
                    className="form-select"
                  >
                    <option value="B.Tech CS+D">B.Tech CS+D</option>
                    <option value="M.Des HCD">M.Des HCD</option>
                    <option value="Ph.D. HCD">Ph.D. HCD</option>
                    <option value="Visiting Fellow">Visiting Fellow</option>
                  </select>
                </div>
              </div>
            </>
          )}

          <div className="form-group">
            <label className="form-label">IIIT Delhi Email *</label>
            <div className="input-with-icon">
              <Mail size={16} className="input-icon" />
              <input
                type="email"
                name="email"
                required
                placeholder="yourname@iiitd.ac.in"
                value={formData.email}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
            <span className="form-hint">Use your institutional @iiitd.ac.in address</span>
          </div>

          <div className="form-group">
            <label className="form-label">Password *</label>
            <div className="input-with-icon">
              <Lock size={16} className="input-icon" />
              <input
                type="password"
                name="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
          </div>

          {mode === 'register' && (
            <div className="form-group">
              <label className="form-label">Research / Design Interests</label>
              <input
                type="text"
                name="interests"
                placeholder="e.g. Tangible UI, XR, Medical Device UX, Usability"
                value={formData.interests}
                onChange={handleInputChange}
                className="form-input"
              />
              <span className="form-hint">Comma separated topics</span>
            </div>
          )}

          <button type="submit" className="btn btn-primary btn-full" style={{ marginTop: '0.75rem' }}>
            {mode === 'login' ? 'Sign In to Portal' : 'Complete Registration'}
          </button>
        </form>

        {/* Quick Demo Login Fill Section */}
        <div className="quick-demo-section">
          <div className="divider-label">
            <span>Or Quick Test with Demo Profiles</span>
          </div>
          <div className="quick-demo-buttons">
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => handleQuickDemo('student')}
            >
              <User size={14} className="text-accent" />
              <span>Demo Student (Arjun)</span>
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => handleQuickDemo('admin')}
            >
              <ShieldCheck size={14} className="text-amber" />
              <span>Faculty Admin (Dept Desk)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
