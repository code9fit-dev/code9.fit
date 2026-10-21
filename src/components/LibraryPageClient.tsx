'use client';

import { useEffect, useState } from 'react';

export function LibraryPageClient() {
  const [html, setHtml] = useState('');
  const [styles, setStyles] = useState('');

  useEffect(() => {
    fetch('/code9-find-your-program.html')
      .then((res) => res.text())
      .then((content) => {
        const bodyMatch = content.match(/<body[^>]*>([\s\S]*)<\/body>/);
        const bodyContent = bodyMatch ? bodyMatch[1] : content;

        const styleMatch = content.match(/<style[^>]*>([\s\S]*?)<\/style>/);
        const styleContent = styleMatch ? styleMatch[1] : '';

        setHtml(bodyContent);
        setStyles(styleContent);

        // Wait for DOM to update before executing scripts
        setTimeout(() => {
          const scriptMatch = content.match(/<script[^>]*>([\s\S]*?)<\/script>/);
          if (scriptMatch && scriptMatch[1]) {
            try {
              const script = new Function(scriptMatch[1]);
              script();
            } catch (error) {
              console.error('Error executing library script:', error);
            }
          }
        }, 100);
      })
      .catch((error) => console.error('Error fetching page:', error));
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles + '\n.c9 .bar { display: none !important; }' }} />
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </>
  );
}
