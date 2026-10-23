import { CSSProperties } from 'react';

interface PageBrandingProps {
  variant?: 'light' | 'dark';
  centered?: boolean;
}

export function PageBranding({ variant = 'light', centered = true }: PageBrandingProps) {
  const styles: CSSProperties = centered
    ? {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
      }
    : {};

  const textColor = variant === 'dark' ? 'var(--ink)' : 'var(--ink)';
  const accentColor = variant === 'dark' ? 'var(--accent)' : 'var(--accent)';

  return (
    <div style={styles}>
      <div className="font-display font-bold tracking-tight" style={{ color: textColor }}>
        <span style={{ fontSize: '24px', letterSpacing: '0.05em' }}>CODE</span>
        <span style={{ fontSize: '24px', letterSpacing: '0.05em', color: accentColor }}>9</span>
        <span style={{ fontSize: '24px', letterSpacing: '0.05em' }}>
          {' '}FITNESS
        </span>
      </div>
    </div>
  );
}
