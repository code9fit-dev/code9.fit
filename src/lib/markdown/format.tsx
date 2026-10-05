/**
 * Custom markdown formatter for coach responses
 * - **text** = bold + underlined
 * - *text* = bold only
 */

export function formatCoachResponse(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;

  // Pattern to match **text** and *text*
  // We need to match ** first, then * to avoid conflicts
  const pattern = /(\*\*[^\*]+\*\*|\*[^\*]+\*)/g;

  let match;
  while ((match = pattern.exec(text)) !== null) {
    // Add text before the match
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }

    const matched = match[0];
    if (matched.startsWith('**') && matched.endsWith('**')) {
      // Double asterisk = bold + underlined
      const content = matched.slice(2, -2);
      parts.push(
        <span key={`bold-${match.index}`} style={{ fontWeight: 'bold', textDecoration: 'underline' }}>
          {content}
        </span>
      );
    } else if (matched.startsWith('*') && matched.endsWith('*')) {
      // Single asterisk = bold only
      const content = matched.slice(1, -1);
      parts.push(
        <span key={`bold-${match.index}`} style={{ fontWeight: 'bold' }}>
          {content}
        </span>
      );
    }

    lastIndex = match.index + matched.length;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : [text];
}
