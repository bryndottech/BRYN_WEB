'use client';

import { useEffect, useState } from 'react';

const mailto = 'mailto:bryndottech@gmail.com';
const gmailCompose =
  'https://mail.google.com/mail/?view=cm&fs=1&to=bryndottech%40gmail.com';

export default function ConnectEmailLink({ children, ...props }) {
  const [href, setHref] = useState(mailto);
  const [opensNewTab, setOpensNewTab] = useState(false);

  useEffect(() => {
    const isMobile =
      window.matchMedia('(max-width: 767px)').matches ||
      /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    setHref(isMobile ? mailto : gmailCompose);
    setOpensNewTab(!isMobile);
  }, []);

  const onClick = (event) => {
    if (window.matchMedia('(max-width: 768px)').matches) return;
    event.preventDefault();
    window.open(gmailCompose, '_blank', 'noopener,noreferrer');
  };

  return (
    <a
      {...props}
      href={href}
      target={opensNewTab ? '_blank' : undefined}
      rel={opensNewTab ? 'noopener noreferrer' : undefined}
      onClick={onClick}
    >
      {children}
    </a>
  );
}
