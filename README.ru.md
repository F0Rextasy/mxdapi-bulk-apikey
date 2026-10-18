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

**Массовое создание аккаунтов MXDAPI (模型岛) с автоматически сгенерированными API-ключами — совместимый с OpenAI inference и коннектор 9Router.**

[![Node](https://img.shields.io/badge/Node-%E2%89%A518-3DA639?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![Зависимости](https://img.shields.io/badge/dependencies-0-blue?style=for-the-badge)](#)
[![Лицензия](https://img.shields.io/badge/license-MIT-6ea8fe?style=for-the-badge)](LICENSE)
[![Модели](https://img.shields.io/badge/models-4%20served-412991?style=for-the-badge)](https://mxdapi.com)
[![9Router](https://img.shields.io/badge/9Router-connector-8B5CF6?style=for-the-badge)](#-connect-to-9router)
[![X](https://img.shields.io/badge/X-%40bigbullapp-000000?style=for-the-badge&logo=x&logoColor=white)](https://x.com/bigbullapp)

[🛠 Быстрый старт](#-quick-start) · [🎁 Бесплатный уровень](#-free-tier--how-much-you-get) · [🤖 Модели](#-models--all-4-of-them) · [🧪 Использование API](#-how-to-use-the-api) · [✅ Проверено](#-verified-working--every-key-is-tested) · [🧭 Как это работает](#-how-it-works) · [🔌 9Router](#-connect-to-9router) · [⚙️ Параметры](#️-cli-options) · [🛰️ Прокси](#️-behind-a-proxy) · [🐞 Проблемы](#-issues)

</div>

<div align="center">

**English** · [Türkçe](README.tr.md) · [中文](README.cn.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Русский](README.ru.md) · [Português](README.pt.md)

</div>




---

## ✨ Зачем это нужно

MXDAPI (模型岛) — это панель New API с простой **регистрацией по коду из электронной почты** (Turnstile отключён, регистрация по паролю открыта), бонусом **¥1** за регистрацию («注册送1刀», плюс ¥3 за каждого приглашённого друга) и каталогами моделей для каждой группы. Полезная единица — *один аккаунт на один ключ*, и этот инструмент превращает их в `keys.txt`, где **каждая строка прошла реальный вызов чата**.

## 🎁 Бесплатный уровень — сколько вы получаете

**Каждый новый аккаунт получает бонус за регистрацию** — карта и капча не нужны.

| Что | Значение |
| --- | --- |
| Бонус за регистрацию | **¥1** (`注册送1刀`) |
| Бонусы за приглашения | ¥3 пригласившему / ¥2 приглашённому (согласно объявлению панели) |
| Требуется карта | **Нет** |
| Ежедневная отметка | на этой панели не включена |
| Регистрация | код из электронной почты (gmail без точек проходит; **алиасы отклоняются**) |
| Масштабируемая единица | **один аккаунт = один ключ** → `--count N` — это действительно «N бесплатных аккаунтов» |

> 💡 Бесплатный уровень задаётся MXDAPI (模型岛) и может измениться. Проверьте актуальные значения на [mxdapi.com](https://mxdapi.com) — и позвольте встроенной проверке самого инструмента принять решение:

```bash
node src/cli.js --verify-only     # every key in keys.txt is re-tested with a real chat call
```

## 🤖 Модели — все 4

Каталог **привязан к группе**: новый аккаунт попадает в `vip`, где нет каналов ни для чего — перед проверкой инструмент привязывает каждый токен к активной группе (`deepseek`, `gemini`, `Grok`, `kiro`, `claude max`). Проверенные в реальной работе идентификаторы: `deepseek-v4.1-flash`, `grok-4.5`, `claude-sonnet-5`, `gemini-3.8-flash`. `GET /v1/models` обслуживается для каждой группы токена.

## 🧪 Как использовать API

Базовый URL — **`https://mxdapi.com/v1`** — совместимый с OpenAI (панель New API), поэтому работает всё, что поддерживает OpenAI.

```bash
curl https://mxdapi.com/v1/chat/completions \
  -H "Authorization: Bearer <your key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"deepseek-v4.1-flash","messages":[{"role":"user","content":"hi"}],"max_tokens":8}'
```

Укажите базовый URL в любом агенте или SDK (Cursor, OpenCode, Kilo Code, …) и выберите любой идентификатор модели из приведённого выше каталога.

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

`keys.txt` записывается **только после того, как реальное завершение чата подтвердит работоспособность ключа**.

### 🖱️ Лаунчер

Лаунчер запрашивает список прокси, количество и модель для проверки, сохраняет их в `launcher.config.json` и запускает CLI с нужными флагами.

## ✅ Проверено — каждый ключ тестируется

| Проверка | Результат |
| --- | --- |
| `GET /api/verification?email=<gmail>` | **200** — отправляет 6-значный шестнадцатеричный код (gmail без точек проходит; алиасы отклоняются) |
| `POST /api/user/register` | **200** — аккаунт попадает в группу `vip` |
| `GET /api/user/groups` | **200** — перечисляет группы моделей (`deepseek`, `gemini`, `Grok`, `kiro`, `claude max`, …) |
| `POST /api/token/ {"group":"<group>"}` | **200** — привязывает токен к активной группе (в этой версии для записи требуется `x-requested-with: XMLHttpRequest`) |
| `POST /v1/chat/completions` — выполняется **для каждого** ключа до его записи | **200** с реальным содержимым |
| ключ, не прошедший проверку чата | никогда не записывается в `keys.txt` — аккаунт остаётся доступным для восстановления в `accounts.json` |

Повторная проверка в любое время:

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
| вход | login | сессионная cookie (эта версия) |
| токен | create token with `{"group":"deepseek"}`-style binding | без активной группы ключ отвечает `503 分组 … 无可用渠道` |
| ключ | reveal on the token row / endpoint | ключ в открытом виде |
| проверка | `POST /v1/chat/completions` | перед записью в `keys.txt` требуется активный ответ 200 |

## ⚙️ Параметры CLI

```bash
node src/cli.js --host=mxdapi.com --count N   # mint (default 50)
node src/cli.js --verify-only                 # re-check every key in keys.txt
node src/cli.js --help
```

| Переменная окружения | По умолчанию | Значение |
| --- | --- | --- |
| `MXDAPI_PROXIES` | `proxies.txt` | файл пула, по одному прокси в строке |

## 🛰️ Работа через прокси

Каждый запрос отправляется через строку прокси из вашего пула; недоступная строка завершает эту попытку, после чего инструмент переходит дальше. Панель ограничивает частоту отправки кодов для каждого адреса, поэтому выполняйте запуск с паузами (интервала примерно в 30–60 секунд между аккаунтами достаточно).

## 📄 Файлы

| Путь | Содержимое |
| --- | --- |
| `keys.txt` | по одному ключу с подтверждённой работоспособностью в строке — исключён из git |
| `accounts.json` | имя пользователя / пароль / ключ / статус чата для каждого аккаунта |
| `proxies.txt` | ваши выходные прокси, по одному в строке — исключён из git |
| `outputs/` | состояние запуска — исключено из git |

## 🔌 Подключение к 9Router

[9Router](https://9router.com) — это самостоятельно размещаемый маршрутизатор, совместимый с OpenAI. Зарегистрируйте этого провайдера один раз, и каждый ключ станет подключением внутри одного узла провайдера:

```bash
node src/connect-9router.js
```

Значения по умолчанию: `--base http://localhost:20128`, `--password 123456`, `--name "MXDAPI"`, `--prefix mxdapi`, `--base-url https://mxdapi.com/v1`. После этого модели предоставляются как `mxdapi/<model id>` и распределяются по нагрузке между всеми ключами.

## 🔑 Что даёт один ключ

| | |
| --- | --- |
| 🏢 Провайдер | **MXDAPI (模型岛)** — [mxdapi.com](https://mxdapi.com) |
| 🎁 Что предоставляет провайдер | один аккаунт на один ключ — регистрация по коду из электронной почты, каждый ключ проверен в чате |
| 🔑 Что даёт один ключ | один API-ключ, относящийся к собственному аккаунту: 4 идентификатора моделей на расположенном ниже эндпоинте, в пределах лимитов вашего тарифа. Квота хранится на **аккаунте**, именно поэтому этот инструмент создаёт один аккаунт на один ключ |
| 🌐 Формат API | совместимый с OpenAI: `POST https://mxdapi.com/v1/chat/completions` |
| 🔒 Ваши данные | выполняются обращения только к mxdapi.com и настроенному вами серверу входящих сообщений; ключи остаются на вашем компьютере |

## 🐞 Проблемы

Если панель изменит формат регистрации, группы или размер бонуса, инструмент остановится на соответствующем шаге и сообщит об этом. **[Создайте issue](../../issues)**, указав выполненную команду и точный вывод; pull request приветствуются.

## 📄 Лицензия

MIT © 2026 — см. [LICENSE](LICENSE).

<div align="center">

**[MIT](LICENSE)** © 2026 участники mxdapi-bulk-apikey

</div>