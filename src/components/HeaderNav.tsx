'use client';

import Link from 'next/link';
import { useState } from 'react';

export function HeaderNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-stone-300 bg-white/94 backdrop-blur-sm" style={{ fontFamily: '"IBM Plex Sans", system-ui, -apple-system, "Segoe UI", sans-serif' }}>
      <div style={{ maxWidth: '1040px', margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '68px', gap: '16px' }}>
        <Link href="/" className="font-bold text-xl" style={{ letterSpacing: '.01em', whiteSpace: 'nowrap', textDecoration: 'none', color: '#13201C' }}>
          CODE<span style={{ color: '#B8915A' }}>9</span> FITNESS
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Menu Button */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen(!menuOpen);
              }}
              style={{
                font: '500 13px/1 "IBM Plex Sans", sans-serif',
                color: '#13201C',
                background: 'transparent',
                border: '1px solid #E3DDD2',
                borderRadius: '99px',
                padding: '9px 14px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all .2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#F2EADD';
                e.currentTarget.style.borderColor = '#F2EADD';
                e.currentTarget.style.color = '#94703F';
              }}
              onMouseLeave={(e) => {
                if (!menuOpen) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.borderColor = '#E3DDD2';
                  e.currentTarget.style.color = '#13201C';
                }
              }}
            >
              Menu
              <svg width="10" height="10" viewBox="0 0 10 10" style={{ transition: 'transform .2s', transform: menuOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                <path d="M1.5 3.5 5 7l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {menuOpen && (
              <div
                style={{
                  position: 'absolute',
                  right: 0,
                  top: 'calc(100% + 8px)',
                  minWidth: '210px',
                  background: '#fff',
                  border: '1px solid #E3DDD2',
                  borderRadius: '14px',
                  padding: '6px',
                  boxShadow: '0 14px 34px rgba(19,32,28,.10)',
                }}
              >
                <Link href="/#coaches" onClick={() => setMenuOpen(false)} style={{ display: 'block', padding: '9px 12px', borderRadius: '9px', textDecoration: 'none', color: '#13201C', fontSize: '14px', transition: 'all .2s' }} onMouseEnter={(e) => { e.currentTarget.style.background = '#F2EADD'; e.currentTarget.style.color = '#94703F'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#13201C'; }}>
                  Coaches
                </Link>
                <Link href="/#how" onClick={() => setMenuOpen(false)} style={{ display: 'block', padding: '9px 12px', borderRadius: '9px', textDecoration: 'none', color: '#13201C', fontSize: '14px', transition: 'all .2s' }} onMouseEnter={(e) => { e.currentTarget.style.background = '#F2EADD'; e.currentTarget.style.color = '#94703F'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#13201C'; }}>
                  How it works
                </Link>
                <Link href="/#trust" onClick={() => setMenuOpen(false)} style={{ display: 'block', padding: '9px 12px', borderRadius: '9px', textDecoration: 'none', color: '#13201C', fontSize: '14px', transition: 'all .2s' }} onMouseEnter={(e) => { e.currentTarget.style.background = '#F2EADD'; e.currentTarget.style.color = '#94703F'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#13201C'; }}>
                  Why C9F
                </Link>
                <Link href="/#pricing" onClick={() => setMenuOpen(false)} style={{ display: 'block', padding: '9px 12px', borderRadius: '9px', textDecoration: 'none', color: '#13201C', fontSize: '14px', transition: 'all .2s' }} onMouseEnter={(e) => { e.currentTarget.style.background = '#F2EADD'; e.currentTarget.style.color = '#94703F'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#13201C'; }}>
                  Pricing
                </Link>
                <Link href="/library" onClick={() => setMenuOpen(false)} style={{ display: 'block', padding: '9px 12px', borderRadius: '9px', textDecoration: 'none', color: '#13201C', fontSize: '14px', transition: 'all .2s' }} onMouseEnter={(e) => { e.currentTarget.style.background = '#F2EADD'; e.currentTarget.style.color = '#94703F'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#13201C'; }}>
                  Find your program
                </Link>
                <Link href="/resources" onClick={() => setMenuOpen(false)} style={{ display: 'block', padding: '9px 12px', borderRadius: '9px', textDecoration: 'none', color: '#13201C', fontSize: '14px', transition: 'all .2s', fontWeight: '600', color: '#B8915A' }} onMouseEnter={(e) => { e.currentTarget.style.background = '#F2EADD'; e.currentTarget.style.color = '#94703F'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#B8915A'; }}>
                  📚 Free Resources
                </Link>
                <Link href="/onboarding" onClick={() => setMenuOpen(false)} style={{ display: 'block', padding: '9px 12px', borderRadius: '9px', textDecoration: 'none', color: '#13201C', fontSize: '14px', transition: 'all .2s' }} onMouseEnter={(e) => { e.currentTarget.style.background = '#F2EADD'; e.currentTarget.style.color = '#94703F'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#13201C'; }}>
                  Find your coach
                </Link>
              </div>
            )}
          </div>

          <span style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '.14em', color: '#94703F', border: '1px solid #E3DDD2', borderRadius: '99px', padding: '6px 10px' }}>
            v3.0
          </span>
          <Link href="/dashboard" style={{ fontSize: '13px', fontWeight: '600', color: '#fff', background: '#13201C', border: '1.5px solid #13201C', borderRadius: '99px', padding: '10px 16px', textDecoration: 'none', transition: 'all .2s' }} onMouseEnter={(e) => { e.currentTarget.style.background = '#1E2E29'; }} onMouseLeave={(e) => { e.currentTarget.style.background = '#13201C'; }}>
            Dashboard
          </Link>
        </div>
      </div>
    </header>
  );
}
