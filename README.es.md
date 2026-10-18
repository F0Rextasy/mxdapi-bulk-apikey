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

**Creación masiva de cuentas MXDAPI (模型岛) con claves API generadas automáticamente — inferencia compatible con OpenAI + conector de 9Router.**

[![Node](https://img.shields.io/badge/Node-%E2%89%A518-3DA639?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![Dependencias](https://img.shields.io/badge/dependencies-0-blue?style=for-the-badge)](#)
[![Licencia](https://img.shields.io/badge/license-MIT-6ea8fe?style=for-the-badge)](LICENSE)
[![Modelos](https://img.shields.io/badge/models-4%20served-412991?style=for-the-badge)](https://mxdapi.com)
[![9Router](https://img.shields.io/badge/9Router-connector-8B5CF6?style=for-the-badge)](#-connect-to-9router)
[![X](https://img.shields.io/badge/X-%40bigbullapp-000000?style=for-the-badge&logo=x&logoColor=white)](https://x.com/bigbullapp)

[🛠 Inicio rápido](#-quick-start) · [🎁 Nivel gratuito](#-free-tier--how-much-you-get) · [🤖 Modelos](#-models--all-4-of-them) · [🧪 Usar la API](#-how-to-use-the-api) · [✅ Verificado](#-verified-working--every-key-is-tested) · [🧭 Cómo funciona](#-how-it-works) · [🔌 9Router](#-connect-to-9router) · [⚙️ Opciones](#️-cli-options) · [🛰️ Proxies](#️-behind-a-proxy) · [🐞 Problemas](#-issues)

</div>

<div align="center">

**English** · [Türkçe](README.tr.md) · [中文](README.cn.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Русский](README.ru.md) · [Português](README.pt.md)

</div>




---

## ✨ Por qué existe esto

MXDAPI (模型岛) es un panel New API con un registro sencillo mediante **código enviado por e-mail** (Turnstile deshabilitado, registro con contraseña abierto), un crédito de registro de **¥1** (“注册送1刀”, más ¥3 por cada amigo invitado) y catálogos de modelos por grupo. La unidad útil es *una cuenta por clave*, y esta herramienta lo convierte en un `keys.txt` donde **cada línea ha superado una llamada de chat en vivo**.

## 🎁 Nivel gratuito — cuánto obtienes

**Cada cuenta nueva recibe un crédito de registro** — sin tarjeta ni captcha.

| Qué | Valor |
| --- | --- |
| Crédito de registro | **¥1** (`注册送1刀`) |
| Bonificaciones por invitación | ¥3 para quien invita / ¥2 para quien es invitado (según el anuncio del panel) |
| ¿Se requiere tarjeta? | **No** |
| Registro diario | no está habilitado en este panel |
| Registro | código por e-mail (gmail sin puntos funciona; **los alias son rechazados**) |
| La unidad que escala | **una cuenta = una clave** → `--count N` significa realmente «N cuentas gratuitas» |

> 💡 El nivel gratuito lo establece MXDAPI (模型岛) y puede cambiar. Consulta las cifras actuales en [mxdapi.com](https://mxdapi.com) — y deja que la propia comprobación de la herramienta decida:

```bash
node src/cli.js --verify-only     # every key in keys.txt is re-tested with a real chat call
```

## 🤖 Modelos — los 4

El catálogo está **vinculado al grupo**: una cuenta nueva llega a `vip`, que no tiene canales disponibles — la herramienta vincula cada token a un grupo activo (`deepseek`, `gemini`, `Grok`, `kiro`, `claude max`) antes de probarlo. Id. activos verificados: `deepseek-v4.1-flash`, `grok-4.5`, `claude-sonnet-5`, `gemini-3.8-flash`. `GET /v1/models` se ofrece según el grupo de cada token.

## 🧪 Cómo usar la API

La URL base es **`https://mxdapi.com/v1`** — compatible con OpenAI (panel New API), por lo que funciona con cualquier herramienta que hable OpenAI.

```bash
curl https://mxdapi.com/v1/chat/completions \
  -H "Authorization: Bearer <your key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"deepseek-v4.1-flash","messages":[{"role":"user","content":"hi"}],"max_tokens":8}'
```

Establece la URL base en cualquier agente o SDK (Cursor, OpenCode, Kilo Code, …) y elige cualquier id. de modelo del catálogo anterior.

## 🛠 Inicio rápido

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

`keys.txt` se escribe **solo** después de que una finalización de chat en vivo demuestra que la clave funciona.

### 🖱️ El lanzador

El lanzador solicita la lista de proxies, la cantidad y el modelo de verificación, los guarda en `launcher.config.json` y ejecuta la CLI con las opciones correctas.

## ✅ Verificado: funciona — se prueba cada clave

| Comprobación | Resultado |
| --- | --- |
| `GET /api/verification?email=<gmail>` | **200** — envía un código de 6 caracteres hexadecimales (gmail sin puntos funciona; los alias son rechazados) |
| `POST /api/user/register` | **200** — la cuenta llega al grupo `vip` |
| `GET /api/user/groups` | **200** — muestra los grupos de modelos (`deepseek`, `gemini`, `Grok`, `kiro`, `claude max`, …) |
| `POST /api/token/ {"group":"<group>"}` | **200** — vincula el token a un grupo activo (las escrituras requieren `x-requested-with: XMLHttpRequest` en esta variante) |
| `POST /v1/chat/completions` — se ejecuta para **cada** clave antes de escribirla | **200** con contenido real |
| una clave que falla su comprobación de chat | nunca se escribe en `keys.txt` — la cuenta permanece recuperable en `accounts.json` |

Vuelve a comprobarlas en cualquier momento:

```bash
node src/cli.js --verify-only
```

## 🧭 Cómo funciona

```
inbox (one address per account)                                  a fresh address per account
   │
   ├─▶ sign-up: MXDAPI (模型岛) page → e-mail address → code / link from the inbox
   ├─▶ session: the account's cookies or access token in hand
   ├─▶ key mint: the account's key endpoint → plaintext key returned once (written to disk immediately)
   └─▶ live proof: POST https://mxdapi.com/v1/chat/completions → real content = the key is live
```

| Paso | Llamada | Notas |
| --- | --- | --- |
| código | send-code (e-mail) | gmail sin puntos funciona; el panel rechaza las direcciones alias |
| registro | register | el registro con contraseña está abierto; Turnstile está desactivado |
| inicio de sesión | login | cookie de sesión (esta variante) |
| token | create token with `{"group":"deepseek"}`-style binding | sin un grupo activo, la clave responde `503 分组 … 无可用渠道` |
| clave | reveal on the token row / endpoint | clave en texto plano |
| comprobación | `POST /v1/chat/completions` | se requiere un 200 activo antes de `keys.txt` |

## ⚙️ Opciones de la CLI

```bash
node src/cli.js --host=mxdapi.com --count N   # mint (default 50)
node src/cli.js --verify-only                 # re-check every key in keys.txt
node src/cli.js --help
```

| Variable de entorno | Valor predeterminado | Significado |
| --- | --- | --- |
| `MXDAPI_PROXIES` | `proxies.txt` | archivo del conjunto, un proxy por línea |

## 🛰️ Detrás de un proxy

Cada solicitud sale a través de una línea de proxy de tu conjunto; una línea inactiva hace fallar ese intento y la herramienta continúa. El panel limita la frecuencia de los envíos de códigos por dirección, así que ejecuta el proceso con calma (un intervalo de aproximadamente 30–60 s entre cuentas es suficiente).

## 📄 Archivos

| Ruta | Contenido |
| --- | --- |
| `keys.txt` | una clave verificada en vivo por línea — ignorado por git |
| `accounts.json` | nombre de usuario / contraseña / clave / estado del chat por cuenta |
| `proxies.txt` | tus salidas, una por línea — ignorado por git |
| `outputs/` | estado de ejecución — ignorado por git |

## 🔌 Conectar con 9Router

[9Router](https://9router.com) es un router autoalojado compatible con OpenAI. Registra este proveedor una vez y cada clave se convierte en una conexión dentro de un único nodo de proveedor:

```bash
node src/connect-9router.js
```

Valores predeterminados: `--base http://localhost:20128`, `--password 123456`, `--name "MXDAPI"`, `--prefix mxdapi`, `--base-url https://mxdapi.com/v1`. Después, los modelos se ofrecen como `mxdapi/<model id>` y se distribuye la carga entre todas las claves.

## 🔑 Qué obtienes con una clave

| | |
| --- | --- |
| 🏢 Proveedor | **MXDAPI (模型岛)** — [mxdapi.com](https://mxdapi.com) |
| 🎁 Qué ofrece el proveedor | una cuenta por clave — registro mediante código por e-mail, cada clave verificada mediante chat |
| 🔑 Qué obtienes con una clave | una clave API asociada a su propia cuenta: los 4 id. de modelo del endpoint siguiente, dentro de los límites de tu plan. La cuota pertenece a la **cuenta**, que es exactamente la razón por la que esta herramienta crea una cuenta por clave |
| 🌐 Formato de la API | Compatible con OpenAI: `POST https://mxdapi.com/v1/chat/completions` |
| 🔒 Tus datos | solo se contacta con mxdapi.com y con el backend de bandeja de entrada que configures; las claves permanecen en tu máquina |

## 🐞 Problemas

Si el panel cambia la forma del registro, los grupos o el crédito, la herramienta se detiene en ese paso y lo indica. **[Abre un problema](../../issues)** con el comando que ejecutaste y la salida exacta; las solicitudes de incorporación son bienvenidas.

## 📄 Licencia

MIT © 2026 — consulta [LICENSE](LICENSE).

<div align="center">

**[MIT](LICENSE)** © 2026 colaboradores de mxdapi-bulk-apikey

</div>