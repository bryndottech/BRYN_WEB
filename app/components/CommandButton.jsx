'use client';

export default function CommandButton({ className = 'btn', children }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new CustomEvent('bryn:command'))}
    >
      {children}
    </button>
  );
}
