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

> **Рекомендуется Turbo (5 воркеров); больше — риск нагрузки/бана на слабом компьютере.**

**Массовое создание аккаунтов MXDAPI (模型岛) с автоматически сгенерированными API-ключами — инференс, совместимый с OpenAI, + коннектор 9Router.**

[![Node](https://img.shields.io/badge/Node-%E2%89%A518-3DA639?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![Dependencies](https://img.shields.io/badge/dependencies-0-blue?style=for-the-badge)](#)
[![License](https://img.shields.io/badge/license-MIT-6ea8fe?style=for-the-badge)](LICENSE)
[![Models](https://img.shields.io/badge/models-4%20served-412991?style=for-the-badge)](https://mxdapi.com)
[![9Router](https://img.shields.io/badge/9Router-connector-8B5CF6?style=for-the-badge)](#-connect-to-9router)
[![X](https://img.shields.io/badge/X-%40bigbullapp-000000?style=for-the-badge&logo=x&logoColor=white)](https://x.com/bigbullapp)

[🛠 Быстрый старт](#-quick-start) · [🎁 Бесплатный тариф](#-free-tier--how-much-you-get) · [🤖 Модели](#-models--all-4-of-them) · [🧪 Использование API](#-how-to-use-the-api) · [✅ Проверено](#-verified-working--every-key-is-tested) · [🧭 Как это работает](#-how-it-works) · [🔌 9Router](#-connect-to-9router) · [⚙️ Опции](#️-cli-options) · [🛰️ Прокси](#️-behind-a-proxy) · [🐞 Проблемы](#-issues)

</div>

<div align="center">

**English** · [Türkçe](README.tr.md) · [中文](README.cn.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Русский](README.ru.md) · [Português](README.pt.md)

</div>

---

## ✨ Зачем это нужно

MXDAPI (模型岛) — это панель New API с простой **регистрацией по e-mail-коду** (Turnstile отключён, регистрация по паролю открыта), стартовым бонусом **¥1** («注册送1刀», плюс ¥3 за каждого приглашённого друга) и каталогами моделей по группам. Полезная единица — *один аккаунт на ключ*, и этот инструмент превращает это в `keys.txt`, где **каждая строка прошла живой чат-запрос**.

## 🎁 Бесплатный тариф — сколько вы получаете

**Каждый новый аккаунт получает стартовый бонус** — без карты, без капчи.

| Что | Значение |
| --- | --- |
| Стартовый бонус | **¥1** (`注册送1刀`) |
| Бонусы за приглашения | ¥3 пригласившему / ¥2 приглашённому (согласно объявлению панели) |
| Требуется карта | **Нет** |
| Ежедневная отметка | не включена на этой панели |
| Регистрация | e-mail-код (gmail без точек проходит; **алиасы отклоняются**) |
| Единица масштабирования | **один аккаунт = один ключ** → `--count N` на самом деле означает «N бесплатных аккаунтов» |

> 💡 Бесплатный тариф устанавливается MXDAPI (模型岛) и может меняться. Проверяйте актуальные цифры на [mxdapi.com](https://mxdapi.com) — и пусть собственный фильтр инструмента решает:

```bash
node src/cli.js --verify-only     # каждый ключ в keys.txt перепроверяется реальным чат-запросом
```

## 🤖 Модели — все 4

Каталог **привязан к группам**: новый аккаунт попадает в `vip`, где нет каналов ни для чего — инструмент привязывает каждый токен к живой группе (`deepseek`, `gemini`, `Grok`, `kiro`, `claude max`) перед тестированием. Проверенные живые id: `deepseek-v4.1-flash`, `grok-4.5`, `claude-sonnet-5`, `gemini-3.8-flash`. `GET /v1/models` отдаётся по группе токена.

|Модель|✓|
|---|---|
|`deepseek-v4.1-flash`|✓|
|`grok-4.5`|✓|
|`claude-sonnet-5`|✓|
|`gemini-3.8-flash`|✓|

## 🧪 Как использовать API

Базовый URL — **`https://mxdapi.com/v1`** — совместим с OpenAI (панель New API), поэтому работает всё, что говорит на языке OpenAI.

```bash
curl https://mxdapi.com/v1/chat/completions \
  -H "Authorization: Bearer <your key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"deepseek-v4.1-flash","messages":[{"role":"user","content":"hi"}],"max_tokens":8}'
```

Укажите базовый URL в любом агенте или SDK (Cursor, OpenCode, Kilo Code, …) и выберите любой id модели из каталога выше.

## 🛠 Быстрый старт

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

`keys.txt` записывается **только** после того, как живое чат-завершение подтвердит ключ.

### 🖱️ Лаунчер

Лаунчер запрашивает список прокси, количество и модель для проверки, запоминает их в `launcher.config.json` и запускает CLI с нужными флагами.

## ✅ Проверено в работе — каждый ключ тестируется

| Проверка | Результат |
| --- | --- |
| `GET /api/verification?email=<gmail>` | **200** — отправляет 6-значный hex-код (gmail без точек проходит; алиасы отклоняются) |
| `POST /api/user/register` | **200** — аккаунт попадает в группу `vip` |
| `GET /api/user/groups` | **200** — перечисляет группы моделей (`deepseek`, `gemini`, `Grok`, `kiro`, `claude max`, …) |
| `POST /api/token/ {"group":"<group>"}` | **200** — привязывает токен к живой группе (для записи в этом форке нужен `x-requested-with: XMLHttpRequest`) |
| `POST /v1/chat/completions` — выполняется для **каждого** ключа перед записью | **200** с реальным содержимым |
| ключ, не прошедший чат-проверку | никогда не записывается в `keys.txt` — аккаунт остаётся восстановимым в `accounts.json` |

Перепроверить в любой момент:

```bash
node src/cli.js --verify-only
```

## 🧭 Как это работает

```
inbox (one address per account)                                  a fresh address per account
   │
   ├─▶ sign-up: MXDAPI (模型岛) page → e-mail address → code / link from the inbox
   ├─▶ session: the account's cookies or access token in hand
   ├─▶ key mint: the account's key endpoint → plaintext key returned once (written to disk immediately)
   └─▶ live proof: POST https://mxdapi.com/v1/chat/completions → real content = the key is live
```

| Шаг | Вызов | Примечания |
| --- | --- | --- |
| код | send-code (e-mail) | gmail без точек работает; адреса-алиасы отклоняются панелью |
| регистрация | register | регистрация по паролю открыта; Turnstile отключён |
| вход | login | сессионная cookie (этот форк) |
| токен | создание токена с привязкой вида `{"group":"deepseek"}` | без живой группы ключ отвечает `503 分组 … 无可用渠道` |
| ключ | раскрытие в строке токена / эндпоинте | ключ в открытом виде |
| проверка | `POST /v1/chat/completions` | требуется живой 200 перед `keys.txt` |

## ⚙️ Опции CLI

```bash
node src/cli.js --host=mxdapi.com --count N   # mint (default 50)
node src/cli.js --verify-only                 # re-check every key in keys.txt
node src/cli.js --help
```

| Переменная окружения | По умолчанию | Значение |
| --- | --- | --- |
| `MXDAPI_PROXIES` | `proxies.txt` | файл пула, один прокси на строку |

## 🛰️ За прокси

Каждый запрос выходит через строку прокси из вашего пула; мёртвая строка проваливает эту попытку, и инструмент двигается дальше. Панель ограничивает частоту отправки кодов по адресу, поэтому задавайте темп (пауза ~30–60 с между аккаунтами вполне достаточна).

## 📄 Файлы

| Путь | Содержимое |
| --- | --- |
| `keys.txt` | один проверенный в живом режиме ключ на строку — игнорируется git |
| `accounts.json` | имя пользователя / пароль / ключ / статус чата для каждого аккаунта |
| `proxies.txt` | ваши выходы, один на строку — игнорируется git |
| `outputs/` | состояние запуска — игнорируется git |

## 🔌 Подключение к 9Router

[9Router](https://9router.com) — это самостоятельно размещаемый роутер, совместимый с OpenAI. Зарегистрируйте этого провайдера один раз, и каждый ключ станет соединением под одним узлом-провайдером:

```bash
node src/connect-9router.js
```

Значения по умолчанию: `--base http://localhost:20128`, `--password 123456`, `--name "MXDAPI"`, `--prefix mxdapi`, `--base-url https://mxdapi.com/v1`. Затем модели отдаются как `mxdapi/<model id>` и балансируются между всеми ключами.

## 🔑 Что даёт один ключ

| | |
| --- | --- |
| 🏢 Провайдер | **MXDAPI (模型岛)** — [mxdapi.com](https://mxdapi.com) |
| 🎁 Что даёт провайдер | один аккаунт на ключ — регистрация по e-mail-коду, каждый ключ проверен чатом |
| 🔑 Что даёт один ключ | один API-ключ, привязанный к своему аккаунту: 4 id моделей на эндпоинте ниже, в пределах лимитов вашего тарифа. Квота живёт на **аккаунте**, именно поэтому этот инструмент создаёт один аккаунт на ключ |
| 🌐 Форма API | совместим с OpenAI: `POST https://mxdapi.com/v1/chat/completions` |
| 🔒 Ваши данные | связь только с mxdapi.com и настроенным вами бэкендом inbox; ключи остаются на вашей машине |

## 🐞 Проблемы

Если панель изменит форму регистрации, группы или бонус, инструмент остановится на этом шаге и сообщит об этом. **[Откройте issue](../../issues)** с командой, которую вы запускали, и точным выводом; PR приветствуются.

## 📄 Лицензия

MIT © 2026 — см. [LICENSE](LICENSE).

<div align="center">

**[MIT](LICENSE)** © 2026 mxdapi-bulk-apikey contributors

</div>