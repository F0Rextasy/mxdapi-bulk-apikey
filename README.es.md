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

> **Se recomienda Turbo (5 workers); más de eso puede sobrecargar equipos débiles o provocar bloqueos.**

**Crear cuentas MXDAPI (模型岛) en masa con claves API generadas automáticamente — inferencia compatible con OpenAI + conector 9Router.**

[![Node](https://img.shields.io/badge/Node-%E2%89%A518-3DA639?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![Dependencies](https://img.shields.io/badge/dependencies-0-blue?style=for-the-badge)](#)
[![License](https://img.shields.io/badge/license-MIT-6ea8fe?style=for-the-badge)](LICENSE)
[![Models](https://img.shields.io/badge/models-4%20served-412991?style=for-the-badge)](https://mxdapi.com)
[![9Router](https://img.shields.io/badge/9Router-connector-8B5CF6?style=for-the-badge)](#-connect-to-9router)
[![X](https://img.shields.io/badge/X-%40bigbullapp-000000?style=for-the-badge&logo=x&logoColor=white)](https://x.com/bigbullapp)

[🛠 Inicio rápido](#-quick-start) · [🎁 Nivel gratuito](#-free-tier--how-much-you-get) · [🤖 Modelos](#-models--all-4-of-them) · [🧪 Usar la API](#-how-to-use-the-api) · [✅ Verificado](#-verified-working--every-key-is-tested) · [🧭 Cómo funciona](#-how-it-works) · [🔌 9Router](#-connect-to-9router) · [⚙️ Opciones](#️-cli-options) · [🛰️ Proxies](#️-behind-a-proxy) · [🐞 Problemas](#-issues)

</div>

<div align="center">

**English** · [Türkçe](README.tr.md) · [中文](README.cn.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Русский](README.ru.md) · [Português](README.pt.md)

</div>

---

## ✨ Por qué existe esto

MXDAPI (模型岛) es un nuevo panel de API con registro simple mediante **código por correo electrónico** (Turnstile desactivado, registro con contraseña habilitado), un crédito de registro de **¥1** (“注册送1刀”, más ¥3 por cada amigo invitado) y catálogos de modelos por grupo. La unidad útil es *una cuenta por clave*, y esta herramienta genera un archivo `keys.txt` donde **cada línea ha superado una prueba de chat en vivo**.

## 🎁 Nivel gratuito — lo que obtienes

**Cada cuenta nueva recibe un crédito de registro** — sin tarjeta, sin captcha.

| Qué | Valor |
| --- | --- |
| Crédito de registro | **¥1** (`注册送1刀`) |
| Bonos por invitación | ¥3 para el invitador / ¥2 para el invitado (según el anuncio del panel) |
| Tarjeta requerida | **No** |
| Inicio de sesión diario | no habilitado en este panel |
| Registro | código por correo (gmail sin puntos funciona; **los alias son rechazados**) |
| Unidad escalable | **una cuenta = una clave** → `--count N` significa realmente "N cuentas gratuitas" |

> 💡 El nivel gratuito es establecido por MXDAPI (模型岛) y puede cambiar. Consulta los valores actuales en [mxdapi.com](https://mxdapi.com) — y deja que la verificación automática de la herramienta decida:

```bash
node src/cli.js --verify-only     # cada clave en keys.txt se prueba nuevamente con una llamada real de chat
```

## 🤖 Modelos — los 4 disponibles

El catálogo está **vinculado a grupos**: una cuenta nueva entra en `vip`, que no tiene canales — la herramienta vincula cada token a un grupo activo (`deepseek`, `gemini`, `Grok`, `kiro`, `claude max`) antes de la prueba. IDs verificados en funcionamiento: `deepseek-v4.1-flash`, `grok-4.5`, `claude-sonnet-5`, `gemini-3.8-flash`. `GET /v1/models` se sirve según el grupo del token.

|Modelo|✓|
|---|---|
|`deepseek-v4.1-flash`|✓|
|`grok-4.5`|✓|
|`claude-sonnet-5`|✓|
|`gemini-3.8-flash`|✓|

## 🧪 Cómo usar la API

La URL base es **`https://mxdapi.com/v1`** — compatible con OpenAI (nuevo panel de API), por lo que cualquier herramienta que soporte OpenAI funcionará.

```bash
curl https://mxdapi.com/v1/chat/completions \
  -H "Authorization: Bearer <tu clave>" \
  -H "Content-Type: application/json" \
  -d '{"model":"deepseek-v4.1-flash","messages":[{"role":"user","content":"hola"}],"max_tokens":8}'
```

Establece la URL base en cualquier agente o SDK (Cursor, OpenCode, Kilo Code, …) y elige cualquier ID de modelo del catálogo anterior.

## 🛠 Inicio rápido

```bash
# clona o haz fork de este repositorio, luego:
cd mxdapi-bulk-apikey

# 1) tu lista de proxies, uno por línea (http://… o socks5://…)
printf 'http://127.0.0.1:8080\n' > proxies.txt

# 2) adelante
node src/launcher.js        # interactivo
# o directamente:
node src/cli.js --host=mxdapi.com --count 50
```

`keys.txt` se escribe **solo** después de que una prueba de chat en vivo confirme que la clave funciona.

### 🖱️ El lanzador

El lanzador pregunta por la lista de proxies, la cantidad y el modelo de verificación, los guarda en `launcher.config.json` y ejecuta la CLI con las banderas adecuadas.

## ✅ Funcionamiento verificado — cada clave es probada

| Comprobación | Resultado |
| --- | --- |
| `GET /api/verification?email=<gmail>` | **200** — envía un código hexadecimal de 6 dígitos (gmail sin puntos funciona; los alias son rechazados) |
| `POST /api/user/register` | **200** — la cuenta entra en el grupo `vip` |
| `GET /api/user/groups` | **200** — lista los grupos de modelos (`deepseek`, `gemini`, `Grok`, `kiro`, `claude max`, …) |
| `POST /api/token/ {"group":"<grupo>"}` | **200** — vincula el token a un grupo activo (las escrituras requieren `x-requested-with: XMLHttpRequest` en esta versión) |
| `POST /v1/chat/completions` — ejecutado para **cada** clave antes de escribirla | **200** con contenido real |
| una clave que falla la prueba de chat | nunca se escribe en `keys.txt` — la cuenta permanece recuperable en `accounts.json` |

Vuelve a comprobar en cualquier momento:

```bash
node src/cli.js --verify-only
```

## 🧭 Cómo funciona

```
buzón (una dirección por cuenta)                                  una dirección nueva por cuenta
   │
   ├─▶ registro: página MXDAPI (模型岛) → dirección de correo → código / enlace del buzón
   ├─▶ sesión: cookies de la cuenta o token de acceso obtenidos
   ├─▶ generación de clave: endpoint de clave de la cuenta → clave en texto plano devuelta una vez (guardada inmediatamente en disco)
   └─▶ prueba en vivo: POST https://mxdapi.com/v1/chat/completions → contenido real = clave activa
```

| Paso | Llamada | Notas |
| --- | --- | --- |
| código | enviar-código (correo) | gmail sin puntos funciona; el panel rechaza direcciones alias |
| registro | registrar | registro con contraseña habilitado; Turnstile desactivado |
| inicio de sesión | login | cookie de sesión (esta versión) |
| token | crear token con vinculación tipo `{"group":"deepseek"}` | sin grupo activo, la clave responde `503 分组 … 无可用渠道` |
| clave | revelar en la fila del token / endpoint | clave en texto plano |
| comprobación | `POST /v1/chat/completions` | se requiere respuesta 200 en vivo antes de escribir en `keys.txt` |

## ⚙️ Opciones CLI

```bash
node src/cli.js --host=mxdapi.com --count N   # generar claves (por defecto 50)
node src/cli.js --verify-only                 # volver a verificar cada clave en keys.txt
node src/cli.js --help
```

| Variable de entorno | Por defecto | Significado |
| --- | --- | --- |
| `MXDAPI_PROXIES` | `proxies.txt` | archivo de pool, un proxy por línea |

## 🛰️ Detrás de un proxy

Cada solicitud sale a través de un proxy de tu lista; si uno falla, el intento se descarta y la herramienta continúa. El panel limita la frecuencia de envío de códigos por dirección, así que espacia la ejecución (un intervalo de ~30–60 s entre cuentas es suficiente).

## 📄 Archivos

| Ruta | Contenido |
| --- | --- |
| `keys.txt` | una clave verificada en vivo por línea — ignorado por git |
| `accounts.json` | nombre de usuario / contraseña / clave / estado del chat por cuenta |
| `proxies.txt` | tus salidas, una por línea — ignorado por git |
| `outputs/` | estado de ejecución — ignorado por git |

## 🔌 Conectar a 9Router

[9Router](https://9router.com) es un enrutador autohospedado compatible con OpenAI. Registra este proveedor una vez y cada clave se convierte en una conexión bajo un nodo-proveedor:

```bash
node src/connect-9router.js
```

Valores por defecto: `--base http://localhost:20128`, `--password 123456`, `--name "MXDAPI"`, `--prefix mxdapi`, `--base-url https://mxdapi.com/v1`. Los modelos se sirven como `mxdapi/<id del modelo>` y se balancean entre todas las claves.

## 🔑 Lo que obtienes con una clave

| | |
| --- | --- |
| 🏢 Proveedor | **MXDAPI (模型岛)** — [mxdapi.com](https://mxdapi.com) |
| 🎁 Lo que ofrece el proveedor | una cuenta por clave — registro con código por correo, cada clave verificada mediante chat |
| 🔑 Lo que obtienes con una clave | una clave API vinculada a su propia cuenta: los 4 IDs de modelos en el endpoint de abajo, según los límites de tu plan. La cuota reside en la **cuenta**, que es exactamente por qué esta herramienta crea una cuenta por clave |
| 🌐 Formato de API | compatible con OpenAI: `POST https://mxdapi.com/v1/chat/completions` |
| 🔒 Tus datos | solo se contactan mxdapi.com y el backend del buzón que configures; las claves permanecen en tu máquina |

## 🐞 Problemas

Si el panel cambia su forma de registro, grupos o créditos, la herramienta se detendrá en ese paso y lo indicará. **[Abre un problema](../../issues)** con el comando que ejecutaste y la salida exacta; se aceptan PRs.

## 📄 Licencia

MIT © 2026 — consulta [LICENSE](LICENSE).

<div align="center">

**[MIT](LICENSE)** © 2026 colaboradores de mxdapi-bulk-apikey

</div>