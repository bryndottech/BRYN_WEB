export function showToast(message) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent('bryn:toast', { detail: message }));
}

export function openCommandMenu() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent('bryn:command'));
}

export function openCookieSettings() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent('bryn:cookies'));
}

export function openChat() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent('bryn:chat'));
}

export function getTheme() {
  if (typeof document === 'undefined') return 'light';
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
}

export function applyTheme(theme) {
  if (typeof document === 'undefined') return;
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem('bryn-th', theme);
  } catch {
    // Storage can be blocked; the theme still applies for this visit.
  }
  window.dispatchEvent(new CustomEvent('bryn:theme', { detail: theme }));
}

export function toggleTheme() {
  applyTheme(getTheme() === 'dark' ? 'light' : 'dark');
}

export function copyText(text, success = 'Copied to clipboard.') {
  if (typeof navigator === 'undefined' || !navigator.clipboard) {
    showToast('Copy blocked by your browser.');
    return;
  }
  navigator.clipboard.writeText(text).then(
    () => showToast(success),
    () => showToast('Copy blocked by your browser.'),
  );
}
