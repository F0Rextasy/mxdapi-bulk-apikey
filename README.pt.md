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

**Crie contas MXDAPI (模型岛) em massa com chaves de API geradas automaticamente — inferência compatível com OpenAI + conector 9Router.**

[![Node](https://img.shields.io/badge/Node-%E2%89%A518-3DA639?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![Dependencies](https://img.shields.io/badge/dependencies-0-blue?style=for-the-badge)](#)
[![License](https://img.shields.io/badge/license-MIT-6ea8fe?style=for-the-badge)](LICENSE)
[![Models](https://img.shields.io/badge/models-4%20served-412991?style=for-the-badge)](https://mxdapi.com)
[![9Router](https://img.shields.io/badge/9Router-connector-8B5CF6?style=for-the-badge)](#-connect-to-9router)
[![X](https://img.shields.io/badge/X-%40bigbullapp-000000?style=for-the-badge&logo=x&logoColor=white)](https://x.com/bigbullapp)

[🛠 Início rápido](#-quick-start) · [🎁 Plano gratuito](#-free-tier--how-much-you-get) · [🤖 Modelos](#-models--all-4-of-them) · [🧪 Usar a API](#-how-to-use-the-api) · [✅ Verificado](#-verified-working--every-key-is-tested) · [🧭 Como funciona](#-how-it-works) · [🔌 9Router](#-connect-to-9router) · [⚙️ Opções](#️-cli-options) · [🛰️ Proxies](#️-behind-a-proxy) · [🐞 Problemas](#-issues)

</div>

<div align="center">

**English** · [Türkçe](README.tr.md) · [中文](README.cn.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Русский](README.ru.md) · [Português](README.pt.md)

</div>




---

## ✨ Por que isto existe

A MXDAPI (模型岛) é um painel New API com **cadastro por código enviado por e-mail** (Turnstile desativado, cadastro com senha aberto), um crédito de cadastro de **¥1** (“注册送1刀”, mais ¥3 por cada amigo convidado) e catálogos de modelos por grupo. A unidade útil é *uma conta por chave*, e esta ferramenta transforma isso em um `keys.txt` no qual **cada linha sobreviveu a uma chamada de chat real**.

## 🎁 Plano gratuito — quanto você recebe

**Toda conta nova recebe um crédito de cadastro** — sem cartão e sem captcha.

| O quê | Valor |
| --- | --- |
| Crédito de cadastro | **¥1** (`注册送1刀`) |
| Bônus por convite | ¥3 para quem convida / ¥2 para quem é convidado (conforme o anúncio do painel) |
| Cartão necessário | **Não** |
| Check-in diário | não habilitado neste painel |
| Cadastro | código por e-mail (gmail sem pontos é aceito; **aliases são rejeitados**) |
| A unidade que escala | **uma conta = uma chave** → `--count N` significa realmente “N contas gratuitas” |

> 💡 O plano gratuito é definido pela MXDAPI (模型岛) e pode mudar. Consulte os valores atuais em [mxdapi.com](https://mxdapi.com) — e deixe o próprio mecanismo de validação da ferramenta decidir:

```bash
node src/cli.js --verify-only     # every key in keys.txt is re-tested with a real chat call
```

## 🤖 Modelos — todos os 4

O catálogo é **vinculado ao grupo**: uma conta nova entra em `vip`, que não possui canais para nada — a ferramenta vincula cada token a um grupo ativo (`deepseek`, `gemini`, `Grok`, `kiro`, `claude max`) antes do teste. IDs ativos verificados: `deepseek-v4.1-flash`, `grok-4.5`, `claude-sonnet-5`, `gemini-3.8-flash`. `GET /v1/models` é disponibilizado por grupo de token.

## 🧪 Como usar a API

A URL base é **`https://mxdapi.com/v1`** — compatível com OpenAI (painel New API), portanto tudo que fala OpenAI funciona.

```bash
curl https://mxdapi.com/v1/chat/completions \
  -H "Authorization: Bearer <your key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"deepseek-v4.1-flash","messages":[{"role":"user","content":"hi"}],"max_tokens":8}'
```

Defina a URL base em qualquer agente ou SDK (Cursor, OpenCode, Kilo Code, …) e escolha qualquer ID de modelo do catálogo acima.

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

`keys.txt` é gravado **somente** depois que uma conclusão de chat ativa comprova a chave.

### 🖱️ O launcher

O launcher solicita a lista de proxies, a quantidade e o modelo de verificação, armazena essas informações em `launcher.config.json` e executa a CLI com as opções corretas.

## ✅ Funcionando e verificado — cada chave é testada

| Verificação | Resultado |
| --- | --- |
| `GET /api/verification?email=<gmail>` | **200** — envia um código de 6 caracteres hexadecimais (gmail sem pontos é aceito; aliases são rejeitados) |
| `POST /api/user/register` | **200** — a conta entra no grupo `vip` |
| `GET /api/user/groups` | **200** — lista os grupos de modelos (`deepseek`, `gemini`, `Grok`, `kiro`, `claude max`, …) |
| `POST /api/token/ {"group":"<group>"}` | **200** — vincula o token a um grupo ativo (as gravações exigem `x-requested-with: XMLHttpRequest` neste fork) |
| `POST /v1/chat/completions` — executado para **cada** chave antes de ela ser gravada | **200** com conteúdo real |
| uma chave que falha na verificação de chat | nunca é gravada em `keys.txt` — a conta permanece recuperável em `accounts.json` |

Verifique novamente a qualquer momento:

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

| Etapa | Chamada | Observações |
| --- | --- | --- |
| código | send-code (e-mail) | gmail sem pontos funciona; endereços com alias são rejeitados pelo painel |
| cadastro | register | cadastro com senha aberto; Turnstile desativado |
| login | login | cookie de sessão (neste fork) |
| token | criar token com vinculação no estilo `{"group":"deepseek"}` | sem um grupo ativo, a chave responde `503 分组 … 无可用渠道` |
| chave | revelar na linha do token / endpoint | chave em texto simples |
| verificação | `POST /v1/chat/completions` | é necessário um 200 ativo antes de `keys.txt` |

## ⚙️ Opções da CLI

```bash
node src/cli.js --host=mxdapi.com --count N   # mint (default 50)
node src/cli.js --verify-only                 # re-check every key in keys.txt
node src/cli.js --help
```

| Variável de ambiente | Padrão | Significado |
| --- | --- | --- |
| `MXDAPI_PROXIES` | `proxies.txt` | arquivo do pool, um proxy por linha |

## 🛰️ Atrás de um proxy

Cada solicitação sai por uma linha de proxy do seu pool; uma linha inativa faz aquela tentativa falhar e a ferramenta prossegue. O painel limita a frequência dos envios de código por endereço, portanto faça a execução em um ritmo moderado (um intervalo de ~30–60 s entre contas é suficiente).

## 📄 Arquivos

| Caminho | Conteúdo |
| --- | --- |
| `keys.txt` | uma chave verificada e ativa por linha — ignorado pelo git |
| `accounts.json` | nome de usuário / senha / chave / status do chat por conta |
| `proxies.txt` | suas saídas, uma por linha — ignorado pelo git |
| `outputs/` | estado da execução — ignorado pelo git |

## 🔌 Conectar ao 9Router

[9Router](https://9router.com) é um roteador autogerenciado e compatível com OpenAI. Registre este provedor uma vez e cada chave se tornará uma conexão dentro de um único nó de provedor:

```bash
node src/connect-9router.js
```

Padrões: `--base http://localhost:20128`, `--password 123456`, `--name "MXDAPI"`, `--prefix mxdapi`, `--base-url https://mxdapi.com/v1`. Os modelos são então disponibilizados como `mxdapi/<model id>` e distribuídos entre todas as chaves.

## 🔑 O que uma chave oferece

| | |
| --- | --- |
| 🏢 Provedor | **MXDAPI (模型岛)** — [mxdapi.com](https://mxdapi.com) |
| 🎁 O que o provedor oferece | uma conta por chave — cadastro por código de e-mail, cada chave verificada via chat |
| 🔑 O que uma chave oferece | uma chave de API vinculada à sua própria conta: os 4 IDs de modelo no endpoint abaixo, dentro dos limites do seu plano. A cota fica na **conta**, e é exatamente por isso que esta ferramenta cria uma conta por chave |
| 🌐 Formato da API | Compatível com OpenAI: `POST https://mxdapi.com/v1/chat/completions` |
| 🔒 Seus dados | somente mxdapi.com e o backend de caixa de entrada que você configurar são contatados; as chaves permanecem na sua máquina |

## 🐞 Problemas

Se o painel alterar o formato do cadastro, os grupos ou o crédito, a ferramenta para nessa etapa e informa o motivo. **[Abra uma issue](../../issues)** com o comando executado e a saída exata; pull requests são bem-vindos.

## 📄 Licença

MIT © 2026 — consulte [LICENSE](LICENSE).

<div align="center">

**[MIT](LICENSE)** © 2026 colaboradores do mxdapi-bulk-apikey

</div>