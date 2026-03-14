'use client';

import { useState, useEffect } from 'react';

const G = 'https://ollkorrekt.gumroad.com/l';

const guides = [
  { cluster: 'Universal', title: 'AI-Proof Your Career', sub: 'Your career is changing whether you\u2019re ready or not.', cover: '/covers/cover-1.jpg', slug: 'ai-proof-career', price: '$9', badge: 'Bestseller', audience: 'For any professional facing AI disruption.', includes: ['Career Resilience Audit', 'Adaptive Positioning Framework', '90-Day Action Plan', '22 pages'] },
  { cluster: 'Client-Facing', title: 'The Client-Facing AI Survival Guide', sub: 'When the chatbot handles the easy ones, you handle the ones that matter.', cover: '/covers/cover-2.jpg', slug: 'client-facing', price: '$9', audience: 'For Customer Service, Account Managers, Sales Professionals, and Support Specialists.', includes: ['Relationship-Over-Transaction Audit', 'Client Trust Framework', '90-Day Action Plan', '17 pages'] },
  { cluster: 'Creative', title: 'The Creative Professional\u2019s AI Playbook', sub: 'When the machine can make it, your job is to mean it.', cover: '/covers/cover-3.jpg', slug: 'creative-playbook', price: '$9', audience: 'For Content Creators, Video Producers, Social Media Managers, and Copywriters.', includes: ['Direction-Over-Production Audit', 'Creative Authority Framework', '90-Day Action Plan', '16 pages'] },
  { cluster: 'Education', title: 'AI-Proofing Education', sub: 'When the lesson plans write themselves, your job is to teach what they can\u2019t.', cover: '/covers/cover-4.jpg', slug: 'education-ai-proof', price: '$9', audience: 'For Teachers, Researchers, Academic Administrators, and Instructional Designers.', includes: ['Mentorship-Over-Delivery Audit', 'Human Impact Framework', '90-Day Action Plan', '16 pages'] },
  { cluster: 'Technical', title: 'The Technical Professional\u2019s AI Displacement Guide', sub: 'When the builders get built for.', cover: '/covers/cover-5.jpg', slug: 'technical-displacement', price: '$9', audience: 'For Software Developers, Data Engineers, IT Administrators, and Cybersecurity Specialists.', includes: ['Implementation-to-Architecture Audit', 'Force Multiplier Framework', '90-Day Action Plan', '15 pages'] },
  { cluster: 'Finance', title: 'The Finance Professional\u2019s AI Displacement Guide', sub: 'When the numbers start running themselves.', cover: '/covers/cover-6.jpg', slug: 'finance-displacement', price: '$9', audience: 'For Financial Analysts, Accountants and Auditors, Risk and Compliance Professionals, and Banking Specialists.', includes: ['Judgment-Over-Calculation Audit', 'Advisory Upgrade Framework', '90-Day Action Plan'] },
  { cluster: 'Legal', title: 'The Legal Professional\u2019s AI Displacement Guide', sub: 'When the fine print reads itself.', cover: '/covers/cover-7.jpg', slug: 'legal-displacement', price: '$9', audience: 'For Lawyers, Paralegals, Compliance Officers, and In-House Counsel.', includes: ['Judgment-Over-Process Audit', 'Advisory Shift Framework', '90-Day Action Plan'] },
  { cluster: 'Healthcare & Public Sector', title: 'The Healthcare & Public Sector AI Displacement Guide', sub: 'When the system starts thinking for itself.', cover: '/covers/cover-8.jpg', slug: 'healthcare-public-sector', price: '$9', audience: 'For Healthcare Administrators, Programme Managers, Policy Analysts, and Grant Coordinators.', includes: ['Service-Over-Process Audit', 'Human Judgment Framework', '90-Day Action Plan'] },
  { cluster: 'Built Environment', title: 'The Built Environment AI Displacement Guide', sub: 'When the blueprints draw themselves.', cover: '/covers/cover-9.jpg', slug: 'built-environment', price: '$9', audience: 'For Architects, Civil Engineers, Quantity Surveyors, and Construction Project Managers.', includes: ['Design-Over-Drafting Audit', 'Judgment Integration Framework', '90-Day Action Plan'] },
];

export default function GuidesPage() {
  const [modal, setModal] = useState(null);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') setModal(null); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = modal ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [modal]);

  return (
    <>
      <style>{`
        .g-page { background: #09090b; color: #e8e6e3; min-height: 100vh; font-family: 'DM Sans', sans-serif; -webkit-font-smoothing: antialiased; }
        .g-header { position: sticky; top: 0; z-index: 100; padding: 0 40px; height: 60px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #1e1e24; background: rgba(9,9,11,0.92); backdrop-filter: blur(20px); }
        .g-logo { font-family: 'DM Serif Display', serif; font-size: 1.25rem; color: #0D7377; text-decoration: none; }
        .g-logo-sub { font-family: 'DM Sans', sans-serif; font-size: 0.68rem; color: #8a877f; letter-spacing: 0.1em; text-transform: uppercase; margin-left: 10px; }
        .g-nav { display: flex; gap: 28px; }
        .g-nav a { color: #8a877f; text-decoration: none; font-size: 0.82rem; font-weight: 500; transition: color 0.2s; }
        .g-nav a:hover, .g-nav a.act { color: #0fa4a9; }
        .g-hero { text-align: center; padding: 72px 40px 56px; position: relative; }
        .g-hero::before { content: ''; position: absolute; top: -100px; left: 50%; transform: translateX(-50%); width: 700px; height: 500px; background: radial-gradient(ellipse, rgba(13,115,119,0.12) 0%, transparent 70%); pointer-events: none; }
        .g-hero h1 { font-family: 'DM Serif Display', serif; font-size: 2.8rem; letter-spacing: -0.03em; line-height: 1.15; margin-bottom: 16px; position: relative; }
        .g-hero h1 em { font-style: normal; color: #0fa4a9; }
        .g-hero p { color: #8a877f; font-size: 1rem; max-width: 500px; margin: 0 auto; line-height: 1.6; }
        .g-scan { display: inline-block; margin-top: 24px; padding: 12px 28px; background: #0D7377; color: #fff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 0.88rem; transition: background 0.2s; }
        .g-scan:hover { background: #0fa4a9; }
        .g-grid { max-width: 1180px; margin: 0 auto; padding: 16px 40px 48px; display: grid; grid-template-columns: repeat(3,1fr); gap: 28px; }
        .g-card { background: #111114; border: 1px solid #1e1e24; border-radius: 12px; overflow: hidden; transition: transform 0.3s, border-color 0.3s, box-shadow 0.3s; cursor: pointer; }
        .g-card:hover { transform: translateY(-5px); border-color: #0D7377; box-shadow: 0 10px 36px rgba(13,115,119,0.13); }
        .g-card-img { position: relative; aspect-ratio: 3/4; overflow: hidden; background: #000; }
        .g-card-img img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s; }
        .g-card:hover .g-card-img img { transform: scale(1.03); }
        .g-card-img::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 45%; background: linear-gradient(to top, #111114 0%, transparent 100%); pointer-events: none; }
        .g-badge { position: absolute; top: 10px; right: 10px; z-index: 2; background: #0D7377; color: #fff; font-size: 0.65rem; font-weight: 700; padding: 3px 9px; border-radius: 4px; letter-spacing: 0.07em; text-transform: uppercase; }
        .g-card-body { padding: 16px 18px 20px; margin-top: -32px; position: relative; z-index: 2; }
        .g-cluster { font-size: 0.65rem; color: #0fa4a9; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 600; margin-bottom: 5px; }
        .g-card-title { font-family: 'DM Serif Display', serif; font-size: 1.08rem; line-height: 1.25; margin-bottom: 5px; }
        .g-card-sub { font-size: 0.78rem; color: #8a877f; line-height: 1.4; font-style: italic; margin-bottom: 14px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .g-card-foot { display: flex; align-items: center; justify-content: space-between; }
        .g-price { font-size: 1.15rem; font-weight: 700; }
        .g-btn { padding: 9px 18px; background: transparent; border: 1px solid #0D7377; color: #0fa4a9; border-radius: 6px; font-size: 0.78rem; font-weight: 600; text-decoration: none; transition: all 0.2s; }
        .g-btn:hover { background: #0D7377; color: #fff; }
        .g-bundle { max-width: 1180px; margin: 0 auto 60px; padding: 0 40px; }
        .g-bundle-inner { background: #111114; border: 1px solid #0D7377; border-radius: 12px; padding: 36px 40px; display: flex; align-items: center; justify-content: space-between; gap: 32px; }
        .g-bundle h3 { font-family: 'DM Serif Display', serif; font-size: 1.3rem; margin-bottom: 6px; }
        .g-bundle p { color: #8a877f; font-size: 0.88rem; }
        .g-bundle-price { margin-top: 8px; font-size: 1.1rem; font-weight: 700; }
        .g-bundle-price span { color: #8a877f; text-decoration: line-through; font-weight: 400; font-size: 0.9rem; margin-left: 8px; }
        .g-btn-lg { padding: 13px 32px; background: #0D7377; color: #fff; font-size: 0.88rem; font-weight: 600; border-radius: 8px; text-decoration: none; border: none; cursor: pointer; transition: all 0.2s; flex-shrink: 0; }
        .g-btn-lg:hover { background: #0fa4a9; }
        .g-footer { text-align: center; padding: 40px; border-top: 1px solid #1e1e24; color: #8a877f; font-size: 0.75rem; }
        .g-footer a { color: #0D7377; text-decoration: none; }
        /* Modal */
        .g-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.88); backdrop-filter: blur(10px); z-index: 200; display: flex; align-items: center; justify-content: center; padding: 40px; }
        .g-modal { background: #111114; border: 1px solid #1e1e24; border-radius: 16px; max-width: 880px; width: 100%; max-height: 90vh; overflow-y: auto; display: grid; grid-template-columns: 0.85fr 1.15fr; position: relative; }
        .g-modal-x { position: absolute; top: 14px; right: 14px; background: none; border: none; color: #8a877f; font-size: 1.4rem; cursor: pointer; width: 34px; height: 34px; display: flex; align-items: center; justify-content: center; border-radius: 50%; z-index: 10; }
        .g-modal-x:hover { background: rgba(255,255,255,0.05); color: #e8e6e3; }
        .g-modal-left { padding: 28px; display: flex; align-items: center; justify-content: center; background: #07070a; border-radius: 16px 0 0 16px; }
        .g-modal-left img { width: 100%; max-width: 280px; border-radius: 8px; box-shadow: 0 6px 28px rgba(0,0,0,0.5); }
        .g-modal-right { padding: 36px 32px; }
        .g-m-includes h4 { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.1em; color: #e8e6e3; margin-bottom: 8px; }
        .g-m-includes li { color: #8a877f; font-size: 0.82rem; line-height: 1.9; list-style: none; padding-left: 18px; position: relative; }
        .g-m-includes li::before { content: '\u2192'; position: absolute; left: 0; color: #0D7377; }
        @media (max-width: 960px) { .g-grid { grid-template-columns: repeat(2,1fr); gap: 22px; } .g-modal { grid-template-columns: 1fr; } .g-modal-left { border-radius: 16px 16px 0 0; } .g-bundle-inner { flex-direction: column; text-align: center; } }
        @media (max-width: 600px) { .g-grid { grid-template-columns: 1fr; max-width: 360px; margin: 0 auto; padding: 16px 20px 48px; } .g-header { padding: 0 20px; } .g-hero { padding: 56px 20px 40px; } .g-hero h1 { font-size: 2rem; } .g-overlay { padding: 20px; } .g-bundle { padding: 0 20px; } .g-bundle-inner { padding: 28px 24px; } }
      `}</style>

      <div className="g-page">
        <header className="g-header">
          <a href="/" className="g-logo">AIJobRadar<span className="g-logo-sub">Guides</span></a>
          <nav className="g-nav">
            <a href="/">Free Scan</a>
            <a href="/guides" className="act">Guides</a>
            <a href="#bundle">Bundle</a>
          </nav>
        </header>

        <section className="g-hero">
          <h1>He's already in <em>your</em> workplace.<br/>Are you ready?</h1>
          <p>Nine career survival guides for the AI displacement era. Take the free scan, find your risk, get the guide that fights back.</p>
          <a href="/" className="g-scan">Take the Free Scan →</a>
        </section>

        <div className="g-grid">
          {guides.map((g, i) => (
            <div key={i} className="g-card" onClick={() => setModal(g)}>
              <div className="g-card-img">
                <img src={g.cover} alt={g.title} loading="lazy" />
                {g.badge && <div className="g-badge">{g.badge}</div>}
              </div>
              <div className="g-card-body">
                <div className="g-cluster">{g.cluster}</div>
                <div className="g-card-title">{g.title}</div>
                <div className="g-card-sub">{g.sub}</div>
                <div className="g-card-foot">
                  <span className="g-price">{g.price}</span>
                  <a className="g-btn gumroad-button" href={`${G}/${g.slug}`} onClick={(e) => e.stopPropagation()}>Buy Now</a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <section className="g-bundle" id="bundle">
          <div className="g-bundle-inner">
            <div>
              <h3>The Complete Collection</h3>
              <p>All 9 guides in one bundle. Cover every angle. Pay once.</p>
              <div className="g-bundle-price">$27 <span>$81</span></div>
            </div>
            <a className="g-btn-lg gumroad-button" href={`${G}/aijobradar-bundle`}>Get the Bundle</a>
          </div>
        </section>

        <footer className="g-footer">
          &copy; 2026 <a href="/">AIJobRadar.app</a> &middot; Oll Korrekt LLC
        </footer>

        {modal && (
          <div className="g-overlay" onClick={(e) => { if (e.target === e.currentTarget) setModal(null); }}>
            <div className="g-modal">
              <button className="g-modal-x" onClick={() => setModal(null)}>×</button>
              <div className="g-modal-left">
                <img src={modal.cover} alt={modal.title} />
              </div>
              <div className="g-modal-right">
                <div className="g-cluster" style={{ marginBottom: 8 }}>{modal.cluster}</div>
                <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: '1.55rem', letterSpacing: '-0.02em', marginBottom: 6, lineHeight: 1.2 }}>{modal.title}</div>
                <p style={{ color: '#8a877f', fontStyle: 'italic', fontSize: '0.9rem', marginBottom: 18 }}>{modal.sub}</p>
                <p style={{ fontSize: '0.8rem', color: '#8a877f', lineHeight: 1.6, marginBottom: 20, paddingBottom: 18, borderBottom: '1px solid #1e1e24' }}>{modal.audience}</p>
                <div className="g-m-includes">
                  <h4>What's Inside</h4>
                  <ul style={{ marginBottom: 24 }}>
                    {modal.includes.map((item, j) => <li key={j}>{item}</li>)}
                  </ul>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
                  <span style={{ fontSize: '1.7rem', fontWeight: 700 }}>{modal.price}</span>
                  <a className="g-btn-lg gumroad-button" href={`${G}/${modal.slug}`}>Get the Guide</a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
