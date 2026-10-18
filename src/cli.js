'use strict';
/**
 * Generic New-API mint — hosts: mxdapi.com, api.holdai.top, api.vveai.com
 * Contract measured 2026-10-18 (wave 14). Usage: node mint.js --host=mxdapi.com --model=...
 */
const fs = require('fs');
const path = require('path');
const https = require('https');
const { createAgent, parseProxy } = require('../../river-bulk-apikey/src/proxy');
const emailnator = require('../cloudflare-wai/emailnator.js');

const argv = process.argv.slice(2);
const one = (n, d) => {
  const hit = argv.find((a) => a.startsWith(`--${n}=`));
  return hit ? hit.slice(n.length + 3) : d;
};

const HOST = one('host', 'mxdapi.com');
const BASE = `https://${HOST}`;
const MODEL = one('model', 'deepseek-chat');
const EXITS = (one('exits', 'http://127.0.0.1:40000') || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);
const CODE_WAIT_MS = parseInt(one('code-wait', '300000'), 10);
// Emailnator recycles gmail boxes, so a sibling agent's mail can land in this
// inbox mid-flight; only a message whose sender/subject carries this panel's
// own brand is allowed to supply the code.
const BRAND = new RegExp(one('brand', HOST.replace(/[.:]/g, '\\$&').replace(/^api\\?\./, '')), 'i');
const DIR = path.join(__dirname, '..', '..', 'providers', HOST.replace(/^api\./, '').replace(/\./g, '-'));

fs.mkdirSync(path.join(DIR, 'out'), { recursive: true });
const LOG = path.join(DIR, 'out', 'mint.log');
const KEYS = path.join(DIR, 'keys.txt');
const ACCOUNTS = path.join(DIR, 'accounts.json');

const nowIso = () => new Date().toISOString();
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const randHex = (n) => require('crypto').randomBytes(n).toString('hex');
const log = (m) => {
  const line = `[${nowIso()}] ${m}`;
  console.log(line);
  fs.appendFileSync(LOG, line + '\n');
};

let currentExit = EXITS[0];

function reqOnce(pathname, { method = 'GET', body = null, headers = {}, timeoutMs = 45000, exit = currentExit } = {}) {
  const u = new URL(BASE + pathname);
  const payload = body === null ? null : Buffer.from(JSON.stringify(body));
  const h = {
    accept: 'application/json, text/plain, */*',
    'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
    'user-agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36',
    origin: BASE,
    referer: BASE + '/register',
    // This fork's origin guard rejects state-changing API calls without it.
    'x-requested-with': 'XMLHttpRequest',
    ...headers,
  };
  if (payload) {
    h['content-type'] = 'application/json';
    h['content-length'] = payload.length;
  }
  return new Promise((resolve, reject) => {
    const r = https.request(
      { method, host: u.hostname, port: 443, path: u.pathname + u.search, agent: createAgent(parseProxy(exit)), headers: h },
      (res) => {
        let text = '';
        res.setEncoding('utf8');
        res.on('data', (c) => (text += c));
        res.on('end', () => {
          let json = null;
          try {
            json = JSON.parse(text);
          } catch (e) {}
          resolve({ status: res.statusCode, json, text, headers: res.headers });
        });
      }
    );
    r.setTimeout(timeoutMs, () => r.destroy(new Error('timeout')));
    r.on('error', reject);
    if (payload) r.write(payload);
    r.end();
  });
}

async function req(pathname, opts = {}, tries = 5) {
  let wait = 6000;
  for (let i = 0; i < tries; i++) {
    let r;
    try {
      r = await reqOnce(pathname, opts);
    } catch (e) {
      log(`net ${e.message} on ${pathname}, rotate exit`);
      currentExit = EXITS[(EXITS.indexOf(currentExit) + 1) % EXITS.length];
      await sleep(3000);
      continue;
    }
    const rl = r.status === 429 || (r.status < 500 && /过于频繁|Too many|429/i.test(r.text || ''));
    if (!rl) return r;
    const m = /(\d+)\s*秒/.exec(r.text || '');
    const waitMs = m ? Math.min(parseInt(m[1], 10) * 1000 + 3000, 300000) : Math.min(wait * 2, 120000);
    log(`429 ${pathname}: ${String(r.text).slice(0, 80)} -> sleep ${waitMs}ms`);
    await sleep(waitMs);
  }
  return reqOnce(pathname, opts);
}

function extractCode(text) {
  const flat = String(text || '')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ');
  const after = /验证码(?:为|是)?[:：\s]*([A-Za-z0-9]{4,10})/.exec(flat);
  if (after) return after[1];
  const hex = /\b([a-f0-9]{6})\b/i.exec(flat);
  if (hex) return hex[1];
  const num = /\b(\d{6})\b/.exec(flat);
  return num ? num[1] : null;
}

// Emailnator recycles mailboxes: the inbox already holds other people's mail, so a
// code is only accepted from a message that arrived after this mint started.
async function waitCode(box, startSec, { timeoutMs = CODE_WAIT_MS } = {}) {
  const deadline = Date.now() + timeoutMs;
  const seen = new Set();
  let lastErr = null;
  while (Date.now() < deadline) {
    let msgs = [];
    try {
      msgs = await emailnator.listMessages(box.plain, currentExit);
    } catch (e) {
      lastErr = e.message;
      log(`mailbox read failed (${e.message}), rotating exit`);
      currentExit = EXITS[(EXITS.indexOf(currentExit) + 1) % EXITS.length];
      await sleep(5000);
      continue;
    }
    for (const m of msgs) {
      const id = String(m.id);
      if (seen.has(id)) continue;
      seen.add(id);
      const ts = Number(m.timestamp || 0);
      if (ts && ts < startSec - 90) continue;
      let full = {};
      try {
        full = await emailnator.readMessage(id, currentExit);
      } catch (e) {
        lastErr = e.message;
        continue;
      }
      const text = String(full.content || '');
      const code = extractCode(text);
      if (!code) {
        log(`no code in mail from=${m.from} subj=${m.subject}`);
        continue;
      }
      if (!BRAND.test(m.from + ' ' + m.subject)) {
        log(`skip foreign mail from=${m.from} subj=${m.subject} code=${code}`);
        continue;
      }
      if (!/验证码|verification|code|代码/i.test(text)) {
        log(`skip no-context mail from=${m.from} subj=${m.subject} code=${code}`);
        continue;
      }
      return { code, from: m.from, subject: m.subject, raw: text.slice(0, 300) };
    }
    await sleep(5000);
  }
  throw new Error(`no code in ${timeoutMs}ms ${lastErr || ''}`);
}

const box = { plain: null };

// Panels built on this New-API fork answer /api/user/login with a `session`
// cookie instead of the stock `access_token` JWT; both forms are accepted here.
function sesh(tok, session, sub) {
  if (tok) return { authorization: `Bearer ${tok}`, 'new-api-user': String(sub) };
  return { cookie: session, 'new-api-user': String(sub) };
}

function saveRec(rec) {
  let acc = [];
  try {
    acc = JSON.parse(fs.readFileSync(ACCOUNTS, 'utf8'));
    if (!Array.isArray(acc)) acc = [];
  } catch (e) {}
  acc = acc.filter((r) => !(r.username === rec.username && r.host === rec.host));
  acc.push(rec);
  fs.writeFileSync(ACCOUNTS, JSON.stringify(acc, null, 1));
}

async function main() {
  log(`mint start host=${HOST} model=${MODEL} exits=${EXITS.length}`);
  const tag = one('tag', `gm14${Date.now().toString(36).slice(-5)}`) + (one('tag') ? '' : '');
  const pass = `Pw${randHex(5)}aB1`;
  const rec = { host: HOST, username: tag, password: pass, at: nowIso(), status: 'start', exit: currentExit };

  let mb = null;
  for (let i = 0; i < 12; i++) {
    const candidate = await emailnator.newAddress(currentExit);
    const probe = await req(`/api/verification?email=${encodeURIComponent(candidate.plain)}`);
    log(`sendCode ${probe.status} ${String(probe.text).slice(0, 120)}`);
    if (probe.json && probe.json.success === true) {
      mb = candidate;
      break;
    }
    // "邮箱地址已被占用" = this recycled gmail already has an account here.
    if (!/占用|occupied|exists/i.test(String(probe.text || ''))) {
      throw new Error(`sendCode ${probe.status} ${probe.text.slice(0, 160)}`);
    }
  }
  if (!mb) throw new Error('no usable mailbox after 4 tries');
  box.plain = mb.plain;
  rec.email = mb.plain;
  log(`mailbox ${mb.plain}`);
  rec.status = 'code-sent';

  const startedAt = Math.floor(Date.now() / 1000);
  const mail = await waitCode(box, startedAt);
  log(`code ${mail.code} from ${mail.from} | ${mail.subject}`);
  rec.code_from = mail.from;
  rec.status = 'code-read';

  const reg = await req('/api/user/register', {
    method: 'POST',
    body: { username: tag, password: pass, email: mb.plain, verification_code: mail.code },
  });
  log(`register ${reg.status} ${String(reg.text).slice(0, 160)}`);
  if (!reg.json || reg.json.success !== true) throw new Error(`register ${reg.status} ${reg.text.slice(0, 200)}`);
  rec.status = 'registered';

  const login = await req('/api/user/login', {
    method: 'POST',
    body: { username: tag, password: pass },
    headers: { referer: BASE + '/login' },
  });
  const tok = login.json && login.json.data && login.json.data.access_token;
  const setCookies = (login.headers && login.headers['set-cookie']) || [];
  const session = setCookies.map((c) => String(c).split(';')[0]).find((c) => /^session=/.test(c));
  log(`login ${login.status} jwt=${!!tok} sessionCookie=${!!session} keys=${Object.keys((login.json && login.json.data) || {}).join(',')}`);
  if (!tok && !session) throw new Error(`login ${login.status} ${login.text.slice(0, 240)}`);
  const sub = tok
    ? JSON.parse(Buffer.from(tok.split('.')[1], 'base64').toString('utf8')).sub
    : (login.json && login.json.data && login.json.data.id) || 0;
  rec.id = Number(sub);
  const auth = sesh(tok, session, sub);
  rec.status = 'logged-in';
  log(`login ok id=${sub}`);
  saveRec(rec);

  const self = await req('/api/user/self', { headers: auth });
  rec.quota = self.json && self.json.data && self.json.data.quota;
  rec.group = self.json && self.json.data && self.json.data.group;
  log(`self quota=${rec.quota} group=${rec.group}`);

  // The account lands in `vip`, which has no channel for any priced model, so a
  // token bound to each group with real channels is what makes the key usable.
  const plan = JSON.parse(one('plan', '[{"group":"","model":"' + MODEL + '"}]'));
  const tokens = [];
  for (const step of plan) {
    const created = await req('/api/token/', {
      method: 'POST',
      headers: auth,
      body: {
        name: 'gm14_' + (step.group || 'own').replace(/\s+/g, '_'),
        remain_quota: 0,
        expired_time: -1,
        unlimited_quota: true,
        model_limits_enabled: false,
        model_limits: '',
        allow_ips: '',
        group: step.group || '',
      },
    });
    if (!created.json || created.json.success !== true) {
      log(`token create group=${JSON.stringify(step.group)} ${created.status} ${String(created.text).slice(0, 140)}`);
      continue;
    }
    const list = await req('/api/token/?p=0&size=50', { headers: auth });
    const items = (list.json && list.json.data && list.json.data.items) || [];
    const item = items.find((t) => (t.group || '') === (step.group || ''));
    if (!item) {
      log(`token list miss group=${step.group}`);
      continue;
    }
    const reveal = await req(`/api/token/${item.id}/key`, { method: 'POST', headers: auth });
    const key = reveal.json && reveal.json.data && reveal.json.data.key;
    if (!key) {
      log(`reveal ${reveal.status} ${String(reveal.text).slice(0, 140)}`);
      continue;
    }
    const chat = await req('/v1/chat/completions', {
      method: 'POST',
      timeoutMs: 150000,
      headers: { authorization: `Bearer ${key}` },
      body: { model: step.model, messages: [{ role: 'user', content: 'Reply OK' }], max_tokens: 256, stream: false },
    });
    const msg = chat.json && chat.json.choices && chat.json.choices[0] && chat.json.choices[0].message;
    const txt = msg && String(msg.content || '').trim();
    log(`chat group=${JSON.stringify(step.group)} ${step.model} -> ${chat.status} ${txt ? JSON.stringify(txt.slice(0, 30)) : String(chat.text).slice(0, 160)}`);
    const row = { group: step.group || '(own)', model: step.model, key, status: chat.status, content: txt ? txt.slice(0, 40) : '', error: txt ? null : String(chat.text).slice(0, 240) };
    tokens.push(row);
    if (chat.status === 200 && txt) {
      fs.appendFileSync(KEYS, key + '\n');
      log(`SAVED ${step.group || 'own'} ${key.slice(0, 12)}…`);
      rec.status = 'chat-200';
      rec.model = (chat.json && chat.json.model) || step.model;
      rec.content = txt.slice(0, 40);
      rec.key = key;
    }
  }
  rec.tokens = tokens;
  saveRec(rec);
  log(`done status=${rec.status} quota=${rec.quota} live=${tokens.filter((t) => t.status === 200).length}/${tokens.length}`);
  return rec;
}

main().then(
  (r) => {
    console.log('RESULT ' + JSON.stringify({ host: r.host, status: r.status, quota: r.quota, group: r.group, model: r.model, key: r.key, tries: r.chat_tries }));
  },
  (e) => {
    console.error('FAIL ' + e.message);
    process.exit(1);
  }
);
