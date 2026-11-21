/* mObywatel „Załatwione” – prototyp koncepcyjny (mObywatel Challenge)
   Wszystko działa lokalnie w przeglądarce. Osoby i dane są fikcyjne. Nic nie jest wysyłane. */
(() => {
'use strict';

/* =========================================================
   Narzędzia
   ========================================================= */
const $ = (s, r = document) => r.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const norm = s => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ł/g, 'l');
const wait = ms => new Promise(r => setTimeout(r, ms));

const P = {
  home: '<path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"/>',
  id: '<rect x="2" y="5" width="20" height="14" rx="2"/><circle cx="8" cy="12" r="2.5"/><path d="M14 10h5M14 14h4"/>',
  folder: '<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  bell: '<path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
  spark: '<path d="M12 3l1.8 4.7 4.7 1.8-4.7 1.8L12 16l-1.8-4.7-4.7-1.8 4.7-1.8z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/>',
  mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',
  send: '<path d="M22 2 11 13M22 2l-7 20-4-9-9-4z"/>',
  chevR: '<path d="m9 6 6 6-6 6"/>',
  chevL: '<path d="m15 6-6 6 6 6"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  x: '<path d="M18 6 6 18M6 6l12 12"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  eye: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z"/><circle cx="12" cy="12" r="3"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  users: '<circle cx="9" cy="8" r="4"/><path d="M2 21a7 7 0 0 1 14 0"/><path d="M16 4a4 4 0 0 1 0 8M22 21a7 7 0 0 0-4-6.3"/>',
  car: '<path d="M5 17h14M3 13l2-6a2 2 0 0 1 2-1.4h10A2 2 0 0 1 19 7l2 6v5a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-1H7v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"/><circle cx="7.5" cy="13.5" r="1"/><circle cx="16.5" cy="13.5" r="1"/>',
  baby: '<circle cx="12" cy="12" r="9"/><path d="M9 10h.01M15 10h.01M9.5 15a3.5 3.5 0 0 0 5 0"/>',
  truck: '<path d="M1 4h14v12H1zM15 9h4l4 4v3h-8"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/>',
  alert: '<path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 16v-4M12 8h.01"/>',
  speaker: '<path d="M11 5 6 9H2v6h4l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14"/>',
  phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>',
  pill: '<path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7zM8.5 8.5l7 7"/>',
  qr: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><path d="M14 14h3v3h-3zM20 14v.01M14 20h.01M17 17h4v4"/>',
  lock: '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
  face: '<path d="M3 8V5a2 2 0 0 1 2-2h3M16 3h3a2 2 0 0 1 2 2v3M21 16v3a2 2 0 0 1-2 2h-3M8 21H5a2 2 0 0 1-2-2v-3"/><path d="M9 9v1M15 9v1M12 9v4h-1M9 16a4 4 0 0 0 6 0"/>',
  file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h6"/>',
  card: '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>',
  cal: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  sliders: '<path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  text: '<path d="M4 7V4h16v3M9 20h6M12 4v16"/>',
  heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8z"/>',
  swap: '<path d="M16 3h5v5M21 3l-7 7M8 21H3v-5M3 21l7-7"/>',
  contrast: '<circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor"/>',
  wallet: '<path d="M20 7H5a2 2 0 0 1 0-4h13v4"/><path d="M3 5v14a2 2 0 0 0 2 2h15V7"/><circle cx="16" cy="14" r="1"/>',
  camera: '<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>',
  pin: '<path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/>',
  clip: '<path d="m21.4 11.1-9.2 9.2a6 6 0 0 1-8.5-8.5l9.2-9.2a4 4 0 0 1 5.7 5.7l-9.2 9.2a2 2 0 0 1-2.8-2.8l8.5-8.5"/>',
  download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>',
  stop: '<rect x="6" y="6" width="12" height="12" rx="2"/>'
};
const icon = (n, extra = '') => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${extra}>${P[n] || ''}</svg>`;
const LOGO = '<span class="logo" aria-hidden="true"><svg viewBox="0 0 64 64"><path d="M16 44V24h6l1 3c2-2 5-4 8-4s5 1 6 4c2-2 5-4 8-4 5 0 7 3 7 8v13h-7V32c0-2-1-3-3-3s-4 1-5 3v12h-7V32c0-2-1-3-3-3s-4 1-5 3v12z" fill="#fff"/></svg></span>';

/* =========================================================
   Dane (fikcyjne)
   ========================================================= */
const TODAY = 'Data w scenariuszu: 20 listopada 2026';
const PEOPLE = {
  anna: {
    first: 'Anna', voc: 'Anno', full: 'Anna Nowak', age: 34, initials: 'AN', av: 'av-anna',
    pesel: '92061201234', born: '12.06.1992, Poznań', citizenship: 'polskie', maiden: 'Nowak',
    parents: 'Krzysztof, Halina', address: 'ul. Głogowska 81/7, 60-263 Poznań',
    idNo: 'CBA 482913', idValid: '31.12.2026', phone: '+48 600 100 200'
  },
  halina: {
    first: 'Halina', voc: 'Pani Halino', full: 'Halina Nowak', age: 71, initials: 'HN', av: 'av-halina',
    pesel: '55040309876', born: '03.04.1955, Gniezno', citizenship: 'polskie', maiden: 'Lis',
    parents: 'Józef, Maria', address: 'ul. Chrobrego 14/2, 62-200 Gniezno',
    idNo: 'AXD 118204', idValid: '15.01.2027', phone: '+48 600 300 400'
  }
};
const ADDRESSES = [
  'ul. Ogrodowa 12/4, 60-101 Poznań',
  'ul. Ogrodowa 3, 62-020 Swarzędz',
  'os. Orła Białego 21/30, 61-251 Poznań',
  'ul. Garbary 48/2, 61-869 Poznań',
  'ul. Wierzbięcice 7/15, 61-569 Poznań',
  'ul. Dąbrowskiego 102/9, 60-577 Poznań'
];

function initialState() {
  return {
    v: 3,
    persona: 'anna',
    settings: {
      anna: { simple: false, fs: 1, hc: false, autoRead: false },
      halina: { simple: true, fs: 1.25, hc: false, autoRead: false }
    },
    moved: false, newAddress: null,
    babyDone: false, idDone: false, carDone: false, lostDone: false,
    peselBlocked: false, notifyEvery: true,
    letters: {
      us: { read: false, answered: false },
      odpady: { read: false, paid: false },
      zus: { read: true },
      nfz: { read: false, booked: false }
    },
    shares: [
      { id: 'rower', who: 'Wypożyczalnia rowerów „Kółko”', what: 'Pełnoletność: TAK', until: 'do 30.11.2026' }
    ],
    extraLog: [],
    reported: false,
    cases: {
      anna: [
        { id: 'pit', title: 'Zwrot podatku PIT za 2025', who: 'Urząd Skarbowy Poznań-Grunwald', steps: ['Zeznanie złożone 14.02', 'Przyjęte przez urząd', 'Zwrot zatwierdzony', 'Wypłacono 1 240 zł na Twoje konto'], status: 4, icon: 'wallet' }
      ],
      halina: []
    },
    helper: { reminders: true, letters: true, prepare: true, sign: false },
    halinaInbox: [],
    notifs: {
      anna: [
        { t: 'Policja sprawdziła Twoje prawo jazdy podczas kontroli drogowej.', when: '18.11, 14:02', go: '#/prywatnosc' },
        { t: 'Nowe pismo z Urzędu Skarbowego. Odpowiedz do 26.11.', when: '13.11, 10:15', go: '#/pismo/us' }
      ],
      halina: [
        { t: 'Ania sprawdziła Pani przypomnienia.', when: '19.11, 18:40', go: '#/rodzina' }
      ]
    },
    unseen: { anna: 1, halina: 0 },
    chat: { anna: [], halina: [] }
  };
}

const STORE_KEY = 'mobywatel-zalatwione-v3';
let S = initialState();
try {
  const raw = localStorage.getItem(STORE_KEY);
  if (raw) { const parsed = JSON.parse(raw); if (parsed && parsed.v === 3) S = Object.assign(initialState(), parsed); }
} catch (e) { /* tryb prywatny – działamy bez zapisu */ }
const save = () => { try { localStorage.setItem(STORE_KEY, JSON.stringify(S)); } catch (e) { /* ignore */ } };

const me = () => PEOPLE[S.persona];
const set = () => S.settings[S.persona];
const isAnna = () => S.persona === 'anna';
const curAddress = () => (isAnna() && S.moved ? S.newAddress : me().address);
const child = () => S.child || { full: 'Zofia Nowak', insurance: true, benefit: true, address: curAddress() };

/* =========================================================
   Komponenty
   ========================================================= */
const attrs = (o = {}) => {
  let a = '';
  if (o.go) a += ` data-go="${esc(o.go)}"`;
  if (o.act) a += ` data-act="${esc(o.act)}" data-arg="${esc(o.arg ?? '')}"`;
  return a;
};
const cardBtn = o => `<button type="button" class="card card-btn"${attrs(o)}>
  <span class="ic ${o.tone || ''}">${icon(o.icon || 'info')}</span>
  <span class="ct"><b>${o.title}</b>${o.sub ? `<span>${o.sub}</span>` : ''}${o.due ? `<span class="todo-due ${o.dueTone || ''}">${o.due}</span>` : ''}</span>
  ${o.right || ''}<span class="chev">${icon('chevR')}</span></button>`;
const banner = (html, tone = '', ic = 'info') => `<div class="banner ${tone}">${icon(ic)}<div>${html}</div></div>`;
const src = s => `<span class="src" title="Skąd to wiemy: ${esc(s)}">${icon('shield')}Źródło: ${esc(s)}</span>`;
const speakBtn = text => `<button type="button" class="speak" data-act="speak" data-arg="${esc(text)}">${icon('speaker')}Przeczytaj na głos</button>`;
const backBtn = (to, label = 'Wróć') => `<button type="button" class="back" data-go="${to}">${icon('chevL')}${label}</button>`;
const kv = rows => `<dl class="kv">${rows.map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join('')}</dl>`;

function tracker(c) {
  return `<ol class="track">${c.steps.map((s, i) => {
    const cls = i < c.status ? 'done' : (i === c.status ? 'now' : '');
    const lbl = i < c.status ? 'zrobione' : (i === c.status ? 'w toku' : 'czeka');
    return `<li class="${cls}"><span class="bullet" aria-hidden="true"></span>${esc(s)}<small>${lbl}</small></li>`;
  }).join('')}</ol>`;
}

function qrSvg(seed) {
  let s = seed >>> 0 || 7;
  const rnd = () => { s ^= s << 13; s ^= s >>> 17; s ^= s << 5; return ((s >>> 0) % 1000) / 1000; };
  const n = 25; let d = '';
  const inF = (x, y) => (x < 8 && y < 8) || (x > 16 && y < 8) || (x < 8 && y > 16);
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) if (!inF(x, y) && rnd() > 0.52) d += `M${x} ${y}h1v1h-1z`;
  const f = (x, y) => `<path d="M${x} ${y}h7v7h-7zM${x + 1} ${y + 1}v5h5v-5z" fill-rule="evenodd"/><path d="M${x + 2} ${y + 2}h3v3h-3z"/>`;
  return `<svg viewBox="-2 -2 29 29" role="img" aria-label="Kod QR do zeskanowania (demonstracyjny)"><rect x="-2" y="-2" width="29" height="29" fill="#fff"/><g fill="#0b1220"><path d="${d}"/>${f(0, 0)}${f(18, 0)}${f(0, 18)}</g></svg>`;
}

/* =========================================================
   Toast, mowa, arkusze
   ========================================================= */
let toastTimer;
function toast(msg, ic = 'check') {
  const t = $('#toast');
  t.innerHTML = `${icon(ic)}<div>${msg}</div>`;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 4200);
}

const synth = window.speechSynthesis;
let speakingBtn = null;
function speak(text, btn) {
  if (!synth) { toast('Ta przeglądarka nie umie czytać na głos.', 'info'); return; }
  if (synth.speaking) { synth.cancel(); if (speakingBtn) speakingBtn.classList.remove('on'); if (btn && btn === speakingBtn) { speakingBtn = null; return; } }
  const u = new SpeechSynthesisUtterance(String(text).replace(/<[^>]+>/g, ' '));
  u.lang = 'pl-PL'; u.rate = S.persona === 'halina' ? 0.9 : 1;
  const pl = synth.getVoices().find(v => /^pl/i.test(v.lang));
  if (pl) u.voice = pl;
  speakingBtn = btn || null;
  if (btn) btn.classList.add('on');
  u.onend = () => { if (btn) btn.classList.remove('on'); speakingBtn = null; };
  synth.speak(u);
}

let sheetKind = null; let lastFocus = null;
function openSheet(html, { full = false, kind = 'info', label = 'Okno' } = {}) {
  const ov = $('#overlay');
  if (ov.hidden) lastFocus = document.activeElement;
  $('#app').inert = true;
  $('#guide').inert = true;
  ov.innerHTML = `<div class="sheet ${full ? 'full' : ''}" role="dialog" aria-modal="true" aria-label="${esc(label)}">${html}</div>`;
  ov.hidden = false; sheetKind = kind;
  const f = ov.querySelector('[autofocus], input, button');
  if (f) f.focus();
}
function closeSheet() {
  const ov = $('#overlay');
  if (ov.hidden) return;
  stopListening();
  ov.hidden = true; ov.innerHTML = ''; sheetKind = null;
  $('#app').inert = false;
  $('#guide').inert = false;
  if (lastFocus?.isConnected) lastFocus.focus();
  lastFocus = null;
}
const sheetHead = (title, extra = '') => `<div class="sheet-head"><h2>${title}</h2>${extra}<button type="button" class="iconbtn" data-act="closeSheet" aria-label="Zamknij">${icon('x')}</button></div>`;

/* Podpis / potwierdzenie – nic nie wychodzi bez zgody */
function openSign({ title = 'Sprawdź i podpisz', items = [], review = '', note = '', onSigned }) {
  openSign.cb = onSigned;
  openSheet(`${sheetHead(title)}
    <div class="sheet-body">
      <p class="p">Tylko to zostanie wysłane. Nic więcej.</p>
      <div class="sign-what">${items.map(i => `<div class="row"><span class="ic info">${icon(i.icon || 'send')}</span><span class="ct"><b>${esc(i.to)}</b><span>${esc(i.what)}</span></span></div>`).join('')}</div>
      ${review}
      ${note ? `<div style="margin-top:10px">${banner(note, '', 'info')}</div>` : ''}
      <button type="button" class="check" role="checkbox" aria-checked="false" data-act="signConsent" style="margin-top:12px">
        <span class="box">${icon('check')}</span><span class="ct"><b>Potwierdzam dane w tej symulacji</b><span>Po podpisie zobaczysz wynik scenariusza.</span></span>
      </button>
      <div class="faceid" id="faceid" aria-hidden="true">${icon('face')}</div>
      <div class="btn-row">
        <button type="button" class="btn btn-block" id="signBtn" data-act="doSign" disabled aria-disabled="true">${icon('lock')}Podpisz w symulacji</button>
        <button type="button" class="btn btn-ghost btn-block" data-act="closeSheet">Jeszcze nie</button>
      </div>
      <p class="ai-note">Prototyp: podpis jest symulowany, nic nie jest wysyłane.</p>
    </div>`, { kind: 'sign', label: title });
}

/* =========================================================
   Router
   ========================================================= */
let lastRoute = '';
const go = h => { if (location.hash === h) render(true); else location.hash = h; };
function route() {
  const h = (location.hash || '#/start').replace(/^#\/?/, '');
  const [name, arg] = h.split('/');
  return { name: name || 'start', arg };
}

function render(force) {
  const r = route();
  const key = r.name + '/' + (r.arg || '');
  const changed = key !== lastRoute;
  lastRoute = key;
  const st = set();
  const app = $('#app');
  app.classList.toggle('simple', !!st.simple);
  app.classList.toggle('hc', !!st.hc);
  document.body.classList.toggle('simple-active', !!st.simple);
  app.style.setProperty('--fs', st.fs);

  if (r.name === 'asystent') { location.replace('#/start'); setTimeout(openAssistant, 50); return; }
  if (r.name === 'wniosek' && Object.hasOwn(FLOWS, r.arg) && !isAnna()) {
    S.persona = 'anna';
    save();
  }

  const view = (Object.hasOwn(SCREENS, r.name) ? SCREENS[r.name] : SCREENS.start)(r.arg);
  $('#screen').innerHTML = view.html;
  renderAppbar(view);
  renderTabbar(view.tab || r.name);
  syncGuide();
  if (view.after) view.after();
  if (changed || force) {
    $('#screen').scrollTo({ top: 0, behavior: 'instant' });
    $('#screen').focus({ preventScroll: true });
  }
  if (st.autoRead && changed && view.say) setTimeout(() => speak(view.say), 300);
}

function renderAppbar(view) {
  const bar = $('#appbar');
  const unseen = S.unseen[S.persona] || 0;
  const bell = `<button type="button" class="iconbtn" data-act="openNotifs" aria-label="Powiadomienia${unseen ? `, nowe: ${unseen}` : ''}">${icon('bell')}${unseen ? `<span class="dot">${unseen}</span>` : ''}</button>`;
  const ask = `<button type="button" class="iconbtn" data-act="openAssistant" aria-label="Asystent">${icon('spark')}</button>`;
  const guide = `<button type="button" class="guide-fab" id="guideFab" data-act="toggleGuide" aria-controls="guide" aria-expanded="${$('#guide').classList.contains('open')}"><span aria-hidden="true">?</span><span>Scenariusze</span></button>`;
  if (view.title || (set().simple && view.back)) {
    bar.innerHTML = `<button type="button" class="iconbtn" data-go="${view.back || '#/start'}" aria-label="Wróć">${icon('chevL')}</button><div class="title">${view.title || ''}</div>${ask}${guide}`;
  } else {
    bar.innerHTML = `<div class="brand">${LOGO}<span>mObywatel</span></div><div class="spacer"></div>${ask}${bell}${guide}`;
  }
}

function renderTabbar(active) {
  const tabs = [
    ['start', 'home', 'Start'], ['dokumenty', 'id', 'Dokumenty'], ['sprawy', 'folder', 'Sprawy'], ['pisma', 'mail', 'Pisma'], ['wiecej', 'grid', 'Więcej']
  ];
  const map = { dokument: 'dokumenty', udostepnij: 'dokumenty', sprawa: 'sprawy', wniosek: 'sprawy', pismo: 'pisma', prywatnosc: 'wiecej', rodzina: 'wiecej', ustawienia: 'wiecej', oprojekcie: 'wiecej' };
  const a = map[active] || active;
  const unread = unreadLetters();
  $('#tabbar').innerHTML = tabs.map(([k, ic, l]) => `<button type="button" class="tab" data-go="#/${k}" ${a === k ? 'aria-current="page"' : ''}>${icon(ic)}<span>${l}</span>${k === 'pisma' && unread ? `<span class="dot" aria-label="nieprzeczytane: ${unread}">${unread}</span>` : ''}</button>`).join('');
}

function unreadLetters() {
  return LETTERS().filter(l => !S.letters[l.id]?.read).length;
}

/* =========================================================
   Listy zadań (proaktywne przypomnienia)
   ========================================================= */
function todosAnna() {
  const t = [];
  if (!S.letters.us.answered) t.push({ icon: 'mail', tone: 'red', title: 'Urząd Skarbowy prosi o wyjaśnienia', sub: 'Chodzi o ulgę za ocieplenie domu. Wyjaśniliśmy pismo prostym językiem.', due: 'Odpowiedz w 6 dni (do 26.11)', dueTone: 'due-red', go: '#/pismo/us' });
  if (!S.letters.odpady.paid) t.push({ icon: 'card', tone: 'warn', title: 'Opłata za odpady: 147 zł', sub: 'Urząd Miasta Poznania, IV kwartał', due: 'Zapłać w 10 dni (do 30.11)', dueTone: 'due-warn', go: '#/pismo/odpady' });
  t.push({ icon: 'car', tone: 'ok', title: 'OC Skody odnowi się samo 1.12', sub: 'Nic nie musisz robić. Chcesz zmienić ubezpieczyciela? Zobacz jak.', due: 'za 11 dni', dueTone: 'due-ok', go: '#/dokument/pojazd' });
  if (!S.idDone && !S.lostDone) t.push({ icon: 'id', tone: 'warn', title: 'Twój dowód traci ważność 31.12', sub: 'Wniosek jest prawie gotowy. Wymienisz go w 2 minuty.', due: 'za 41 dni', dueTone: 'due-warn', go: '#/wniosek/id' });
  t.push({ icon: 'cal', title: 'Przegląd techniczny Skody', sub: 'Stacja kontroli przypomni się 7 dni wcześniej.', due: 'do 05.01.2027', go: '#/dokument/pojazd' });
  return t;
}

/* =========================================================
   Ekrany
   ========================================================= */
const SCREENS = {};

/* ---------- Start ---------- */
SCREENS.start = () => {
  if (set().simple || !isAnna()) return simpleHome();
  const p = me();
  const cases = S.cases.anna.filter(c => c.status < c.steps.length);
  let hero;
  if (!S.babyDone) {
    hero = `<section class="hero" aria-labelledby="heroT">
      <span class="pill">${icon('heart', 'width="14" height="14"')} Zdarzenie w Twoim życiu</span>
      <h3 id="heroT">Witamy Zosię na świecie!</h3>
      <p>Szpital zgłosił narodziny 17.11. Przygotowaliśmy jeden wniosek zamiast sześciu: akt urodzenia, PESEL, meldunek, NFZ i 800+.</p>
      <button type="button" class="btn" data-go="#/wniosek/baby">Sprawdź i podpisz · 4 kroki</button>
    </section>`;
  } else if (!S.idDone && !S.lostDone) {
    hero = `<section class="hero" aria-labelledby="heroT">
      <span class="pill">${icon('clock', 'width="14" height="14"')} Zanim będzie za późno</span>
      <h3 id="heroT">Dowód traci ważność za 41 dni</h3>
      <p>Twoje dane już mamy. Zrobisz zdjęcie telefonem i wybierzesz, gdzie i kiedy odbierzesz dowód.</p>
      <button type="button" class="btn" data-go="#/wniosek/id">Wymień dowód · 2 minuty</button>
    </section>`;
  } else {
    hero = `<section class="hero" aria-labelledby="heroT">
      <span class="pill">${icon('check', 'width="14" height="14"')} Wszystko pod kontrolą</span>
      <h3 id="heroT">Nie masz pilnych spraw</h3>
      <p>Przypomnimy Ci o terminach, zanim staną się problemem.</p>
      <button type="button" class="btn" data-go="#/sprawy">Zobacz swoje sprawy</button>
    </section>`;
  }
  return {
    html: `
    <div class="hello"><h2>Dzień dobry, ${p.voc}</h2><p>${TODAY}</p></div>
    ${hero}
    <h3 class="h3">Do załatwienia</h3>
    ${todosAnna().map(cardBtn).join('')}
    ${cases.length ? `<h3 class="h3">Sprawy w toku</h3>${cases.map(c => cardBtn({ icon: c.icon || 'folder', tone: 'info', title: esc(c.title), sub: `${esc(c.steps[Math.min(c.status, c.steps.length - 1)])} · krok ${Math.min(c.status + 1, c.steps.length)} z ${c.steps.length}`, go: `#/sprawa/${c.id}` })).join('')}` : ''}
    <h3 class="h3">Dokumenty</h3>
    <div class="docs-grid">
      <button type="button" class="doc-mini g-id" data-go="#/dokument/dowod"><span class="dm-ic">${icon('id')}</span><b>mDowód</b><span>ważny do ${p.idValid}</span></button>
      <button type="button" class="doc-mini g-dl" data-go="#/dokument/prawojazdy"><span class="dm-ic">${icon('card')}</span><b>Prawo jazdy</b><span>kat. B · 3 pkt</span></button>
      <button type="button" class="doc-mini g-car" data-go="#/dokument/pojazd"><span class="dm-ic">${icon('car')}</span><b>Skoda Octavia</b><span>PO 4821N</span></button>
      ${S.babyDone
        ? `<button type="button" class="doc-mini g-kdr" data-go="#/dokument/zosia"><span class="dm-ic">${icon('baby')}</span><b>${esc(child().full)}</b><span>akt urodzenia</span></button>`
        : `<button type="button" class="doc-mini dm-all" data-go="#/dokumenty"><span class="dm-ic">${icon('grid')}</span><b>Wszystkie</b><span>dokumenty</span></button>`}
    </div>
    <h3 class="h3">Coś się zmienia w Twoim życiu?</h3>
    <div class="chips">
      <button type="button" class="chip" data-go="#/wniosek/move">Przeprowadzam się</button>
      <button type="button" class="chip" data-go="#/wniosek/car">Kupiłam auto</button>
      <button type="button" class="chip" data-go="#/wniosek/lost">Zgubiłam dokumenty</button>
      <button type="button" class="chip" data-go="#/rodzina">Pomagam mamie</button>
    </div>
    <div class="askbar"><button type="button" data-act="openAssistant">${icon('spark', 'width="20" height="20"')}<span>Napisz lub powiedz, co chcesz załatwić</span><span class="mic">${icon('mic')}</span></button></div>`,
    say: `Dzień dobry, ${p.voc}. Masz ${todosAnna().length} spraw do załatwienia. Najpilniejsza: ${todosAnna()[0].title}.`
  };
};

function simpleHome() {
  const p = me();
  if (isAnna()) {
    return {
      html: `<div class="hello"><h2>Dzień dobry, ${p.voc}</h2><p>${TODAY}</p></div>
      ${speakBtn(`Dzień dobry. Najpilniejsza sprawa: ${todosAnna()[0].title}. ${todosAnna()[0].due}.`)}
      <div style="height:12px"></div>
      ${cardBtn(todosAnna()[0])}
      <div class="big-tiles">
        <button type="button" class="big-tile t-red" data-go="#/dokumenty">${icon('id')}Moje dokumenty</button>
        <button type="button" class="big-tile" data-go="#/pisma">${icon('mail')}Pisma${unreadLetters() ? `<span class="dot">${unreadLetters()}</span>` : ''}</button>
        <button type="button" class="big-tile" data-go="#/sprawy">${icon('folder')}Moje sprawy</button>
        <button type="button" class="big-tile t-navy" data-act="openAssistant">${icon('mic')}Zapytaj głosem</button>
        <button type="button" class="big-tile" data-go="#/rodzina">${icon('users')}Rodzina</button>
        <button type="button" class="big-tile" data-go="#/ustawienia">${icon('text')}Wygląd i tekst</button>
      </div>`
    };
  }
  const pending = S.halinaInbox.filter(x => !x.done);
  const nfz = S.letters.nfz;
  const intro = pending.length
    ? `Dzień dobry, Pani Halino. Ania przygotowała dla Pani wniosek o nowy dowód osobisty. Proszę sprawdzić i nacisnąć przycisk wysłania.`
    : `Dzień dobry, Pani Halino. Ma Pani dwie recepty do odbioru w aptece.${nfz.read ? '' : ' Jest też nowe pismo z NFZ.'}`;
  return {
    html: `<div class="hello"><h2>Dzień dobry, ${p.voc}!</h2><p>${TODAY}</p></div>
    ${speakBtn(intro)}
    <div style="height:12px"></div>
    ${pending.map(x => `<div class="helper-card"><span class="avatar av-anna" aria-hidden="true">AN</span><div class="ct"><b>Ania przygotowała dla Pani wniosek</b><span>${esc(x.title)}</span></div></div>
      <button type="button" class="btn btn-block" data-go="#/prosba/${x.id}" style="margin-bottom:14px">Zobacz wniosek od Ani</button>`).join('')}
    <div class="big-tiles">
      <button type="button" class="big-tile t-red" data-go="#/dokumenty">${icon('id')}Moje dokumenty</button>
      <button type="button" class="big-tile" data-go="#/leki">${icon('pill')}Leki do odbioru<span class="dot">2</span></button>
      <button type="button" class="big-tile" data-go="#/pisma">${icon('mail')}Pisma${unreadLetters() ? `<span class="dot">${unreadLetters()}</span>` : ''}</button>
      <button type="button" class="big-tile t-navy" data-act="callAnia">${icon('phone')}Zadzwoń do Ani</button>
      <button type="button" class="big-tile" data-act="openAssistant">${icon('mic')}Zapytaj głosem</button>
      <button type="button" class="big-tile" data-go="#/ustawienia">${icon('text')}Większe litery</button>
      <button type="button" class="big-tile" data-go="#/sprawy">${icon('folder')}Moje sprawy</button>
    </div>
    <p class="p small muted" style="margin-top:16px">Ania może Pani pomagać, ale niczego nie podpisze za Panią. <button type="button" class="linkbtn" data-go="#/rodzina">Co widzi Ania?</button></p>`,
    say: intro
  };
}

/* ---------- Dokumenty ---------- */
SCREENS.dokumenty = () => {
  const p = me();
  if (!isAnna()) {
    return {
      html: `<h2 class="h">Moje dokumenty</h2>
      ${docCardHtml('dowod')}
      <div class="doc-card g-sch"><div class="doc-top"><span>Legitymacja emeryta</span><span>ZUS</span></div><div class="doc-body"><div class="photo">${icon('user')}</div><div><div class="name">${p.full}</div><div class="meta">Nr 0441-882<br>Bezterminowa</div></div></div></div>
      <div class="btn-row"><button type="button" class="btn btn-block" data-go="#/udostepnij/dowod">${icon('qr')}Pokaż dowód w urzędzie lub w sklepie</button></div>`,
      tab: 'dokumenty', title: set().simple ? 'Moje dokumenty' : '', back: '#/start',
      say: `Ma Pani dowód osobisty ważny do ${p.idValid} i legitymację emeryta.`
    };
  }
  return {
    html: `<h2 class="h">Dokumenty</h2>
    ${banner('Dotknij dokumentu, aby go pokazać lub <b>udostępnić tylko część danych</b>.', 'info', 'shield')}
    ${docCardHtml('dowod', true)}
    <button type="button" class="doc-card g-dl card-btn" data-go="#/dokument/prawojazdy" style="display:block;border:0;text-align:left;color:#fff;width:100%">
      <div class="doc-top"><span>Prawo jazdy</span><span>kat. B</span></div>
      <div class="doc-body"><div class="photo">${icon('user')}</div><div><div class="name">${p.full}</div><div class="meta">Ważne do 30.06.2037<br>Punkty karne: 3</div></div></div></button>
    <button type="button" class="doc-card g-car card-btn" data-go="#/dokument/pojazd" style="display:block;border:0;text-align:left;color:#fff;width:100%">
      <div class="doc-top"><span>Pojazd</span><span>PO 4821N</span></div>
      <div class="doc-body"><div class="photo">${icon('car')}</div><div><div class="name">Skoda Octavia</div><div class="meta">OC do 01.12.2026<br>Przegląd do 05.01.2027</div></div></div></button>
    ${S.carDone ? `<div class="doc-card g-car" style="filter:hue-rotate(-20deg)"><div class="doc-top"><span>Pojazd · nowy</span><span>PZ 5R418</span></div><div class="doc-body"><div class="photo">${icon('car')}</div><div><div class="name">Skoda Fabia</div><div class="meta">Pozwolenie czasowe do 19.12.2026<br>OC do 14.03.2027</div></div></div></div>` : ''}
    ${S.babyDone ? `<button type="button" class="doc-card g-kdr card-btn" data-go="#/dokument/zosia" style="display:block;border:0;text-align:left;color:#fff;width:100%"><div class="doc-top"><span>Rodzina</span><span>Odpis aktu</span></div><div class="doc-body"><div class="photo">${icon('baby')}</div><div><div class="name">${esc(child().full)}</div><div class="meta">ur. 17.11.2026, Poznań<br>PESEL nadany</div></div></div></button>` : ''}`
  };
};

function docCardHtml(kind, link) {
  const p = me();
  const lost = isAnna() && S.lostDone;
  const inner = `<div class="doc-top"><span>Dowód osobisty</span><span>RP</span></div>
    <div class="doc-body"><div class="photo">${icon('user')}</div><div><div class="name">${p.full}</div>
    <div class="meta">PESEL ${p.pesel}<br>Nr ${p.idNo} · ważny do ${p.idValid}</div></div></div>
    <div class="live"><i></i>${lost ? 'Dokument fizyczny unieważniony' : 'Dokument aktywny · sprawdzony teraz'}</div>`;
  return link
    ? `<button type="button" class="doc-card g-id card-btn" data-go="#/dokument/dowod" style="display:block;border:0;text-align:left;color:#fff;width:100%">${inner}</button>`
    : `<div class="doc-card g-id">${inner}</div>`;
}

SCREENS.dokument = (arg) => {
  const p = me();
  if (arg === 'prawojazdy') {
    return {
      title: 'Prawo jazdy', back: '#/dokumenty', tab: 'dokumenty',
      html: `<div class="doc-card g-dl"><div class="doc-top"><span>Prawo jazdy</span><span>kat. B</span></div><div class="doc-body"><div class="photo">${icon('user')}</div><div><div class="name">${p.full}</div><div class="meta">Nr 01234/16/2201<br>Ważne do 30.06.2037</div></div></div></div>
      <div class="card">${kv([['Kategorie', 'B (od 2010)'], ['Punkty karne', '3 pkt'], ['Najbliższe wygaśnięcie', '3 pkt · 14.03.2027'], ['Ostatnie sprawdzenie', 'Policja, 18.11 14:02']])}${src('CEPiK – Centralna Ewidencja Kierowców')}</div>
      ${banner('Punkty karne wygasają po roku od opłacenia mandatu. Przypomnimy Ci, gdy znikną.', 'info')}
      <div class="btn-row"><button type="button" class="btn btn-block" data-go="#/udostepnij/prawojazdy">${icon('qr')}Pokaż do kontroli</button><button type="button" class="btn btn-ghost btn-block" data-go="#/prywatnosc">${icon('eye')}Kto sprawdzał ten dokument?</button></div>`
    };
  }
  if (arg === 'pojazd') {
    return {
      title: 'Skoda Octavia · PO 4821N', back: '#/dokumenty', tab: 'dokumenty',
      html: `<div class="doc-card g-car"><div class="doc-top"><span>Pojazd</span><span>PO 4821N</span></div><div class="doc-body"><div class="photo">${icon('car')}</div><div><div class="name">Skoda Octavia 2.0 TDI</div><div class="meta">Rok 2018 · VIN TMB…4471</div></div></div></div>
      <h3 class="h3">Terminy</h3>
      <div class="list">
        <div class="row"><span class="ic ok">${icon('shield')}</span><span class="ct"><b>OC odnowi się samo 01.12.2026</b><span>Polisa przedłuża się automatycznie o rok, jeśli jej nie wypowiesz.</span></span></div>
        <div class="row"><span class="ic warn">${icon('cal')}</span><span class="ct"><b>Przegląd techniczny do 05.01.2027</b><span>Przypomnimy 30 i 7 dni wcześniej.</span></span></div>
      </div>
      ${src('Ubezpieczeniowy Fundusz Gwarancyjny i CEPiK')}
      <h3 class="h3">Co możesz zrobić</h3>
      <div class="list">
        <button type="button" class="row" data-act="info" data-arg="oc"><span class="ic">${icon('info')}</span><span class="ct"><b>Chcę zmienić ubezpieczyciela OC</b><span>Jak wypowiedzieć polisę krok po kroku</span></span>${icon('chevR', 'width="18"')}</button>
        <button type="button" class="row" data-act="info" data-arg="sell"><span class="ic">${icon('swap')}</span><span class="ct"><b>Sprzedaję to auto</b><span>Zgłoszenie zbycia i umowa w aplikacji</span></span>${icon('chevR', 'width="18"')}</button>
        <button type="button" class="row" data-go="#/wniosek/car"><span class="ic">${icon('plus')}</span><span class="ct"><b>Kupiłam inne auto</b><span>Rejestracja bez kolejki</span></span>${icon('chevR', 'width="18"')}</button>
      </div>`
    };
  }
  if (arg === 'zosia' && isAnna() && S.babyDone) {
    return {
      title: esc(child().full), back: '#/dokumenty', tab: 'dokumenty',
      html: `<div class="doc-card g-kdr"><div class="doc-top"><span>Odpis skrócony aktu urodzenia</span><span>USC Poznań</span></div><div class="doc-body"><div class="photo">${icon('baby')}</div><div><div class="name">${esc(child().full)}</div><div class="meta">ur. 17.11.2026, Poznań<br>PESEL 26311700000</div></div></div></div>
      <div class="card">${kv([['Matka', 'Anna Nowak'], ['Ojciec', 'Marek Kowalski'], ['Zameldowanie', esc(child().address || 'poza tym wnioskiem')], ['Ubezpieczenie NFZ', child().insurance ? 'objęte wnioskiem' : 'poza tym wnioskiem'], ['800+', child().benefit ? 'objęte wnioskiem' : 'poza tym wnioskiem']])}${src('Rejestr Stanu Cywilnego i rejestr PESEL')}</div>
      <div class="btn-row"><button type="button" class="btn btn-ghost btn-block" data-act="toastInfo" data-arg="Odpis w PDF zapisalibyśmy w telefonie. W prototypie niczego nie pobieramy.">${icon('download')}Pobierz odpis (PDF)</button></div>`
    };
  }
  // dowód
  const lost = isAnna() && S.lostDone;
  return {
    title: 'Dowód osobisty', back: '#/dokumenty', tab: 'dokumenty',
    html: `${docCardHtml('dowod')}
    ${lost ? banner('Dowód fizyczny został unieważniony 20.11 o 9:41. <b>Nikt nie użyje go do kredytu ani umowy.</b>', 'red', 'alert') : ''}
    <div class="card">${kv([['Imię i nazwisko', p.full], ['Data i miejsce urodzenia', p.born], ['Obywatelstwo', p.citizenship], ['Numer dowodu', p.idNo], ['Ważny do', p.idValid]])}${src('Rejestr Dowodów Osobistych')}</div>
    ${banner('Od 2015 r. w dowodzie nie ma adresu. <b>Po przeprowadzce nie musisz go wymieniać.</b>', 'ok', 'info')}
    <div class="btn-row">
      <button type="button" class="btn btn-block" data-go="#/udostepnij/dowod">${icon('qr')}Udostępnij tylko to, co trzeba</button>
      ${isAnna() ? `<button type="button" class="btn btn-ghost btn-block" data-go="#/wniosek/id">${icon('swap')}Wymień dowód</button>
      <button type="button" class="btn btn-ghost btn-block" data-go="#/wniosek/lost">${icon('alert')}Zgubiłam dowód</button>` : ''}
    </div>`
  };
};

/* ---------- Udostępnianie: tylko to, co trzeba ---------- */
let shareChoice = 'age';
let shareTimer = null;
const SHARE_OPTS = {
  age: { t: 'Tylko „mam ukończone 18 lat”', d: 'Sklep, wypożyczalnia, klub. Nie zobaczą imienia ani PESEL.', show: ['Pełnoletność: TAK'] },
  name: { t: 'Imię, nazwisko i zdjęcie', d: 'Odbiór paczki, hotel, recepcja.', show: ['Imię i nazwisko', 'Zdjęcie'] },
  full: { t: 'Pełne dane dowodu', d: 'Bank, notariusz, urząd. Zapiszemy, kto i kiedy pobrał dane.', show: ['Imię i nazwisko', 'Zdjęcie', 'PESEL', 'Data urodzenia', 'Numer dowodu'] }
};
const ALL_FIELDS = ['Pełnoletność: TAK', 'Imię i nazwisko', 'Zdjęcie', 'PESEL', 'Data urodzenia', 'Numer dowodu'];
SCREENS.udostepnij = (arg) => {
  clearInterval(shareTimer);
  const o = SHARE_OPTS[shareChoice];
  const fields = ALL_FIELDS.filter(f => f !== 'Pełnoletność: TAK' || shareChoice === 'age');
  return {
    title: 'Udostępnij dane', back: arg === 'prawojazdy' ? '#/dokument/prawojazdy' : '#/dokument/dowod', tab: 'dokumenty',
    html: `<h2 class="h">Co chcesz pokazać?</h2>
    <div role="radiogroup" aria-label="Zakres danych">
    ${Object.entries(SHARE_OPTS).map(([k, v]) => `<button type="button" class="share-opt" role="radio" aria-checked="${k === shareChoice}" data-act="shareOpt" data-arg="${k}"><span class="radio"></span><span class="ct"><b>${v.t}</b><span>${v.d}</span></span></button>`).join('')}
    </div>
    <h3 class="h3">Druga strona zobaczy</h3>
    <div class="reveal">${fields.map(f => o.show.includes(f) ? `<div class="on"><span>${icon('check', 'width="16" height="16"')} ${f}</span><span>widoczne</span></div>` : `<div class="off"><span>${f}</span><span>ukryte</span></div>`).join('')}</div>
    <h3 class="h3">Pokaż kod do zeskanowania</h3>
    <div class="qr-wrap">${qrSvg(shareChoice.length * 7919 + 13)}<div class="timer" aria-hidden="true"><i id="qrBar"></i></div><p class="small muted" id="qrTxt" style="margin:8px 0 0">Kod jednorazowy · wygaśnie za 60 s</p></div>
    <div class="btn-row"><button type="button" class="btn btn-ghost btn-block" data-act="simScan">${icon('eye')}Zasymuluj skanowanie</button>
      <button type="button" class="btn btn-ghost btn-block" data-act="newQr" hidden>Wygeneruj nowy kod</button></div>`,
    after() {
      let left = 60;
      shareTimer = setInterval(() => {
        left--; const bar = $('#qrBar'), txt = $('#qrTxt');
        if (!bar) { clearInterval(shareTimer); return; }
        bar.style.width = (left / 60 * 100) + '%';
        txt.textContent = left > 0 ? `Kod jednorazowy · wygaśnie za ${left} s` : 'Kod wygasł. Dotknij opcji, aby wygenerować nowy.';
        if (left <= 0) {
          clearInterval(shareTimer);
          $('[data-act="simScan"]').disabled = true;
          $('[data-act="newQr"]').hidden = false;
        }
      }, 1000);
    }
  };
};

/* ---------- Sprawy ---------- */
const CATALOG = [
  { id: 'baby', icon: 'baby', title: 'Urodziło się dziecko', sub: 'Akt urodzenia, PESEL, meldunek, NFZ, 800+ w jednym wniosku' },
  { id: 'move', icon: 'truck', title: 'Przeprowadzam się', sub: 'Meldunek i zmiana adresu w urzędach naraz' },
  { id: 'id', icon: 'id', title: 'Nowy dowód osobisty', sub: 'Dane i zdjęcie już mamy, wybierz termin odbioru' },
  { id: 'car', icon: 'car', title: 'Kupiłam samochód', sub: 'Rejestracja, OC i zgłoszenie w 30 dni bez kolejki' },
  { id: 'lost', icon: 'alert', title: 'Zgubiłam dokumenty', sub: 'Unieważnienie dowodu i zastrzeżenie PESEL w 10 sekund' }
];
SCREENS.sprawy = () => {
  const mine = S.cases[S.persona];
  const active = mine.filter(c => c.status < c.steps.length), done = mine.filter(c => c.status >= c.steps.length);
  return {
    title: set().simple ? 'Moje sprawy' : '', back: '#/start',
    html: `<h2 class="h">Sprawy</h2>
    ${active.length ? `<h3 class="h3">W toku · śledź jak paczkę</h3>${active.map(c => cardBtn({ icon: c.icon || 'folder', tone: 'info', title: esc(c.title), sub: esc(c.who), due: esc(c.steps[c.status]) + ' …', dueTone: 'due-warn', go: `#/sprawa/${c.id}` })).join('')}` : ''}
    ${isAnna() ? `<h3 class="h3">Załatw według sytuacji życiowej</h3>
    ${CATALOG.map(c => cardBtn({ icon: c.icon, title: c.title, sub: c.sub, go: `#/wniosek/${c.id}` })).join('')}
    <p class="p small muted">Nie musisz wiedzieć, który urząd za co odpowiada. Wybierz, co się dzieje, a my rozdzielimy sprawę między instytucje.</p>` : ''}
    ${done.length ? `<h3 class="h3">Zakończone</h3>${done.map(c => cardBtn({ icon: 'check', tone: 'ok', title: esc(c.title), sub: esc(c.steps[c.steps.length - 1]), go: `#/sprawa/${c.id}` })).join('')}` : ''}
    ${!isAnna() && !mine.length ? `<p class="p">Nie ma Pani spraw w toku.</p>` : ''}`
  };
};
SCREENS.sprawa = (id) => {
  const c = S.cases[S.persona].find(x => x.id === id);
  if (!c) return SCREENS.sprawy();
  const finished = c.status >= c.steps.length;
  return {
    title: esc(c.title), back: '#/sprawy', tab: 'sprawy',
    html: `<div class="card"><div class="ct"><b>${esc(c.title)}</b><span>${esc(c.who)}</span></div>
      <div class="divider"></div>${tracker(c)}</div>
      ${c.id === 'usreply' ? banner('Urzędowe poświadczenie odbioru (UPO): odpowiedź doręczona 20.11.2026. Potwierdzenie demonstracyjne.', 'ok', 'check') : ''}
      ${finished ? banner('Sprawa zakończona w symulacji.', 'ok', 'check') : banner('Powiadomimy Cię o każdej zmianie. Nie musisz dzwonić do urzędu.', 'info', 'bell')}
      ${c.contact ? `<div class="card">${kv([['Prowadzi', c.contact], ['Numer sprawy', c.no || '—']])}</div>` : ''}`
  };
};

/* ---------- Pisma ---------- */
function LETTERS() {
  if (isAnna()) return [
    { id: 'us', from: 'Urząd Skarbowy Poznań-Grunwald', title: 'Wezwanie do złożenia wyjaśnień', date: '13.11.2026', tone: 'red', due: S.letters.us.answered ? 'Odpowiedź wysłana' : 'Odpowiedz do 26.11' },
    { id: 'odpady', from: 'Urząd Miasta Poznania', title: 'Opłata za odpady · IV kwartał', date: '02.11.2026', tone: 'warn', due: S.letters.odpady.paid ? 'Zapłacone' : 'Zapłać do 30.11' },
    { id: 'zus', from: 'ZUS', title: 'Informacja o stanie konta za 2025', date: '21.08.2026', tone: '', due: 'Tylko do wiadomości' }
  ];
  return [
    { id: 'nfz', from: 'Narodowy Fundusz Zdrowia', title: 'Zaproszenie na bezpłatną mammografię', date: '18.11.2026', tone: 'info', due: S.letters.nfz.booked ? 'Umówiona' : 'Bez terminu' }
  ];
}
SCREENS.pisma = () => ({
  title: set().simple ? 'Pisma' : '', back: '#/start',
  html: `<h2 class="h">Pisma z urzędów</h2>
  ${banner('Każde pismo możesz przeczytać <b>po ludzku</b>: o co chodzi, co zrobić, do kiedy i co się stanie, jeśli nie zrobisz nic.', 'info', 'spark')}
  ${LETTERS().map(l => cardBtn({ icon: 'mail', tone: S.letters[l.id]?.read ? '' : 'red', title: `${S.letters[l.id]?.read ? '' : '● '}${esc(l.title)}`, sub: `${esc(l.from)} · ${l.date}`, due: l.due, dueTone: l.tone === 'red' ? 'due-red' : l.tone === 'warn' ? 'due-warn' : '', go: `#/pismo/${l.id}` })).join('')}`
});

let letterView = 'plain';
const TAX_DRAFT = 'W odpowiedzi na wezwanie z 13.11.2026 przesyłam faktury dokumentujące wydatki na docieplenie budynku jednorodzinnego w łącznej kwocie 12 400,00 zł, odliczone w ramach ulgi termomodernizacyjnej w zeznaniu PIT-37 za 2025 r.';
const TAX_ATTACHMENTS = [
  ['FV 2025/08/114 · Termo-Bud', 'Docieplenie ścian · 8 900,00 zł'],
  ['FV 2025/09/031 · Termo-Bud', 'Robocizna · 2 300,00 zł'],
  ['FV 2025/09/377 · Hurtownia Izol', 'Materiały · 1 200,00 zł']
];
let taxDraft = TAX_DRAFT;
const taxAttachments = () => TAX_ATTACHMENTS.map(([name, detail]) =>
  `<div class="attach">${icon('clip')}<span class="ct"><b>${name}</b><span>${detail}</span></span></div>`).join('');
const LETTER_TEXT = {
  us: {
    orig: `<p><b>WEZWANIE</b></p><p>Na podstawie art. 155 § 1 w związku z art. 272 pkt 3 ustawy z dnia 29 sierpnia 1997 r. – Ordynacja podatkowa, Naczelnik Urzędu Skarbowego Poznań-Grunwald wzywa Panią do złożenia wyjaśnień oraz przedłożenia dokumentów potwierdzających poniesienie wydatków na realizację przedsięwzięcia termomodernizacyjnego, odliczonych w zeznaniu PIT-37 za rok podatkowy 2025 w kwocie 12 400,00 zł, w terminie 7 dni od dnia doręczenia niniejszego wezwania.</p><p>Jednocześnie poucza się, że niezastosowanie się do wezwania może skutkować wszczęciem postępowania podatkowego oraz nałożeniem kary porządkowej na podstawie art. 262 § 1 pkt 2 Ordynacji podatkowej.</p><p>Sprawę prowadzi: Tomasz Wrzesiński, starszy komisarz skarbowy, tel. 61 000 00 00.</p>`,
    plain: [
      ['O co chodzi?', 'W zeznaniu PIT za 2025 odliczyłaś 12 400 zł za ocieplenie domu (ulga termomodernizacyjna). Urząd chce zobaczyć faktury, które to potwierdzają. <b>To rutynowe sprawdzenie, a nie kara.</b>'],
      ['Co musisz zrobić?', 'Wyślij faktury za ocieplenie i krótkie wyjaśnienie. Znaleźliśmy w Twoich plikach 3 pasujące faktury.'],
      ['Do kiedy?', '<b>Do 26 listopada 2026</b> (zostało 6 dni).'],
      ['Co jeśli nie odpowiesz?', 'Urząd może nie uznać ulgi. Wtedy dopłacisz ok. 1 488 zł podatku z odsetkami. Może też nałożyć karę porządkową.'],
      ['Kto się tym zajmuje?', 'Tomasz Wrzesiński, Urząd Skarbowy Poznań-Grunwald, tel. 61 000 00 00.']
    ]
  },
  odpady: {
    orig: `<p>Urząd Miasta Poznania informuje, że zgodnie z uchwałą Rady Miasta w sprawie wyboru metody ustalenia opłaty za gospodarowanie odpadami komunalnymi oraz złożoną deklaracją, opłata za IV kwartał 2026 r. wynosi 147,00 zł i jest płatna bez wezwania w terminie do dnia 30 listopada 2026 r. na indywidualny rachunek bankowy.</p>`,
    plain: [
      ['O co chodzi?', 'To zwykła opłata za wywóz śmieci za październik, listopad i grudzień.'],
      ['Co musisz zrobić?', 'Zapłacić <b>147 zł</b>. Możesz to zrobić tutaj, numer konta wpiszemy za Ciebie.'],
      ['Do kiedy?', '<b>Do 30 listopada 2026</b>.'],
      ['Co jeśli nie zapłacisz?', 'Miasto doliczy odsetki i przyśle upomnienie.']
    ]
  },
  zus: {
    orig: `<p>Informacja o stanie konta ubezpieczonego oraz o zwaloryzowanym kapitale początkowym według stanu na dzień 31 grudnia 2025 r., sporządzona na podstawie art. 50 ust. 1 ustawy o systemie ubezpieczeń społecznych.</p>`,
    plain: [['O co chodzi?', 'ZUS raz w roku pokazuje, ile pieniędzy zebrało się na Twoją przyszłą emeryturę. <b>Nic nie musisz robić.</b>'], ['Ile mam?', 'Szacunkowa emerytura w wieku 60 lat: ok. 3 100 zł brutto miesięcznie (przy obecnych zarobkach).']]
  },
  nfz: {
    orig: `<p>Szanowna Pani, w ramach Programu profilaktyki raka piersi Narodowy Fundusz Zdrowia zaprasza na bezpłatne badanie mammograficzne. Badanie jest wykonywane bez skierowania raz na dwa lata u kobiet w wieku 45–74 lat.</p>`,
    plain: [['O co chodzi?', 'Może Pani zrobić <b>bezpłatne badanie piersi</b> (mammografię). Nie potrzeba skierowania.'], ['Co zrobić?', 'Wybrać termin. Najbliżej: mammobus przy szpitalu w Gnieźnie.'], ['Czy muszę?', 'Nie, ale badanie co dwa lata pomaga wcześnie wykryć chorobę.']]
  }
};
SCREENS.pismo = (id) => {
  const L = LETTERS().find(l => l.id === id) || LETTERS()[0];
  const T = LETTER_TEXT[L.id];
  if (!S.letters[L.id].read) { S.letters[L.id].read = true; save(); }
  const plainText = T.plain.map(([h, p]) => `${h} ${p}`).join(' ');
  let actions = '';
  if (L.id === 'us') actions = S.letters.us.answered
    ? `${banner('Odpowiedź wysłana 20.11. Urząd potwierdził odbiór (UPO) w symulacji.', 'ok', 'check')}
      ${S.letters.us.reply ? `<details class="card"><summary>Wysłana odpowiedź</summary><p class="draft-preview">${esc(S.letters.us.reply)}</p>${taxAttachments()}</details>` : ''}
      <button type="button" class="btn btn-ghost btn-block" data-go="#/sprawa/usreply">Sprawdź doręczenie</button>`
    : `<button type="button" class="btn btn-block" data-act="replyUS">${icon('send')}Odpowiedz i dołącz faktury</button>
       <button type="button" class="btn btn-ghost btn-block" data-act="toastInfo" data-arg="Przygotowalibyśmy prośbę o przedłużenie terminu o 7 dni. Wysłałabyś ją jednym podpisem.">${icon('clock')}Poproś o więcej czasu</button>
       <button type="button" class="btn btn-ghost btn-block" data-act="askAbout" data-arg="Co mam zrobić z pismem z urzędu skarbowego?">${icon('spark')}Zapytaj asystenta o to pismo</button>`;
  if (L.id === 'odpady') actions = S.letters.odpady.paid
    ? banner('Zapłacone 20.11. Potwierdzenie zapisaliśmy w sprawach.', 'ok', 'check')
    : `<button type="button" class="btn btn-block" data-act="payOdpady">${icon('card')}Zapłać 147 zł</button>`;
  if (L.id === 'nfz') actions = S.letters.nfz.booked
    ? banner('Umówiona: 3 grudnia, godz. 10:20, mammobus przy Szpitalu w Gnieźnie. Przypomnimy dzień wcześniej.', 'ok', 'check')
    : `<button type="button" class="btn btn-block" data-act="bookNfz">${icon('cal')}Umów mnie na badanie</button>
       <button type="button" class="btn btn-ghost btn-block" data-act="askAnia">${icon('users')}Poproś Anię o pomoc</button>`;
  return {
    title: esc(L.from), back: '#/pisma', tab: 'pisma',
    html: `<h2 class="h">${esc(L.title)}</h2>
    <p class="small muted" style="margin:-6px 0 12px">${esc(L.from)} · doręczone ${L.date}</p>
    <div class="seg" role="group" aria-label="Wersja pisma">
      <button type="button" aria-pressed="${letterView === 'plain'}" data-act="letterView" data-arg="plain">Po ludzku</button>
      <button type="button" aria-pressed="${letterView === 'orig'}" data-act="letterView" data-arg="orig">Oryginał</button>
    </div>
    ${letterView === 'plain'
      ? `<div class="plain">${T.plain.map(([h, p]) => `<h4>${h}</h4><p>${p}</p>`).join('')}</div>
         <div style="margin-top:10px;display:flex;gap:8px;align-items:center;flex-wrap:wrap">${speakBtn(plainText)}<span class="small muted">Wersję uproszczoną przygotował asystent. Wiążący jest oryginał.</span></div>`
      : `<div class="letter">${T.orig}</div>`}
    <div class="btn-row">${actions}</div>`,
    say: plainText
  };
};

/* ---------- Więcej ---------- */
SCREENS.wiecej = () => ({
  html: `<h2 class="h">Więcej</h2>
  <div class="list">
    <button type="button" class="row" data-go="#/prywatnosc"><span class="ic red">${icon('shield')}</span><span class="ct"><b>Prywatność i moje dane</b><span>Kto sprawdzał moje dane, udostępnienia, zastrzeżenie PESEL</span></span>${icon('chevR', 'width="18"')}</button>
    <button type="button" class="row" data-go="#/rodzina"><span class="ic info">${icon('users')}</span><span class="ct"><b>Rodzina i pomoc bliskiej osoby</b><span>${isAnna() ? 'Pomagasz mamie. Ona zawsze decyduje.' : 'Ania pomaga Pani w sprawach'}</span></span>${icon('chevR', 'width="18"')}</button>
    <button type="button" class="row" data-go="#/ustawienia"><span class="ic">${icon('text')}</span><span class="ct"><b>Dostępność i wygląd</b><span>Tryb prosty, wielkość tekstu, kontrast, czytanie na głos</span></span>${icon('chevR', 'width="18"')}</button>
    <button type="button" class="row" data-act="switchPersona"><span class="ic">${icon('swap')}</span><span class="ct"><b>Zmień osobę w prototypie</b><span>Teraz: ${me().full}</span></span>${icon('chevR', 'width="18"')}</button>
    <button type="button" class="row" data-go="#/oprojekcie"><span class="ic">${icon('info')}</span><span class="ct"><b>O tym prototypie</b><span>Założenia, technologia, co dalej</span></span>${icon('chevR', 'width="18"')}</button>
  </div>`
});

SCREENS.oprojekcie = () => ({
  title: 'O prototypie', back: '#/wiecej',
  html: `<h2 class="h">mObywatel „Załatwione”</h2>
  <p class="p">Koncepcja na mObywatel Challenge. Pokazuje, jak aplikacja mogłaby <b>sama proponować sprawy</b> w ważnych momentach życia, wypełniać wnioski danymi z rejestrów i prowadzić je do końca.</p>
  <div class="card"><b>Jak działa asystent?</b><p class="p small" style="margin-top:6px">W prototypie rozpoznaje intencje po polsku na podstawie reguł, więc działa bez kluczy API, bez logowania i bez kosztów. Docelowo asystentem byłby polski model językowy Bielik (lub PLLuM) działający na serwerach w Polsce, z dostępem tylko do danych, na które się zgodzisz. Zawsze prosi o potwierdzenie przed wysłaniem.</p></div>
  <div class="card"><b>Skąd dane we wnioskach?</b><p class="p small" style="margin-top:6px">Z rejestrów, które państwo już prowadzi: PESEL, Rejestr Dowodów Osobistych, CEPiK, Rejestr Stanu Cywilnego, UFG. To zasada „tylko raz”: urząd nie pyta o to, co już wie. Przy każdym polu widać źródło.</p></div>
  <div class="card"><b>Dostępność</b><p class="p small" style="margin-top:6px">Tryb prosty, tekst do 150%, wysoki kontrast, czytanie na głos, sterowanie głosem, etykiety dla czytników ekranu i widoczny fokus klawiatury.</p></div>
  <p class="fine">To nie jest oficjalna aplikacja mObywatel. Wszystkie dane są fikcyjne, nic nie jest wysyłane.</p>`
});

/* ---------- Prywatność ---------- */
function accessLog() {
  const base = [
    { id: 'bank', when: 'Dziś, 8:12', who: 'Twój bank', why: 'Potwierdzenie tożsamości przy logowaniu', what: 'Imię, nazwisko, PESEL', basis: 'Twoja zgoda (logowanie przez mObywatel)', tone: 'ok', ic: 'card' },
    { id: 'policja', when: '18.11, 14:02', who: 'Policja · Poznań, ul. Grunwaldzka', why: 'Kontrola drogowa', what: 'Prawo jazdy, OC pojazdu PO 4821N', basis: 'Ustawa Prawo o ruchu drogowym, art. 129', tone: 'info', ic: 'shield' },
    { id: 'apteka', when: '15.11, 17:30', who: 'Apteka „Pod Lipami”, Poznań', why: 'Wydanie leku na e-receptę', what: 'Kod e-recepty, PESEL', basis: 'Ustawa o systemie informacji w ochronie zdrowia', tone: 'info', ic: 'pill' },
    { id: 'rower', when: '12.11, 11:05', who: 'Wypożyczalnia rowerów „Kółko”', why: 'Sprawdzenie wieku', what: 'Tylko: pełnoletność TAK. Bez imienia i PESEL.', basis: 'Twoja zgoda (kod QR)', tone: 'ok', ic: 'check' },
    { id: 'pozyczka', when: '09.11, 03:14', who: 'SzybkiGrosz sp. z o.o. (firma pożyczkowa)', why: 'Próba weryfikacji PESEL przy wniosku o pożyczkę', what: 'PESEL, imię i nazwisko', basis: 'Brak Twojej zgody w aplikacji', tone: 'red', ic: 'alert', suspicious: true },
    { id: 'us', when: '03.11, 09:40', who: 'Urząd Skarbowy Poznań-Grunwald', why: 'Weryfikacja ulgi w PIT', what: 'Zeznanie PIT-37 za 2025', basis: 'Ordynacja podatkowa', tone: 'info', ic: 'file' }
  ];
  return [...S.extraLog, ...base];
}
SCREENS.prywatnosc = () => {
  const log = accessLog();
  const sus = log.find(l => l.suspicious);
  return {
    title: 'Prywatność i moje dane', back: '#/wiecej', tab: 'wiecej',
    html: isAnna() ? `<h2 class="h">Kto sprawdzał Twoje dane?</h2>
    <p class="p">W ostatnich 30 dniach: <b>${log.length} sprawdzeń</b>. Każde jest zapisane: kto, kiedy, po co i na jakiej podstawie.</p>
    ${!S.reported ? `<div class="card" style="border:2px solid var(--red)">
      <div style="display:flex;gap:12px"><span class="ic red">${icon('alert')}</span><div class="ct"><b>Czy to byłaś Ty?</b><span>${sus.when} · ${esc(sus.who)} sprawdzała Twój PESEL przy wniosku o pożyczkę.</span></div></div>
      <div class="btn-row two"><button type="button" class="btn btn-sm" data-act="notMe">To nie ja</button><button type="button" class="btn btn-ghost btn-sm" data-act="wasMe">Tak, to ja</button></div>
    </div>` : S.reported === 'recognized' ? banner('Oznaczyłaś to sprawdzenie jako swoje.', 'ok', 'check')
      : banner('Podejrzane sprawdzenie zostało zgłoszone w symulacji.', 'ok', 'check')}
    <div class="list">${log.map(l => `<button type="button" class="row" data-act="logDetail" data-arg="${l.id}"><span class="ic ${l.tone}">${icon(l.ic)}</span><span class="ct"><b>${esc(l.who)}</b><span>${esc(l.why)} · ${esc(l.when)}</span></span>${icon('chevR', 'width="18"')}</button>`).join('')}</div>
    <h3 class="h3">Aktywne udostępnienia</h3>
    ${S.shares.length ? `<div class="list">${S.shares.map(s => `<div class="row"><span class="ic ok">${icon('qr')}</span><span class="ct"><b>${esc(s.who)}</b><span>${esc(s.what)} · ${esc(s.until)}</span></span><button type="button" class="btn btn-ghost btn-sm" data-act="revoke" data-arg="${s.id}">Cofnij</button></div>`).join('')}</div>` : '<p class="p muted small">Nikt nie ma teraz stałego dostępu do Twoich danych.</p>'}
    <h3 class="h3">Ochrona</h3>
    <div class="list">
      <div class="perm"><span class="ct"><b>Zastrzeżenie numeru PESEL</b><span>Nikt nie weźmie kredytu ani nie podpisze umowy na Twoje dane. Odblokujesz w sekundę, gdy zechcesz.</span></span><button type="button" class="switch" role="switch" aria-label="Zastrzeżenie PESEL" aria-checked="${S.peselBlocked}" data-act="togglePesel"></button></div>
      <div class="perm"><span class="ct"><b>Powiadamiaj o każdym sprawdzeniu</b><span>Dostaniesz powiadomienie, gdy ktoś pobierze Twoje dane.</span></span><button type="button" class="switch" role="switch" aria-label="Powiadomienia o sprawdzeniach" aria-checked="${S.notifyEvery}" data-act="toggleNotify"></button></div>
    </div>
    <div class="btn-row"><button type="button" class="btn btn-ghost btn-block" data-act="toastInfo" data-arg="Raport RODO (art. 15) zapisalibyśmy jako PDF. W prototypie niczego nie pobieramy.">${icon('download')}Pobierz pełny raport (RODO)</button></div>`
    : `<h2 class="h">Kto widział Pani dane?</h2>
    <div class="list">
      <div class="row"><span class="ic info">${icon('pill')}</span><span class="ct"><b>Apteka „Zdrowie”, Gniezno</b><span>Wydanie leków · 14.11</span></span></div>
      <div class="row"><span class="ic ok">${icon('users')}</span><span class="ct"><b>Ania (córka)</b><span>Obejrzała przypomnienia · 19.11</span></span></div>
    </div>`
  };
};

/* ---------- Rodzina / pomoc bliskiej osoby ---------- */
SCREENS.rodzina = () => {
  const h = S.helper;
  if (!isAnna()) {
    return {
      title: 'Pomoc od Ani', back: '#/start', tab: 'wiecej',
      html: `<div class="helper-card"><span class="avatar av-anna" aria-hidden="true">AN</span><div class="ct"><b>Ania (córka) pomaga Pani</b><span>Do 31.12.2027. Może Pani to zmienić w każdej chwili.</span></div></div>
      <h3 class="h3">Ania może</h3>
      <ul class="summary-list">
        ${h.reminders ? `<li>${icon('check')}<span>Widzieć Pani przypomnienia i terminy</span></li>` : ''}
        ${h.letters ? `<li>${icon('check')}<span>Czytać Pani pisma z urzędów</span></li>` : ''}
        ${h.prepare ? `<li>${icon('check')}<span>Przygotować wniosek. <b>Wysyła go Pani</b>, jednym przyciskiem.</span></li>` : ''}
        <li style="background:var(--red-soft)">${icon('x', 'style="color:var(--red-d)"')}<span><b>Nie może niczego podpisać za Panią</b></span></li>
      </ul>
      <h3 class="h3">Co Ania ostatnio zrobiła</h3>
      <div class="list"><div class="row"><span class="ic">${icon('eye')}</span><span class="ct"><b>Obejrzała przypomnienia</b><span>19.11, 18:40</span></span></div>
      ${S.halinaInbox.map(x => `<div class="row"><span class="ic info">${icon('file')}</span><span class="ct"><b>Przygotowała: ${esc(x.title)}</b><span>20.11 · ${x.done ? 'wysłane przez Panią' : 'czeka na Panią'}</span></span></div>`).join('')}</div>
      <div class="btn-row"><button type="button" class="btn btn-ghost btn-block" data-act="toastInfo" data-arg="Pomoc Ani zostałaby wyłączona od razu. W prototypie zostawiamy ją włączoną.">Wyłącz pomoc Ani</button></div>`
    };
  }
  const sent = S.halinaInbox.find(x => x.id === 'dowod-mama');
  const perm = (k, t, d, locked) => `<div class="perm"><span class="ct"><b>${t}</b><span>${d}</span></span><button type="button" class="switch" role="switch" aria-label="${esc(t)}" aria-checked="${h[k]}" ${locked ? 'aria-disabled="true"' : ''} data-act="${locked ? 'signLocked' : 'togglePerm'}" data-arg="${k}"></button></div>`;
  return {
    title: 'Rodzina i pomoc', back: '#/wiecej', tab: 'wiecej',
    html: `<h2 class="h">Pomagasz mamie</h2>
    <div class="helper-card"><span class="avatar av-halina" aria-hidden="true">HN</span><div class="ct"><b>Halina Nowak, 71 l.</b><span>Mama · Gniezno · zgoda ważna do 31.12.2027</span></div></div>
    ${banner('Mama sama zdecydowała, w czym możesz pomagać. <b>Widzi wszystko, co robisz</b> i zawsze ostatnia potwierdza.', 'info', 'shield')}
    <h3 class="h3">Na co pozwoliła mama</h3>
    <div class="list">
      ${perm('reminders', 'Widzę jej terminy', 'Np. ważność dowodu, wizyty, leki')}
      ${perm('letters', 'Czytam jej pisma', 'Mogę je wyjaśnić przez telefon')}
      ${perm('prepare', 'Przygotowuję wnioski', 'Mama dostaje je do akceptacji')}
      ${perm('sign', 'Podpisuję w jej imieniu', 'Tylko z pełnomocnictwem notarialnym', true)}
    </div>
    <h3 class="h3">Terminy mamy</h3>
    ${sent ? cardBtn({ icon: 'check', tone: 'ok', title: 'Wniosek o nowy dowód mamy', sub: sent.done ? 'Mama wysłała wniosek. Odbiór: Urząd Miasta Gniezna.' : 'Wysłany do mamy. Czeka, aż go zatwierdzi.', go: '#/rodzina' })
      : cardBtn({ icon: 'id', tone: 'warn', title: 'Dowód mamy traci ważność 15.01.2027', sub: 'Przygotuj wniosek. Mama zatwierdzi go jednym przyciskiem.', due: 'za 56 dni', dueTone: 'due-warn', act: 'prepareForMom' })}
    ${cardBtn({ icon: 'pill', title: '2 e-recepty do odbioru', sub: 'Apteka „Zdrowie”, Gniezno', go: '#/rodzina' })}
    ${sent && !sent.done ? `<div class="btn-row"><button type="button" class="btn btn-navy btn-block" data-act="becomeHalina">${icon('swap')}Zobacz, co widzi mama</button></div>` : ''}`
  };
};

SCREENS.prosba = (id) => {
  const x = S.halinaInbox.find(i => i.id === id);
  if (isAnna()) return SCREENS.rodzina();
  if (!x || x.done) return simpleHome();
  const p = PEOPLE.halina;
  const text = 'Ania przygotowała wniosek o nowy dowód osobisty. Pani obecny dowód jest ważny do 15 stycznia 2027 roku. Zdjęcie zrobiła Ania telefonem 19 listopada i aplikacja sprawdziła, że spełnia wymagania. Odbiór w Urzędzie Miasta w Gnieźnie, 9 grudnia o 10:00. Dowód jest bezpłatny.';
  return {
    title: 'Wniosek od Ani', back: '#/start',
    html: `<div class="helper-card"><span class="avatar av-anna" aria-hidden="true">AN</span><div class="ct"><b>Ania przygotowała</b><span>Wniosek o nowy dowód osobisty</span></div></div>
    ${speakBtn(text)}
    <ul class="summary-list" style="margin-top:12px">
      <li>${icon('check')}<span>Dla: <b>${p.full}</b><small>dane z rejestru PESEL</small></span></li>
      <li>${icon('check')}<span>Zdjęcie zrobione przez Anię 19.11<small>aplikacja sprawdziła, że spełnia wymagania</small></span></li>
      <li>${icon('check')}<span>Odbiór: <b>Urząd Miasta Gniezna</b><small>środa 9 grudnia, godz. 10:00</small></span></li>
      <li>${icon('check')}<span>Koszt: <b>0 zł</b><small>dowód jest bezpłatny</small></span></li>
    </ul>
    <div class="btn-row">
      <button type="button" class="btn btn-ok btn-block" data-act="halinaApprove" data-arg="${x.id}">${icon('check')}Tak, wyślij wniosek</button>
      <button type="button" class="btn btn-ghost btn-block" data-act="callAnia">${icon('phone')}Mam pytanie: zadzwoń do Ani</button>
      <button type="button" class="btn btn-ghost btn-block" data-act="halinaReject" data-arg="${x.id}">Nie teraz</button>
    </div>`,
    say: text
  };
};

SCREENS.leki = () => ({
  title: 'Leki do odbioru', back: '#/start',
  html: `<h2 class="h">Leki do odbioru</h2>
  ${speakBtn('Ma Pani dwie recepty. Metformina i Bisoprolol. Kod do apteki: cztery, osiem, dwa, jeden.')}
  <div class="card" style="text-align:center;margin-top:12px"><p class="muted" style="margin:0">Kod dla farmaceuty</p><p style="font-size:2.6em;font-weight:800;letter-spacing:.15em;margin:6px 0;color:var(--navy)">4821</p><p class="muted small" style="margin:0">Podaj go razem z numerem PESEL</p></div>
  <div class="list">
    <div class="row"><span class="ic info">${icon('pill')}</span><span class="ct"><b>Metformina 500 mg</b><span>2 razy dziennie · ważna do 14.12</span></span></div>
    <div class="row"><span class="ic info">${icon('pill')}</span><span class="ct"><b>Bisoprolol 5 mg</b><span>Rano · ważna do 14.12</span></span></div>
  </div>`
});

/* ---------- Ustawienia dostępności ---------- */
SCREENS.ustawienia = () => {
  const st = set();
  return {
    title: 'Dostępność i wygląd', back: st.simple ? '#/start' : '#/wiecej', tab: 'wiecej',
    html: `<h2 class="h">Jak ma wyglądać aplikacja?</h2>
    <div class="list">
      <div class="perm"><span class="ct"><b>Tryb prosty</b><span>Duże przyciski, mniej opcji, krótkie zdania</span></span><button type="button" class="switch" role="switch" aria-label="Tryb prosty" aria-checked="${st.simple}" data-act="setOpt" data-arg="simple"></button></div>
      <div class="perm"><span class="ct"><b>Wysoki kontrast</b><span>Czarny tekst, wyraźne ramki</span></span><button type="button" class="switch" role="switch" aria-label="Wysoki kontrast" aria-checked="${st.hc}" data-act="setOpt" data-arg="hc"></button></div>
      <div class="perm"><span class="ct"><b>Czytaj ekrany na głos</b><span>Po otwarciu ekranu usłyszysz najważniejsze</span></span><button type="button" class="switch" role="switch" aria-label="Czytaj ekrany na głos" aria-checked="${st.autoRead}" data-act="setOpt" data-arg="autoRead"></button></div>
    </div>
    <h3 class="h3">Wielkość tekstu</h3>
    <div class="seg3" role="group" aria-label="Wielkość tekstu">
      ${[[1, 'A'], [1.25, 'A+'], [1.5, 'A++']].map(([v, l]) => `<button type="button" aria-pressed="${st.fs === v}" data-act="setFs" data-arg="${v}" style="font-size:${v}em">${l}</button>`).join('')}
    </div>
    <p class="p small muted" style="margin-top:14px">Aplikacja działa też z czytnikiem ekranu (VoiceOver, TalkBack) i z klawiatury.</p>
    ${speakBtn('Tu zmienisz wygląd aplikacji: tryb prosty, wielkość liter, kontrast i czytanie na głos.')}`
  };
};

/* =========================================================
   Wnioski (kreatory) – jedna sytuacja życiowa = jeden wniosek
   ========================================================= */
let flow = null;
const choice = (key, val, title, desc, d) => `<button type="button" class="choice" role="radio" aria-checked="${d[key] === val}" data-act="pick" data-arg="${key}|${val}"><span class="radio"></span><span class="ct"><b>${title}</b>${desc ? `<span>${desc}</span>` : ''}</span></button>`;
const checkItem = (path, title, desc, d, locked) => {
  const v = path.split('.').reduce((o, k) => o[k], d);
  return `<button type="button" class="check" role="checkbox" aria-checked="${!!v}" ${locked ? 'aria-disabled="true"' : ''} data-act="${locked ? 'lockedInfo' : 'tick'}" data-arg="${path}"><span class="box">${icon('check')}</span><span class="ct"><b>${title}</b>${desc ? `<span>${desc}</span>` : ''}</span></button>`;
};
const field = (label, value, source) => `<div class="field"><span class="lbl">${label}</span><div class="val">${value}</div>${source ? src(source) : ''}</div>`;

const FLOWS = {
  /* ---------- Narodziny dziecka ---------- */
  baby: {
    title: 'Narodziny dziecka', icon: 'baby',
    savings: 'Zamiast 6 wniosków w 4 instytucjach: jeden wniosek i jeden podpis',
    init: () => ({ name: 'Zofia', name2: '', surname: 'Nowak', partner: 'idle', b: { akt: true, pesel: true, meld: true, nfz: true, s800: true, becik: false }, acct: 'zus', iban: '' }),
    steps: [
      {
        t: 'Jak będzie miała na imię?',
        html: d => `${banner('Szpital Miejski w Poznaniu zgłosił narodziny: <b>17.11.2026, 6:42, dziewczynka, 3 250 g</b>. Gratulujemy!', 'ok', 'heart')}
          <div class="field"><label for="f-name">Pierwsze imię</label><input id="f-name" type="text" value="${esc(d.name)}" data-bind="name" autocomplete="off"></div>
          <div class="field"><label for="f-name2">Drugie imię (nieobowiązkowe)</label><input id="f-name2" type="text" value="${esc(d.name2)}" data-bind="name2" autocomplete="off"></div>
          <h3 class="h3">Nazwisko</h3>
          <div role="radiogroup" aria-label="Nazwisko dziecka">
          ${choice('surname', 'Nowak', 'Nowak', 'jak mama', d)}${choice('surname', 'Kowalska', 'Kowalska', 'jak tata', d)}${choice('surname', 'Nowak-Kowalska', 'Nowak-Kowalska', 'nazwisko obojga rodziców', d)}
          </div>
          <p class="small muted">Na zgłoszenie urodzenia masz 21 dni. Zostało 18.</p>`,
        ok: d => d.name.trim().length > 1
      },
      {
        t: 'Drugi rodzic też potwierdza',
        html: d => `<div class="helper-card"><span class="avatar av-marek" aria-hidden="true">MK</span><div class="ct"><b>Marek Kowalski</b><span>tata · dane z rejestru PESEL</span></div></div>
          <p class="p">Imię i nazwisko dziecka muszą zaakceptować oboje rodzice. Wyślemy Markowi prośbę do jego aplikacji: <b>${esc(d.name)}${d.name2 ? ' ' + esc(d.name2) : ''} ${esc(d.surname)}</b>.</p>
          ${d.partner === 'idle' ? `<button type="button" class="btn btn-navy btn-block" data-act="askPartner">${icon('send')}Wyślij prośbę do Marka</button>` : ''}
          ${d.partner === 'wait' ? banner('<span class="typing" aria-hidden="true"><i></i><i></i><i></i></span> Czekamy, aż Marek potwierdzi w swojej aplikacji…', 'info', 'clock') : ''}
          ${d.partner === 'ok' ? banner('<b>Marek potwierdził</b> imię i nazwisko o 9:42.', 'ok', 'check') : ''}
          <p class="small muted">Gdy drugi rodzic nie ma aplikacji, dostanie SMS z linkiem albo potwierdzi w urzędzie.</p>`,
        ok: d => d.partner === 'ok'
      },
      {
        t: 'Co załatwimy przy okazji?',
        html: d => `<p class="p">Sprawdziliśmy, co Ci przysługuje. Odznacz, jeśli czegoś nie chcesz.</p>
          ${checkItem('b.akt', 'Akt urodzenia', 'Urząd Stanu Cywilnego · obowiązkowe', d, true)}
          ${checkItem('b.pesel', 'Numer PESEL dziecka', 'Nadawany automatycznie z aktem', d, true)}
          ${checkItem('b.meld', 'Zameldowanie u mamy', esc(curAddress()), d)}
          ${checkItem('b.nfz', 'Ubezpieczenie zdrowotne (NFZ)', 'Zgłosimy dziecko przez Twojego pracodawcę', d)}
          ${checkItem('b.s800', 'Świadczenie 800+', '800 zł miesięcznie od listopada, bo wniosek składasz w ciągu 3 miesięcy od narodzin', d)}
          <div class="check" aria-disabled="true" style="cursor:default"><span class="box" style="border-style:dashed"></span><span class="ct"><b>Becikowe (1 000 zł)</b><span>Nie przysługuje: dochód w Twojej rodzinie przekracza 1 922 zł na osobę. <button type="button" class="linkbtn" data-act="toastInfo" data-arg="Dochód liczymy z PIT za 2025 r. (dane z Krajowej Administracji Skarbowej, za Twoją zgodą). Jeśli się zmienił, możesz złożyć wniosek ręcznie.">Skąd to wiemy?</button></span></span></div>`,
        ok: () => true
      },
      {
        t: 'Na jakie konto 800+?',
        html: d => `<div role="radiogroup" aria-label="Konto do wypłat">
          ${choice('acct', 'zus', 'Konto, na które ZUS wypłaca Ci zasiłek', 'PL 61 1090 •••• •••• •••• •••• 7788', d)}
          ${choice('acct', 'other', 'Inne konto', 'Wpiszesz numer', d)}</div>
          ${d.acct === 'other' ? `<div class="field"><label for="f-iban">Numer konta</label><input id="f-iban" type="text" inputmode="numeric" placeholder="PL __ ____ ____ ____ ____ ____ ____" value="${esc(d.iban)}" data-bind="iban" autocomplete="off"></div>` : ''}
          ${src('ZUS – konto do wypłaty zasiłku macierzyńskiego')}`,
        ok: d => d.acct === 'zus' || d.iban.replace(/\D/g, '').length >= 26
      }
    ],
    summary: d => [
      { to: 'Urząd Stanu Cywilnego w Poznaniu', what: `Zgłoszenie urodzenia: ${d.name}${d.name2 ? ' ' + d.name2 : ''} ${d.surname}`, icon: 'file' },
      d.b.meld && { to: 'Urząd Miasta Poznania', what: `Zameldowanie dziecka: ${curAddress()}`, icon: 'home' },
      d.b.nfz && { to: 'ZUS / NFZ', what: 'Zgłoszenie dziecka do ubezpieczenia zdrowotnego', icon: 'heart' },
      d.b.s800 && { to: 'ZUS', what: `Wniosek o 800+ · wypłata na konto ${d.acct === 'zus' ? '…7788' : '…' + d.iban.slice(-4)}`, icon: 'wallet' }
    ].filter(Boolean),
    done: d => {
      S.babyDone = true;
      S.child = {
        full: [d.name.trim(), d.name2.trim(), d.surname].filter(Boolean).join(' '),
        insurance: d.b.nfz, benefit: d.b.s800, address: d.b.meld ? curAddress() : null
      };
      const updates = [
        [3500, 'Akt urodzenia sporządzony', 'Akt urodzenia jest gotowy. Odpis jest w Dokumentach.'],
        [7000, 'PESEL nadany', 'Dziecko ma już numer PESEL.'],
        d.b.meld && [9500, 'Zameldowano dziecko', 'Zameldowanie dziecka jest gotowe.'],
        d.b.nfz && [11000, 'Dziecko zgłoszone do ubezpieczenia', 'Zgłoszenie do ubezpieczenia zdrowotnego jest gotowe.'],
        d.b.s800 && [12500, '800+ przyznane', 'Świadczenie 800+ jest przyznane.']
      ].filter(Boolean);
      const c = addCase('anna', { id: 'baby', icon: 'baby', title: `Narodziny: ${S.child.full}`, who: 'Urząd Stanu Cywilnego i instytucje wybrane we wniosku', steps: ['Wniosek złożony', ...updates.map(([, step]) => step)], status: 1, contact: 'USC Poznań, ul. Libelta 16/20', no: 'USC.5311.2026.1187' });
      progress('anna', c, updates.map(([ms, , msg]) => [ms, msg]));
      return c;
    },
    doneText: d => ({ h: `Gotowe! Witaj, ${esc(d.name)}!`, p: 'Wybrane sprawy zostały przekazane. Powiadomimy Cię o każdym kroku.', save: 'Jeden podpis i wspólny status wybranych spraw' })
  },

  /* ---------- Przeprowadzka ---------- */
  move: {
    title: 'Przeprowadzka', icon: 'truck',
    savings: 'Zamiast 4 osobnych spraw i wizyty w urzędzie: 5 kroków w telefonie',
    init: () => ({ q: '', addr: '', kind: 'staly', from: '2026-11-20', until: '', owner: 'rent', ownerName: 'Jan Wiśniewski', u: { cepik: true, us: true, poz: false, wybory: true } }),
    steps: [
      {
        t: 'Dokąd się przeprowadzasz?',
        html: d => `<div class="field"><label for="f-q">Nowy adres</label><input id="f-q" type="text" placeholder="Zacznij pisać, np. Ogrodowa" value="${esc(d.q)}" data-bind="q" data-live="addr" autocomplete="off" aria-describedby="addrHint"></div>
          <p class="small muted" id="addrHint">Podpowiadamy adresy z państwowego rejestru TERYT, więc nie pomylisz kodu pocztowego.</p>
          <div id="addrList" class="list" role="listbox" aria-label="Podpowiedzi adresów">${addrOptions(d)}</div>
          ${d.addr ? `<div id="selectedAddress">${banner(`Wybrany adres: <b>${esc(d.addr)}</b>`, 'ok', 'pin')}</div>` : ''}`,
        ok: d => !!d.addr
      },
      {
        t: 'Na stałe czy na jakiś czas?',
        html: d => `<div role="radiogroup" aria-label="Rodzaj pobytu">
          ${choice('kind', 'staly', 'Na stałe', 'Tu będziesz mieszkać na co dzień. Stary meldunek usuniemy automatycznie.', d)}
          ${choice('kind', 'czasowy', 'Na jakiś czas', 'Np. na studia albo kontrakt. Stary adres zostaje.', d)}</div>
          <div class="field"><label for="f-from">Od kiedy?</label><input id="f-from" type="date" value="${d.from}" data-bind="from"></div>
          ${d.kind === 'czasowy' ? `<div class="field"><label for="f-until">Do kiedy?</label><input id="f-until" type="date" value="${d.until}" data-bind="until" data-live="1"></div>` : ''}`,
        ok: d => !!d.from && (d.kind === 'staly' || d.until >= d.from)
      },
      {
        t: 'Kto jest właścicielem mieszkania?',
        html: d => `${banner('Dziś właściciel podpisuje papierowy formularz. <b>Tutaj dostaje prośbę i potwierdza jednym kliknięciem.</b>', 'info', 'users')}
          <div role="radiogroup" aria-label="Tytuł do lokalu">
          ${choice('owner', 'rent', 'Wynajmuję', 'Właściciel potwierdzi w swojej aplikacji albo przez SMS', d)}
          ${choice('owner', 'own', 'Jestem właścicielką', 'Sprawdzimy to w elektronicznej księdze wieczystej', d)}
          ${choice('owner', 'coop', 'Spółdzielnia lub mieszkanie komunalne', 'Potwierdzi zarządca budynku', d)}</div>
          ${d.owner === 'rent' ? `<div class="field"><label for="f-own">Imię i nazwisko właściciela</label><input id="f-own" type="text" value="${esc(d.ownerName)}" data-bind="ownerName" data-live="1" autocomplete="off"></div>` : ''}`,
        ok: d => d.owner !== 'rent' || d.ownerName.trim().length > 3
      },
      {
        t: 'Gdzie jeszcze zmienić adres?',
        html: d => `<p class="p">Jedna zmiana adresu, wszędzie gdzie trzeba. Wybierz:</p>
          ${checkItem('u.cepik', 'Dowód rejestracyjny Skody (PO 4821N)', 'Obowiązkowe w 30 dni, inaczej grozi kara. Dowód rejestracyjny wymienimy pocztą.', d)}
          ${checkItem('u.us', 'Urząd skarbowy', 'Nowy urząd przejmie Twoje sprawy podatkowe', d)}
          ${checkItem('u.poz', 'Przychodnia (lekarz rodzinny)', 'Najbliżej nowego adresu: Przychodnia „Ogrody”, 350 m', d)}
          ${checkItem('u.wybory', 'Spis wyborców', 'Dzieje się automatycznie z meldunkiem', d, true)}
          ${banner('W dowodzie osobistym nie ma adresu. <b>Nie musisz go wymieniać.</b>', 'ok', 'id')}`,
        ok: () => true
      }
    ],
    summary: d => [
      { to: d.addr.endsWith('Swarzędz') ? 'Urząd Miasta i Gminy Swarzędz' : 'Urząd Miasta Poznania', what: `Zameldowanie ${d.kind === 'staly' ? 'na pobyt stały' : 'na pobyt czasowy'}: ${d.addr}, od ${fmtDate(d.from)}${d.kind === 'czasowy' ? ` do ${fmtDate(d.until)}` : ''}`, icon: 'home' },
      d.owner === 'rent' && { to: d.ownerName, what: 'Prośba o potwierdzenie zamieszkania', icon: 'users' },
      d.owner === 'coop' && { to: 'Zarządca budynku', what: 'Prośba o potwierdzenie zamieszkania', icon: 'users' },
      d.u.cepik && { to: 'Wydział Komunikacji (CEPiK)', what: 'Zmiana adresu w dowodzie rejestracyjnym PO 4821N', icon: 'car' },
      d.u.us && { to: 'Urząd Skarbowy', what: 'Aktualizacja adresu zamieszkania', icon: 'file' },
      d.u.poz && { to: 'Przychodnia „Ogrody”', what: 'Deklaracja wyboru lekarza rodzinnego', icon: 'heart' }
    ].filter(Boolean),
    done: d => {
      if (d.kind === 'staly') { S.moved = true; S.newAddress = d.addr; }
      const updates = [
        d.owner === 'rent' && [4000, `${d.ownerName} potwierdził`, `${d.ownerName} potwierdził Twoje zameldowanie.`],
        d.owner === 'coop' && [4000, 'Zarządca potwierdził', 'Zarządca potwierdził Twoje zameldowanie.'],
        [8000, 'Zameldowano', 'Jesteś zameldowana pod nowym adresem.'],
        d.u.cepik && [9500, 'Zaktualizowano dane w CEPiK', 'Dane pojazdu zostały zaktualizowane.'],
        d.u.us && [11000, 'Urząd skarbowy otrzymał nowy adres', 'Urząd skarbowy otrzymał nowy adres.'],
        d.u.poz && [12500, 'Przychodnia otrzymała deklarację', 'Przychodnia otrzymała deklarację.']
      ].filter(Boolean);
      const c = addCase('anna', { id: 'move', icon: 'truck', title: `Przeprowadzka: ${d.addr.split(',')[0]}`, who: 'Urząd gminy i instytucje wybrane we wniosku', steps: ['Wniosek złożony', ...updates.map(([, step]) => step)], status: 1, contact: 'Wydział Spraw Obywatelskich', no: 'WSO.5340.2026.4410' });
      progress('anna', c, updates.map(([ms, , msg]) => [ms, msg]));
      return c;
    },
    doneText: d => ({ h: 'Przeprowadzka zgłoszona', p: `Nowy adres: ${esc(d.addr)}. ${d.kind === 'staly' ? 'Stary meldunek usuniemy sami.' : 'Stały meldunek pozostaje bez zmian.'}`, save: '4 sprawy → 1 · 0 wizyt w urzędzie · ok. 2–3 godziny mniej' })
  },

  /* ---------- Nowy dowód ---------- */
  id: {
    title: 'Nowy dowód osobisty', icon: 'id',
    savings: 'Nic nie wpisujesz. Przychodzisz raz, tylko po odbiór.',
    init: () => ({ reason: S.lostDone ? 'lost' : 'expiry', photo: 'camera', cam: 0, office: 'grun', slot: '' }),
    steps: [
      {
        t: 'Dlaczego potrzebujesz nowego dowodu?',
        html: d => `<div role="radiogroup" aria-label="Powód">
          ${choice('reason', 'expiry', 'Kończy się ważność', 'Twój dowód jest ważny do 31.12.2026', d)}
          ${choice('reason', 'lost', 'Zgubiłam go lub ktoś go ukradł', S.lostDone ? 'Unieważniony 20.11 o 9:41' : 'Najpierw go unieważnimy', d)}
          ${choice('reason', 'data', 'Zmieniły się moje dane', 'Np. nazwisko po ślubie', d)}
          ${choice('reason', 'broken', 'Jest zniszczony', 'Np. nieczytelne zdjęcie', d)}</div>`,
        ok: () => true
      },
      {
        t: 'Zdjęcie',
        html: d => `<div role="radiogroup" aria-label="Zdjęcie">
          ${choice('photo', 'camera', 'Zrób zdjęcie teraz telefonem', 'Aplikacja sprawdzi tło, światło i ułożenie głowy. Bez wizyty u fotografa.', d)}
          ${choice('photo', 'passport', 'Użyj zdjęcia z paszportu (07.2025)', 'Sprawdziliśmy: jest starsze niż 6 miesięcy, więc urząd go nie przyjmie.', d)}</div>
          ${d.photo === 'camera' ? camBox(d) : banner('Zdjęcie do dowodu może mieć <b>najwyżej 6 miesięcy</b>. Zrób nowe, zajmie to 20 sekund.', 'warn', 'alert')}`,
        ok: d => d.photo === 'camera' && d.cam >= 4
      },
      {
        t: 'Twoje dane',
        html: () => {
          const p = me();
          return `${banner('Nic nie wpisujesz. Dane pochodzą z rejestrów państwowych.', 'ok', 'shield')}
          ${field('Imię i nazwisko', p.full, 'rejestr PESEL')}
          ${field('Data i miejsce urodzenia', p.born, 'rejestr PESEL')}
          ${field('Nazwisko rodowe', p.maiden, 'akt urodzenia')}
          ${field('Imiona rodziców', p.parents, 'akt urodzenia')}
          ${field('Obywatelstwo', p.citizenship, 'rejestr PESEL')}
          <button type="button" class="linkbtn" data-act="toastInfo" data-arg="Wskazałabyś błędne pole, a wniosek o korektę trafiłby do urzędu stanu cywilnego.">Coś się nie zgadza? Zgłoś poprawkę</button>`;
        },
        ok: () => true
      },
      {
        t: 'Gdzie i kiedy odbierzesz?',
        html: d => `${banner('Przy odbiorze pobierzemy odciski palców. To wymóg UE, dlatego <b>raz trzeba przyjść osobiście</b>.', 'info', 'info')}
          <div role="radiogroup" aria-label="Urząd">
          ${choice('office', 'grun', 'Urząd Miasta, ul. Matejki 50', '1,2 km · najbliższy termin: jutro', d)}
          ${choice('office', 'centrum', 'Urząd Miasta, ul. Libelta 16/20', '3,4 km · najbliższy: 25.11', d)}
          ${choice('office', 'swarz', 'Urząd Gminy Swarzędz', '12 km · bez kolejki', d)}</div>
          <h3 class="h3">Termin odbioru</h3>
          <div class="slots" role="radiogroup" aria-label="Termin">
          ${['wt 1.12|9:00', 'wt 1.12|12:30', 'śr 2.12|8:15', 'czw 3.12|15:40', 'pt 4.12|10:00', 'pn 7.12|13:20'].map(s => { const [a, b] = s.split('|'); return `<button type="button" class="slot" role="radio" aria-checked="${d.slot === s}" data-act="pick" data-arg="slot|${s}">${a}<small>${b}</small></button>`; }).join('')}
          </div>
          <p class="small muted">Dowód będzie gotowy najpóźniej w 30 dni. Termin możesz zmienić w każdej chwili.</p>`,
        ok: d => !!d.slot
      }
    ],
    summary: d => [
      { to: 'Urząd Miasta Poznania', what: `Wniosek o dowód osobisty (${({ expiry: 'upływ ważności', lost: 'utrata', data: 'zmiana danych', broken: 'uszkodzenie' })[d.reason]})`, icon: 'id' },
      { to: 'Zdjęcie', what: 'Zrobione w aplikacji 20.11.2026, sprawdzone automatycznie', icon: 'camera' },
      { to: 'Odbiór', what: `${({ grun: 'ul. Matejki 50', centrum: 'ul. Libelta 16/20', swarz: 'UG Swarzędz' })[d.office]} · ${d.slot.replace('|', ', godz. ')}`, icon: 'cal' },
      { to: 'Opłata', what: '0 zł · dowód osobisty jest bezpłatny', icon: 'wallet' }
    ],
    done: d => {
      S.idDone = true;
      const c = addCase('anna', { id: 'id', icon: 'id', title: 'Nowy dowód osobisty', who: 'Urząd Miasta Poznania', steps: ['Wniosek złożony', 'Urzędnik sprawdził wniosek', 'Dowód w produkcji', `Odbiór: ${d.slot.replace('|', ', ')}`], status: 1, contact: 'Wydział Spraw Obywatelskich UM Poznania', no: 'DO.2026.11.88213' });
      progress('anna', c, [[5000, 'Urzędnik sprawdził Twój wniosek o dowód. Wszystko się zgadza.']]);
      return c;
    },
    doneText: d => ({ h: 'Wniosek o dowód złożony', p: `Odbiór: ${esc(d.slot.replace('|', ', godz. '))}. Dodaliśmy termin do Twojego kalendarza.`, save: 'Bez formularza i bez kolejki · 1 wizyta zamiast 2' })
  },

  /* ---------- Zgubione dokumenty ---------- */
  lost: {
    title: 'Zgubione dokumenty', icon: 'alert',
    savings: 'Unieważnienie dowodu i zastrzeżenie PESEL w 10 sekund, o każdej porze',
    init: () => ({ x: { id: true, pesel: true, dl: false } }),
    steps: [
      {
        t: 'Co zgubiłaś?',
        html: d => `${banner('Spokojnie. Zablokujemy dokumenty od razu, także w nocy i w weekend.', 'info', 'shield')}
          ${checkItem('x.id', 'Dowód osobisty', 'Unieważnimy go od razu. Nikt go nie użyje.', d)}
          ${checkItem('x.pesel', 'Zastrzeż numer PESEL', 'Nikt nie weźmie kredytu ani nie podpisze umowy na Twoje dane', d)}
          ${checkItem('x.dl', 'Prawo jazdy (plastikowe)', 'Zgłosimy utratę. W Polsce możesz jeździć z prawem jazdy w aplikacji.', d)}
          <div class="card"><div style="display:flex;gap:12px"><span class="ic warn">${icon('card')}</span><div class="ct"><b>Karty płatnicze zastrzega bank</b><span>Zadzwoń pod numer zastrzegania kart: <b>828 828 828</b> (całą dobę).</span></div></div></div>`,
        ok: d => d.x.id || d.x.pesel || d.x.dl
      }
    ],
    summary: d => [
      d.x.id && { to: 'Rejestr Dowodów Osobistych', what: `Unieważnienie dowodu ${PEOPLE.anna.idNo}`, icon: 'id' },
      d.x.pesel && { to: 'Rejestr Zastrzeżeń PESEL', what: 'Zastrzeżenie numeru PESEL', icon: 'lock' },
      d.x.dl && { to: 'Starosta / CEPiK', what: 'Zgłoszenie utraty prawa jazdy', icon: 'car' }
    ].filter(Boolean),
    done: d => {
      if (d.x.id) S.lostDone = true;
      if (d.x.pesel) S.peselBlocked = true;
      const c = addCase('anna', { id: 'lost', icon: 'lock', title: 'Zgłoszenie utraty dokumentów', who: 'Rejestr Dowodów Osobistych', steps: ['Zgłoszone 20.11, 9:41', 'Dokumenty zablokowane'], status: 2 });
      return c;
    },
    doneText: d => ({ h: 'Zablokowane', p: `${d.x.id ? 'Dowód jest unieważniony. ' : ''}${d.x.pesel ? 'PESEL jest zastrzeżony. ' : ''}Nikt nie wykorzysta Twoich danych.`, save: 'Bez wizyty w urzędzie, także w nocy', next: d.x.id ? { label: 'Złóż wniosek o nowy dowód', go: '#/wniosek/id' } : null })
  },

  /* ---------- Kupno samochodu ---------- */
  car: {
    title: 'Rejestracja samochodu', icon: 'car',
    savings: 'Zamiast kolejki w wydziale komunikacji: 4 kroki w telefonie',
    init: () => ({ plate: '', found: false, plates: 'keep', oc: 'keep', pay: 'blik' }),
    steps: [
      {
        t: 'Jakie auto kupiłaś?',
        html: d => `<div class="field"><label for="f-plate">Numer rejestracyjny (wpisz PZ 5R418)</label><input id="f-plate" type="text" placeholder="np. PZ 5R418" value="${esc(d.plate)}" data-bind="plate" data-live="1" autocomplete="off"></div>
          <button type="button" class="btn btn-ghost btn-block" data-act="carScan">${icon('camera')}Użyj przykładowej umowy kupna</button>
          <div id="carHistory" ${d.found ? '' : 'hidden'}><h3 class="h3">Historia pojazdu</h3><div class="card">${kv([['Pojazd', 'Skoda Fabia 1.0 TSI, 2019'], ['Przebieg', '84 312 km (03.2026)'], ['Przegląd', 'ważny do 11.03.2027'], ['OC', 'aktywne do 14.03.2027'], ['Kradzież / zastaw', 'brak']])}${src('CEPiK i Ubezpieczeniowy Fundusz Gwarancyjny')}</div></div>`,
        ok: d => d.found
      },
      {
        t: 'Tablice rejestracyjne',
        html: d => `<div role="radiogroup" aria-label="Tablice">
          ${choice('plates', 'keep', 'Zostawiam obecne tablice', 'Najszybciej. Nie musisz nic odbierać.', d)}
          ${choice('plates', 'new', 'Chcę nowe tablice z Poznania', 'Odbierzesz je w wydziale komunikacji', d)}</div>
          ${banner('Na rejestrację masz 30 dni od zakupu. Zostało 27.', 'warn', 'clock')}`,
        ok: () => true
      },
      {
        t: 'Ubezpieczenie OC',
        html: d => `${banner('OC poprzedniego właściciela <b>przechodzi na Ciebie</b> i jest ważne do 14.03.2027. Ubezpieczyciela trzeba zawiadomić w 14 dni. Zrobimy to za Ciebie.', 'info', 'shield')}
          <div role="radiogroup" aria-label="OC">
          ${choice('oc', 'keep', 'Zostaję przy tej polisie', 'Zawiadomimy ubezpieczyciela o zmianie właściciela', d)}
          ${choice('oc', 'cancel', 'Chcę ją wypowiedzieć', 'Wyślemy wypowiedzenie. Pamiętaj o nowej polisie od razu.', d)}</div>`,
        ok: () => true
      },
      {
        t: 'Opłata',
        html: d => `<div class="card">${kv([['Opłata urzędowa', d.plates === 'keep' ? '102,50 zł' : '180,50 zł'], ['Do zapłaty', `<b>${d.plates === 'keep' ? '102,50 zł' : '180,50 zł'}</b>`]])}</div>
          <div role="radiogroup" aria-label="Sposób płatności">
          ${choice('pay', 'blik', 'BLIK', '', d)}${choice('pay', 'card', 'Karta z Twojego portfela', '•••• 4417', d)}${choice('pay', 'transfer', 'Przelew bankowy', '', d)}</div>
          <p class="ai-note">Prototyp: płatność jest symulowana.</p>`,
        ok: () => true
      }
    ],
    summary: d => [
      { to: 'Wydział Komunikacji UM Poznania', what: `Rejestracja Skody Fabia (${d.plates === 'keep' ? 'obecne tablice PZ 5R418' : 'nowe tablice'})`, icon: 'car' },
      { to: 'Ubezpieczyciel OC', what: d.oc === 'keep' ? 'Zawiadomienie o zmianie właściciela' : 'Wypowiedzenie polisy', icon: 'shield' },
      { to: 'Płatność', what: `${d.plates === 'keep' ? '102,50' : '180,50'} zł · ${({ blik: 'BLIK', card: 'karta •••• 4417', transfer: 'przelew' })[d.pay]}`, icon: 'card' }
    ],
    done: d => {
      S.carDone = true;
      const c = addCase('anna', { id: 'car', icon: 'car', title: 'Rejestracja Skody Fabia', who: 'Wydział Komunikacji UM Poznania', steps: ['Wniosek i opłata', 'Pozwolenie czasowe w aplikacji', 'Dowód rejestracyjny w druku', 'Dowód rejestracyjny wysłany pocztą'], status: 2, contact: 'Wydział Komunikacji, ul. Wołowska 20', no: 'WK.5410.2026.20931' });
      progress('anna', c, [[6000, 'Dowód rejestracyjny Skody Fabia trafił do druku.']]);
      return c;
    },
    doneText: () => ({ h: 'Auto zarejestrowane', p: 'Możesz jeździć od dziś. Pozwolenie czasowe jest w Dokumentach, a dowód rejestracyjny przyjdzie pocztą.', save: '0 wizyt w wydziale komunikacji · ok. 2 godziny mniej' })
  }
};

function fmtDate(iso) { if (!iso) return ''; const [y, m, d] = iso.split('-'); return `${d}.${m}.${y}`; }
function addrOptions(d) {
  const q = norm(d.q).trim();
  const list = q.length < 2 ? ADDRESSES.slice(0, 3) : ADDRESSES.filter(a => norm(a).includes(q));
  if (!list.length) return `<div class="row"><span class="ct"><span>Nie znaleźliśmy takiego adresu w rejestrze TERYT. Sprawdź pisownię.</span></span></div>`;
  return list.map(a => `<button type="button" class="row" role="option" aria-selected="${d.addr === a}" data-act="pickAddr" data-arg="${esc(a)}"><span class="ic ${d.addr === a ? 'ok' : ''}">${icon(d.addr === a ? 'check' : 'pin')}</span><span class="ct"><b>${esc(a.split(',')[0])}</b><span>${esc(a.split(',')[1] || '')}</span></span></button>`).join('');
}
function camBox(d) {
  const checks = ['Twarz w ramce', 'Jasne, jednolite tło', 'Równe oświetlenie', 'Oczy otwarte, bez okularów'];
  return `<div class="card" style="text-align:center">
    <div style="width:150px;height:190px;margin:0 auto;border-radius:90px/110px;border:3px dashed ${d.cam >= 4 ? 'var(--ok)' : 'var(--navy)'};display:grid;place-items:center;background:var(--surface-2)">${icon('user', 'width="80" height="80" style="color:#9aa6b6"')}</div>
    <ul class="summary-list" style="margin-top:12px;text-align:left">${checks.map((c, i) => `<li style="${i < d.cam ? '' : 'opacity:.45'}">${icon(i < d.cam ? 'check' : 'clock')}<span>${c}</span></li>`).join('')}</ul>
    ${d.cam === 0 ? `<button type="button" class="btn btn-navy btn-block" data-act="takePhoto" style="margin-top:12px">${icon('camera')}Zasymuluj zdjęcie</button>` : d.cam >= 4 ? `<p class="small" style="color:var(--ok);font-weight:700;margin:10px 0 0">Zdjęcie spełnia wymagania</p>` : `<p class="small muted" style="margin:10px 0 0">Sprawdzamy zdjęcie…</p>`}
  </div>`;
}

SCREENS.wniosek = (id) => {
  if (!Object.hasOwn(FLOWS, id)) return SCREENS.sprawy();
  const def = FLOWS[id];
  if (!flow || flow.id !== id) flow = { id, step: 0, d: def.init() };
  if (flow.doneCase) return doneView(def);
  const i = flow.step;
  const isSummary = i >= def.steps.length;
  const skipped = id === 'baby' && !flow.d.b.s800 ? 1 : 0;
  const n = def.steps.length + 1 - skipped;
  const visibleStep = isSummary ? n : i + 1;
  const step = def.steps[i];
  const body = isSummary ? summaryView(def) : step.html(flow.d);
  return {
    title: def.title, back: '#/sprawy', tab: 'sprawy',
    html: `<div class="progress" aria-hidden="true">${Array.from({ length: n }, (_, k) => `<i class="${k < visibleStep ? 'done' : ''}"></i>`).join('')}</div>
      <div class="stepno">Krok ${visibleStep} z ${n}</div>
      <h2 class="h">${isSummary ? 'Sprawdź i podpisz' : step.t}</h2>
      ${i === 0 ? `<div class="savings">${icon('clock')}<span>${def.savings}</span></div>` : ''}
      <div id="stepBody">${body}</div>
      <div class="flow-foot" id="flowFoot">${flowFoot(def)}</div>`,
    say: isSummary ? 'Sprawdź, co wyślemy, i podpisz.' : step.t
  };
};
function flowFoot(def) {
  const i = flow.step, isSummary = i >= def.steps.length;
  const ok = isSummary || def.steps[i].ok(flow.d);
  const skipAccount = flow.id === 'baby' && !flow.d.b.s800 && i === def.steps.length - 2;
  const prev = i > 0 ? `<button type="button" class="btn btn-ghost" data-act="flowPrev">${icon('chevL')}Wstecz</button>` : '';
  const next = isSummary
    ? `<button type="button" class="btn" data-act="flowSign">${icon('lock')}Podpisz i wyślij</button>`
    : `<button type="button" class="btn" data-act="flowNext" ${ok ? '' : 'disabled aria-disabled="true"'}>${skipAccount ? 'Do podsumowania' : 'Dalej'}${icon('chevR')}</button>`;
  return prev ? `<div class="btn-row two" style="margin:0">${prev}${next}</div>` : next;
}
function refreshFoot() { const f = $('#flowFoot'); if (f && flow) f.innerHTML = flowFoot(FLOWS[flow.id]); }
function rerenderStep() {
  const def = FLOWS[flow.id];
  const b = $('#stepBody');
  if (!b || flow.step >= def.steps.length) return;
  const active = document.activeElement;
  const stepCount = def.steps.length + (flow.id === 'baby' && !flow.d.b.s800 ? 0 : 1);
  const progress = $('.progress', $('#screen'));
  if (progress.children.length !== stepCount) {
    progress.innerHTML = Array.from({ length: stepCount }, (_, i) => `<i class="${i <= flow.step ? 'done' : ''}"></i>`).join('');
    $('.stepno', $('#screen')).textContent = `Krok ${flow.step + 1} z ${stepCount}`;
  }
  b.innerHTML = def.steps[flow.step].html(flow.d);
  refreshFoot();
  if (!active.isConnected && active.dataset.act) {
    const equivalent = [...b.querySelectorAll('[data-act]')].find(el =>
      el.dataset.act === active.dataset.act && el.dataset.arg === active.dataset.arg);
    (equivalent || $('#screen')).focus({ preventScroll: true });
  }
}
function summaryView(def) {
  const items = def.summary(flow.d);
  return `<p class="p">Wyślemy ${items.length > 1 ? `<b>${items.length} sprawy</b> do różnych instytucji, ale podpisujesz <b>raz</b>.` : 'jedną sprawę.'}</p>
    <ul class="summary-list">${items.map(it => `<li>${icon('check')}<span><b>${esc(it.to)}</b><small>${esc(it.what)}</small></span></li>`).join('')}</ul>
    <div style="margin-top:10px">${banner('Nic nie wyślemy bez Twojego podpisu. Możesz wrócić i zmienić każdy krok.', 'info', 'lock')}</div>`;
}
function doneView(def) {
  const t = def.doneText(flow.d);
  const c = flow.doneCase;
  return {
    title: def.title, back: '#/start', tab: 'sprawy',
    html: `<div class="done-hero"><div class="big-ok">${icon('check')}</div><h2>${t.h}</h2><p class="p">${t.p}</p></div>
      <div class="savings">${icon('clock')}<span>Oszczędzasz: ${t.save}</span></div>
      <div class="card"><b>Status sprawy</b><div class="divider"></div><div id="liveTrack">${tracker(c)}</div></div>
      <div class="btn-row">
        ${t.next ? `<button type="button" class="btn btn-block" data-go="${t.next.go}">${t.next.label}</button>` : ''}
        <button type="button" class="btn ${t.next ? 'btn-ghost' : ''} btn-block" data-go="#/start">Wróć na start</button>
        <button type="button" class="btn btn-ghost btn-block" data-go="#/sprawa/${c.id}">Śledź sprawę</button>
      </div>`,
    say: `${t.h}. ${t.p}`
  };
}

/* Sprawy: dodawanie i automatyczny postęp */
function addCase(who, c) {
  const list = S.cases[who];
  const i = list.findIndex(x => x.id === c.id);
  if (i >= 0) list.splice(i, 1);
  list.unshift(c);
  save();
  return c;
}
function progress(who, c, steps) {
  const now = Date.now();
  c.pending = steps.map(([ms, msg]) => ({ at: now + ms, msg }));
  save();
  scheduleProgress(who, c);
}

function scheduleProgress(who, c) {
  const next = c.pending?.[0];
  if (!next) return;
  setTimeout(() => {
    if (!S.cases[who].includes(c) || c.status >= c.steps.length) return;
    c.pending.shift();
    c.status++;
    S.notifs[who].unshift({ t: next.msg, when: 'przed chwilą', go: `#/sprawa/${c.id}` });
    S.unseen[who] = (S.unseen[who] || 0) + 1;
    save();
    scheduleProgress(who, c);
    if (S.persona !== who) return;
    toast(esc(next.msg), 'bell');
    const lt = $('#liveTrack');
    if (lt && flow?.doneCase === c) lt.innerHTML = tracker(c);
    else if (!sheetKind && ['start', 'sprawy', 'sprawa'].includes(route().name)) render();
  }, Math.max(0, next.at - Date.now()));
}

/* =========================================================
   Asystent (rozmowa tekstem lub głosem)
   ========================================================= */
const chips = arr => `<div class="chips">${arr.map(([l, a]) => a.startsWith('#') ? `<button type="button" class="chip" data-go="${a}">${l}</button>` : `<button type="button" class="chip" data-act="askAbout" data-arg="${esc(a)}">${l}</button>`).join('')}</div>`;
const actBtn = (l, goTo) => `<button type="button" class="btn btn-sm" data-go="${goTo}" style="margin-top:8px">${l}</button>`;

function intents() {
  const A = isAnna();
  const H = PEOPLE.halina;
  return [
    { re: /(dzien dobry|czesc|hej|witam|siema)/, a: () => ({ t: `Dzień dobry! W czym mogę pomóc? Możesz pisać albo mówić zwyczajnie, jak do urzędnika.` + chips(A ? [['Co mam do załatwienia?', 'co mam do załatwienia'], ['Przeprowadzam się', 'przeprowadzam się'], ['Kto sprawdzał moje dane?', 'kto sprawdzał moje dane']] : [['Moje leki', 'leki'], ['Mój dowód', 'dowód'], ['Zadzwoń do Ani', 'ania']]) }) },
    { re: /(dziekuj|dzieki)/, a: () => ({ t: 'Proszę bardzo! Gdyby coś jeszcze było potrzebne, jestem tutaj.' }) },
    { re: /(lek|recept|aptek)/, a: () => A ? ({ t: 'Nie masz teraz e-recept do odbioru. Twoja mama ma dwie. Chcesz zobaczyć jej terminy?' + chips([['Terminy mamy', '#/rodzina']]) }) : ({ t: 'Ma Pani <b>dwie recepty</b>: Metformina i Bisoprolol. Kod do apteki to <b>4821</b>.' + actBtn('Pokaż kod do apteki', '#/leki') }) },
    { re: /\b(ania|anie|ani|corka|corki|zadzwon)\b/, a: () => A ? ({ t: 'To Ty jesteś Anią 🙂 Możesz pomagać mamie w sprawach urzędowych.' + actBtn('Pomoc dla mamy', '#/rodzina') }) : ({ t: 'Zadzwonić do Ani? W pełnej aplikacji połączę od razu.' + `<button type="button" class="btn btn-sm" data-act="callAnia" style="margin-top:8px">${icon('phone')}Zadzwoń do Ani</button>` }) },
    { re: /(zgubil|ukradl|ukradzi|kradziez|stracil|portfel|zgubion)/, a: () => ({ t: 'Przykro mi. Zablokujmy to od razu: <b>unieważnię dowód i zastrzegę PESEL</b>, żeby nikt nie wziął kredytu na Twoje dane. Przed wysłaniem pokażę Ci wszystko do potwierdzenia.' + actBtn('Zablokuj dokumenty', '#/wniosek/lost') + '<p class="small muted" style="margin:8px 0 0">Kartę płatniczą zastrzeżesz pod numerem 828 828 828.</p>' }) },
    { re: /(przeprowadz|przenosz|meldun|zamelduj|zmien\w* adres|nowe mieszkanie|wyprowadz|zmiana adresu)/, a: () => A ? ({ t: 'Pomogę z przeprowadzką. W jednym wniosku: <b>zameldowanie</b>, zmiana adresu w <b>dowodzie rejestracyjnym</b> i w <b>urzędzie skarbowym</b>. Właściciel mieszkania potwierdzi w aplikacji. Dowodu osobistego nie trzeba wymieniać.' + actBtn('Zacznij · 5 kroków', '#/wniosek/move') }) : ({ t: 'Przeprowadzkę najlepiej załatwić razem z Anią. Mogę jej wysłać prośbę.' + `<button type="button" class="btn btn-sm" data-act="askAnia" style="margin-top:8px">Poproś Anię</button>` }) },
    { re: /(dzieck|urodz|corecz|synek|zosi|zosia|800|becikow|noworod)/, a: () => ({ t: S.babyDone ? 'Wniosek po narodzinach Zosi już wysłany. Akt urodzenia, PESEL i 800+ są w toku.' + actBtn('Zobacz status', '#/sprawa/baby') : 'Gratulacje! Szpital zgłosił narodziny 17.11. Mam gotowy <b>jeden wniosek zamiast sześciu</b>: akt urodzenia, PESEL, meldunek, NFZ i 800+. Becikowe nie przysługuje (próg dochodowy). Potrzebuję tylko imienia i Twojego podpisu.' + actBtn('Sprawdź i podpisz', '#/wniosek/baby') }) },
    { re: /(kupil\w* (auto|samoch)|rejestr|przerejestr|nowe auto|uzywan)/, a: () => ({ t: 'Zarejestrujmy auto bez kolejki. Sprawdzę jego historię w CEPiK, zawiadomię ubezpieczyciela i zapłacisz opłatę w aplikacji. Na rejestrację masz 30 dni od zakupu.' + actBtn('Zarejestruj auto', '#/wniosek/car') }) },
    { re: /(\boc\b|ubezpiecz|polis)/, a: () => ({ t: 'OC Twojej Skody Octavia (PO 4821N) <b>odnowi się samo 1.12.2026</b>. Nic nie musisz robić. Jeśli chcesz zmienić ubezpieczyciela, wypowiedz polisę przed tym dniem.' + `<div class="card">${kv([['Pojazd', 'PO 4821N'], ['Koniec okresu', '01.12.2026']])}${src('UFG')}</div>` + chips([['Przypomnij 3 dni wcześniej', 'przypomnij o oc'], ['Szczegóły auta', '#/dokument/pojazd']]) }) },
    { re: /(przypomnij o oc|przypomnij)/, a: () => ({ t: 'Gotowe. Przypomnę Ci 28 listopada rano. ✔' }) },
    { re: /(przeglad)/, a: () => ({ t: 'Przegląd techniczny Skody jest ważny <b>do 5 stycznia 2027</b>. Przypomnę Ci 30 i 7 dni wcześniej.' }) },
    { re: /(dowod|dowodu)/, a: () => A ? ({ t: S.idDone ? 'Wniosek o nowy dowód już złożyłaś. Status sprawdzisz w Sprawach.' + actBtn('Status wniosku', '#/sprawa/id') : `Twój dowód jest ważny <b>do 31.12.2026</b> (zostało 41 dni). Mam Twoje dane z rejestru. Wybierzesz tylko zdjęcie i termin odbioru.` + actBtn('Wymień dowód · 2 minuty', '#/wniosek/id') }) : ({ t: `Pani dowód jest ważny do <b>${H.idValid}</b>. ${S.halinaInbox.some(x => !x.done) ? 'Ania przygotowała już wniosek o nowy.' + actBtn('Zobacz wniosek od Ani', '#/prosba/dowod-mama') : 'Mogę poprosić Anię, żeby przygotowała wniosek.'}` }) },
    { re: /(pismo|pisma|urzad skarbow|skarbow|wezwan|ulg|podatk|pit)/, a: () => A ? ({ t: 'Urząd skarbowy chce zobaczyć <b>faktury za ocieplenie domu</b>, bo odliczyłaś 12 400 zł ulgi. To rutynowe sprawdzenie. Masz czas <b>do 26.11</b>. Znalazłem 3 pasujące faktury. Mogę przygotować odpowiedź, a Ty ją tylko zatwierdzisz.' + actBtn('Zobacz pismo po ludzku', '#/pismo/us') }) : ({ t: 'Ma Pani jedno nowe pismo z NFZ: <b>zaproszenie na bezpłatną mammografię</b>. Nie trzeba skierowania.' + actBtn('Przeczytaj pismo', '#/pismo/nfz') }) },
    { re: /(smiec|odpad|oplat|zaplac)/, a: () => ({ t: S.letters.odpady.paid ? 'Opłata za odpady jest już zapłacona.' : 'Opłata za odpady za IV kwartał to <b>147 zł</b>, termin do 30.11. Zapłacisz w aplikacji, numer konta uzupełnię.' + actBtn('Zapłać', '#/pismo/odpady') }) },
    { re: /(\bkto\b|moje dane|sprawdzal|sprawdza|prywatn|widzial|rodo)/, a: () => ({ t: `W ostatnich 30 dniach Twoje dane sprawdzono <b>${accessLog().length} razy</b>. Jedno sprawdzenie wygląda podejrzanie: firma pożyczkowa o 3:14 w nocy.` + actBtn('Zobacz, kto to był', '#/prywatnosc') }) },
    { re: /(punkt|karn|mandat)/, a: () => ({ t: 'Masz <b>3 punkty karne</b>. Wygasną 14.03.2027.' + `<div class="card">${kv([['Punkty', '3'], ['Wygasają', '14.03.2027']])}${src('CEPiK')}</div>` }) },
    { re: /(mam[aeiy]|mamie|pomoc bliskiej|rodzic|senior)/, a: () => ({ t: 'Pomagasz mamie w sprawach urzędowych. Jej dowód traci ważność 15.01.2027. Mogę przygotować wniosek, a mama zatwierdzi go jednym przyciskiem.' + actBtn('Pomoc dla mamy', '#/rodzina') }) },
    { re: /(termin|co mam|do zalatwienia|zaleg|pilne|przypomnien)/, a: () => A ? ({ t: 'Najbliższe terminy:<br>' + todosAnna().slice(0, 4).map(t => `• <b>${t.title}</b> · ${t.due}`).join('<br>') + chips([['Pismo z US', '#/pismo/us'], ['Dowód', '#/wniosek/id']]) }) : ({ t: 'Najważniejsze: <b>2 recepty do odbioru</b> i nowe pismo z NFZ. Dowód jest ważny do 15.01.2027.' }) },
    { re: /(prost|duze litery|duzy tekst|wieksz|nie widze|slabo widze|czytaj)/, a: () => ({ t: 'Mogę włączyć tryb prosty: większe litery i duże przyciski.' + `<button type="button" class="btn btn-sm" data-act="setOpt" data-arg="simple" style="margin-top:8px">${set().simple ? 'Wyłącz' : 'Włącz'} tryb prosty</button>` }) }
  ];
}
function answer(text) {
  const n = norm(text);
  for (const it of intents()) if (it.re.test(n)) return it.a().t;
  return `Jeszcze nie umiem tego załatwić w tym prototypie. Najczęściej ludzie pytają o to:` +
    chips(isAnna() ? [['Przeprowadzka', 'przeprowadzam się'], ['Nowy dowód', 'nowy dowód'], ['Zgubiony portfel', 'zgubiłam portfel'], ['Narodziny dziecka', 'urodziło mi się dziecko'], ['OC auta', 'kiedy kończy się oc']] : [['Leki', 'leki'], ['Dowód', 'dowód'], ['Pisma', 'pismo']]) +
    `<p class="small muted" style="margin:8px 0 0">Możesz też porozmawiać z konsultantem: infolinia 42 253 54 54 (prototyp).</p>`;
}

function chatHtml() {
  const msgs = S.chat[S.persona];
  const intro = isAnna()
    ? `Cześć, ${me().first}! Napisz lub powiedz, co chcesz załatwić. Przygotuję wszystko, a <b>Ty zatwierdzisz przed wysłaniem</b>.` + chips([['Co mam do załatwienia?', 'co mam do załatwienia'], ['Przeprowadzam się', 'przeprowadzam się'], ['Zgubiłam portfel', 'zgubiłam portfel'], ['O co chodzi w piśmie z US?', 'pismo z urzędu skarbowego']])
    : `Dzień dobry, Pani Halino! Proszę powiedzieć, w czym pomóc. Można nacisnąć mikrofon i mówić.` + chips([['Moje leki', 'leki'], ['Mój dowód', 'dowód'], ['Zadzwoń do Ani', 'ania']]);
  return `<div class="msg bot">${intro}</div>` + msgs.map(m => `<div class="msg ${m.from}">${m.from === 'user' ? esc(m.text) : m.html}</div>`).join('');
}
function openAssistant() {
  openSheet(`${sheetHead(`${icon('spark', 'width="20" height="20" style="vertical-align:-4px;color:var(--red)"')} Asystent`)}
    <div class="sheet-body"><div class="chat" id="chat" aria-live="polite">${chatHtml()}</div></div>
    <p class="ai-note">Prototyp: odpowiedzi są przygotowane wcześniej, bez modelu AI. Docelowo: polski model Bielik.<br>Używaj danych testowych. Mikrofon korzysta z rozpoznawania mowy przeglądarki.</p>
    <form class="composer" id="composer" autocomplete="off">
      <label class="sr" for="askInput">Twoje pytanie</label>
      <input id="askInput" type="text" placeholder="${isAnna() ? 'Np. przeprowadzam się w grudniu' : 'Proszę napisać lub nacisnąć mikrofon'}" enterkeyhint="send">
      <button type="button" class="round" id="micBtn" data-act="mic" aria-label="Mów">${icon('mic')}</button>
      <button type="submit" class="round red" aria-label="Wyślij">${icon('send')}</button>
    </form>`, { full: true, kind: 'chat', label: 'Asystent' });
  scrollChat();
  $('#composer').addEventListener('submit', e => { e.preventDefault(); const v = $('#askInput').value.trim(); if (v) { $('#askInput').value = ''; ask(v); } });
}
function scrollChat() { const b = $('.sheet-body'); if (b) b.scrollTop = b.scrollHeight; }
async function ask(text) {
  if (sheetKind !== 'chat') openAssistant();
  const history = S.chat[S.persona];
  const html = answer(text);
  history.push({ from: 'user', text }, { from: 'bot', html });
  if (history.length > 30) history.splice(0, 2);
  save();
  const chat = $('#chat');
  chat.insertAdjacentHTML('beforeend', `<div class="msg user">${esc(text)}</div><div class="msg bot"><span class="typing" aria-label="Asystent pisze"><i></i><i></i><i></i></span></div>`);
  const placeholder = chat.lastElementChild;
  scrollChat();
  await wait(650);
  if (!placeholder.isConnected) return;
  placeholder.innerHTML = html;
  scrollChat();
  if (set().autoRead || set().simple) speak(html);
}

/* Rozpoznawanie mowy (Web Speech API – bezpłatne, w przeglądarce) */
let rec = null;
function stopListening() {
  const active = rec;
  rec = null;
  if (active) { try { active.abort(); } catch (e) { /* zakończone */ } }
  const mic = $('#micBtn');
  if (mic) { mic.classList.remove('listening'); mic.setAttribute('aria-label', 'Mów'); }
}
function listen() {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) { toast('Ta przeglądarka nie rozpoznaje mowy. Wpisz pytanie albo otwórz prototyp w Chrome.', 'info'); return; }
  if (rec) { rec.stop(); return; }
  rec = new SR(); rec.lang = 'pl-PL'; rec.interimResults = true; rec.maxAlternatives = 1;
  const m = $('#micBtn'); m.classList.add('listening'); m.setAttribute('aria-label', 'Słucham… dotknij, aby zakończyć');
  let finalText = '';
  const recognition = rec;
  const input = $('#askInput');
  rec.onresult = e => {
    if (rec !== recognition || !input.isConnected) return;
    input.value = Array.from(e.results, result => result[0].transcript).join('');
    if (e.results[e.results.length - 1].isFinal) finalText = input.value;
  };
  rec.onerror = () => {
    if (rec !== recognition) return;
    stopListening();
    toast('Nie udało się rozpoznać mowy. Wpisz pytanie.', 'info');
  };
  rec.onend = () => {
    if (rec !== recognition || !input.isConnected) return;
    stopListening();
    if (finalText.trim()) { input.value = ''; ask(finalText.trim()); }
  };
  try { rec.start(); } catch (e) {
    stopListening();
    toast('Nie udało się włączyć mikrofonu. Wpisz pytanie.', 'info');
  }
}

/* =========================================================
   Akcje
   ========================================================= */
const A = {
  closeSheet,
  openAssistant,
  mic: listen,
  speak: (t, el) => speak(t, el),
  toastInfo: t => toast(t, 'info'),
  askAbout: t => ask(t),
  openNotifs() {
    const list = S.notifs[S.persona];
    S.unseen[S.persona] = 0; save();
    const trigger = $('[data-act="openNotifs"]');
    if (trigger) { trigger.querySelector('.dot')?.remove(); trigger.setAttribute('aria-label', 'Powiadomienia'); }
    openSheet(`${sheetHead('Powiadomienia')}<div class="sheet-body"><div class="list">${list.map(n => `<button type="button" class="row" data-go="${n.go}"><span class="ic info">${icon('bell')}</span><span class="ct"><b>${esc(n.t)}</b><span>${esc(n.when)}</span></span></button>`).join('') || '<p class="p">Brak powiadomień.</p>'}</div></div>`, { kind: 'info', label: 'Powiadomienia' });
  },
  /* Wnioski */
  pick(arg) {
    const separator = arg.indexOf('|');
    const key = arg.slice(0, separator);
    const value = arg.slice(separator + 1);
    if (flow.id === 'baby' && key === 'surname' && flow.d.surname !== value) flow.d.partner = 'idle';
    flow.d[key] = value;
    rerenderStep();
  },
  tick(path) { const ks = path.split('.'); const last = ks.pop(); const o = ks.reduce((a, k) => a[k], flow.d); o[last] = !o[last]; rerenderStep(); },
  lockedInfo() { toast('Ten element jest obowiązkowy albo dzieje się automatycznie.', 'info'); },
  pickAddr(a) { flow.d.addr = a; flow.d.q = a.split(',')[0]; rerenderStep(); },
  flowNext() {
    const def = FLOWS[flow.id];
    if (!def.steps[flow.step].ok(flow.d)) return;
    flow.step++;
    if (flow.id === 'baby' && !flow.d.b.s800 && flow.step === def.steps.length - 1) flow.step++;
    render(true);
  },
  flowPrev() {
    if (flow.step <= 0) return;
    const def = FLOWS[flow.id];
    flow.step--;
    if (flow.id === 'baby' && !flow.d.b.s800 && flow.step === def.steps.length - 1) flow.step--;
    render(true);
  },
  flowSign() {
    const def = FLOWS[flow.id];
    const submitted = flow;
    openSign({
      title: 'Podpisz wniosek', items: def.summary(submitted.d),
      onSigned: () => {
        if (flow !== submitted) return;
        flow.doneCase = def.done(flow.d); save(); render(true);
      }
    });
  },
  askPartner() {
    const draft = flow;
    draft.d.partner = 'wait'; rerenderStep();
    setTimeout(() => {
      if (flow !== draft || draft.d.partner !== 'wait') return;
      draft.d.partner = 'ok';
      rerenderStep();
      toast('Marek potwierdził imię i nazwisko dziecka.', 'check');
    }, 2200);
  },
  takePhoto() {
    const draft = flow;
    draft.d.cam = 1; rerenderStep();
    [2, 3, 4].forEach((n, i) => setTimeout(() => {
      if (flow !== draft) return;
      draft.d.cam = n; rerenderStep();
    }, 500 * (i + 1)));
  },
  carScan() { flow.d.plate = 'PZ 5R418'; flow.d.found = true; rerenderStep(); toast('Odczytaliśmy dane z umowy kupna.', 'check'); },
  /* Podpis */
  signConsent(_, el) {
    const v = el.getAttribute('aria-checked') !== 'true';
    el.setAttribute('aria-checked', v);
    const b = $('#signBtn'); b.disabled = !v; b.setAttribute('aria-disabled', !v);
  },
  async doSign() {
    const b = $('#signBtn'); if (!b || b.disabled) return;
    b.disabled = true; b.textContent = 'Symulujemy weryfikację…';
    const f = $('#faceid'); f.classList.add('scan');
    const cb = openSign.cb;
    await wait(1100);
    if (!b.isConnected) return;
    closeSheet();
    cb?.();
  },
  /* Udostępnianie */
  shareOpt(k) { shareChoice = k; render(); },
  newQr() { render(); },
  simScan() {
    $('[data-act="simScan"]').disabled = true;
    $('[data-act="newQr"]').hidden = false;
    clearInterval(shareTimer);
    $('#qrBar').style.width = '0%';
    $('#qrTxt').textContent = 'Kod został wykorzystany.';
    const o = SHARE_OPTS[shareChoice];
    S.extraLog.unshift({ id: 'scan' + Date.now(), when: 'Przed chwilą', who: shareChoice === 'age' ? 'Sklep „Pod Ratuszem”' : shareChoice === 'name' ? 'Hotel „Stare Miasto”' : 'Twój bank', why: 'Zeskanowano Twój kod QR', what: o.show.join(', '), basis: 'Twoja zgoda (kod QR)', tone: 'ok', ic: 'qr' });
    save();
    toast(`Zeskanowano. Druga strona zobaczyła tylko: <b>${o.show.join(', ')}</b>. Zapisaliśmy to w historii.`, 'shield');
  },
  /* Pisma */
  letterView(v) { letterView = v; render(); },
  replyUS() {
    openSheet(`${sheetHead('Odpowiedź do urzędu')}<div class="sheet-body">
      <div class="field"><label for="usMsg">Treść (możesz zmienić)</label><textarea id="usMsg" required maxlength="3000">${esc(taxDraft)}</textarea></div>
      <h3 class="h3">Załączniki demonstracyjne</h3>
      ${taxAttachments()}
      <div class="savings">${icon('check')}<span>Suma faktur: 12 400,00 zł. Zgadza się z kwotą ulgi.</span></div>
      <div class="btn-row"><button type="button" class="btn btn-block" data-act="sendUS">Dalej: podpisz i wyślij</button></div></div>`, { kind: 'info', label: 'Odpowiedź do urzędu' });
  },
  sendUS() {
    const field = $('#usMsg');
    const reply = field.value.trim();
    if (!reply) { toast('Wpisz treść odpowiedzi.', 'info'); field.focus(); return; }
    taxDraft = reply;
    openSign({
      title: 'Wyślij odpowiedź', items: [{ to: 'Urząd Skarbowy Poznań-Grunwald', what: 'Wyjaśnienie + 3 faktury (12 400 zł)', icon: 'mail' }],
      review: `<h3 class="h3">Odpowiedź do wysłania</h3><p class="draft-preview">${esc(reply)}</p>
        <h3 class="h3">Załączniki</h3>${taxAttachments()}
        <button type="button" class="linkbtn" data-act="replyUS">Wróć do edycji</button>`,
      onSigned: () => {
        S.letters.us.answered = true;
        S.letters.us.reply = reply;
        addCase('anna', { id: 'usreply', icon: 'mail', title: 'Odpowiedź na wezwanie US', who: 'Urząd Skarbowy Poznań-Grunwald', steps: ['Wysłano 20.11', 'Doręczono (UPO)', 'Urząd sprawdza faktury', 'Ulga potwierdzona'], status: 2, contact: 'Tomasz Wrzesiński, tel. 61 000 00 00', no: '3061-SPV.4103.2026' });
        save(); render(true); toast('Wysłane i doręczone. Potwierdzenie odbioru (UPO) zapisaliśmy.', 'check');
      }
    });
  },
  payOdpady() {
    openSign({
      title: 'Zapłać 147 zł', items: [{ to: 'Urząd Miasta Poznania', what: 'Opłata za odpady IV kw. 2026 · 147,00 zł · BLIK', icon: 'card' }], note: 'Prototyp: płatność jest symulowana.',
      onSigned: () => { S.letters.odpady.paid = true; save(); render(true); toast('Zapłacone. Potwierdzenie przelewu jest w sprawach.', 'check'); }
    });
  },
  bookNfz() {
    openSign({
      title: 'Umówić badanie?', items: [{ to: 'Mammobus · Szpital w Gnieźnie', what: 'Czwartek 3 grudnia, godz. 10:20', icon: 'cal' }],
      onSigned: () => { S.letters.nfz.booked = true; save(); render(true); toast('Umówione na 3 grudnia, 10:20. Przypomnimy dzień wcześniej.', 'check'); }
    });
  },
  askAnia() { toast('Wysłaliśmy Ani prośbę o pomoc. Ania zobaczy to pismo i zadzwoni.', 'users'); },
  callAnia() { toast('W prototypie nie dzwonimy. W aplikacji od razu połączylibyśmy z Anią.', 'phone'); },
  /* Prywatność */
  logDetail(id) {
    const l = accessLog().find(x => x.id === id); if (!l) return;
    openSheet(`${sheetHead('Szczegóły sprawdzenia')}<div class="sheet-body">
      <div class="card">${kv([['Kto', esc(l.who)], ['Kiedy', esc(l.when)], ['Po co', esc(l.why)], ['Co zobaczył', esc(l.what)], ['Podstawa', esc(l.basis)]])}</div>
      ${l.suspicious && !S.reported ? `<button type="button" class="btn btn-block" data-act="notMe">To nie ja, zgłoś</button>` : ''}
      <button type="button" class="btn btn-ghost btn-block" data-act="closeSheet" style="margin-top:8px">Zamknij</button></div>`, { label: 'Szczegóły sprawdzenia' });
  },
  notMe() {
    closeSheet();
    openSign({
      title: 'Zgłoś podejrzane sprawdzenie', items: [
        { to: 'Rejestr Zastrzeżeń PESEL', what: 'Zastrzeżenie Twojego numeru PESEL (od razu)', icon: 'lock' },
        { to: 'Prezes UODO', what: 'Zgłoszenie naruszenia: SzybkiGrosz sp. z o.o., 09.11, 3:14', icon: 'shield' },
        { to: 'Policja', what: 'Zawiadomienie o próbie wyłudzenia', icon: 'alert' }
      ],
      onSigned: () => { S.reported = true; S.peselBlocked = true; save(); render(true); toast('PESEL zastrzeżony. Zgłoszenie wysłane do UODO i na policję.', 'shield'); }
    });
  },
  wasMe() { S.reported = 'recognized'; save(); toast('Dziękujemy. Oznaczyliśmy to sprawdzenie jako Twoje.', 'check'); render(); },
  revoke(id) { S.shares = S.shares.filter(s => s.id !== id); save(); render(); toast('Dostęp cofnięty. Wypożyczalnia nie zobaczy już Twoich danych.', 'check'); },
  togglePesel() { S.peselBlocked = !S.peselBlocked; save(); render(); toast(S.peselBlocked ? 'PESEL zastrzeżony. Nikt nie weźmie kredytu na Twoje dane.' : 'Zastrzeżenie cofnięte. Możesz wziąć kredyt lub podpisać umowę.', 'lock'); },
  toggleNotify() { S.notifyEvery = !S.notifyEvery; save(); render(); },
  /* Rodzina */
  togglePerm(k) { S.helper[k] = !S.helper[k]; save(); render(); toast('W prawdziwej aplikacji tę zgodę zmienia mama. Ty możesz z niej zrezygnować.', 'info'); },
  signLocked() { toast('Podpis za mamę jest możliwy tylko z pełnomocnictwem notarialnym. Bez niego zawsze podpisuje mama.', 'lock'); },
  prepareForMom() {
    openSign({
      title: 'Wyślij mamie do akceptacji', items: [
        { to: 'Halina Nowak (mama)', what: 'Wniosek o nowy dowód: zdjęcie zrobione 19.11, odbiór UM Gniezno, 9.12, 10:00', icon: 'id' }
      ], note: 'To nie jest jeszcze wniosek do urzędu. Mama sama zdecyduje, czy go wysłać.',
      onSigned: () => {
        if (!S.halinaInbox.find(x => x.id === 'dowod-mama')) S.halinaInbox.push({ id: 'dowod-mama', title: 'Nowy dowód osobisty', done: false });
        S.notifs.halina.unshift({ t: 'Ania przygotowała dla Pani wniosek o nowy dowód.', when: 'przed chwilą', go: '#/prosba/dowod-mama' });
        S.unseen.halina = (S.unseen.halina || 0) + 1;
        save(); render(true); toast('Wysłane do mamy. Zobacz, co widzi mama.', 'send');
      }
    });
  },
  becomeHalina() { setPersona('halina'); },
  halinaApprove(id) {
    const x = S.halinaInbox.find(i => i.id === id); if (!x) return;
    x.done = true;
    addCase('halina', { id: 'dowod-h', icon: 'id', title: 'Nowy dowód osobisty', who: 'Urząd Miasta Gniezna', steps: ['Wysłany przez Panią', 'Dowód w produkcji', 'Odbiór: 9 grudnia, 10:00'], status: 1 });
    S.notifs.anna.unshift({ t: 'Mama wysłała wniosek o nowy dowód. Dziękujemy za pomoc!', when: 'przed chwilą', go: '#/rodzina' });
    S.unseen.anna = (S.unseen.anna || 0) + 1;
    save(); go('#/start');
    setTimeout(() => { toast('Wysłane! Ania dostała wiadomość. Przypomnimy Pani o odbiorze.', 'check'); if (set().simple) speak('Wysłane. Przypomnimy Pani o odbiorze dowodu.'); }, 200);
  },
  halinaReject() { go('#/start'); toast('Dobrze. Wniosek poczeka. Ania dostanie informację.', 'info'); },
  /* Ustawienia */
  setOpt(k) { set()[k] = !set()[k]; if (k === 'simple') set().fs = set().simple ? Math.max(set().fs, 1.25) : 1; save(); if (sheetKind === 'chat') closeSheet(); render(); toast(k === 'simple' ? (set().simple ? 'Tryb prosty włączony.' : 'Tryb prosty wyłączony.') : 'Zapisano.', 'check'); },
  setFs(v) { set().fs = parseFloat(v); save(); render(); },
  switchPersona() { setPersona(isAnna() ? 'halina' : 'anna'); },
  info(k) {
    const T = {
      oc: ['Zmiana ubezpieczyciela OC', 'Wyślij wypowiedzenie do obecnego ubezpieczyciela przed 1.12.2026 i kup nową polisę od tego dnia. W pełnej wersji aplikacja przygotuje wypowiedzenie, a Ty je tylko podpiszesz.'],
      sell: ['Sprzedaż auta', 'Aplikacja przygotuje umowę kupna-sprzedaży z danymi z CEPiK, kupujący potwierdzi ją w swojej aplikacji, a zgłoszenie zbycia (obowiązkowe w 30 dni) i zawiadomienie ubezpieczyciela wyślemy automatycznie. W prototypie ta ścieżka nie jest jeszcze zrobiona.']
    }[k];
    openSheet(`${sheetHead(T[0])}<div class="sheet-body"><p class="p">${T[1]}</p><button type="button" class="btn btn-block" data-act="closeSheet">Rozumiem</button></div>`, { label: T[0] });
  }
};

function setPersona(p) {
  S.persona = p; save(); flow = null; closeSheet();
  if (location.hash === '#/start') render(true); else location.hash = '#/start';
  toast(p === 'halina' ? 'Teraz widzisz aplikację oczami Pani Haliny (tryb prosty).' : 'Teraz widzisz aplikację Anny.', 'swap');
}

/* =========================================================
   Przewodnik (panel boczny)
   ========================================================= */
const SCEN = [
  ['anna', '#/wniosek/baby', 'Urodziło się dziecko', '6 spraw w 4 urzędach, ale 1 podpis. Drugi rodzic potwierdza w swojej aplikacji.'],
  ['anna', '#/wniosek/move', 'Przeprowadzka bez urzędu', 'Meldunek, CEPiK, urząd skarbowy naraz. Właściciel potwierdza jednym kliknięciem.'],
  ['anna', '#/pismo/us', 'Pismo z urzędu po ludzku', 'Wezwanie z US wyjaśnione prostym językiem i odpowiedź z fakturami.'],
  ['anna', '#/udostepnij/dowod', 'Pokaż tylko „mam 18 lat”', 'Udostępnij tylko to, co trzeba. Bez imienia i PESEL.'],
  ['anna', '#/prywatnosc', 'Kto sprawdzał moje dane?', 'Historia dostępów i przycisk „To nie ja” przy próbie wyłudzenia.'],
  ['anna', '#/wniosek/lost', 'Zgubiony portfel', 'Unieważnienie dowodu i zastrzeżenie PESEL w 10 sekund.'],
  ['anna', '#/wniosek/id', 'Nowy dowód, zanim wygaśnie', 'Aplikacja sama przypomina, dane już są, wybierasz tylko termin.'],
  ['anna', '#/wniosek/car', 'Kupiłam używane auto', 'Historia z CEPiK, OC przechodzi na Ciebie, rejestracja bez kolejki.'],
  ['anna', '#/rodzina', 'Pomagam mamie, ona decyduje', 'Przygotuj wniosek dla mamy, a potem przełącz się na jej ekran.'],
  ['halina', '#/start', 'Tryb prosty Pani Haliny', 'Duże przyciski, czytanie na głos, zatwierdzenie wniosku od córki.'],
  ['anna', 'chat', 'Asystent: napisz lub powiedz', 'Spróbuj: „przeprowadzam się”, „zgubiłam portfel”, „kiedy mam przegląd?”.']
];
function renderGuide() {
  $('#scenarios').innerHTML = SCEN.map(([p, to, t, d], i) => `<li><button type="button" data-act="scenario" data-arg="${i}"><span class="num">${i + 1}</span><span><strong>${t}</strong><small>${d}</small></span></button></li>`).join('');
}
A.scenario = i => {
  const [p, to] = SCEN[+i];
  closeGuide();
  if (S.persona !== p) { S.persona = p; save(); }
  flow = null; closeSheet();
  if (to === 'chat') { if (location.hash !== '#/start') location.hash = '#/start'; else render(true); setTimeout(openAssistant, 80); return; }
  if (location.hash === to) render(true); else location.hash = to;
};
function syncGuide() {
  document.querySelectorAll('.persona-btn').forEach(b => b.setAttribute('aria-checked', b.dataset.persona === S.persona));
}
function closeGuide() {
  const guide = $('#guide');
  if (!guide.classList.contains('open')) return;
  guide.classList.remove('open');
  $('#app').inert = !$('#overlay').hidden;
  const button = $('#guideFab');
  button.setAttribute('aria-expanded', 'false');
  button.focus();
}
A.toggleGuide = () => {
  const guide = $('#guide');
  guide.classList.add('open');
  $('#guideFab').setAttribute('aria-expanded', 'true');
  $('#app').inert = true;
  $('#closeGuide').focus();
};
A.closeGuide = closeGuide;
matchMedia('(max-width: 900px)').addEventListener('change', closeGuide);

/* =========================================================
   Zdarzenia
   ========================================================= */
$('.skip').addEventListener('click', e => {
  e.preventDefault();
  $('#screen').focus();
});
document.addEventListener('click', e => {
  const pb = e.target.closest('.persona-btn');
  if (pb) { closeGuide(); setPersona(pb.dataset.persona); return; }
  if (e.target.id === 'overlay') { closeSheet(); return; }
  const t = e.target.closest('[data-go],[data-act]');
  if (!t || t.disabled) return;
  if (t.dataset.go) {
    e.preventDefault();
    if (t.closest('#overlay')) closeSheet();
    if (t.closest('#guide')) closeGuide();
    const target = t.dataset.go;
    if (target.startsWith('#/wniosek/')) flow = null;
    go(target);
    return;
  }
  const fn = A[t.dataset.act];
  if (fn) { e.preventDefault(); fn(t.dataset.arg, t, e); }
});
document.addEventListener('input', e => {
  if (e.target.id === 'usMsg') { taxDraft = e.target.value; return; }
  const t = e.target.closest('[data-bind]');
  if (!t || !flow) return;
  const key = t.dataset.bind;
  flow.d[key] = t.value;
  if (flow.id === 'baby' && (key === 'name' || key === 'name2')) flow.d.partner = 'idle';
  if (t.dataset.live === 'addr') {
    if (flow.d.addr) {
      flow.d.addr = '';
      $('#selectedAddress')?.remove();
    }
    $('#addrList').innerHTML = addrOptions(flow.d);
  }
  if (flow.id === 'car' && key === 'plate') {
    flow.d.found = norm(t.value).replace(/\s/g, '') === 'pz5r418';
    $('#carHistory').hidden = !flow.d.found;
  }
  refreshFoot();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { if (sheetKind) closeSheet(); else closeGuide(); }
});
$('#resetDemo').addEventListener('click', () => { S = initialState(); save(); flow = null; shareChoice = 'age'; letterView = 'plain'; taxDraft = TAX_DRAFT; closeSheet(); closeGuide(); if (synth) synth.cancel(); location.hash = '#/start'; render(true); toast('Demo zaczyna się od nowa.', 'check'); });
window.addEventListener('hashchange', () => { closeSheet(); render(); });

/* Start */
const qp = new URLSearchParams(location.search).get('osoba');
if (qp && Object.hasOwn(PEOPLE, qp)) { S.persona = qp; save(); }
if (synth) synth.getVoices();
renderGuide();
render(true);
for (const [who, cases] of Object.entries(S.cases)) {
  for (const c of cases) scheduleProgress(who, c);
}
})();
