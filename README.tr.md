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

> **Turbo önerilir (5 worker); daha fazlası zayıf bilgisayarda yük/ban riski.**

**MXDAPI (模型岛) hesaplarını otomatik oluşturulan API anahtarlarıyla toplu oluşturun — OpenAI uyumlu çıkarım + 9Router bağlayıcısı.**

[![Node](https://img.shields.io/badge/Node-%E2%89%A518-3DA639?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![Dependencies](https://img.shields.io/badge/dependencies-0-blue?style=for-the-badge)](#)
[![License](https://img.shields.io/badge/license-MIT-6ea8fe?style=for-the-badge)](LICENSE)
[![Models](https://img.shields.io/badge/models-4%20served-412991?style=for-the-badge)](https://mxdapi.com)
[![9Router](https://img.shields.io/badge/9Router-connector-8B5CF6?style=for-the-badge)](#-connect-to-9router)
[![X](https://img.shields.io/badge/X-%40bigbullapp-000000?style=for-the-badge&logo=x&logoColor=white)](https://x.com/bigbullapp)

[🛠 Hızlı başlangıç](#-quick-start) · [🎁 Ücretsiz katman](#-free-tier--how-much-you-get) · [🤖 Modeller](#-models--all-4-of-them) · [🧪 API'yi kullanma](#-how-to-use-the-api) · [✅ Doğrulandı](#-verified-working--every-key-is-tested) · [🧭 Nasıl çalışır](#-how-it-works) · [🔌 9Router](#-connect-to-9router) · [⚙️ Seçenekler](#️-cli-options) · [🛰️ Proxy'ler](#️-behind-a-proxy) · [🐞 Sorunlar](#-issues)

</div>

<div align="center">

**English** · [Türkçe](README.tr.md) · [中文](README.cn.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Русский](README.ru.md) · [Português](README.pt.md)

</div>





---

## ✨ Bu neden var

MXDAPI (模型岛), basit bir **e-posta kodu ile kayıt** (Turnstile devre dışı, şifreli kayıt açık), **¥1** kayıt kredisi ("注册送1刀", ayrıca davet edilen her arkadaş için ¥3) ve gruba özel model katalogları sunan bir New API panelidir. Kullanışlı birim *anahtar başına bir hesap*tır ve bu araç bunu, **her satırı canlı bir sohbet çağrısından geçmiş** bir `keys.txt` dosyasına dönüştürür.

## 🎁 Ücretsiz katman — ne kadar alırsınız

**Her yeni hesap bir kayıt kredisi alır** — kart yok, captcha yok.

| Ne | Değer |
| --- | --- |
| Kayıt kredisi | **¥1** (`注册送1刀`) |
| Davet bonusları | Davet edene ¥3 / davet edilene ¥2 (panel duyurusuna göre) |
| Kart gerekli mi | **Hayır** |
| Günlük giriş | bu panelde etkin değil |
| Kayıt | e-posta kodu (noktasız gmail geçer; **takma adlar reddedilir**) |
| Ölçeklenen birim | **bir hesap = bir anahtar** → `--count N` aslında "N ücretsiz hesap" demektir |

> 💡 Ücretsiz katman MXDAPI (模型岛) tarafından belirlenir ve değişebilir. Güncel sayıları [mxdapi.com](https://mxdapi.com) adresinden kontrol edin — ve kararı aracın kendi kapısına bırakın:

```bash
node src/cli.js --verify-only     # keys.txt içindeki her anahtar gerçek bir sohbet çağrısıyla yeniden test edilir
```

## 🤖 Modeller — 4 tanesinin tamamı

Katalog **gruba bağlıdır**: yeni bir hesap `vip` grubuna düşer ve bu grupta hiçbir şey için kanal yoktur — araç, test etmeden önce her token'ı canlı bir gruba (`deepseek`, `gemini`, `Grok`, `kiro`, `claude max`) bağlar. Doğrulanmış canlı kimlikler: `deepseek-v4.1-flash`, `grok-4.5`, `claude-sonnet-5`, `gemini-3.8-flash`. `GET /v1/models` her token grubuna göre sunulur.

|Model|✓|
|---|---|
|`deepseek-v4.1-flash`|✓|
|`grok-4.5`|✓|
|`claude-sonnet-5`|✓|
|`gemini-3.8-flash`|✓|

## 🧪 API'yi kullanma

Temel URL **`https://mxdapi.com/v1`** — OpenAI uyumlu (New API paneli), yani OpenAI konuşan her şey çalışır.

```bash
curl https://mxdapi.com/v1/chat/completions \
  -H "Authorization: Bearer <your key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"deepseek-v4.1-flash","messages":[{"role":"user","content":"hi"}],"max_tokens":8}'
```

Temel URL'yi herhangi bir ajan veya SDK'da (Cursor, OpenCode, Kilo Code, …) ayarlayın ve yukarıdaki katalogdan herhangi bir model kimliği seçin.

## 🛠 Hızlı başlangıç

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

`keys.txt` **yalnızca** canlı bir sohbet tamamlaması anahtarı kanıtladıktan sonra yazılır.

### 🖱️ Başlatıcı

Başlatıcı proxy listesini, sayıyı ve doğrulama modelini sorar, bunları `launcher.config.json` içinde hatırlar ve CLI'yi doğru bayraklarla çalıştırır.

## ✅ Doğrulanmış çalışıyor — her anahtar test edilir

| Kontrol | Sonuç |
| --- | --- |
| `GET /api/verification?email=<gmail>` | **200** — 6 haneli hex kod gönderir (noktasız gmail geçer; takma adlar reddedilir) |
| `POST /api/user/register` | **200** — hesap `vip` grubuna düşer |
| `GET /api/user/groups` | **200** — model gruplarını listeler (`deepseek`, `gemini`, `Grok`, `kiro`, `claude max`, …) |
| `POST /api/token/ {"group":"<group>"}` | **200** — token'ı canlı bir gruba bağlar (bu fork'ta yazma işlemleri `x-requested-with: XMLHttpRequest` gerektirir) |
| `POST /v1/chat/completions` — yazılmadan önce **her** anahtar için çalıştırılır | **200** gerçek içerikle |
| sohbet kontrolünde başarısız olan bir anahtar | `keys.txt` dosyasına asla yazılmaz — hesap `accounts.json` içinde kurtarılabilir kalır |

İstediğiniz zaman yeniden kontrol edin:

```bash
node src/cli.js --verify-only
```

## 🧭 Nasıl çalışır

```
inbox (one address per account)                                  a fresh address per account
   │
   ├─▶ sign-up: MXDAPI (模型岛) page → e-mail address → code / link from the inbox
   ├─▶ session: the account's cookies or access token in hand
   ├─▶ key mint: the account's key endpoint → plaintext key returned once (written to disk immediately)
   └─▶ live proof: POST https://mxdapi.com/v1/chat/completions → real content = the key is live
```

| Adım | Çağrı | Notlar |
| --- | --- | --- |
| kod | send-code (e-posta) | noktasız gmail çalışır; takma ad adresleri panel tarafından reddedilir |
| kayıt | register | şifreli kayıt açık; Turnstile kapalı |
| giriş | login | oturum çerezi (bu fork) |
| token | `{"group":"deepseek"}` tarzı bağlama ile token oluştur | canlı bir grup olmadan anahtar `503 分组 … 无可用渠道` yanıtı verir |
| anahtar | token satırında / uç noktada göster | düz metin anahtar |
| kontrol | `POST /v1/chat/completions` | `keys.txt` öncesinde canlı 200 gerekli |

## ⚙️ CLI seçenekleri

```bash
node src/cli.js --host=mxdapi.com --count N   # mint (default 50)
node src/cli.js --verify-only                 # re-check every key in keys.txt
node src/cli.js --help
```

| Ortam değişkeni | Varsayılan | Anlamı |
| --- | --- | --- |
| `MXDAPI_PROXIES` | `proxies.txt` | havuz dosyası, satır başına bir proxy |

## 🛰️ Proxy arkasında

Her istek havuzunuzdan bir proxy satırı üzerinden çıkar; ölü bir satır o denemeyi başarısız kılar ve araç devam eder. Panel, kod gönderimlerini adres başına sınırlar, bu yüzden çalıştırmayı yavaşlatın (hesaplar arasında ~30–60 sn boşluk fazlasıyla yeterlidir).

## 📄 Dosyalar

| Yol | İçerik |
| --- | --- |
| `keys.txt` | satır başına bir canlı doğrulanmış anahtar — git tarafından yok sayılır |
| `accounts.json` | hesap başına kullanıcı adı / şifre / anahtar / sohbet durumu |
| `proxies.txt` | çıkışlarınız, satır başına bir tane — git tarafından yok sayılır |
| `outputs/` | çalıştırma durumu — git tarafından yok sayılır |

## 🔌 9Router'a bağlanma

[9Router](https://9router.com) kendi barındırdığınız, OpenAI uyumlu bir yönlendiricidir. Bu sağlayıcıyı bir kez kaydedin ve her anahtar tek bir sağlayıcı düğümü altında bir bağlantı haline gelir:

```bash
node src/connect-9router.js
```

Varsayılanlar: `--base http://localhost:20128`, `--password 123456`, `--name "MXDAPI"`, `--prefix mxdapi`, `--base-url https://mxdapi.com/v1`. Modeller daha sonra `mxdapi/<model id>` olarak sunulur ve her anahtar arasında yük dengelenir.

## 🔑 Bir anahtar size ne kazandırır

| | |
| --- | --- |
| 🏢 Sağlayıcı | **MXDAPI (模型岛)** — [mxdapi.com](https://mxdapi.com) |
| 🎁 Sağlayıcının verdikleri | anahtar başına bir hesap — e-posta kodu ile kayıt, her anahtar sohbet ile doğrulanır |
| 🔑 Bir anahtar size ne kazandırır | kendi hesabına kapsanmış bir API anahtarı: aşağıdaki uç noktada 4 model kimliği, planınızın limitlerinde. Kota **hesapta** yaşar, bu aracın anahtar başına bir hesap oluşturmasının nedeni tam olarak budur |
| 🌐 API şekli | OpenAI uyumlu: `POST https://mxdapi.com/v1/chat/completions` |
| 🔒 Verileriniz | yalnızca mxdapi.com ve yapılandırdığınız gelen kutusu arka ucuyla iletişim kurulur; anahtarlar makinenizde kalır |

## 🐞 Sorunlar

Panel kayıt şeklini, grupları veya krediyi değiştirirse, araç o adımda durur ve bunu bildirir. Çalıştırdığınız komut ve tam çıktıyla birlikte **[bir sorun açın](../../issues)**; PR'lar memnuniyetle karşılanır.

## 📄 Lisans

MIT © 2026 — bkz. [LICENSE](LICENSE).

<div align="center">

**[MIT](LICENSE)** © 2026 mxdapi-bulk-apikey katkıda bulunanlar

</div>