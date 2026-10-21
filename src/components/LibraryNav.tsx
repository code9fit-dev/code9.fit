'use client';

import Link from 'next/link';

export function LibraryNav() {
  return (
    <nav style={{
      borderBottom: '1px solid #E3DDD2',
      background: '#F5F1EA',
      padding: '24px 0',
      textAlign: 'center'
    }}>
      <div style={{
        maxWidth: '1040px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '32px',
        flexWrap: 'wrap'
      }}>
        <Link href="/library" style={{
          fontSize: '15px',
          fontWeight: '500',
          color: '#B8915A',
          textDecoration: 'none',
          transition: 'opacity .2s'
        }} onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'} onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}>
          Find my program
        </Link>
        <Link href="/library" style={{
          fontSize: '15px',
          fontWeight: '500',
          color: '#13201C',
          textDecoration: 'none',
          transition: 'opacity .2s'
        }} onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'} onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}>
          All programs
        </Link>
        <a href="#" style={{
          fontSize: '15px',
          fontWeight: '500',
          color: '#13201C',
          textDecoration: 'none',
          transition: 'opacity .2s'
        }} onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'} onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}>
          How it works
        </a>
        <a href="#" style={{
          fontSize: '15px',
          fontWeight: '500',
          color: '#13201C',
          textDecoration: 'none',
          transition: 'opacity .2s'
        }} onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'} onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}>
          Nutrition
        </a>
        <Link href="/#pricing" style={{
          fontSize: '15px',
          fontWeight: '500',
          color: '#B8915A',
          textDecoration: 'none',
          transition: 'opacity .2s'
        }} onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'} onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}>
          Pricing
        </Link>
      </div>
    </nav>
  );
}
