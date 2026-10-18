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

> **Turbo é recomendado (5 workers); mais do que isso é risco de carga/ban em computadores fracos.**

**Crie contas MXDAPI (模型岛) em massa com chaves de API geradas automaticamente — inferência compatível com OpenAI + conector 9Router.**

[![Node](https://img.shields.io/badge/Node-%E2%89%A518-3DA639?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![Dependencies](https://img.shields.io/badge/dependencies-0-blue?style=for-the-badge)](#)
[![License](https://img.shields.io/badge/license-MIT-6ea8fe?style=for-the-badge)](LICENSE)
[![Models](https://img.shields.io/badge/models-4%20served-412991?style=for-the-badge)](https://mxdapi.com)
[![9Router](https://img.shields.io/badge/9Router-connector-8B5CF6?style=for-the-badge)](#-connect-to-9router)
[![X](https://img.shields.io/badge/X-%40bigbullapp-000000?style=for-the-badge&logo=x&logoColor=white)](https://x.com/bigbullapp)

[🛠 Início rápido](#-quick-start) · [🎁 Nível gratuito](#-free-tier--how-much-you-get) · [🤖 Modelos](#-models--all-4-of-them) · [🧪 Use a API](#-how-to-use-the-api) · [✅ Verificado](#-verified-working--every-key-is-tested) · [🧭 Como funciona](#-how-it-works) · [🔌 9Router](#-connect-to-9router) · [⚙️ Opções](#️-cli-options) · [🛰️ Proxies](#️-behind-a-proxy) · [🐞 Problemas](#-issues)

</div>

<div align="center">

**English** · [Türkçe](README.tr.md) · [中文](README.cn.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Русский](README.ru.md) · [Português](README.pt.md)

</div>





---

## ✨ Por que isso existe

MXDAPI (模型岛) é um painel New API com um simples **cadastro por e-mail com código** (Turnstile desativado, registro por senha aberto), um crédito de cadastro de **¥1** ("注册送1刀", mais ¥3 por cada amigo convidado) e catálogos de modelos por grupo. A unidade útil é *uma conta por chave*, e esta ferramenta transforma isso em um `keys.txt` onde **cada linha sobreviveu a uma chamada de chat ao vivo**.

## 🎁 Nível gratuito — quanto você recebe

**Toda nova conta recebe um crédito de cadastro** — sem cartão, sem captcha.

| O quê | Valor |
| --- | --- |
| Crédito de cadastro | **¥1** (`注册送1刀`) |
| Bônus de convite | ¥3 para quem convida / ¥2 para quem é convidado (conforme o anúncio do painel) |
| Cartão exigido | **Não** |
| Check-in diário | não habilitado neste painel |
| Cadastro | e-mail com código (gmail sem pontos passa; **aliases são rejeitados**) |
| A unidade que escala | **uma conta = uma chave** → `--count N` na verdade significa "N contas gratuitas" |

> 💡 O nível gratuito é definido pela MXDAPI (模型岛) e pode mudar. Confira os números atuais em [mxdapi.com](https://mxdapi.com) — e deixe o próprio gate da ferramenta decidir:

```bash
node src/cli.js --verify-only     # every key in keys.txt is re-tested with a real chat call
```

## 🤖 Modelos — todos os 4

O catálogo é **vinculado a grupos**: uma conta nova cai em `vip`, que não tem canais para nada — a ferramenta vincula cada token a um grupo ativo (`deepseek`, `gemini`, `Grok`, `kiro`, `claude max`) antes de testar. Ids verificados ao vivo: `deepseek-v4.1-flash`, `grok-4.5`, `claude-sonnet-5`, `gemini-3.8-flash`. `GET /v1/models` é servido por grupo de token.

|Modelo|✓|
|---|---|
|`deepseek-v4.1-flash`|✓|
|`grok-4.5`|✓|
|`claude-sonnet-5`|✓|
|`gemini-3.8-flash`|✓|

## 🧪 Como usar a API

A URL base é **`https://mxdapi.com/v1`** — compatível com OpenAI (painel New API), então qualquer coisa que fale OpenAI funciona.

```bash
curl https://mxdapi.com/v1/chat/completions \
  -H "Authorization: Bearer <your key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"deepseek-v4.1-flash","messages":[{"role":"user","content":"hi"}],"max_tokens":8}'
```

Defina a URL base em qualquer agente ou SDK (Cursor, OpenCode, Kilo Code, …) e escolha qualquer id de modelo do catálogo acima.

## 🛠 Início rápido

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

`keys.txt` é escrito **somente** depois que uma conclusão de chat ao vivo comprova a chave.

### 🖱️ O launcher

O launcher pede a lista de proxies, a contagem e o modelo de verificação, memoriza tudo em `launcher.config.json` e executa a CLI com as flags corretas.

## ✅ Verificado e funcionando — toda chave é testada

| Verificação | Resultado |
| --- | --- |
| `GET /api/verification?email=<gmail>` | **200** — envia um código de 6 hex (gmail sem pontos passa; aliases rejeitados) |
| `POST /api/user/register` | **200** — a conta cai no grupo `vip` |
| `GET /api/user/groups` | **200** — lista os grupos de modelos (`deepseek`, `gemini`, `Grok`, `kiro`, `claude max`, …) |
| `POST /api/token/ {"group":"<group>"}` | **200** — vincula o token a um grupo ativo (escritas exigem `x-requested-with: XMLHttpRequest` neste fork) |
| `POST /v1/chat/completions` — executado para **toda** chave antes de ser escrita | **200** com conteúdo real |
| uma chave que falha na verificação de chat | nunca é escrita em `keys.txt` — a conta permanece recuperável em `accounts.json` |

Re-verifique a qualquer momento:

```bash
node src/cli.js --verify-only
```

## 🧭 Como funciona

```
inbox (one address per account)                                  a fresh address per account
   │
   ├─▶ sign-up: MXDAPI (模型岛) page → e-mail address → code / link from the inbox
   ├─▶ session: the account's cookies or access token in hand
   ├─▶ key mint: the account's key endpoint → plaintext key returned once (written to disk immediately)
   └─▶ live proof: POST https://mxdapi.com/v1/chat/completions → real content = the key is live
```

| Etapa | Chamada | Notas |
| --- | --- | --- |
| código | send-code (e-mail) | gmail sem pontos funciona; endereços alias são rejeitados pelo painel |
| cadastro | register | registro por senha está aberto; Turnstile está desativado |
| login | login | cookie de sessão (neste fork) |
| token | criar token com vinculação no estilo `{"group":"deepseek"}` | sem um grupo ativo a chave responde `503 分组 … 无可用渠道` |
| chave | revelar na linha do token / endpoint | chave em texto simples |
| verificação | `POST /v1/chat/completions` | 200 ao vivo é obrigatório antes de `keys.txt` |

## ⚙️ Opções da CLI

```bash
node src/cli.js --host=mxdapi.com --count N   # mint (default 50)
node src/cli.js --verify-only                 # re-check every key in keys.txt
node src/cli.js --help
```

| Variável de ambiente | Padrão | Significado |
| --- | --- | --- |
| `MXDAPI_PROXIES` | `proxies.txt` | arquivo de pool, um proxy por linha |

## 🛰️ Atrás de um proxy

Toda requisição sai através de uma linha de proxy do seu pool; uma linha morta faz aquela tentativa falhar e a ferramenta segue em frente. O painel limita o envio de códigos por endereço, então controle o ritmo da execução (um intervalo de ~30–60 s entre contas é suficiente).

## 📄 Arquivos

| Caminho | Conteúdo |
| --- | --- |
| `keys.txt` | uma chave verificada ao vivo por linha — ignorado pelo git |
| `accounts.json` | usuário / senha / chave / status de chat por conta |
| `proxies.txt` | suas saídas, uma por linha — ignorado pelo git |
| `outputs/` | estado da execução — ignorado pelo git |

## 🔌 Conectar ao 9Router

[9Router](https://9router.com) é um roteador auto-hospedado e compatível com OpenAI. Registre este provedor uma vez e toda chave se torna uma conexão sob um único nó de provedor:

```bash
node src/connect-9router.js
```

Padrões: `--base http://localhost:20128`, `--password 123456`, `--name "MXDAPI"`, `--prefix mxdapi`, `--base-url https://mxdapi.com/v1`. Os modelos passam a ser servidos como `mxdapi/<model id>` e balanceados entre todas as chaves.

## 🔑 O que uma chave oferece

| | |
| --- | --- |
| 🏢 Provedor | **MXDAPI (模型岛)** — [mxdapi.com](https://mxdapi.com) |
| 🎁 O que o provedor oferece | uma conta por chave — cadastro por e-mail com código, toda chave verificada por chat |
| 🔑 O que uma chave oferece | uma chave de API vinculada à sua própria conta: os 4 ids de modelo no endpoint abaixo, nos limites do seu plano. A cota fica na **conta**, e é exatamente por isso que esta ferramenta cria uma conta por chave |
| 🌐 Formato da API | compatível com OpenAI: `POST https://mxdapi.com/v1/chat/completions` |
| 🔒 Seus dados | apenas mxdapi.com e o backend de inbox que você configurar são contatados; as chaves ficam na sua máquina |

## 🐞 Problemas

Se o painel mudar o formato do cadastro, os grupos ou o crédito, a ferramenta para nessa etapa e avisa. **[Abra uma issue](../../issues)** com o comando que você executou e a saída exata; PRs são bem-vindos.

## 📄 Licença

MIT © 2026 — veja [LICENSE](LICENSE).

<div align="center">

**[MIT](LICENSE)** © 2026 mxdapi-bulk-apikey contributors

</div>