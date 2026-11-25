import Link from 'next/link';
import CommandButton from './components/CommandButton';

export default function NotFound() {
  return (
    <section className="not-found">
      <div className="container">
        <div className="not-found-number" aria-hidden="true">
          404
        </div>
        <h1>This route doesn’t exist.</h1>
        <p>The page moved or never shipped. Try the command menu or head home.</p>
        <div className="hero-actions">
          <Link className="btn btn-primary" href="/">
            Back to home
          </Link>
          <CommandButton>Search the site</CommandButton>
        </div>
      </div>
    </section>
  );
}
