'use client';

import { useEffect } from 'react';

export function HomePage({
  styles,
  bodyContent,
  scripts,
}: {
  styles: string;
  bodyContent: string;
  scripts: string;
}) {
  useEffect(() => {
    // Attach menu functionality
    const attachMenuHandlers = () => {
      const m = document.getElementById('menu');
      if (!m) {
        setTimeout(attachMenuHandlers, 50);
        return;
      }

      const b = m.querySelector('button');
      if (!b) return;

      b.addEventListener('click', function (e) {
        e.stopPropagation();
        const o = m.classList.toggle('open');
        b.setAttribute('aria-expanded', o.toString());
      });

      document.addEventListener('click', function () {
        m.classList.remove('open');
        b.setAttribute('aria-expanded', 'false');
      });

      const dropLinks = m.querySelectorAll('.drop a');
      dropLinks.forEach(function (a) {
        a.addEventListener('click', function () {
          m.classList.remove('open');
          b.setAttribute('aria-expanded', 'false');
        });
      });
    };

    attachMenuHandlers();
  }, [bodyContent]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles + '\n.c9 .bar { display: none !important; }' }} />
      <div dangerouslySetInnerHTML={{ __html: bodyContent }} />
    </>
  );
}
