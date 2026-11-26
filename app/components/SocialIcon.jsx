export default function SocialIcon({ label }) {
  if (label === 'LinkedIn') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <path d="M8 11v5M8 8v.01M12 16v-5M12 13c0-3 5-3 5 0v3" />
      </svg>
    );
  }
  if (label === 'Instagram') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <path d="M17.5 6.5v.01" />
      </svg>
    );
  }
  if (label === 'Facebook') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M14 21v-8h3l.5-3H14V8c0-1 .5-2 2-2h1.5V3.5c-1-.1-2-.2-3-.2-2.5 0-4 1.5-4 4V10H8v3h3v8z" />
      </svg>
    );
  }
  if (label === 'X') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 4l16 16M20 4L4 20" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}
