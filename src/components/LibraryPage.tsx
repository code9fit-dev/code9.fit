'use client';

import { useEffect } from 'react';

export function LibraryPage({
  styles,
  bodyContent,
  scripts,
}: {
  styles: string;
  bodyContent: string;
  scripts: string;
}) {
  useEffect(() => {
    if (!scripts) return;

    try {
      // Execute the inline script in the global scope
      const script = new Function(scripts);
      script();
    } catch (error) {
      console.error('Error executing library page scripts:', error);
    }
  }, [scripts]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div dangerouslySetInnerHTML={{ __html: bodyContent }} />
    </>
  );
}
