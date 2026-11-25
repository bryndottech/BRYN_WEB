export default function ServiceArt({ type }) {
  if (type === 'phone') {
    return (
      <svg className="service-art" viewBox="0 0 220 140" aria-hidden="true">
        <rect x="76" y="6" width="70" height="128" rx="14" />
        <path d="M100 16h22" />
        <rect className="fill" x="88" y="34" width="46" height="26" rx="6" />
        <rect className="fill" x="88" y="68" width="46" height="8" rx="3" />
        <rect className="fill" x="88" y="84" width="34" height="8" rx="3" />
        <path className="accent" d="M92 112h38" />
      </svg>
    );
  }

  if (type === 'chart') {
    return (
      <svg className="service-art" viewBox="0 0 220 140" aria-hidden="true">
        <path d="M12 124h200M12 124V14" />
        <path className="accent" d="M20 108l36-22 32 12 40-46 36 18 40-40" />
      </svg>
    );
  }

  return (
    <svg className="service-art" viewBox="0 0 220 140" aria-hidden="true">
      <rect x="8" y="10" width="204" height="120" rx="10" />
      <path d="M8 34h204" />
      <rect className="fill" x="24" y="50" width="110" height="14" rx="3" />
      <rect className="fill" x="24" y="72" width="80" height="8" rx="3" />
      <rect className="fill" x="150" y="50" width="46" height="46" rx="6" />
      <path className="accent" d="M24 112h172" />
    </svg>
  );
}
