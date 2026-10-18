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

**Otomatik oluşturulan API anahtarlarıyla toplu MXDAPI (模型岛) hesabı oluşturma — OpenAI uyumlu çıkarım + 9Router bağlayıcısı.**

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

<div align="center">

**İngilizce** · [Türkçe](README.tr.md) · [中文](README.cn.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Русский](README.ru.md) · [Português](README.pt.md)

</div>



---

## ✨ Bu neden var?

MXDAPI (模型岛), basit bir **e-posta koduyla kayıt** özelliğine (Turnstile devre dışı, parola ile kayıt açık), **¥1 kayıt kredisine** (“注册送1刀”; ayrıca davet edilen her arkadaş için ¥3) ve grup başına model kataloglarına sahip yeni bir API panelidir. Kullanışlı birim *anahtar başına bir hesap*tır ve bu araç bunu, **her satırı canlı bir sohbet çağrısından geçmiş** bir `keys.txt` dosyasına dönüştürür.

## 🎁 Ücretsiz katman — ne kadar alırsınız?

**Her yeni hesap kayıt kredisi alır** — kart yok, captcha yok.

| Ne | Değer |
| --- | --- |
| Kayıt kredisi | **¥1** (`注册送1刀`) |
| Davet bonusları | Davet edene ¥3 / davet edilene ¥2 (panel duyurusuna göre) |
| Kart gerekli mi? | **Hayır** |
| Günlük giriş | bu panelde etkin değil |
| Kayıt | e-posta kodu (noktasız gmail geçer; **takma adlar reddedilir**) |
| Ölçeklenen birim | **bir hesap = bir anahtar** → `--count N` gerçekten “N ücretsiz hesap” demektir |

> 💡 Ücretsiz katman MXDAPI (模型岛) tarafından belirlenir ve değişebilir. Güncel sayıları [mxdapi.com](https://mxdapi.com) adresinden kontrol edin — aracın kendi kontrolü karar versin:

```bash
node src/cli.js --verify-only     # every key in keys.txt is re-tested with a real chat call
```

## 🤖 Modeller — 4'ünün tamamı

Katalog **gruba bağlıdır**: yeni bir hesap, hiçbir kanalın bulunmadığı `vip` grubuna gelir — araç, test etmeden önce her token'ı canlı bir gruba (`deepseek`, `gemini`, `Grok`, `kiro`, `claude max`) bağlar. Doğrulanmış canlı kimlikler: `deepseek-v4.1-flash`, `grok-4.5`, `claude-sonnet-5`, `gemini-3.8-flash`. `GET /v1/models`, token grubuna göre sunulur.

## 🧪 API nasıl kullanılır?

Temel URL **`https://mxdapi.com/v1`**'dir — OpenAI uyumludur (New API paneli); dolayısıyla OpenAI ile konuşabilen her şey çalışır.

```bash
curl https://mxdapi.com/v1/chat/completions \
  -H "Authorization: Bearer <your key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"deepseek-v4.1-flash","messages":[{"role":"user","content":"hi"}],"max_tokens":8}'
```

Temel URL'yi herhangi bir aracıya veya SDK'ya (Cursor, OpenCode, Kilo Code, …) ayarlayın ve yukarıdaki katalogdan herhangi bir model kimliğini seçin.

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

`keys.txt`, **ancak canlı bir sohbet tamamlaması anahtarı kanıtladıktan sonra** yazılır.

### 🖱️ Başlatıcı

Başlatıcı proxy listesini, sayıyı ve doğrulama modelini sorar; bunları `launcher.config.json` dosyasına kaydeder ve CLI'yi doğru bayraklarla çalıştırır.

## ✅ Çalıştığı doğrulandı — her anahtar test edilir

| Kontrol | Sonuç |
| --- | --- |
| `GET /api/verification?email=<gmail>` | **200** — 6 haneli bir kod gönderir (noktasız gmail geçer; takma adlar reddedilir) |
| `POST /api/user/register` | **200** — hesap `vip` grubuna gelir |
| `GET /api/user/groups` | **200** — model gruplarını listeler (`deepseek`, `gemini`, `Grok`, `kiro`, `claude max`, …) |
| `POST /api/token/ {"group":"<group>"}` | **200** — token'ı canlı bir gruba bağlar (bu çatallamada yazma işlemleri için `x-requested-with: XMLHttpRequest` gerekir) |
| `POST /v1/chat/completions` — yazılmadan önce **her** anahtar için çalıştırılır | Gerçek içerikle **200** |
| sohbet kontrolünde başarısız olan bir anahtar | `keys.txt` dosyasına hiçbir zaman yazılmaz — hesap `accounts.json` içinde kurtarılabilir durumda kalır |

İstediğiniz zaman yeniden kontrol edin:

```bash
node src/cli.js --verify-only
```

## 🧭 Nasıl çalışır?

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
| kod | send-code (e-posta) | noktasız gmail çalışır; takma adresler panel tarafından reddedilir |
| kayıt | register | parola ile kayıt açıktır; Turnstile kapalıdır |
| giriş | login | oturum çerezi (bu çatallama) |
| token | `{"group":"deepseek"}` tarzı bağlamayla token oluşturma | canlı bir grup olmadan anahtar `503 分组 … 无可用渠道` yanıtı verir |
| anahtar | token satırında / uç noktada gösterme | düz metin anahtar |
| kontrol | `POST /v1/chat/completions` | `keys.txt` öncesinde canlı 200 gereklidir |

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

Her istek havuzunuzdaki bir proxy satırı üzerinden çıkar; çalışmayan bir satır o denemeyi başarısız kılar ve araç devam eder. Panel, adres başına kod gönderimlerini hız sınırlar; bu nedenle çalışmayı aralıklı yürütün (hesaplar arasında yaklaşık 30–60 saniyelik bir ara yeterlidir).

## 📄 Dosyalar

| Yol | İçerik |
| --- | --- |
| `keys.txt` | satır başına canlı olarak doğrulanmış bir anahtar — git tarafından yok sayılır |
| `accounts.json` | hesap başına kullanıcı adı / parola / anahtar / sohbet durumu |
| `proxies.txt` | çıkışlarınız, satır başına bir tane — git tarafından yok sayılır |
| `outputs/` | çalışma durumu — git tarafından yok sayılır |

## 🔌 9Router'a bağlanma

[9Router](https://9router.com), kendi kendine barındırılan, OpenAI uyumlu bir yönlendiricidir. Bu sağlayıcıyı bir kez kaydedin; her anahtar tek bir sağlayıcı düğümü altında bir bağlantıya dönüşür:

```bash
node src/connect-9router.js
```

Varsayılanlar: `--base http://localhost:20128`, `--password 123456`, `--name "MXDAPI"`, `--prefix mxdapi`, `--base-url https://mxdapi.com/v1`. Modeller daha sonra `mxdapi/<model id>` olarak sunulur ve tüm anahtarlar arasında yük dengelenir.

## 🔑 Bir anahtar size ne sağlar?

| | |
| --- | --- |
| 🏢 Sağlayıcı | **MXDAPI (模型岛)** — [mxdapi.com](https://mxdapi.com) |
| 🎁 Sağlayıcının sunduğu | anahtar başına bir hesap — e-posta koduyla kayıt, sohbet üzerinden doğrulanmış her anahtar |
| 🔑 Bir anahtarın sağladığı | kendi hesabına bağlı bir API anahtarı: aşağıdaki uç noktadaki 4 model kimliği, planınızın limitleri dahilinde. Kota **hesapta** bulunur; bu nedenle bu araç anahtar başına bir hesap oluşturur |
| 🌐 API biçimi | OpenAI uyumlu: `POST https://mxdapi.com/v1/chat/completions` |
| 🔒 Verileriniz | yalnızca mxdapi.com ve yapılandırdığınız gelen kutusu arka ucuyla iletişim kurulur; anahtarlar makinenizde kalır |

## 🐞 Sorunlar

Panel kayıt biçimini, grupları veya krediyi değiştirirse araç o adımda durur ve bunu bildirir. **[Bir sorun açın](../../issues)**; çalıştırdığınız komutu ve tam çıktıyı ekleyin. PR'lar memnuniyetle karşılanır.

## 📄 Lisans

MIT © 2026 — [LICENSE](LICENSE) dosyasına bakın.

<div align="center">

**[MIT](LICENSE)** © 2026 mxdapi-bulk-apikey katkıcıları

</div>