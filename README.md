<div align="center">

```
███╗   ███╗██╗  ██╗██████╗
████╗ ████║╚██╗██╔╝██╔══██╗
██╔████╔██║ ╚███╔╝ ██║  ██║
██║╚██╔╝██║ ██╔██╗ ██║  ██║
██║ ╚═╝ ██║██╔╝ ██╗██████╔╝
╚═╝     ╚═╝╚═╝  ╚═╝╚═════╝
```

# mxdapi-bulk-apikey

> **Turbo önerilir (5 worker); daha fazlası zayıf bilgisayarda yük/ban riski.**

**Bulk-create MXDAPI (模型岛) accounts with auto-generated API keys — OpenAI-compatible inference + 9Router connector.**

[![Node](https://img.shields.io/badge/Node-%E2%89%A518-3DA639?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![Dependencies](https://img.shields.io/badge/dependencies-0-blue?style=for-the-badge)](#)
[![License](https://img.shields.io/badge/license-MIT-6ea8fe?style=for-the-badge)](LICENSE)
[![Models](https://img.shields.io/badge/models-4%20served-412991?style=for-the-badge)](https://mxdapi.com)
[![9Router](https://img.shields.io/badge/9Router-connector-8B5CF6?style=for-the-badge)](#-connect-to-9router)
[![X](https://img.shields.io/badge/X-%40bigbullapp-000000?style=for-the-badge&logo=x&logoColor=white)](https://x.com/bigbullapp)

[🛠 Quick start](#-quick-start) · [🎁 Free tier](#-free-tier--how-much-you-get) · [🤖 Models](#-models--all-4-of-them) · [🧪 Use the API](#-how-to-use-the-api) · [✅ Verified](#-verified-working--every-key-is-tested) · [🧭 How it works](#-how-it-works) · [🔌 9Router](#-connect-to-9router) · [⚙️ Options](#️-cli-options) · [🛰️ Proxies](#️-behind-a-proxy) · [🐞 Issues](#-issues)

</div>

<div align="center">

**English** · [Türkçe](README.tr.md) · [中文](README.cn.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Русский](README.ru.md) · [Português](README.pt.md)

</div>

---

## ✨ Why this exists

MXDAPI (模型岛) is a New API panel with a plain **e-mail-code sign-up** (Turnstile disabled, password registration open), a sign-up credit of **¥1** (“注册送1刀”, plus ¥3 for each invited friend), and per-group model catalogues. The useful unit is *one account per key*, and this tool turns that into a `keys.txt` where **every line survived a live chat call**.

## 🎁 Free tier — how much you get

**Every new account gets a sign-up credit** — no card, no captcha.

| What | Value |
| --- | --- |
| Sign-up credit | **¥1** (`注册送1刀`) |
| Invite bonuses | ¥3 to inviter / ¥2 to invitee (per the panel's announcement) |
| Card required | **No** |
| Daily check-in | not enabled on this panel |
| Sign-up | e-mail code (dotless gmail passes; **aliases are rejected**) |
| The unit that scales | **one account = one key** → `--count N` is really "N free accounts" |

> 💡 The free tier is set by MXDAPI (模型岛) and can change. Check the live numbers at [mxdapi.com](https://mxdapi.com) — and let the tool's own gate decide:

```bash
node src/cli.js --verify-only     # every key in keys.txt is re-tested with a real chat call
```

## 🤖 Models — all 4 of them

The catalogue is **group-bound**: a fresh account lands in `vip`, which has channels for nothing — the tool binds each token to a live group (`deepseek`, `gemini`, `Grok`, `kiro`, `claude max`) before testing. Verified live ids: `deepseek-v4.1-flash`, `grok-4.5`, `claude-sonnet-5`, `gemini-3.8-flash`. `GET /v1/models` is served per token group.

|Model|✓|
|---|---|
|`deepseek-v4.1-flash`|✓|
|`grok-4.5`|✓|
|`claude-sonnet-5`|✓|
|`gemini-3.8-flash`|✓|

## 🧪 How to use the API

The base URL is **`https://mxdapi.com/v1`** — OpenAI-compatible (New API panel), so anything that speaks OpenAI works.

```bash
curl https://mxdapi.com/v1/chat/completions \
  -H "Authorization: Bearer <your key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"deepseek-v4.1-flash","messages":[{"role":"user","content":"hi"}],"max_tokens":8}'
```

Set the base URL in any agent or SDK (Cursor, OpenCode, Kilo Code, …) and pick any model id from the catalogue above.

## 🛠 Quick start

```bash
# clone or fork this repository, then:
cd mxdapi-bulk-apikey

# 1) your proxy list, one per line (http://… or socks5://…) — optional
printf 'http://127.0.0.1:8080\n' > proxies.txt   # optional — without it the tool runs direct

# 2) go
node src/launcher.js        # interactive
# or directly:
node src/cli.js --host=mxdapi.com --count 50
```

`keys.txt` is written **only** after a live chat completion proves the key.

### 🖱️ The launcher

The launcher asks for the proxy list, count and verification model, remembers them in `launcher.config.json`, and runs the CLI with the right flags.

## ✅ Verified working — every key is tested

| Check | Result |
| --- | --- |
| `GET /api/verification?email=<gmail>` | **200** — sends a 6-hex code (dotless gmail passes; aliases rejected) |
| `POST /api/user/register` | **200** — the account lands in group `vip` |
| `GET /api/user/groups` | **200** — lists the model groups (`deepseek`, `gemini`, `Grok`, `kiro`, `claude max`, …) |
| `POST /api/token/ {"group":"<group>"}` | **200** — binds the token to a live group (writes need `x-requested-with: XMLHttpRequest` on this fork) |
| `POST /v1/chat/completions` — run for **every** key before it is written | **200** with real content |
| a key that fails its chat check | never written to `keys.txt` — the account stays recoverable in `accounts.json` |

Re-check at any time:

```bash
node src/cli.js --verify-only
```

## 🧭 How it works

```
inbox (one address per account)                                  a fresh address per account
   │
   ├─▶ sign-up: MXDAPI (模型岛) page → e-mail address → code / link from the inbox
   ├─▶ session: the account's cookies or access token in hand
   ├─▶ key mint: the account's key endpoint → plaintext key returned once (written to disk immediately)
   └─▶ live proof: POST https://mxdapi.com/v1/chat/completions → real content = the key is live
```

| Step | Call | Notes |
| --- | --- | --- |
| code | send-code (e-mail) | dotless gmail works; alias addresses are rejected by the panel |
| signup | register | password registration is open; Turnstile is off |
| sign-in | login | session cookie (this fork) |
| token | create token with `{"group":"deepseek"}`-style binding | without a live group the key answers `503 分组 … 无可用渠道` |
| key | reveal on the token row / endpoint | plaintext key |
| check | `POST /v1/chat/completions` | live 200 required before `keys.txt` |

## ⚙️ CLI options

```bash
node src/cli.js --host=mxdapi.com --count N   # mint (default 50)
node src/cli.js --verify-only                 # re-check every key in keys.txt
node src/cli.js --help
```

| Environment variable | Default | Meaning |
| --- | --- | --- |
| `MXDAPI_PROXIES` | `proxies.txt` | pool file, one proxy per line — optional: without a pool the CLI connects directly |

## 🛰️ Behind a proxy

**Optional — recommended at scale (per-IP limits, bans).** The tool works without a proxy too.

- **With a pool:** pass `--exits <list>` (comma separated, e.g. `--exits http://127.0.0.1:8080,socks5://127.0.0.1:1080`) and every request leaves through one of those lines; a dead line fails that attempt and the tool moves on to the next one.
- **Without a pool:** the CLI prints `running WITHOUT a proxy (direct)` and connects directly; sign-up, the token/key steps and the live chat check all run the same way.
- The panel rate-limits code sends per address, so pace the run (a ~30–60 s gap between accounts is plenty).

## 📄 Files

| Path | Contents |
| --- | --- |
| `keys.txt` | one live-verified key per line — git-ignored |
| `accounts.json` | username / password / key / chat status per account |
| `proxies.txt` | your exits, one per line — git-ignored |
| `outputs/` | run state — git-ignored |

## 🔌 Connect to 9Router

[9Router](https://9router.com) is a self-hosted, OpenAI-compatible router. Register this provider once and every key becomes a connection under one provider-node:

```bash
node src/connect-9router.js
```

Defaults: `--base http://localhost:20128`, `--password 123456`, `--name "MXDAPI"`, `--prefix mxdapi`, `--base-url https://mxdapi.com/v1`. Models are then served as `mxdapi/<model id>` and load-balanced across every key.

## 🔑 What one key gets you

| | |
| --- | --- |
| 🏢 Provider | **MXDAPI (模型岛)** — [mxdapi.com](https://mxdapi.com) |
| 🎁 What the provider gives | one account per key — e-mail code sign-up, every key chat-verified |
| 🔑 What one key gets you | one API key scoped to its own account: the 4 model ids on the endpoint below, at your plan's limits. The quota lives on the **account**, which is exactly why this tool creates one account per key |
| 🌐 API shape | OpenAI-compatible: `POST https://mxdapi.com/v1/chat/completions` |
| 🔒 Your data | only mxdapi.com and the inbox backend you configure are contacted; keys stay on your machine |

## 🐞 Issues

If the panel changes its signup shape, groups or credit, the tool stops at that step and says so. **[Open an issue](../../issues)** with the command you ran and the exact output; PRs are welcome.

## 📄 License

MIT © 2026 — see [LICENSE](LICENSE).

<div align="center">

**[MIT](LICENSE)** © 2026 mxdapi-bulk-apikey contributors

</div>
