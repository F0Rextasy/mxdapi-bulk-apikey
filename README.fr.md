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

**Création en masse de comptes MXDAPI (模型岛) avec des clés API générées automatiquement — inférence compatible avec OpenAI + connecteur 9Router.**

[![Node](https://img.shields.io/badge/Node-%E2%89%A518-3DA639?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![Dependencies](https://img.shields.io/badge/dependencies-0-blue?style=for-the-badge)](#)
[![License](https://img.shields.io/badge/license-MIT-6ea8fe?style=for-the-badge)](LICENSE)
[![Models](https://img.shields.io/badge/models-4%20served-412991?style=for-the-badge)](https://mxdapi.com)
[![9Router](https://img.shields.io/badge/9Router-connector-8B5CF6?style=for-the-badge)](#-connect-to-9router)
[![X](https://img.shields.io/badge/X-%40bigbullapp-000000?style=for-the-badge&logo=x&logoColor=white)](https://x.com/bigbullapp)

[🛠 Démarrage rapide](#-quick-start) · [🎁 Offre gratuite](#-free-tier--how-much-you-get) · [🤖 Modèles](#-models--all-4-of-them) · [🧪 Utiliser l’API](#-how-to-use-the-api) · [✅ Vérifié](#-verified-working--every-key-is-tested) · [🧭 Fonctionnement](#-how-it-works) · [🔌 9Router](#-connect-to-9router) · [⚙️ Options](#️-cli-options) · [🛰️ Proxys](#️-behind-a-proxy) · [🐞 Problèmes](#-issues)

</div>

<div align="center">

**English** · [Türkçe](README.tr.md) · [中文](README.cn.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Русский](README.ru.md) · [Português](README.pt.md)

</div>

<div align="center">

**Français** · [Türkçe](README.tr.md) · [中文](README.cn.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Русский](README.ru.md) · [Português](README.pt.md)

</div>



---

## ✨ Pourquoi ce projet existe

MXDAPI (模型岛) est un panneau New API avec une **inscription par code envoyé par e-mail** (Turnstile désactivé, inscription par mot de passe ouverte), un crédit d’inscription de **¥1** (« 注册送1刀 », plus ¥3 pour chaque ami invité) et des catalogues de modèles par groupe. L’unité utile est *un compte par clé*, et cet outil transforme cela en un fichier `keys.txt` où **chaque ligne a réussi un appel de chat en direct**.

## 🎁 Offre gratuite — ce que vous obtenez

**Chaque nouveau compte reçoit un crédit d’inscription** — sans carte ni captcha.

| Élément | Valeur |
| --- | --- |
| Crédit d’inscription | **¥1** (`注册送1刀`) |
| Bonus d’invitation | ¥3 pour l’invitant / ¥2 pour l’invité (selon l’annonce du panneau) |
| Carte requise | **Non** |
| Connexion quotidienne | non activée sur ce panneau |
| Inscription | code e-mail (gmail sans point accepté ; **les alias sont refusés**) |
| L’unité qui évolue | **un compte = une clé** → `--count N` signifie réellement « N comptes gratuits » |

> 💡 L’offre gratuite est définie par MXDAPI (模型岛) et peut changer. Consultez les chiffres en temps réel sur [mxdapi.com](https://mxdapi.com) — et laissez le propre contrôle de l’outil décider :

```bash
node src/cli.js --verify-only     # every key in keys.txt is re-tested with a real chat call
```

## 🤖 Modèles — les 4 disponibles

Le catalogue est **lié au groupe** : un compte fraîchement créé arrive dans `vip`, qui ne possède aucun canal — l’outil associe chaque jeton à un groupe actif (`deepseek`, `gemini`, `Grok`, `kiro`, `claude max`) avant le test. Identifiants actifs vérifiés : `deepseek-v4.1-flash`, `grok-4.5`, `claude-sonnet-5`, `gemini-3.8-flash`. `GET /v1/models` est fourni pour chaque groupe de jetons.

## 🧪 Comment utiliser l’API

L’URL de base est **`https://mxdapi.com/v1`** — compatible avec OpenAI (panneau New API), donc tout ce qui parle le protocole OpenAI fonctionne.

```bash
curl https://mxdapi.com/v1/chat/completions \
  -H "Authorization: Bearer <your key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"deepseek-v4.1-flash","messages":[{"role":"user","content":"hi"}],"max_tokens":8}'
```

Définissez l’URL de base dans n’importe quel agent ou SDK (Cursor, OpenCode, Kilo Code, …) et choisissez n’importe quel identifiant de modèle du catalogue ci-dessus.

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

`keys.txt` est écrit **uniquement après qu’une complétion de chat en direct a validé la clé**.

### 🖱️ Le lanceur

Le lanceur demande la liste des proxys, le nombre et le modèle de vérification, les mémorise dans `launcher.config.json`, puis exécute la CLI avec les bons paramètres.

## ✅ Fonctionnement vérifié — chaque clé est testée

| Vérification | Résultat |
| --- | --- |
| `GET /api/verification?email=<gmail>` | **200** — envoie un code à 6 caractères hexadécimaux (gmail sans point accepté ; les alias sont refusés) |
| `POST /api/user/register` | **200** — le compte arrive dans le groupe `vip` |
| `GET /api/user/groups` | **200** — répertorie les groupes de modèles (`deepseek`, `gemini`, `Grok`, `kiro`, `claude max`, …) |
| `POST /api/token/ {"group":"<group>"}` | **200** — associe le jeton à un groupe actif (les écritures nécessitent `x-requested-with: XMLHttpRequest` sur ce fork) |
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

| Étape | Appel | Notes |
| --- | --- | --- |
| code | send-code (e-mail) | gmail sans point fonctionne ; les adresses alias sont refusées par le panneau |
| inscription | register | l’inscription par mot de passe est ouverte ; Turnstile est désactivé |
| connexion | login | cookie de session (ce fork) |
| jeton | créer un jeton avec une association de type `{"group":"deepseek"}` | sans groupe actif, la clé répond `503 分组 … 无可用渠道` |
| clé | révélation sur la ligne du jeton / point de terminaison | clé en clair |
| vérification | `POST /v1/chat/completions` | un code 200 en direct est requis avant `keys.txt` |

## ⚙️ Options de la CLI

```bash
node src/cli.js --host=mxdapi.com --count N   # mint (default 50)
node src/cli.js --verify-only                 # re-check every key in keys.txt
node src/cli.js --help
```

| Variable d’environnement | Valeur par défaut | Signification |
| --- | --- | --- |
| `MXDAPI_PROXIES` | `proxies.txt` | fichier du pool, un proxy par ligne |

## 🛰️ Derrière un proxy

Chaque requête sort par une ligne de proxy de votre pool ; une ligne inactive fait échouer cette tentative et l’outil passe à la suivante. Le panneau limite la fréquence d’envoi des codes par adresse, alors espacez l’exécution (un intervalle d’environ 30 à 60 s entre les comptes suffit largement).

## 📄 Fichiers

| Chemin | Contenu |
| --- | --- |
| `keys.txt` | une clé vérifiée en direct par ligne — ignoré par git |
| `accounts.json` | nom d’utilisateur / mot de passe / clé / état du chat pour chaque compte |
| `proxies.txt` | vos sorties, une par ligne — ignoré par git |
| `outputs/` | état d’exécution — ignoré par git |

## 🔌 Se connecter à 9Router

[9Router](https://9router.com) est un routeur auto-hébergé compatible avec OpenAI. Enregistrez ce fournisseur une seule fois et chaque clé devient une connexion sous un même nœud fournisseur :

```bash
node src/connect-9router.js
```

Valeurs par défaut : `--base http://localhost:20128`, `--password 123456`, `--name "MXDAPI"`, `--prefix mxdapi`, `--base-url https://mxdapi.com/v1`. Les modèles sont ensuite fournis sous la forme `mxdapi/<model id>` et répartis sur toutes les clés.

## 🔑 Ce qu’une clé vous offre

| | |
| --- | --- |
| 🏢 Fournisseur | **MXDAPI (模型岛)** — [mxdapi.com](https://mxdapi.com) |
| 🎁 Ce que fournit le fournisseur | un compte par clé — inscription par code e-mail, chaque clé vérifiée par chat |
| 🔑 Ce qu’une clé vous offre | une clé API limitée à son propre compte : les 4 identifiants de modèle du point de terminaison ci-dessous, dans les limites de votre offre. Le quota réside sur le **compte**, ce qui explique précisément pourquoi cet outil crée un compte par clé |
| 🌐 Format de l’API | Compatible avec OpenAI : `POST https://mxdapi.com/v1/chat/completions` |
| 🔒 Vos données | seuls mxdapi.com et le service de boîte de réception que vous configurez sont contactés ; les clés restent sur votre machine |

## 🐞 Problèmes

Si le panneau modifie son processus d’inscription, ses groupes ou son crédit, l’outil s’arrête à cette étape et vous l’indique. **[Ouvrir un problème](../../issues)** en précisant la commande exécutée et la sortie exacte ; les PR sont les bienvenues.

## 📄 Licence

MIT © 2026 — voir [LICENSE](LICENSE).

<div align="center">

**[MIT](LICENSE)** © 2026 contributeurs de mxdapi-bulk-apikey

</div>