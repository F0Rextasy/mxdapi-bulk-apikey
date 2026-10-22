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

> **Turbo empfohlen (5 Worker); mehr bedeutet Last-/Ban-Risiko auf schwachen Rechnern.**

**Massenhaft MXDAPI (模型岛)-Konten mit automatisch generierten API-Schlüsseln erstellen — OpenAI-kompatible Inferenz + 9Router-Connector.**

[![Node](https://img.shields.io/badge/Node-%E2%89%A518-3DA639?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![Dependencies](https://img.shields.io/badge/dependencies-0-blue?style=for-the-badge)](#)
[![License](https://img.shields.io/badge/license-MIT-6ea8fe?style=for-the-badge)](LICENSE)
[![Models](https://img.shields.io/badge/models-4%20served-412991?style=for-the-badge)](https://mxdapi.com)
[![9Router](https://img.shields.io/badge/9Router-connector-8B5CF6?style=for-the-badge)](#-connect-to-9router)
[![OmniRoute](https://img.shields.io/badge/OmniRoute-connector-8B5CF6?style=for-the-badge)](#-connect-to-omniroute)
[![X](https://img.shields.io/badge/X-%40bigbullapp-000000?style=for-the-badge&logo=x&logoColor=white)](https://x.com/bigbullapp)

[🛠 Schnellstart](#-quick-start) · [🎁 Kostenlose Stufe](#-free-tier--how-much-you-get) · [🤖 Modelle](#-models--all-4-of-them) · [🧪 Die API nutzen](#-how-to-use-the-api) · [✅ Verifiziert](#-verified-working--every-key-is-tested) · [🧭 Funktionsweise](#-how-it-works) · [🔌 9Router](#-connect-to-9router) · [⚙️ Optionen](#️-cli-options) · [🛰️ Proxys](#️-behind-a-proxy) · [🐞 Probleme](#-issues)

</div>

<div align="center">

**English** · [Türkçe](README.tr.md) · [中文](README.cn.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Русский](README.ru.md) · [Português](README.pt.md)

</div>

---

## ✨ Warum es das gibt

MXDAPI (模型岛) ist ein New-API-Panel mit einer einfachen **E-Mail-Code-Registrierung** (Turnstile deaktiviert, Passwortregistrierung offen), einem Registrierungsguthaben von **¥1** („注册送1刀", plus ¥3 für jeden eingeladenen Freund) und modellbezogenen Gruppenkatalogen. Die nützliche Einheit ist *ein Konto pro Schlüssel*, und dieses Tool verwandelt das in eine `keys.txt`, in der **jede Zeile einen echten Chat-Aufruf überlebt hat**.

## 🎁 Kostenlose Stufe — wie viel du bekommst

**Jedes neue Konto erhält ein Registrierungsguthaben** — keine Karte, kein Captcha.

| Was | Wert |
| --- | --- |
| Registrierungsguthaben | **¥1** (`注册送1刀`) |
| Einladungsboni | ¥3 für den Einladenden / ¥2 für den Eingeladenen (laut Ankündigung des Panels) |
| Karte erforderlich | **Nein** |
| Täglicher Check-in | auf diesem Panel nicht aktiviert |
| Registrierung | E-Mail-Code (punktlose Gmail funktioniert; **Aliase werden abgelehnt**) |
| Die skalierende Einheit | **ein Konto = ein Schlüssel** → `--count N` bedeutet wirklich „N kostenlose Konten" |

> 💡 Die kostenlose Stufe wird von MXDAPI (模型岛) festgelegt und kann sich ändern. Prüfe die aktuellen Zahlen auf [mxdapi.com](https://mxdapi.com) — und lass das Gate des Tools selbst entscheiden:

```bash
node src/cli.js --verify-only     # every key in keys.txt is re-tested with a real chat call
```

## 🤖 Modelle — alle 4 davon

Der Katalog ist **gruppengebunden**: Ein frisches Konto landet in `vip`, das für nichts Kanäle hat — das Tool bindet jedes Token vor dem Testen an eine aktive Gruppe (`deepseek`, `gemini`, `Grok`, `kiro`, `claude max`). Verifizierte Live-IDs: `deepseek-v4.1-flash`, `grok-4.5`, `claude-sonnet-5`, `gemini-3.8-flash`. `GET /v1/models` wird pro Token-Gruppe bereitgestellt.

|Modell|✓|
|---|---|
|`deepseek-v4.1-flash`|✓|
|`grok-4.5`|✓|
|`claude-sonnet-5`|✓|
|`gemini-3.8-flash`|✓|

## 🧪 Die API nutzen

Die Basis-URL ist **`https://mxdapi.com/v1`** — OpenAI-kompatibel (New-API-Panel), also funktioniert alles, was OpenAI spricht.

```bash
curl https://mxdapi.com/v1/chat/completions \
  -H "Authorization: Bearer <your key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"deepseek-v4.1-flash","messages":[{"role":"user","content":"hi"}],"max_tokens":8}'
```

Setze die Basis-URL in jedem Agenten oder SDK (Cursor, OpenCode, Kilo Code, …) und wähle eine beliebige Modell-ID aus dem obigen Katalog.

## 🛠 Schnellstart

```bash

# clone or fork this repository, then:
cd mxdapi-bulk-apikey

# 1) your proxy list, one per line (http://… or socks5://…)
printf 'http://127.0.0.1:8080\n' > proxies.txt

# 2) go
node src/launcher.js        # interactive

# or directly:
node src/cli.js --host=mxdapi.com --count 50
```

`keys.txt` wird **erst** geschrieben, nachdem eine echte Chat-Vervollständigung den Schlüssel bestätigt hat.

### 🖱️ Der Launcher

Der Launcher fragt nach der Proxy-Liste, der Anzahl und dem Verifizierungsmodell, merkt sie sich in `launcher.config.json` und führt die CLI mit den richtigen Flags aus.

## ✅ Verifiziert funktionierend — jeder Schlüssel wird getestet

| Prüfung | Ergebnis |
| --- | --- |
| `GET /api/verification?email=<gmail>` | **200** — sendet einen 6-stelligen Hex-Code (punktlose Gmail funktioniert; Aliase werden abgelehnt) |
| `POST /api/user/register` | **200** — das Konto landet in der Gruppe `vip` |
| `GET /api/user/groups` | **200** — listet die Modellgruppen auf (`deepseek`, `gemini`, `Grok`, `kiro`, `claude max`, …) |
| `POST /api/token/ {"group":"<group>"}` | **200** — bindet das Token an eine aktive Gruppe (Schreibvorgänge benötigen `x-requested-with: XMLHttpRequest` in diesem Fork) |
| `POST /v1/chat/completions` — für **jeden** Schlüssel ausgeführt, bevor er geschrieben wird | **200** mit echtem Inhalt |
| ein Schlüssel, der seine Chat-Prüfung nicht besteht | wird nie in `keys.txt` geschrieben — das Konto bleibt in `accounts.json` wiederherstellbar |

Jederzeit erneut prüfen:

```bash
node src/cli.js --verify-only
```

## 🧭 Funktionsweise

```
inbox (one address per account)                                  a fresh address per account
   │
   ├─▶ sign-up: MXDAPI (模型岛) page → e-mail address → code / link from the inbox
   ├─▶ session: the account's cookies or access token in hand
   ├─▶ key mint: the account's key endpoint → plaintext key returned once (written to disk immediately)
   └─▶ live proof: POST https://mxdapi.com/v1/chat/completions → real content = the key is live
```

| Schritt | Aufruf | Hinweise |
| --- | --- | --- |
| Code | Code senden (E-Mail) | punktlose Gmail funktioniert; Alias-Adressen werden vom Panel abgelehnt |
| Registrierung | registrieren | Passwortregistrierung ist offen; Turnstile ist aus |
| Anmeldung | einloggen | Session-Cookie (dieser Fork) |
| Token | Token mit `{"group":"deepseek"}`-artiger Bindung erstellen | ohne aktive Gruppe antwortet der Schlüssel mit `503 分组 … 无可用渠道` |
| Schlüssel | in der Token-Zeile / am Endpunkt anzeigen | Klartext-Schlüssel |
| Prüfung | `POST /v1/chat/completions` | Live-200 erforderlich vor `keys.txt` |

## ⚙️ CLI-Optionen

```bash
node src/cli.js --host=mxdapi.com --count N   # mint (default 50)
node src/cli.js --verify-only                 # re-check every key in keys.txt
node src/cli.js --help
```

| Umgebungsvariable | Standard | Bedeutung |
| --- | --- | --- |
| `MXDAPI_PROXIES` | `proxies.txt` | Pool-Datei, ein Proxy pro Zeile |

## 🛰️ Hinter einem Proxy

Jede Anfrage verlässt das System über eine Proxy-Zeile aus deinem Pool; eine tote Zeile lässt diesen Versuch fehlschlagen und das Tool macht weiter. Das Panel begrenzt Code-Versendungen pro Adresse, also drossle den Lauf (ein Abstand von ~30–60 s zwischen Konten ist reichlich).

## 📄 Dateien

| Pfad | Inhalt |
| --- | --- |
| `keys.txt` | ein live-verifizierter Schlüssel pro Zeile — von Git ignoriert |
| `accounts.json` | Benutzername / Passwort / Schlüssel / Chat-Status pro Konto |
| `proxies.txt` | deine Ausgänge, einer pro Zeile — von Git ignoriert |
| `outputs/` | Laufzustand — von Git ignoriert |

## 🔌 Mit 9Router verbinden

[9Router](https://9router.com) ist ein selbst gehosteter, OpenAI-kompatibler Router. Registriere diesen Anbieter einmal und jeder Schlüssel wird zu einer Verbindung unter einem Anbieter-Knoten:

```bash
node src/connect-9router.js
```

Standardwerte: `--base http://localhost:20128`, `--password 123456`, `--name "MXDAPI"`, `--prefix mxdapi`, `--base-url https://mxdapi.com/v1`. Modelle werden dann als `mxdapi/<model id>` bereitgestellt und über jeden Schlüssel lastverteilt.

## 🔌 Mit OmniRoute verbinden

[OmniRoute](https://omniroute.online) ist ein selbst gehosteter, OpenAI-kompatibler Router. Registriere diesen Anbieter einmal und jeder Schlüssel wird zu einer Verbindung unter einem Anbieter-Knoten:

```bash
node src/connect-omniroute.js
```

Standardwerte: `--base http://localhost:20128`, `--password 123456`, `--name "MXDAPI"`, `--prefix mxdapi`, `--base-url https://mxdapi.com/v1`. Modelle werden dann als `mxdapi/<model id>` bereitgestellt und über jeden Schlüssel lastverteilt.
## 🔑 Was ein Schlüssel dir bringt

| | |
| --- | --- |
| 🏢 Anbieter | **MXDAPI (模型岛)** — [mxdapi.com](https://mxdapi.com) |
| 🎁 Was der Anbieter gibt | ein Konto pro Schlüssel — E-Mail-Code-Registrierung, jeder Schlüssel chat-verifiziert |
| 🔑 Was ein Schlüssel dir bringt | ein API-Schlüssel, der auf sein eigenes Konto beschränkt ist: die 4 Modell-IDs am unten stehenden Endpunkt, im Rahmen der Limits deines Tarifs. Das Kontingent liegt auf dem **Konto**, weshalb dieses Tool genau ein Konto pro Schlüssel erstellt |
| 🌐 API-Form | OpenAI-kompatibel: `POST https://mxdapi.com/v1/chat/completions` |
| 🔒 Deine Daten | nur mxdapi.com und das von dir konfigurierte Inbox-Backend werden kontaktiert; Schlüssel bleiben auf deinem Rechner |

## 🐞 Probleme

Wenn das Panel seine Registrierungsform, Gruppen oder das Guthaben ändert, stoppt das Tool an diesem Schritt und sagt es dir. **[Öffne ein Issue](../../issues)** mit dem ausgeführten Befehl und der exakten Ausgabe; PRs sind willkommen.

## 📄 Lizenz

MIT © 2026 — siehe [LICENSE](LICENSE).

<div align="center">

**[MIT](LICENSE)** © 2026 mxdapi-bulk-apikey contributors

</div>