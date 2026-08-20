import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  AlertCircle, 
  ExternalLink,
  GraduationCap,
  Briefcase,
  Sparkles,
  ArrowRight,
  Lock,
  Check
} from 'lucide-react';
import { DEEP_PROFILE } from '../data/deepResumeData.js';
import { playClickSound, playSuccessSound } from '../utils/soundEffects.js';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: 'Forward Deployment Engineer Role',
    budget: 'Standard / Market Rate',
    timeline: 'Immediate / Next 30 Days',
    message: '',
    website_url: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [emailPreviewUrl, setEmailPreviewUrl] = useState(null);

  const validateField = (name, value) => {
    let error = '';
    const trimmed = (value || '').trim();

    if (name === 'name') {
      if (!trimmed) {
        error = 'Your full name is required.';
      } else if (trimmed.length > 100) {
        error = 'Name cannot exceed 100 characters.';
      }
    } else if (name === 'email') {
      if (!trimmed) {
        error = 'Email address is required.';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
        error = 'Please provide a valid, deliverable email format.';
      }
    } else if (name === 'message') {
      if (!trimmed || trimmed.length < 8) {
        error = 'Please provide at least 8 characters for your inquiry details.';
      } else if (trimmed.length > 3000) {
        error = 'Message cannot exceed 3000 characters.';
      }
    }

    setErrors(prev => ({ ...prev, [name]: error }));
    return !error;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isNameValid = validateField('name', formData.name);
    const isEmailValid = validateField('email', formData.email);
    const isMessageValid = validateField('message', formData.message);

    if (!isNameValid || !isEmailValid || !isMessageValid) {
      setSubmitStatus('error');
      setStatusMessage('Please correct the highlighted fields before transmitting.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setEmailPreviewUrl(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        playSuccessSound();
        try {
          confetti({
            particleCount: 70,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#064E3B', '#10B981', '#F59E0B', '#D1FAE5']
          });
        } catch {
          // Ignore
        }
        setSubmitStatus('success');
        setStatusMessage(data.message || 'Your inquiry was securely delivered to Deep Chaudhari.');
        if (data.previewUrl) {
          setEmailPreviewUrl(data.previewUrl);
        }
        setFormData({
          name: '',
          email: '',
          company: '',
          service: 'Forward Deployment Engineer Role',
          budget: 'Standard / Market Rate',
          timeline: 'Immediate / Next 30 Days',
          message: '',
          website_url: '',
        });
      } else {
        setSubmitStatus('error');
        setStatusMessage(data.error || 'Failed to transmit inquiry. Please reach Deep directly at deepsc0606@gmail.com.');
      }
    } catch (err) {
      console.error('Contact submit error:', err);
      setSubmitStatus('error');
      setStatusMessage('Network connectivity issue. Please email deepsc0606@gmail.com directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-24 bg-[#FAF9F6] text-[#0F172A]">
      {/* 1. HEADER */}
      <section className="relative pt-12 sm:pt-20 lg:pt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wider font-bold text-[#064E3B] bg-[#D1FAE5] px-3 py-1 rounded-full border border-[#A7F3D0]">
                Direct Inquiries &bull; Connect with Deep
              </span>
              <span className="text-xs font-mono font-bold text-[#064E3B] bg-white border border-[#E2E8F0] px-2.5 py-1 rounded-full hidden sm:inline-flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
                <span>Encrypted Transport</span>
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0F172A] tracking-tight leading-tight">
              Get in Touch with{' '}
              <span className="text-[#064E3B]">Deep Chaudhari</span>.
            </h1>
            <p className="text-base sm:text-lg text-[#475569] leading-relaxed">
              Open for Forward Deployment Engineer, Software Development Engineer, and Full-Stack opportunities. Send a message to schedule an interview or technical discussion.
            </p>
          </div>
        </div>
      </section>

      {/* 2. FORM & DIRECT CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left: Contact Form */}
          <div className="lg:col-span-7 bg-white border border-[#E2E8F0] p-6 sm:p-10 rounded-3xl shadow-sm space-y-6">
            <div className="border-b border-[#E2E8F0] pb-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A]">
                  Send Direct Inquiry
                </h2>
                <p className="text-xs text-[#64748B] mt-1">
                  Dispatched securely via Nodemailer to deepsc0606@gmail.com with spam protection.
                </p>
              </div>
              <div className="p-2 rounded-xl bg-[#FAF9F6] border border-[#E2E8F0] text-[#064E3B]">
                <Lock className="w-4 h-4" />
              </div>
            </div>

            {/* Notification Toast */}
            {submitStatus === 'success' && (
              <div className="p-4 rounded-2xl bg-[#D1FAE5] border border-[#A7F3D0] text-[#064E3B] space-y-2 animate-in fade-in">
                <div className="flex items-center gap-2 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5 text-[#064E3B] shrink-0" />
                  <span>Message Transmitted Successfully!</span>
                </div>
                <p className="text-xs text-[#064E3B] leading-relaxed">
                  {statusMessage}
                </p>
                {emailPreviewUrl && (
                  <div className="pt-2 border-t border-[#A7F3D0]/60">
                    <a
                      href={emailPreviewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#064E3B] underline hover:text-[#043d2e]"
                    >
                      <span>View Nodemailer Ethereal Preview Payload</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 space-y-1 animate-in fade-in">
                <div className="flex items-center gap-2 font-bold text-sm">
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                  <span>Submission Notice</span>
                </div>
                <p className="text-xs text-red-700">{statusMessage}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Invisible Anti-Spam Honeypot Field */}
              <div style={{ opacity: 0, position: 'absolute', top: 0, left: 0, height: 0, width: 0, zIndex: -1 }}>
                <input
                  type="text"
                  name="website_url"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.website_url}
                  onChange={handleInputChange}
                />
              </div>

              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#334155]">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Alex Morgan"
                    maxLength={100}
                    className={`w-full px-4 py-3 rounded-xl bg-[#FAF9F6] border text-xs sm:text-sm text-[#0F172A] placeholder-[#94A3B8] transition-colors focus:bg-white focus:outline-none ${
                      errors.name ? 'border-red-400 focus:border-red-500' : 'border-[#E2E8F0] focus:border-[#064E3B]'
                    }`}
                  />
                  {errors.name && (
                    <span className="text-[11px] text-red-500 font-medium">{errors.name}</span>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#334155]">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="alex@company.com"
                    maxLength={120}
                    className={`w-full px-4 py-3 rounded-xl bg-[#FAF9F6] border text-xs sm:text-sm text-[#0F172A] placeholder-[#94A3B8] transition-colors focus:bg-white focus:outline-none ${
                      errors.email ? 'border-red-400 focus:border-red-500' : 'border-[#E2E8F0] focus:border-[#064E3B]'
                    }`}
                  />
                  {errors.email && (
                    <span className="text-[11px] text-red-500 font-medium">{errors.email}</span>
                  )}
                </div>
              </div>

              {/* Company & Subject Role */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#334155]">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="e.g. Acme Tech / Startup"
                    maxLength={120}
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF9F6] border border-[#E2E8F0] text-xs sm:text-sm text-[#0F172A] placeholder-[#94A3B8] transition-colors focus:bg-white focus:outline-none focus:border-[#064E3B]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#334155]">
                    Opportunity / Focus Topic
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF9F6] border border-[#E2E8F0] text-xs sm:text-sm text-[#0F172A] transition-colors focus:bg-white focus:outline-none focus:border-[#064E3B]"
                  >
                    <option value="Forward Deployment Engineer Role">Forward Deployment Engineer Role</option>
                    <option value="Full-Stack Software Engineer Role">Full-Stack Software Engineer Role</option>
                    <option value="Backend / REST APIs Engineering">Backend / REST APIs Engineering</option>
                    <option value="AI Integration & Gemini Agent Systems">AI Integration &amp; Gemini Agent Systems</option>
                    <option value="Technical Consulting / Advisory">Technical Consulting / Advisory</option>
                  </select>
                </div>
              </div>

              {/* Timeline */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#334155]">
                  Start Timeline
                </label>
                <select
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF9F6] border border-[#E2E8F0] text-xs sm:text-sm text-[#0F172A] transition-colors focus:bg-white focus:outline-none focus:border-[#064E3B]"
                >
                  <option value="Immediate (< 2 weeks)">Immediate (&lt; 2 weeks)</option>
                  <option value="Next 30 Days">Next 30 Days</option>
                  <option value="Flexible / Future Quarter">Flexible / Future Quarter</option>
                </select>
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#334155]">
                  Message / Role Details <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  maxLength={3000}
                  placeholder="Share details about the role, project requirements, or schedule a technical chat..."
                  className={`w-full px-4 py-3 rounded-xl bg-[#FAF9F6] border text-xs sm:text-sm text-[#0F172A] placeholder-[#94A3B8] transition-colors focus:bg-white focus:outline-none resize-y ${
                    errors.message ? 'border-red-400 focus:border-red-500' : 'border-[#E2E8F0] focus:border-[#064E3B]'
                  }`}
                />
                {errors.message && (
                  <span className="text-[11px] text-red-500 font-medium">{errors.message}</span>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full py-3.5 flex items-center justify-center gap-2 text-sm font-bold disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                      <span>Transmitting via Nodemailer...</span>
                    </>
                  ) : (
                    <>
                      <span>Transmit Message to Deep</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Right: Direct Information */}
          <div className="lg:col-span-5 space-y-6">
            <div className="card-organic p-6 sm:p-8 rounded-3xl space-y-6">
              <h3 className="text-lg font-bold text-[#0F172A] border-b border-[#E2E8F0] pb-3">
                Direct Contact Channels
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#D1FAE5] text-[#064E3B] flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
                      Primary Email
                    </div>
                    <a
                      href={`mailto:${DEEP_PROFILE.email}`}
                      className="text-sm font-bold text-[#064E3B] hover:underline"
                    >
                      {DEEP_PROFILE.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#D1FAE5] text-[#064E3B] flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
                      Direct Mobile / WhatsApp
                    </div>
                    <a
                      href={`tel:${DEEP_PROFILE.phone}`}
                      className="text-sm font-bold text-[#064E3B] hover:underline"
                    >
                      {DEEP_PROFILE.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#D1FAE5] text-[#064E3B] flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
                      Current Location
                    </div>
                    <p className="text-xs text-[#334155] font-semibold">
                      Mumbai, Maharashtra, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#D1FAE5] text-[#064E3B] flex items-center justify-center shrink-0">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
                      Academic Affiliation
                    </div>
                    <p className="text-xs text-[#334155]">
                      Shah &amp; Anchor Kutchhi Engineering College (SAKEC), Mumbai
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Ethical Engineering Security Assurance */}
            <div className="card-organic p-6 rounded-3xl bg-[#FAF9F6] border border-[#E2E8F0] space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#064E3B]">
                <ShieldCheck className="w-4 h-4" />
                <span>Ethical Engineering &amp; Data Privacy Guarantee</span>
              </div>
              <p className="text-xs text-[#475569] leading-relaxed">
                Submissions are treated with strict confidentiality under standard mutual NDA practices. Incoming payloads are scrubbed of executable scripts, protected by rate limiters, and routed over TLS encryption.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
