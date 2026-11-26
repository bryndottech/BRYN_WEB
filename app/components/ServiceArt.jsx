export default function ServiceArt({ type }) {
  if (type === 'phone') {
    return (
      <svg className="service-art" viewBox="0 0 220 140" aria-hidden="true">
        <rect x="76" y="6" width="70" height="128" rx="14" />
        <path d="M100 16h22" />
        <rect className="f" x="88" y="34" width="46" height="26" rx="6" />
        <rect className="f" x="88" y="68" width="46" height="8" rx="3" />
        <rect className="f" x="88" y="84" width="34" height="8" rx="3" />
        <path className="a" d="M92 112h38" />
      </svg>
    );
  }

  if (type === 'chart') {
    return (
      <svg className="service-art" viewBox="0 0 220 140" aria-hidden="true">
        <path d="M12 124h200M12 124V14" />
        <path className="a" d="M20 108l36-22 32 12 40-46 36 18 40-40" />
      </svg>
    );
  }

  if (type === 'design') {
    return (
      <svg className="service-art" viewBox="0 0 220 140" aria-hidden="true">
        <rect x="12" y="12" width="196" height="116" rx="10" />
        <rect className="f" x="26" y="28" width="58" height="84" rx="6" />
        <rect x="96" y="28" width="98" height="12" rx="3" />
        <rect className="f" x="96" y="50" width="74" height="8" rx="3" />
        <rect className="f" x="96" y="68" width="98" height="44" rx="6" />
        <path className="a" d="M26 120h168" />
      </svg>
    );
  }

  if (type === 'ai') {
    return (
      <svg className="service-art" viewBox="0 0 220 140" aria-hidden="true">
        <circle cx="110" cy="70" r="42" />
        <path d="M110 10v18M110 112v18M50 70H30M190 70h-20M68 28l13 13M139 99l13 13M152 28l-13 13M81 99l-13 13" />
        <path className="a" d="M92 70h36M110 52v36" />
      </svg>
    );
  }

  return (
    <svg className="service-art" viewBox="0 0 220 140" aria-hidden="true">
      <rect x="8" y="10" width="204" height="120" rx="10" />
      <path d="M8 34h204" />
      <rect className="f" x="24" y="50" width="110" height="14" rx="3" />
      <rect className="f" x="24" y="72" width="80" height="8" rx="3" />
      <rect className="f" x="150" y="50" width="46" height="46" rx="6" />
      <path className="a" d="M24 112h172" />
    </svg>
  );
}
