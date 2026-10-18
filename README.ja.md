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

**자동 생성된 API 키로 MXDAPI (模型岛) 계정을 대량 생성 — OpenAI 호환 추론 + 9Router 커넥터.**

[![Node](https://img.shields.io/badge/Node-%E2%89%A518-3DA639?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![종속성](https://img.shields.io/badge/dependencies-0-blue?style=for-the-badge)](#)
[![라이선스](https://img.shields.io/badge/license-MIT-6ea8fe?style=for-the-badge)](LICENSE)
[![모델](https://img.shields.io/badge/models-4%20served-412991?style=for-the-badge)](https://mxdapi.com)
[![9Router](https://img.shields.io/badge/9Router-connector-8B5CF6?style=for-the-badge)](#-connect-to-9router)
[![X](https://img.shields.io/badge/X-%40bigbullapp-000000?style=for-the-badge&logo=x&logoColor=white)](https://x.com/bigbullapp)

[🛠 빠른 시작](#-quick-start) · [🎁 무료 티어](#-free-tier--how-much-you-get) · [🤖 모델](#-models--all-4-of-them) · [🧪 API 사용](#-how-to-use-the-api) · [✅ 검증 완료](#-verified-working--every-key-is-tested) · [🧭 작동 방식](#-how-it-works) · [🔌 9Router](#-connect-to-9router) · [⚙️ 옵션](#️-cli-options) · [🛰️ 프록시](#️-behind-a-proxy) · [🐞 이슈](#-issues)

</div>

<div align="center">

**English** · [Türkçe](README.tr.md) · [中文](README.cn.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Русский](README.ru.md) · [Português](README.pt.md)

</div>




---

## ✨ 이것이 필요한 이유

MXDAPI (模型岛)는 간단한 **이메일 코드 가입**(Turnstile 비활성화, 비밀번호 등록 가능)을 제공하는 New API 패널로, 가입 크레딧 **¥1**(“注册送1刀”, 초대한 친구마다 ¥3 추가)과 그룹별 모델 카탈로그를 제공합니다. 유용한 단위는 *키 하나당 계정 하나*이며, 이 도구는 이를 **모든 줄이 실제 채팅 호출을 통과한** `keys.txt`로 변환합니다.

## 🎁 무료 티어 — 얼마나 받을 수 있나

**모든 신규 계정은 가입 크레딧을 받습니다** — 카드도, 캡차도 필요 없습니다.

| 항목 | 값 |
| --- | --- |
| 가입 크레딧 | **¥1** (`注册送1刀`) |
| 초대 보너스 | 초대한 사람 ¥3 / 초대받은 사람 ¥2 (패널 공지 기준) |
| 카드 필요 여부 | **아니요** |
| 일일 체크인 | 이 패널에서는 활성화되지 않음 |
| 가입 | 이메일 코드 (점 없는 gmail은 통과; **별칭은 거부됨**) |
| 확장되는 단위 | **계정 하나 = 키 하나** → `--count N`은 실제로 "무료 계정 N개" |

> 💡 무료 티어는 MXDAPI (模型岛)가 정하며 변경될 수 있습니다. [mxdapi.com](https://mxdapi.com)에서 최신 수치를 확인하고 — 도구 자체의 게이트가 결정하도록 하세요:

```bash
node src/cli.js --verify-only     # every key in keys.txt is re-tested with a real chat call
```

## 🤖 모델 — 총 4개

카탈로그는 **그룹에绑定됩니다**: 새 계정은 채널이 없는 `vip`에 들어가므로, 도구는 테스트 전에 각 토큰을 실제 그룹(`deepseek`, `gemini`, `Grok`, `kiro`, `claude max`)에 바인딩합니다. 실제 검증된 ID: `deepseek-v4.1-flash`, `grok-4.5`, `claude-sonnet-5`, `gemini-3.8-flash`. `GET /v1/models`는 토큰 그룹별로 제공됩니다.

## 🧪 API 사용 방법

기본 URL은 **`https://mxdapi.com/v1`** — OpenAI 호환(New API 패널)이므로 OpenAI와 통신할 수 있는 모든 것이 작동합니다.

```bash
curl https://mxdapi.com/v1/chat/completions \
  -H "Authorization: Bearer <your key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"deepseek-v4.1-flash","messages":[{"role":"user","content":"hi"}],"max_tokens":8}'
```

모든 에이전트 또는 SDK(Cursor, OpenCode, Kilo Code, …)에서 기본 URL을 설정하고 위 카탈로그의 모델 ID를 선택하세요.

## 🛠 빠른 시작

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

`keys.txt`는 실제 채팅 완료를 통해 키가 검증된 **후에만** 작성됩니다.

### 🖱️ 런처

런처는 프록시 목록, 개수 및 검증 모델을 묻고 이를 `launcher.config.json`에 저장한 다음 올바른 플래그와 함께 CLI를 실행합니다.

## ✅ 검증 완료 — 모든 키가 테스트됨

| 검사 | 결과 |
| --- | --- |
| `GET /api/verification?email=<gmail>` | **200** — 6자리 16진수 코드를 전송 (점 없는 gmail은 통과; 별칭은 거부됨) |
| `POST /api/user/register` | **200** — 계정이 `vip` 그룹에 들어감 |
| `GET /api/user/groups` | **200** — 모델 그룹 목록(`deepseek`, `gemini`, `Grok`, `kiro`, `claude max`, …)을 표시 |
| `POST /api/token/ {"group":"<group>"}` | **200** — 토큰을 실제 그룹에 바인딩 (이 포크에서는 쓰기 요청에 `x-requested-with: XMLHttpRequest`가 필요함) |
| `POST /v1/chat/completions` — 기록되기 전에 **모든** 키에 대해 실행 | 실제 콘텐츠와 함께 **200** |
| 채팅 검사를 통과하지 못한 키 | `keys.txt`에 기록되지 않음 — 계정은 `accounts.json`에서 복구 가능 |

언제든 다시 검사할 수 있습니다:

```bash
node src/cli.js --verify-only
```

## 🧭 작동 방식

```
inbox (one address per account)                                  a fresh address per account
   │
   ├─▶ sign-up: MXDAPI (模型岛) page → e-mail address → code / link from the inbox
   ├─▶ session: the account's cookies or access token in hand
   ├─▶ key mint: the account's key endpoint → plaintext key returned once (written to disk immediately)
   └─▶ live proof: POST https://mxdapi.com/v1/chat/completions → real content = the key is live
```

| 단계 | 호출 | 참고 |
| --- | --- | --- |
| 코드 | send-code (e-mail) | 점 없는 gmail은 작동함; 별칭 주소는 패널에서 거부됨 |
| 가입 | register | 비밀번호 등록 가능; Turnstile 비활성화 |
| 로그인 | login | 세션 쿠키 (이 포크) |
| 토큰 | `{"group":"deepseek"}` 형식의 바인딩으로 토큰 생성 | 실제 그룹이 없으면 키가 `503 分组 … 无可用渠道`로 응답함 |
| 키 | 토큰 행 / 엔드포인트에서 공개 | 평문 키 |
| 확인 | `POST /v1/chat/completions` | `keys.txt` 전에 실제 200 응답 필요 |

## ⚙️ CLI 옵션

```bash
node src/cli.js --host=mxdapi.com --count N   # mint (default 50)
node src/cli.js --verify-only                 # re-check every key in keys.txt
node src/cli.js --help
```

| 환경 변수 | 기본값 | 의미 |
| --- | --- | --- |
| `MXDAPI_PROXIES` | `proxies.txt` | 풀 파일, 한 줄에 프록시 하나 |

## 🛰️ 프록시 사용

모든 요청은 풀의 프록시 한 줄을 통해 전송됩니다. 죽은 줄은 해당 시도를 실패시키고 도구는 다음으로 넘어갑니다. 패널은 주소별 코드 전송을 속도 제한하므로 실행 속도를 조절하세요(계정 간 약 30~60초 간격이면 충분합니다).

## 📄 파일

| 경로 | 내용 |
| --- | --- |
| `keys.txt` | 줄마다 실제 검증된 키 하나 — git에서 무시됨 |
| `accounts.json` | 계정별 사용자 이름 / 비밀번호 / 키 / 채팅 상태 |
| `proxies.txt` | 사용할 출구, 한 줄에 하나 — git에서 무시됨 |
| `outputs/` | 실행 상태 — git에서 무시됨 |

## 🔌 9Router 연결

[9Router](https://9router.com)는 자체 호스팅되는 OpenAI 호환 라우터입니다. 이 공급자를 한 번 등록하면 모든 키가 하나의 공급자 노드 아래 연결로 등록됩니다:

```bash
node src/connect-9router.js
```

기본값: `--base http://localhost:20128`, `--password 123456`, `--name "MXDAPI"`, `--prefix mxdapi`, `--base-url https://mxdapi.com/v1`. 그러면 모델이 `mxdapi/<model id>`로 제공되며 모든 키에 대해 로드 밸런싱됩니다.

## 🔑 키 하나로 얻는 것

| | |
| --- | --- |
| 🏢 공급자 | **MXDAPI (模型岛)** — [mxdapi.com](https://mxdapi.com) |
| 🎁 공급자가 제공하는 것 | 키 하나당 계정 하나 — 이메일 코드 가입, 모든 키 채팅 검증 완료 |
| 🔑 키 하나로 얻는 것 | 자체 계정에 한정된 API 키 하나: 아래 엔드포인트의 4개 모델 ID를 요금제 한도 내에서 사용. 할당량은 **계정**에 귀속되며, 이것이 바로 이 도구가 키 하나당 계정 하나를 생성하는 이유입니다 |
| 🌐 API 형식 | OpenAI 호환: `POST https://mxdapi.com/v1/chat/completions` |
| 🔒 사용자 데이터 | mxdapi.com과 사용자가 설정한 inbox 백엔드에만 연결하며, 키는 사용자의 컴퓨터에 보관됨 |

## 🐞 이슈

패널이 가입 방식, 그룹 또는 크레딧을 변경하면 도구는 해당 단계에서 중지하고 이를 알립니다. 실행한 명령과 정확한 출력을 함께 **[이슈를 등록](../../issues)**해 주세요. PR도 환영합니다.

## 📄 라이선스

MIT © 2026 — [LICENSE](LICENSE)를 참조하세요.

<div align="center">

**[MIT](LICENSE)** © 2026 mxdapi-bulk-apikey 기여자

</div>