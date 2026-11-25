// One-off probe: collect network responses with 4xx/5xx status for routes using CDP.
import { spawn, execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE = 'http://localhost:3000';
const profile = path.resolve('.taste-skill/chrome-probe404');
fs.mkdirSync(profile, { recursive: true });
const portFile = path.join(profile, 'DevToolsActivePort');
try { fs.rmSync(portFile); } catch { /* none */ }
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const chrome = spawn(CHROME, [
  '--headless=new',
  `--user-data-dir=${profile}`,
  '--remote-debugging-port=0',
  '--no-first-run',
  '--no-default-browser-check',
  '--disable-extensions',
  '--mute-audio',
  '--disable-gpu',
  'about:blank',
], { stdio: 'ignore', windowsHide: true });

let port = null;
for (let i = 0; i < 200 && !port; i += 1) {
  await sleep(100);
  try { port = parseInt(fs.readFileSync(portFile, 'utf8'), 10) || null; } catch { /* pending */ }
}
const ver = await (await fetch(`http://127.0.0.1:${port}/json/version`)).json();
const ws = new WebSocket(ver.webSocketDebuggerUrl);
await new Promise((resolve) => ws.addEventListener('open', resolve, { once: true }));
let id = 0;
const send = (method, params, sessionId) => new Promise((resolve, reject) => {
  ws.send(JSON.stringify({ id: ++id, method, params, sessionId }));
});
const { result: { targetId } } = await send('Target.createTarget', { url: 'about:blank' });
const { result: { sessionId } } = await send('Target.attachToTarget', { targetId, flatten: true });
const S = (method, params) => send(method, params, sessionId);

const responses = [];
ws.addEventListener('message', (event) => {
  const m = JSON.parse(event.data);
  if (m.method === 'Network.responseReceived') {
    const { status, url } = m.params.response;
    if (status >= 400) responses.push(`${status} ${url}`);
  }
});
await S('Network.enable');
const routes = ['/', '/pricing', '/about', '/contact', '/journal', '/changelog', '/trust', '/status', '/docs', '/careers', '/demo', '/privacy', '/terms', '/does-not-exist'];
for (const route of routes) {
  await S('Page.navigate', { url: `${BASE}${route}` });
  await sleep(1800);
}
try { await send('Browser.close', {}); } catch { /* closing */ }
console.log((responses.length ? responses : ['NO errors']).join('\n'));
try { execFileSync('taskkill', ['/PID', String(chrome.pid), '/T', '/F'], { stdio: 'ignore' }); } catch { /* gone */ }
process.exit(0);
