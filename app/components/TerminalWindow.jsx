import { terminalLines } from '@/lib/content';

export default function TerminalWindow() {
  return (
    <div className="terminal" aria-label="Terminal demo">
      <div className="window-bar">
        <i className="window-dot" aria-hidden="true" />
        <i className="window-dot" aria-hidden="true" />
        <i className="window-dot" aria-hidden="true" />
        <span className="window-url">bryn: zsh</span>
      </div>
      <pre>
        {terminalLines.map(([prompt, text], index) => (
          <div className={prompt ? undefined : 'out'} key={`${prompt}-${text}-${index}`}>
            {prompt ? <b>$ </b> : null}
            {text}
          </div>
        ))}
      </pre>
    </div>
  );
}
