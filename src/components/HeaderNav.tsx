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
      className="sticky top-0 z-50 border-b backdrop-blur-sm w-full"
      style={{
        fontFamily: '"IBM Plex Sans", system-ui, -apple-system, "Segoe UI", sans-serif',
        borderColor: 'var(--line)',
        background: 'color-mix(in srgb, var(--panel) 95%, transparent)',
        color: 'var(--ink)'
      }}
    >
      <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 'auto', minHeight: '56px', paddingLeft: '12px', paddingRight: '12px', gap: '6px', boxSizing: 'border-box' }} className="sm:px-6 sm:gap-4">
        <Link href="/" onClick={handleLogoClick} style={{ display: 'flex', alignItems: 'center', gap: '0px', textDecoration: 'none', cursor: 'pointer', flexShrink: 0, minWidth: 0 }}>
          <span className="font-display font-bold" style={{ fontSize: 'clamp(13px, 3.5vw, 20px)', letterSpacing: '-0.5px', lineHeight: '1.1', whiteSpace: 'nowrap' }}>
            <span style={{ color: 'var(--ink)' }}>CODE</span><span style={{ color: '#C87137' }}>9</span><span style={{ color: 'var(--ink)' }}> FIT</span>
          </span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'flex-end' }} className="sm:gap-2">
          {/* Menu Button */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen(!menuOpen);
              }}
              style={{
                font: 'clamp(11px, 2.2vw, 13px) 500 "IBM Plex Sans", sans-serif',
                color: 'var(--ink)',
                background: 'transparent',
                border: '1px solid var(--line)',
                borderRadius: '99px',
                padding: 'clamp(5px, 1.2vw, 9px) clamp(8px, 1.8vw, 14px)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '3px',
                transition: 'all .2s',
                whiteSpace: 'nowrap',
                flexShrink: 0,
                minHeight: '32px',
                maxWidth: 'fit-content'
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
                  position: 'fixed',
                  right: '16px',
                  top: '56px',
                  width: 'calc(100vw - 32px)',
                  maxWidth: '260px',
                  background: 'var(--panel)',
                  border: '1px solid var(--line)',
                  borderRadius: '14px',
                  padding: '6px',
                  boxShadow: '0 14px 34px rgba(0,0,0,.20)',
                  zIndex: 51
                }}
                className="sm:absolute sm:w-auto sm:right-0 sm:top-[calc(100%+8px)] sm:fixed-none"
              >
                <Link href="/#coaches" onClick={() => { setMenuOpen(false); }} style={{ padding: 'clamp(8px, 2vw, 12px) clamp(10px, 2.5vw, 16px)', borderRadius: '9px', textDecoration: 'none', color: 'var(--ink)', fontSize: 'clamp(13px, 2.5vw, 14px)', transition: 'all .2s', minHeight: '44px', display: 'flex', alignItems: 'center' }} onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.color = 'var(--on-accent)'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--ink)'; }}>
                  Coaches
                </Link>
                <Link href="/#how" onClick={() => { setMenuOpen(false); }} style={{ display: 'flex', alignItems: 'center', padding: 'clamp(8px, 2vw, 12px) clamp(10px, 2.5vw, 16px)', borderRadius: '9px', textDecoration: 'none', color: 'var(--ink)', fontSize: 'clamp(13px, 2.5vw, 14px)', transition: 'all .2s', minHeight: '44px' }} onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.color = 'var(--on-accent)'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--ink)'; }}>
                  How it works
                </Link>
                <Link href="/#trust" onClick={() => { setMenuOpen(false); }} style={{ display: 'flex', alignItems: 'center', padding: 'clamp(8px, 2vw, 12px) clamp(10px, 2.5vw, 16px)', borderRadius: '9px', textDecoration: 'none', color: 'var(--ink)', fontSize: 'clamp(13px, 2.5vw, 14px)', transition: 'all .2s', minHeight: '44px' }} onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.color = 'var(--on-accent)'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--ink)'; }}>
                  Why C9F
                </Link>
                <Link href="/#pricing" onClick={() => { setMenuOpen(false); }} style={{ display: 'flex', alignItems: 'center', padding: 'clamp(8px, 2vw, 12px) clamp(10px, 2.5vw, 16px)', borderRadius: '9px', textDecoration: 'none', color: 'var(--ink)', fontSize: 'clamp(13px, 2.5vw, 14px)', transition: 'all .2s', minHeight: '44px' }} onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.color = 'var(--on-accent)'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--ink)'; }}>
                  Pricing
                </Link>
                <Link href="/library" onClick={() => { setMenuOpen(false); }} style={{ display: 'flex', alignItems: 'center', padding: 'clamp(8px, 2vw, 12px) clamp(10px, 2.5vw, 16px)', borderRadius: '9px', textDecoration: 'none', color: 'var(--ink)', fontSize: 'clamp(13px, 2.5vw, 14px)', transition: 'all .2s', minHeight: '44px' }} onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.color = 'var(--on-accent)'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--ink)'; }}>
                  Find your program
                </Link>
                <Link href="/resources" onClick={() => { setMenuOpen(false); }} style={{ display: 'flex', alignItems: 'center', padding: 'clamp(8px, 2vw, 12px) clamp(10px, 2.5vw, 16px)', borderRadius: '9px', textDecoration: 'none', color: 'var(--accent)', fontSize: 'clamp(13px, 2.5vw, 14px)', transition: 'all .2s', fontWeight: '600', minHeight: '44px' }} onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.color = 'var(--on-accent)'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--accent)'; }}>
                  📚 Free Resources
                </Link>
                <Link href="/onboarding" onClick={() => { setMenuOpen(false); }} style={{ display: 'flex', alignItems: 'center', padding: 'clamp(8px, 2vw, 12px) clamp(10px, 2.5vw, 16px)', borderRadius: '9px', textDecoration: 'none', color: 'var(--ink)', fontSize: 'clamp(13px, 2.5vw, 14px)', transition: 'all .2s', minHeight: '44px' }} onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.color = 'var(--on-accent)'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--ink)'; }}>
                  Find your coach
                </Link>
              </div>
            )}
          </div>

          <span style={{ fontSize: 'clamp(9px, 2vw, 11px)', fontWeight: '600', letterSpacing: '.14em', color: 'var(--accent)', border: '1px solid var(--line)', borderRadius: '99px', padding: 'clamp(4px, 1vw, 6px) clamp(6px, 1.5vw, 10px)', display: 'none' }} className="sm:inline-block">
            v3.0
          </span>
          <Link href="/dashboard" style={{ fontSize: 'clamp(10px, 2.2vw, 13px)', fontWeight: '600', color: 'var(--on-accent)', background: 'var(--accent)', border: '1.5px solid var(--accent)', borderRadius: '99px', padding: 'clamp(5px, 1.2vw, 10px) clamp(8px, 1.8vw, 16px)', textDecoration: 'none', transition: 'all .2s', opacity: 0.9, whiteSpace: 'nowrap', flexShrink: 0, minHeight: '32px', display: 'flex', alignItems: 'center' }} onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; }} onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.9'; }}>
            <span>Dashboard</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
