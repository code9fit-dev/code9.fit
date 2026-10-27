'use client';

import Link from 'next/link';
import { useState } from 'react';

export function HeaderNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogoClick = () => {
    setMenuOpen(false);
  };

  return (
    <header
      className="sticky top-0 z-50 border-b backdrop-blur-sm"
      style={{
        fontFamily: '"IBM Plex Sans", system-ui, -apple-system, "Segoe UI", sans-serif',
        borderColor: 'var(--line)',
        background: 'color-mix(in srgb, var(--panel) 95%, transparent)',
        color: 'var(--ink)'
      }}
    >
      <div style={{ maxWidth: '1040px', margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '68px', gap: '16px' }}>
        <Link href="/" onClick={handleLogoClick} style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', cursor: 'pointer' }}>
          <span className="font-display font-bold" style={{ fontSize: '20px', letterSpacing: '-.01em', lineHeight: '1' }}>
            <span style={{ color: 'var(--ink)' }}>CODE</span>
            <span style={{ color: '#C87137' }}>9</span>
            <span style={{ color: 'var(--ink)' }}> FITNESS</span>
          </span>
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
                color: 'var(--ink)',
                background: 'transparent',
                border: '1px solid var(--line)',
                borderRadius: '99px',
                padding: '9px 14px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all .2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--accent)';
                e.currentTarget.style.borderColor = 'var(--accent)';
                e.currentTarget.style.color = 'var(--on-accent)';
              }}
              onMouseLeave={(e) => {
                if (!menuOpen) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.borderColor = 'var(--line)';
                  e.currentTarget.style.color = 'var(--ink)';
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
                  background: 'var(--panel)',
                  border: '1px solid var(--line)',
                  borderRadius: '14px',
                  padding: '6px',
                  boxShadow: '0 14px 34px rgba(0,0,0,.20)',
                }}
              >
                <Link href="/#coaches" onClick={() => { setMenuOpen(false); }} style={{ display: 'block', padding: '9px 12px', borderRadius: '9px', textDecoration: 'none', color: 'var(--ink)', fontSize: '14px', transition: 'all .2s' }} onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.color = 'var(--on-accent)'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--ink)'; }}>
                  Coaches
                </Link>
                <Link href="/#how" onClick={() => { setMenuOpen(false); }} style={{ display: 'block', padding: '9px 12px', borderRadius: '9px', textDecoration: 'none', color: 'var(--ink)', fontSize: '14px', transition: 'all .2s' }} onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.color = 'var(--on-accent)'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--ink)'; }}>
                  How it works
                </Link>
                <Link href="/#trust" onClick={() => { setMenuOpen(false); }} style={{ display: 'block', padding: '9px 12px', borderRadius: '9px', textDecoration: 'none', color: 'var(--ink)', fontSize: '14px', transition: 'all .2s' }} onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.color = 'var(--on-accent)'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--ink)'; }}>
                  Why C9F
                </Link>
                <Link href="/#pricing" onClick={() => { setMenuOpen(false); }} style={{ display: 'block', padding: '9px 12px', borderRadius: '9px', textDecoration: 'none', color: 'var(--ink)', fontSize: '14px', transition: 'all .2s' }} onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.color = 'var(--on-accent)'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--ink)'; }}>
                  Pricing
                </Link>
                <Link href="/library" onClick={() => { setMenuOpen(false); }} style={{ display: 'block', padding: '9px 12px', borderRadius: '9px', textDecoration: 'none', color: 'var(--ink)', fontSize: '14px', transition: 'all .2s' }} onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.color = 'var(--on-accent)'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--ink)'; }}>
                  Find your program
                </Link>
                <Link href="/resources" onClick={() => { setMenuOpen(false); }} style={{ display: 'block', padding: '9px 12px', borderRadius: '9px', textDecoration: 'none', color: 'var(--accent)', fontSize: '14px', transition: 'all .2s', fontWeight: '600' }} onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.color = 'var(--on-accent)'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--accent)'; }}>
                  📚 Free Resources
                </Link>
                <Link href="/onboarding" onClick={() => { setMenuOpen(false); }} style={{ display: 'block', padding: '9px 12px', borderRadius: '9px', textDecoration: 'none', color: 'var(--ink)', fontSize: '14px', transition: 'all .2s' }} onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.color = 'var(--on-accent)'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--ink)'; }}>
                  Find your coach
                </Link>
              </div>
            )}
          </div>

          <span style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '.14em', color: 'var(--accent)', border: '1px solid var(--line)', borderRadius: '99px', padding: '6px 10px' }}>
            v3.0
          </span>
          <Link href="/dashboard" style={{ fontSize: '13px', fontWeight: '600', color: 'var(--on-accent)', background: 'var(--accent)', border: '1.5px solid var(--accent)', borderRadius: '99px', padding: '10px 16px', textDecoration: 'none', transition: 'all .2s', opacity: 0.9 }} onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; }} onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.9'; }}>
            Dashboard
          </Link>
        </div>
      </div>
    </header>
  );
}
