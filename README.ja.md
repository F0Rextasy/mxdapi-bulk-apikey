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

> **Turbo を推奨（5 worker）。それ以上は非力なマシンでは負荷・BAN のリスクあり。**

**MXDAPI（模型岛）のアカウントを自動生成した API キー付きで一括作成 — OpenAI 互換の推論 + 9Router コネクタ。**

[![Node](https://img.shields.io/badge/Node-%E2%89%A518-3DA639?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![Dependencies](https://img.shields.io/badge/dependencies-0-blue?style=for-the-badge)](#)
[![License](https://img.shields.io/badge/license-MIT-6ea8fe?style=for-the-badge)](LICENSE)
[![Models](https://img.shields.io/badge/models-4%20served-412991?style=for-the-badge)](https://mxdapi.com)
[![9Router](https://img.shields.io/badge/9Router-connector-8B5CF6?style=for-the-badge)](#-connect-to-9router)
[![OmniRoute](https://img.shields.io/badge/OmniRoute-connector-8B5CF6?style=for-the-badge)](#-connect-to-omniroute)
[![X](https://img.shields.io/badge/X-%40bigbullapp-000000?style=for-the-badge&logo=x&logoColor=white)](https://x.com/bigbullapp)

[🛠 クイックスタート](#-quick-start) · [🎁 無料枠](#-free-tier--how-much-you-get) · [🤖 モデル](#-models--all-4-of-them) · [🧪 API の使い方](#-how-to-use-the-api) · [✅ 検証済み](#-verified-working--every-key-is-tested) · [🧭 仕組み](#-how-it-works) · [🔌 9Router](#-connect-to-9router) · [⚙️ オプション](#️-cli-options) · [🛰️ プロキシ](#️-behind-a-proxy) · [🐞 問題報告](#-issues)

</div>

<div align="center">

**English** · [Türkçe](README.tr.md) · [中文](README.cn.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Русский](README.ru.md) · [Português](README.pt.md)

</div>

---

## ✨ これが存在する理由

MXDAPI（模型岛）は New API パネルで、シンプルな**メールコードによるサインアップ**（Turnstile 無効、パスワード登録は開放）を採用しており、サインアップ特典は **¥1**（「注册送1刀」、招待した友達ごとにさらに ¥3）、そしてグループごとのモデルカタログがあります。有用な単位は*キーごとに 1 アカウント*であり、このツールはそれを `keys.txt` に変えます。そこでは**すべての行が実際のチャット呼び出しを通過しています**。

## 🎁 無料枠 — いくらもらえるか

**新しいアカウントにはすべてサインアップ特典が付きます** — カード不要、キャプチャなし。

| 項目 | 値 |
| --- | --- |
| サインアップ特典 | **¥1**（`注册送1刀`） |
| 招待ボーナス | 招待者に ¥3 / 被招待者に ¥2（パネルの告知による） |
| カード要否 | **不要** |
| 毎日のチェックイン | このパネルでは有効化されていません |
| サインアップ | メールコード（ドットなし gmail は通過、**エイリアスは拒否されます**） |
| スケールする単位 | **1 アカウント = 1 キー** → `--count N` は実質「N 個の無料アカウント」 |

> 💡 無料枠は MXDAPI（模型岛）が設定するもので、変更される可能性があります。最新の数値は [mxdapi.com](https://mxdapi.com) で確認してください — そしてツール自身のゲートに判断を委ねましょう:

```bash
node src/cli.js --verify-only     # keys.txt のすべてのキーが実際のチャット呼び出しで再テストされます
```

## 🤖 モデル — 全 4 種類

カタログは**グループに紐づきます**: 新しいアカウントは `vip` に入り、そこにはチャネルが何もありません — ツールはテスト前に各トークンを稼働中のグループ（`deepseek`、`gemini`、`Grok`、`kiro`、`claude max`）にバインドします。検証済みのライブ ID: `deepseek-v4.1-flash`、`grok-4.5`、`claude-sonnet-5`、`gemini-3.8-flash`。`GET /v1/models` はトークングループごとに提供されます。

|モデル|✓|
|---|---|
|`deepseek-v4.1-flash`|✓|
|`grok-4.5`|✓|
|`claude-sonnet-5`|✓|
|`gemini-3.8-flash`|✓|

## 🧪 API の使い方

ベース URL は **`https://mxdapi.com/v1`** — OpenAI 互換（New API パネル）なので、OpenAI を扱えるものなら何でも動作します。

```bash
curl https://mxdapi.com/v1/chat/completions \
  -H "Authorization: Bearer <your key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"deepseek-v4.1-flash","messages":[{"role":"user","content":"hi"}],"max_tokens":8}'
```

任意のエージェントや SDK（Cursor、OpenCode、Kilo Code など）でベース URL を設定し、上記のカタログから任意のモデル ID を選んでください。

## 🛠 クイックスタート

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

`keys.txt` は、実際のチャット補完がキーを証明した**後にのみ**書き込まれます。

### 🖱️ ランチャー

ランチャーはプロキシリスト、カウント、検証モデルを尋ね、それらを `launcher.config.json` に記憶し、適切なフラグで CLI を実行します。

## ✅ 動作検証済み — すべてのキーがテストされます

| チェック | 結果 |
| --- | --- |
| `GET /api/verification?email=<gmail>` | **200** — 6 桁の 16 進コードを送信（ドットなし gmail は通過、エイリアスは拒否） |
| `POST /api/user/register` | **200** — アカウントはグループ `vip` に入ります |
| `GET /api/user/groups` | **200** — モデルグループを一覧表示（`deepseek`、`gemini`、`Grok`、`kiro`、`claude max` など） |
| `POST /api/token/ {"group":"<group>"}` | **200** — トークンを稼働中のグループにバインド（このフォークでは書き込みに `x-requested-with: XMLHttpRequest` が必要） |
| `POST /v1/chat/completions` — 書き込まれる前に**すべての**キーに対して実行 | 実際のコンテンツとともに **200** |
| チャットチェックに失敗したキー | `keys.txt` には決して書き込まれません — アカウントは `accounts.json` で復元可能なままです |

いつでも再チェックできます:

```bash
node src/cli.js --verify-only
```

## 🧭 仕組み

```
inbox (one address per account)                                  a fresh address per account
   │
   ├─▶ sign-up: MXDAPI (模型岛) page → e-mail address → code / link from the inbox
   ├─▶ session: the account's cookies or access token in hand
   ├─▶ key mint: the account's key endpoint → plaintext key returned once (written to disk immediately)
   └─▶ live proof: POST https://mxdapi.com/v1/chat/completions → real content = the key is live
```

| ステップ | 呼び出し | 備考 |
| --- | --- | --- |
| コード | コード送信（メール） | ドットなし gmail は動作、エイリアスアドレスはパネルに拒否されます |
| サインアップ | 登録 | パスワード登録は開放、Turnstile はオフ |
| サインイン | ログイン | セッション Cookie（このフォーク） |
| トークン | `{"group":"deepseek"}` 形式のバインドでトークンを作成 | 稼働中のグループがないと、キーは `503 分组 … 无可用渠道` を返します |
| キー | トークン行 / エンドポイントで表示 | 平文キー |
| チェック | `POST /v1/chat/completions` | `keys.txt` の前にライブ 200 が必須 |

## ⚙️ CLI オプション

```bash
node src/cli.js --host=mxdapi.com --count N   # mint (default 50)
node src/cli.js --verify-only                 # re-check every key in keys.txt
node src/cli.js --help
```

| 環境変数 | デフォルト | 意味 |
| --- | --- | --- |
| `MXDAPI_PROXIES` | `proxies.txt` | プールファイル、1 行に 1 プロキシ |

## 🛰️ プロキシの背後で

すべてのリクエストはプールからのプロキシ行を通って出ていきます。死んだ行はその試行を失敗させ、ツールは次に進みます。パネルはアドレスごとにコード送信をレート制限するので、実行のペースを調整してください（アカウント間に約 30〜60 秒の間隔で十分です）。

## 📄 ファイル

| パス | 内容 |
| --- | --- |
| `keys.txt` | 1 行に 1 つのライブ検証済みキー — git 無視 |
| `accounts.json` | アカウントごとのユーザー名 / パスワード / キー / チャットステータス |
| `proxies.txt` | あなたの出口、1 行に 1 つ — git 無視 |
| `outputs/` | 実行状態 — git 無視 |

## 🔌 9Router に接続

[9Router](https://9router.com) はセルフホスト型の OpenAI 互換ルーターです。このプロバイダを一度登録すれば、すべてのキーが 1 つのプロバイダノードの下の接続になります:

```bash
node src/connect-9router.js
```

デフォルト: `--base http://localhost:20128`、`--password 123456`、`--name "MXDAPI"`、`--prefix mxdapi`、`--base-url https://mxdapi.com/v1`。モデルは `mxdapi/<model id>` として提供され、すべてのキー間で負荷分散されます。

## 🔌 OmniRoute に接続

[OmniRoute](https://omniroute.online) はセルフホスト型の OpenAI 互換ルーターです。このプロバイダを一度登録すれば、すべてのキーが 1 つのプロバイダノードの下の接続になります:

```bash
node src/connect-omniroute.js
```

デフォルト: `--base http://localhost:20128`、`--password 123456`、`--name "MXDAPI"`、`--prefix mxdapi`、`--base-url https://mxdapi.com/v1`。モデルは `mxdapi/<model id>` として提供され、すべてのキー間で負荷分散されます。
## 🔑 1 つのキーで得られるもの

| | |
| --- | --- |
| 🏢 プロバイダ | **MXDAPI（模型岛）** — [mxdapi.com](https://mxdapi.com) |
| 🎁 プロバイダが提供するもの | キーごとに 1 アカウント — メールコードサインアップ、すべてのキーがチャット検証済み |
| 🔑 1 つのキーで得られるもの | 自身のアカウントにスコープされた 1 つの API キー: 下記エンドポイントの 4 つのモデル ID を、あなたのプランの制限内で。クォータは**アカウント**に存在し、まさにそれがこのツールがキーごとに 1 アカウントを作成する理由です |
| 🌐 API 形式 | OpenAI 互換: `POST https://mxdapi.com/v1/chat/completions` |
| 🔒 あなたのデータ | 接触するのは mxdapi.com と、あなたが設定した inbox バックエンドのみ。キーはあなたのマシンに留まります |

## 🐞 問題報告

パネルがサインアップの形、グループ、特典を変更した場合、ツールはそのステップで停止し、その旨を伝えます。実行したコマンドと正確な出力を添えて **[issue を作成してください](../../issues)**。PR も歓迎します。

## 📄 ライセンス

MIT © 2026 — [LICENSE](LICENSE) を参照。

<div align="center">

**[MIT](LICENSE)** © 2026 mxdapi-bulk-apikey contributors

</div>