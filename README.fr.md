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

> **Turbo recommandé (5 workers) ; davantage présente un risque de charge/ban sur une machine faible.**

**Création en masse de comptes MXDAPI (模型岛) avec clés API générées automatiquement — inférence compatible OpenAI + connecteur 9Router.**

[![Node](https://img.shields.io/badge/Node-%E2%89%A518-3DA639?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![Dependencies](https://img.shields.io/badge/dependencies-0-blue?style=for-the-badge)](#)
[![License](https://img.shields.io/badge/license-MIT-6ea8fe?style=for-the-badge)](LICENSE)
[![Models](https://img.shields.io/badge/models-4%20served-412991?style=for-the-badge)](https://mxdapi.com)
[![9Router](https://img.shields.io/badge/9Router-connector-8B5CF6?style=for-the-badge)](#-connect-to-9router)
[![OmniRoute](https://img.shields.io/badge/OmniRoute-connector-8B5CF6?style=for-the-badge)](#-connect-to-omniroute)
[![X](https://img.shields.io/badge/X-%40bigbullapp-000000?style=for-the-badge&logo=x&logoColor=white)](https://x.com/bigbullapp)

[🛠 Démarrage rapide](#-quick-start) · [🎁 Offre gratuite](#-free-tier--how-much-you-get) · [🤖 Modèles](#-models--all-4-of-them) · [🧪 Utiliser l'API](#-how-to-use-the-api) · [✅ Vérifié](#-verified-working--every-key-is-tested) · [🧭 Fonctionnement](#-how-it-works) · [🔌 9Router](#-connect-to-9router) · [⚙️ Options](#️-cli-options) · [🛰️ Proxys](#️-behind-a-proxy) · [🐞 Problèmes](#-issues)

</div>

<div align="center">

**English** · [Türkçe](README.tr.md) · [中文](README.cn.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Русский](README.ru.md) · [Português](README.pt.md)

</div>

---

## ✨ Pourquoi cet outil existe

MXDAPI (模型岛) est un panneau New API avec une **inscription simple par e-mail et code** (Turnstile désactivé, inscription par mot de passe ouverte), un crédit d'inscription de **¥1** (« 注册送1刀 », plus ¥3 pour chaque ami invité), et des catalogues de modèles par groupe. L'unité utile est *un compte par clé*, et cet outil transforme cela en un `keys.txt` où **chaque ligne a survécu à un appel de chat en direct**.

## 🎁 Offre gratuite — ce que vous obtenez

**Chaque nouveau compte reçoit un crédit d'inscription** — sans carte, sans captcha.

| Élément | Valeur |
| --- | --- |
| Crédit d'inscription | **¥1** (`注册送1刀`) |
| Bonus de parrainage | ¥3 pour le parrain / ¥2 pour le filleul (selon l'annonce du panneau) |
| Carte requise | **Non** |
| Pointage quotidien | non activé sur ce panneau |
| Inscription | e-mail + code (les gmail sans point passent ; **les alias sont rejetés**) |
| L'unité qui monte en charge | **un compte = une clé** → `--count N` signifie en réalité « N comptes gratuits » |

> 💡 L'offre gratuite est définie par MXDAPI (模型岛) et peut changer. Vérifiez les chiffres en direct sur [mxdapi.com](https://mxdapi.com) — et laissez le contrôle de l'outil décider :

```bash
node src/cli.js --verify-only     # every key in keys.txt is re-tested with a real chat call
```

## 🤖 Modèles — les 4 au complet

Le catalogue est **lié au groupe** : un nouveau compte arrive dans `vip`, qui n'a de canaux pour rien — l'outil lie chaque jeton à un groupe actif (`deepseek`, `gemini`, `Grok`, `kiro`, `claude max`) avant de tester. Identifiants vérifiés en direct : `deepseek-v4.1-flash`, `grok-4.5`, `claude-sonnet-5`, `gemini-3.8-flash`. `GET /v1/models` est servi par groupe de jeton.

|Modèle|✓|
|---|---|
|`deepseek-v4.1-flash`|✓|
|`grok-4.5`|✓|
|`claude-sonnet-5`|✓|
|`gemini-3.8-flash`|✓|

## 🧪 Comment utiliser l'API

L'URL de base est **`https://mxdapi.com/v1`** — compatible OpenAI (panneau New API), donc tout ce qui parle OpenAI fonctionne.

```bash
curl https://mxdapi.com/v1/chat/completions \
  -H "Authorization: Bearer <your key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"deepseek-v4.1-flash","messages":[{"role":"user","content":"hi"}],"max_tokens":8}'
```

Définissez l'URL de base dans n'importe quel agent ou SDK (Cursor, OpenCode, Kilo Code, …) et choisissez n'importe quel identifiant de modèle dans le catalogue ci-dessus.

## 🛠 Démarrage rapide

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

`keys.txt` n'est écrit **qu'**après qu'une complétion de chat en direct a prouvé la clé.

### 🖱️ Le lanceur

Le lanceur demande la liste de proxys, le nombre et le modèle de vérification, les mémorise dans `launcher.config.json`, et exécute le CLI avec les bons drapeaux.

## ✅ Vérifié fonctionnel — chaque clé est testée

| Vérification | Résultat |
| --- | --- |
| `GET /api/verification?email=<gmail>` | **200** — envoie un code à 6 caractères hexadécimaux (les gmail sans point passent ; les alias sont rejetés) |
| `POST /api/user/register` | **200** — le compte arrive dans le groupe `vip` |
| `GET /api/user/groups` | **200** — liste les groupes de modèles (`deepseek`, `gemini`, `Grok`, `kiro`, `claude max`, …) |
| `POST /api/token/ {"group":"<group>"}` | **200** — lie le jeton à un groupe actif (les écritures nécessitent `x-requested-with: XMLHttpRequest` sur ce fork) |
| `POST /v1/chat/completions` — exécuté pour **chaque** clé avant son écriture | **200** avec du contenu réel |
| une clé qui échoue à sa vérification de chat | jamais écrite dans `keys.txt` — le compte reste récupérable dans `accounts.json` |

Revérifiez à tout moment :

```bash
node src/cli.js --verify-only
```

## 🧭 Fonctionnement

```
inbox (one address per account)                                  a fresh address per account
   │
   ├─▶ sign-up: MXDAPI (模型岛) page → e-mail address → code / link from the inbox
   ├─▶ session: the account's cookies or access token in hand
   ├─▶ key mint: the account's key endpoint → plaintext key returned once (written to disk immediately)
   └─▶ live proof: POST https://mxdapi.com/v1/chat/completions → real content = the key is live
```

| Étape | Appel | Remarques |
| --- | --- | --- |
| code | envoi de code (e-mail) | les gmail sans point fonctionnent ; les adresses alias sont rejetées par le panneau |
| inscription | register | l'inscription par mot de passe est ouverte ; Turnstile est désactivé |
| connexion | login | cookie de session (ce fork) |
| jeton | créer un jeton avec une liaison du type `{"group":"deepseek"}` | sans groupe actif, la clé répond `503 分组 … 无可用渠道` |
| clé | révéler sur la ligne du jeton / l'endpoint | clé en clair |
| vérification | `POST /v1/chat/completions` | un 200 en direct est requis avant `keys.txt` |

## ⚙️ Options du CLI

```bash
node src/cli.js --host=mxdapi.com --count N   # mint (default 50)
node src/cli.js --verify-only                 # re-check every key in keys.txt
node src/cli.js --help
```

| Variable d'environnement | Défaut | Signification |
| --- | --- | --- |
| `MXDAPI_PROXIES` | `proxies.txt` | fichier de pool, un proxy par ligne |

## 🛰️ Derrière un proxy

Chaque requête sort via une ligne de proxy de votre pool ; une ligne morte fait échouer cette tentative et l'outil passe à la suivante. Le panneau limite l'envoi de codes par adresse, donc cadencez l'exécution (un intervalle de ~30–60 s entre les comptes suffit largement).

## 📄 Fichiers

| Chemin | Contenu |
| --- | --- |
| `keys.txt` | une clé vérifiée en direct par ligne — ignoré par git |
| `accounts.json` | nom d'utilisateur / mot de passe / clé / statut de chat par compte |
| `proxies.txt` | vos sorties, une par ligne — ignoré par git |
| `outputs/` | état d'exécution — ignoré par git |

## 🔌 Connexion à 9Router

[9Router](https://9router.com) est un routeur auto-hébergé, compatible OpenAI. Enregistrez ce fournisseur une fois et chaque clé devient une connexion sous un même nœud fournisseur :

```bash
node src/connect-9router.js
```

Valeurs par défaut : `--base http://localhost:20128`, `--password 123456`, `--name "MXDAPI"`, `--prefix mxdapi`, `--base-url https://mxdapi.com/v1`. Les modèles sont alors servis sous `mxdapi/<model id>` et répartis en charge sur toutes les clés.

## 🔌 Connexion à OmniRoute

[OmniRoute](https://omniroute.online) est un routeur auto-hébergé, compatible OpenAI. Enregistrez ce fournisseur une fois et chaque clé devient une connexion sous un même nœud fournisseur :

```bash
node src/connect-omniroute.js
```

Valeurs par défaut : `--base http://localhost:20128`, `--password 123456`, `--name "MXDAPI"`, `--prefix mxdapi`, `--base-url https://mxdapi.com/v1`. Les modèles sont alors servis sous `mxdapi/<model id>` et répartis en charge sur toutes les clés.
## 🔑 Ce qu'une clé vous apporte

| | |
| --- | --- |
| 🏢 Fournisseur | **MXDAPI (模型岛)** — [mxdapi.com](https://mxdapi.com) |
| 🎁 Ce que le fournisseur offre | un compte par clé — inscription par e-mail et code, chaque clé vérifiée par chat |
| 🔑 Ce qu'une clé vous apporte | une clé API limitée à son propre compte : les 4 identifiants de modèles sur l'endpoint ci-dessous, dans les limites de votre offre. Le quota est rattaché au **compte**, ce qui explique précisément pourquoi cet outil crée un compte par clé |
| 🌐 Forme de l'API | compatible OpenAI : `POST https://mxdapi.com/v1/chat/completions` |
| 🔒 Vos données | seuls mxdapi.com et le backend de boîte de réception que vous configurez sont contactés ; les clés restent sur votre machine |

## 🐞 Problèmes

Si le panneau modifie la forme de son inscription, ses groupes ou son crédit, l'outil s'arrête à cette étape et le signale. **[Ouvrez un ticket](../../issues)** avec la commande exécutée et la sortie exacte ; les PR sont bienvenues.

## 📄 Licence

MIT © 2026 — voir [LICENSE](LICENSE).

<div align="center">

**[MIT](LICENSE)** © 2026 mxdapi-bulk-apikey contributors

</div>