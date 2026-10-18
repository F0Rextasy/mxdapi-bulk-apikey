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

**批量创建 MXDAPI（模型岛）账户并自动生成 API 密钥 — 兼容 OpenAI 的推理接口 + 9Router 连接器。**

[![Node](https://img.shields.io/badge/Node-%E2%89%A518-3DA639?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![依赖](https://img.shields.io/badge/dependencies-0-blue?style=for-the-badge)](#)
[![许可证](https://img.shields.io/badge/license-MIT-6ea8fe?style=for-the-badge)](LICENSE)
[![模型](https://img.shields.io/badge/models-4%20served-412991?style=for-the-badge)](https://mxdapi.com)
[![9Router](https://img.shields.io/badge/9Router-connector-8B5CF6?style=for-the-badge)](#-connect-to-9router)
[![X](https://img.shields.io/badge/X-%40bigbullapp-000000?style=for-the-badge&logo=x&logoColor=white)](https://x.com/bigbullapp)

[🛠 快速开始](#-quick-start) · [🎁 免费额度](#-free-tier--how-much-you-get) · [🤖 模型](#-models--all-4-of-them) · [🧪 使用 API](#-how-to-use-the-api) · [✅ 已验证](#-verified-working--every-key-is-tested) · [🧭 工作原理](#-how-it-works) · [🔌 9Router](#-connect-to-9router) · [⚙️ 选项](#️-cli-options) · [🛰️ 代理](#️-behind-a-proxy) · [🐞 问题](#-issues)

</div>

<div align="center">

**English** · [Türkçe](README.tr.md) · [中文](README.cn.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Русский](README.ru.md) · [Português](README.pt.md)

</div>




---

## ✨ 为什么会有这个项目

MXDAPI（模型岛）是一个新的 API 面板，提供简单的**邮箱验证码注册**（已禁用 Turnstile，开放密码注册），注册赠送 **¥1**（“注册送1刀”，每邀请一位好友另外赠送 ¥3），并按组提供模型目录。真正有用的单位是*每个密钥对应一个账户*，而此工具会将其转换为 `keys.txt`，其中**每一行都经过了实时聊天调用验证**。

## 🎁 免费额度 — 你能获得多少

**每个新账户都会获得注册额度**——无需银行卡，无需验证码。

| 项目 | 数值 |
| --- | --- |
| 注册额度 | **¥1**（`注册送1刀`） |
| 邀请奖励 | 邀请者 ¥3 / 被邀请者 ¥2（以面板公告为准） |
| 是否需要银行卡 | **否** |
| 每日签到 | 此面板未启用 |
| 注册方式 | 邮箱验证码（无点 gmail 可通过；**别名会被拒绝**） |
| 可扩展的单位 | **一个账户 = 一个密钥** → `--count N` 实际上就是“N 个免费账户” |

> 💡 免费额度由 MXDAPI（模型岛）设定，可能会发生变化。请在 [mxdapi.com](https://mxdapi.com) 查看实时数据——并让工具自身的检查机制作出判断：

```bash
node src/cli.js --verify-only     # 对 keys.txt 中的每个密钥重新进行真实聊天调用测试
```

## 🤖 模型 — 全部 4 个

模型目录是**绑定分组的**：新账户会进入 `vip`，该组没有任何可用渠道——工具会在测试前将每个令牌绑定到一个可用分组（`deepseek`、`gemini`、`Grok`、`kiro`、`claude max`）。已验证的实时 ID：`deepseek-v4.1-flash`、`grok-4.5`、`claude-sonnet-5`、`gemini-3.8-flash`。`GET /v1/models` 会根据令牌所属分组提供模型列表。

## 🧪 如何使用 API

基础 URL 是 **`https://mxdapi.com/v1`**——兼容 OpenAI（New API 面板），因此任何支持 OpenAI 的工具都可以使用。

```bash
curl https://mxdapi.com/v1/chat/completions \
  -H "Authorization: Bearer <your key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"deepseek-v4.1-flash","messages":[{"role":"user","content":"hi"}],"max_tokens":8}'
```

在任意代理或 SDK（Cursor、OpenCode、Kilo Code 等）中设置基础 URL，然后从上方目录中选择任意模型 ID。

## 🛠 快速开始

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

只有在实时聊天补全验证密钥成功后，才会写入 `keys.txt`。

### 🖱️ 启动器

启动器会询问代理列表、数量和验证模型，将它们保存在 `launcher.config.json` 中，并使用正确的参数运行 CLI。

## ✅ 已验证可用 — 每个密钥都会经过测试

| 检查项 | 结果 |
| --- | --- |
| `GET /api/verification?email=<gmail>` | **200** — 发送 6 位十六进制验证码（无点 gmail 可通过；别名会被拒绝） |
| `POST /api/user/register` | **200** — 账户会进入 `vip` 分组 |
| `GET /api/user/groups` | **200** — 列出模型分组（`deepseek`、`gemini`、`Grok`、`kiro`、`claude max` 等） |
| `POST /api/token/ {"group":"<group>"}` | **200** — 将令牌绑定到可用分组（在此分支中，写入请求需要 `x-requested-with: XMLHttpRequest`） |
| `POST /v1/chat/completions` — 写入前对**每个**密钥执行 | 返回真实内容的 **200** |
| 聊天检查失败的密钥 | 永远不会写入 `keys.txt`——账户会保留在 `accounts.json` 中，仍可恢复 |

随时重新检查：

```bash
node src/cli.js --verify-only
```

## 🧭 工作原理

```
inbox (one address per account)                                  a fresh address per account
   │
   ├─▶ sign-up: MXDAPI (模型岛) page → e-mail address → code / link from the inbox
   ├─▶ session: the account's cookies or access token in hand
   ├─▶ key mint: the account's key endpoint → plaintext key returned once (written to disk immediately)
   └─▶ live proof: POST https://mxdapi.com/v1/chat/completions → real content = the key is live
```

| 步骤 | 调用 | 说明 |
| --- | --- | --- |
| 验证码 | send-code（邮箱） | 无点 gmail 可用；别名地址会被面板拒绝 |
| 注册 | register | 开放密码注册；Turnstile 已关闭 |
| 登录 | login | 会话 Cookie（此分支） |
| 令牌 | 使用类似 `{"group":"deepseek"}` 的绑定创建令牌 | 没有可用分组时，密钥会返回 `503 分组 … 无可用渠道` |
| 密钥 | 在令牌行或端点中显示 | 明文密钥 |
| 检查 | `POST /v1/chat/completions` | 写入 `keys.txt` 前必须返回实时 200 |

## ⚙️ CLI 选项

```bash
node src/cli.js --host=mxdapi.com --count N   # mint (default 50)
node src/cli.js --verify-only                 # re-check every key in keys.txt
node src/cli.js --help
```

| 环境变量 | 默认值 | 含义 |
| --- | --- | --- |
| `MXDAPI_PROXIES` | `proxies.txt` | 代理池文件，每行一个代理 |

## 🛰️ 使用代理

每个请求都会通过代理池中的一行代理发出；失效的代理会导致本次尝试失败，工具随后继续处理。面板会限制每个地址发送验证码的频率，因此请控制运行速度（账户之间间隔约 30–60 秒即可）。

## 📄 文件

| 路径 | 内容 |
| --- | --- |
| `keys.txt` | 每行一个经过实时验证的密钥 — 已被 git 忽略 |
| `accounts.json` | 每个账户的用户名 / 密码 / 密钥 / 聊天状态 |
| `proxies.txt` | 你的出口代理，每行一个 — 已被 git 忽略 |
| `outputs/` | 运行状态 — 已被 git 忽略 |

## 🔌 连接到 9Router

[9Router](https://9router.com) 是一个自托管、兼容 OpenAI 的路由器。注册一次此提供商后，每个密钥都会成为同一个提供商节点下的一个连接：

```bash
node src/connect-9router.js
```

默认值：`--base http://localhost:20128`、`--password 123456`、`--name "MXDAPI"`、`--prefix mxdapi`、`--base-url https://mxdapi.com/v1`。之后，模型会以 `mxdapi/<model id>` 的形式提供，并在所有密钥之间进行负载均衡。

## 🔑 一个密钥能为你带来什么

| | |
| --- | --- |
| 🏢 提供商 | **MXDAPI（模型岛）** — [mxdapi.com](https://mxdapi.com) |
| 🎁 提供商提供的内容 | 每个密钥对应一个账户 — 邮箱验证码注册，每个密钥都经过聊天验证 |
| 🔑 一个密钥能为你带来什么 | 一个专属于其账户的 API 密钥：下方端点中的 4 个模型 ID，受你的套餐限制。配额属于**账户**，这正是此工具为每个密钥创建一个账户的原因 |
| 🌐 API 形式 | 兼容 OpenAI：`POST https://mxdapi.com/v1/chat/completions` |
| 🔒 你的数据 | 只会联系 mxdapi.com 和你配置的邮箱收件箱后端；密钥保留在你的计算机上 |

## 🐞 问题

如果面板更改注册方式、分组或额度，工具会在相应步骤停止并说明原因。请通过 **[提交问题](../../issues)** 提供你运行的命令和完整输出；欢迎提交 PR。

## 📄 许可证

MIT © 2026 — 参见 [LICENSE](LICENSE)。

<div align="center">

**[MIT](LICENSE)** © 2026 mxdapi-bulk-apikey 贡献者

</div>