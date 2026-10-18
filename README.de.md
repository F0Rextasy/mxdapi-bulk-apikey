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

**Massenhafte Erstellung von MXDAPI- (模型岛-) Konten mit automatisch generierten API-Schlüsseln — OpenAI-kompatible Inferenz + 9Router-Connector.**

[![Node](https://img.shields.io/badge/Node-%E2%89%A518-3DA639?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![Dependencies](https://img.shields.io/badge/dependencies-0-blue?style=for-the-badge)](#)
[![License](https://img.shields.io/badge/license-MIT-6ea8fe?style=for-the-badge)](LICENSE)
[![Models](https://img.shields.io/badge/models-4%20served-412991?style=for-the-badge)](https://mxdapi.com)
[![9Router](https://img.shields.io/badge/9Router-connector-8B5CF6?style=for-the-badge)](#-connect-to-9router)
[![X](https://img.shields.io/badge/X-%40bigbullapp-000000?style=for-the-badge&logo=x&logoColor=white)](https://x.com/bigbullapp)

[🛠 Schnellstart](#-quick-start) · [🎁 Kostenloses Kontingent](#-free-tier--how-much-you-get) · [🤖 Modelle](#-models--all-4-of-them) · [🧪 API verwenden](#-how-to-use-the-api) · [✅ Verifiziert](#-verified-working--every-key-is-tested) · [🧭 Funktionsweise](#-how-it-works) · [🔌 9Router](#-connect-to-9router) · [⚙️ Optionen](#️-cli-options) · [🛰️ Proxys](#️-behind-a-proxy) · [🐞 Probleme](#-issues)

</div>

<div align="center">

**English** · [Türkçe](README.tr.md) · [中文](README.cn.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Русский](README.ru.md) · [Português](README.pt.md)

</div>




---

## ✨ Warum es dieses Projekt gibt

MXDAPI (模型岛) ist ein New-API-Panel mit einer schlichten **Registrierung per E-Mail-Code** (Turnstile deaktiviert, Registrierung per Passwort möglich), einem Registrierungsguthaben von **¥1** („注册送1刀“, plus ¥3 für jeden eingeladenen Freund) und Modellkatalogen pro Gruppe. Die nützliche Einheit ist *ein Konto pro Schlüssel*, und dieses Tool erstellt daraus eine `keys.txt`, in der **jede Zeile einen Live-Chat-Aufruf überstanden hat**.

## 🎁 Kostenloses Kontingent — wie viel du bekommst

**Jedes neue Konto erhält ein Registrierungsguthaben** — keine Karte, kein Captcha.

| Was | Wert |
| --- | --- |
| Registrierungsguthaben | **¥1** (`注册送1刀`) |
| Einladungsboni | ¥3 für den Einladenden / ¥2 für den Eingeladenen (laut Ankündigung des Panels) |
| Karte erforderlich | **Nein** |
| Täglicher Check-in | in diesem Panel nicht aktiviert |
| Registrierung | E-Mail-Code (Gmail ohne Punkte funktioniert; **Aliase werden abgelehnt**) |
| Die skalierende Einheit | **ein Konto = ein Schlüssel** → `--count N` bedeutet tatsächlich „N kostenlose Konten“ |

> 💡 Das kostenlose Kontingent wird von MXDAPI (模型岛) festgelegt und kann sich ändern. Prüfe die aktuellen Zahlen auf [mxdapi.com](https://mxdapi.com) — und überlasse die Entscheidung dem eigenen Gate des Tools:

```bash
node src/cli.js --verify-only     # every key in keys.txt is re-tested with a real chat call
```

## 🤖 Modelle — alle 4

Der Katalog ist **an Gruppen gebunden**: Ein neues Konto landet in `vip`, wo es keine Kanäle gibt — das Tool bindet jedes Token vor dem Test an eine aktive Gruppe (`deepseek`, `gemini`, `Grok`, `kiro`, `claude max`). Verifizierte Live-IDs: `deepseek-v4.1-flash`, `grok-4.5`, `claude-sonnet-5`, `gemini-3.8-flash`. `GET /v1/models` wird pro Token-Gruppe bereitgestellt.

## 🧪 So verwendest du die API

Die Basis-URL lautet **`https://mxdapi.com/v1`** — OpenAI-kompatibel (New-API-Panel), daher funktioniert alles, was OpenAI unterstützt.

```bash
curl https://mxdapi.com/v1/chat/completions \
  -H "Authorization: Bearer <your key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"deepseek-v4.1-flash","messages":[{"role":"user","content":"hi"}],"max_tokens":8}'
```

Lege die Basis-URL in jedem Agenten oder SDK (Cursor, OpenCode, Kilo Code, …) fest und wähle eine beliebige Modell-ID aus dem obigen Katalog.

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

`keys.txt` wird **erst geschrieben, nachdem eine Live-Chat-Vervollständigung den Schlüssel bestätigt hat**.

### 🖱️ Der Launcher

Der Launcher fragt nach Proxy-Liste, Anzahl und Verifizierungsmodell, speichert diese in `launcher.config.json` und führt die CLI mit den passenden Flags aus.

## ✅ Funktioniert verifiziert — jeder Schlüssel wird getestet

| Prüfung | Ergebnis |
| --- | --- |
| `GET /api/verification?email=<gmail>` | **200** — sendet einen 6-stelligen Hex-Code (Gmail ohne Punkte funktioniert; Aliase werden abgelehnt) |
| `POST /api/user/register` | **200** — das Konto landet in der Gruppe `vip` |
| `GET /api/user/groups` | **200** — listet die Modellgruppen (`deepseek`, `gemini`, `Grok`, `kiro`, `claude max`, …) |
| `POST /api/token/ {"group":"<group>"}` | **200** — bindet das Token an eine aktive Gruppe (Schreibvorgänge benötigen in diesem Fork `x-requested-with: XMLHttpRequest`) |
| `POST /v1/chat/completions` — wird für **jeden** Schlüssel ausgeführt, bevor er geschrieben wird | **200** mit echtem Inhalt |
| ein Schlüssel, der seine Chat-Prüfung nicht besteht | wird niemals in `keys.txt` geschrieben — das Konto bleibt in `accounts.json` wiederherstellbar |

Erneut prüfen kannst du jederzeit:

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
| Code | send-code (E-Mail) | Gmail ohne Punkte funktioniert; Alias-Adressen werden vom Panel abgelehnt |
| Registrierung | register | Registrierung per Passwort ist möglich; Turnstile ist deaktiviert |
| Anmeldung | login | Sitzungs-Cookie (dieser Fork) |
| Token | Token mit einer Bindung im Stil von `{"group":"deepseek"}` erstellen | Ohne eine aktive Gruppe antwortet der Schlüssel mit `503 分组 … 无可用渠道` |
| Schlüssel | In der Token-Zeile / über den Endpunkt anzeigen | Schlüssel im Klartext |
| Prüfung | `POST /v1/chat/completions` | Vor `keys.txt` ist ein aktiver 200-Status erforderlich |

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

Jede Anfrage wird über eine Proxy-Zeile aus deinem Pool gesendet; eine nicht funktionierende Zeile lässt diesen Versuch scheitern, woraufhin das Tool fortfährt. Das Panel begrenzt die Anzahl der Code-Anfragen pro Adresse, daher solltest du den Ablauf verlangsamen (ein Abstand von etwa 30–60 Sekunden zwischen Konten ist ausreichend).

## 📄 Dateien

| Pfad | Inhalt |
| --- | --- |
| `keys.txt` | ein live verifizierter Schlüssel pro Zeile — von Git ignoriert |
| `accounts.json` | Benutzername / Passwort / Schlüssel / Chat-Status pro Konto |
| `proxies.txt` | deine Exit-Proxys, einer pro Zeile — von Git ignoriert |
| `outputs/` | Laufstatus — von Git ignoriert |

## 🔌 Mit 9Router verbinden

[9Router](https://9router.com) ist ein selbst gehosteter, OpenAI-kompatibler Router. Registriere diesen Anbieter einmal, und jeder Schlüssel wird zu einer Verbindung unter einem einzigen Provider-Knoten:

```bash
node src/connect-9router.js
```

Standardeinstellungen: `--base http://localhost:20128`, `--password 123456`, `--name "MXDAPI"`, `--prefix mxdapi`, `--base-url https://mxdapi.com/v1`. Modelle werden anschließend als `mxdapi/<model id>` bereitgestellt und über alle Schlüssel verteilt.

## 🔑 Was dir ein Schlüssel bietet

| | |
| --- | --- |
| 🏢 Anbieter | **MXDAPI (模型岛)** — [mxdapi.com](https://mxdapi.com) |
| 🎁 Was der Anbieter bereitstellt | ein Konto pro Schlüssel — Registrierung per E-Mail-Code, jeder Schlüssel wird per Chat verifiziert |
| 🔑 Was dir ein Schlüssel bietet | einen API-Schlüssel, der auf sein eigenes Konto beschränkt ist: die 4 Modell-IDs des untenstehenden Endpunkts innerhalb der Grenzen deines Tarifs. Das Kontingent liegt auf dem **Konto** — genau deshalb erstellt dieses Tool ein Konto pro Schlüssel |
| 🌐 API-Format | OpenAI-kompatibel: `POST https://mxdapi.com/v1/chat/completions` |
| 🔒 Deine Daten | Es werden nur mxdapi.com und das von dir konfigurierte Posteingangs-Backend kontaktiert; die Schlüssel bleiben auf deinem Rechner |

## 🐞 Probleme

Wenn das Panel seine Registrierungsstruktur, Gruppen oder sein Guthaben ändert, stoppt das Tool an diesem Schritt und weist darauf hin. **[Eröffne ein Issue](../../issues)** mit dem ausgeführten Befehl und der exakten Ausgabe; Pull Requests sind willkommen.

## 📄 Lizenz

MIT © 2026 — siehe [LICENSE](LICENSE).

<div align="center">

**[MIT](LICENSE)** © 2026 mxdapi-bulk-apikey contributors

</div>