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

> **Turbo 권장 (워커 5개); 그 이상은 저사양 컴퓨터에서 부하/차단 위험이 있습니다.**

**MXDAPI (模型岛) 계정을 자동 생성된 API 키와 함께 대량 생성 — OpenAI 호환 추론 + 9Router 커넥터.**

[![Node](https://img.shields.io/badge/Node-%E2%89%A518-3DA639?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![Dependencies](https://img.shields.io/badge/dependencies-0-blue?style=for-the-badge)](#)
[![License](https://img.shields.io/badge/license-MIT-6ea8fe?style=for-the-badge)](LICENSE)
[![Models](https://img.shields.io/badge/models-4%20served-412991?style=for-the-badge)](https://mxdapi.com)
[![9Router](https://img.shields.io/badge/9Router-connector-8B5CF6?style=for-the-badge)](#-connect-to-9router)
[![X](https://img.shields.io/badge/X-%40bigbullapp-000000?style=for-the-badge&logo=x&logoColor=white)](https://x.com/bigbullapp)

[🛠 빠른 시작](#-quick-start) · [🎁 무료 티어](#-free-tier--how-much-you-get) · [🤖 모델](#-models--all-4-of-them) · [🧪 API 사용법](#-how-to-use-the-api) · [✅ 검증됨](#-verified-working--every-key-is-tested) · [🧭 작동 방식](#-how-it-works) · [🔌 9Router](#-connect-to-9router) · [⚙️ 옵션](#️-cli-options) · [🛰️ 프록시](#️-behind-a-proxy) · [🐞 이슈](#-issues)

</div>

<div align="center">

**English** · [Türkçe](README.tr.md) · [中文](README.cn.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Русский](README.ru.md) · [Português](README.pt.md)

</div>

---

## ✨ 이 도구가 존재하는 이유

MXDAPI (模型岛)는 단순한 **이메일 코드 가입**(Turnstile 비활성화, 비밀번호 등록 개방)을 제공하는 New API 패널로, 가입 크레딧 **¥1**("注册送1刀", 초대한 친구당 ¥3 추가)과 그룹별 모델 카탈로그를 제공합니다. 유용한 단위는 *키당 하나의 계정*이며, 이 도구는 이를 **모든 줄이 실제 채팅 호출을 통과한** `keys.txt`로 바꿔줍니다.

## 🎁 무료 티어 — 얼마나 받을 수 있나

**모든 신규 계정은 가입 크레딧을 받습니다** — 카드도, 캡차도 필요 없습니다.

| 항목 | 값 |
| --- | --- |
| 가입 크레딧 | **¥1** (`注册送1刀`) |
| 초대 보너스 | 초대한 사람 ¥3 / 초대받은 사람 ¥2 (패널 공지 기준) |
| 카드 필요 | **아니오** |
| 일일 출석 체크 | 이 패널에서는 활성화되지 않음 |
| 가입 | 이메일 코드 (점 없는 gmail 통과; **별칭은 거부됨**) |
| 확장되는 단위 | **계정 하나 = 키 하나** → `--count N`은 사실상 "무료 계정 N개" |

> 💡 무료 티어는 MXDAPI (模型岛)가 설정하며 변경될 수 있습니다. 실시간 수치는 [mxdapi.com](https://mxdapi.com)에서 확인하세요 — 그리고 도구 자체의 게이트가 판단하게 하세요:

```bash
node src/cli.js --verify-only     # keys.txt의 모든 키가 실제 채팅 호출로 재검증됩니다
```

## 🤖 모델 — 전부 4개

카탈로그는 **그룹에 묶여 있습니다**: 새 계정은 `vip`에 배정되지만 여기에는 아무 채널도 없습니다 — 도구는 테스트 전에 각 토큰을 실제 그룹(`deepseek`, `gemini`, `Grok`, `kiro`, `claude max`)에 바인딩합니다. 검증된 실제 id: `deepseek-v4.1-flash`, `grok-4.5`, `claude-sonnet-5`, `gemini-3.8-flash`. `GET /v1/models`는 토큰 그룹별로 제공됩니다.

|모델|✓|
|---|---|
|`deepseek-v4.1-flash`|✓|
|`grok-4.5`|✓|
|`claude-sonnet-5`|✓|
|`gemini-3.8-flash`|✓|

## 🧪 API 사용법

베이스 URL은 **`https://mxdapi.com/v1`** 입니다 — OpenAI 호환(New API 패널)이므로 OpenAI를 지원하는 모든 것이 작동합니다.

```bash
curl https://mxdapi.com/v1/chat/completions \
  -H "Authorization: Bearer <your key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"deepseek-v4.1-flash","messages":[{"role":"user","content":"hi"}],"max_tokens":8}'
```

어떤 에이전트나 SDK(Cursor, OpenCode, Kilo Code, …)에서든 베이스 URL을 설정하고 위 카탈로그의 아무 모델 id나 선택하세요.

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

`keys.txt`는 실제 채팅 완성이 키를 증명한 **후에만** 작성됩니다.

### 🖱️ 런처

런처는 프록시 목록, 개수, 검증 모델을 물어보고 이를 `launcher.config.json`에 기억한 뒤 올바른 플래그로 CLI를 실행합니다.

## ✅ 검증됨 — 모든 키가 테스트됩니다

| 검사 | 결과 |
| --- | --- |
| `GET /api/verification?email=<gmail>` | **200** — 6자리 16진수 코드 전송 (점 없는 gmail 통과; 별칭 거부됨) |
| `POST /api/user/register` | **200** — 계정이 `vip` 그룹에 배정됨 |
| `GET /api/user/groups` | **200** — 모델 그룹 목록 (`deepseek`, `gemini`, `Grok`, `kiro`, `claude max`, …) |
| `POST /api/token/ {"group":"<group>"}` | **200** — 토큰을 실제 그룹에 바인딩 (이 포크에서는 쓰기 작업에 `x-requested-with: XMLHttpRequest` 필요) |
| `POST /v1/chat/completions` — 작성 전 **모든** 키에 대해 실행 | 실제 콘텐츠와 함께 **200** |
| 채팅 검사에 실패한 키 | `keys.txt`에 절대 작성되지 않음 — 계정은 `accounts.json`에 복구 가능한 상태로 남음 |

언제든 재확인:

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

| 단계 | 호출 | 비고 |
| --- | --- | --- |
| 코드 | 코드 전송 (이메일) | 점 없는 gmail은 작동; 별칭 주소는 패널에서 거부됨 |
| 가입 | register | 비밀번호 등록 개방; Turnstile 비활성화 |
| 로그인 | login | 세션 쿠키 (이 포크) |
| 토큰 | `{"group":"deepseek"}` 스타일 바인딩으로 토큰 생성 | 실제 그룹 없이는 키가 `503 分组 … 无可用渠道`를 반환 |
| 키 | 토큰 행 / 엔드포인트에서 공개 | 평문 키 |
| 검사 | `POST /v1/chat/completions` | `keys.txt` 작성 전 실제 200 필수 |

## ⚙️ CLI 옵션

```bash
node src/cli.js --host=mxdapi.com --count N   # mint (default 50)
node src/cli.js --verify-only                 # re-check every key in keys.txt
node src/cli.js --help
```

| 환경 변수 | 기본값 | 의미 |
| --- | --- | --- |
| `MXDAPI_PROXIES` | `proxies.txt` | 풀 파일, 한 줄에 프록시 하나 |

## 🛰️ 프록시 뒤에서

모든 요청은 풀의 프록시 줄을 통해 나갑니다; 죽은 줄은 해당 시도를 실패시키고 도구는 계속 진행합니다. 패널은 주소별로 코드 전송을 속도 제한하므로 실행 속도를 조절하세요 (계정 간 약 30–60초 간격이면 충분합니다).

## 📄 파일

| 경로 | 내용 |
| --- | --- |
| `keys.txt` | 한 줄에 실제 검증된 키 하나 — git 무시됨 |
| `accounts.json` | 계정별 사용자 이름 / 비밀번호 / 키 / 채팅 상태 |
| `proxies.txt` | 출구, 한 줄에 하나 — git 무시됨 |
| `outputs/` | 실행 상태 — git 무시됨 |

## 🔌 9Router에 연결

[9Router](https://9router.com)는 자체 호스팅, OpenAI 호환 라우터입니다. 이 제공자를 한 번 등록하면 모든 키가 하나의 제공자 노드 아래 연결이 됩니다:

```bash
node src/connect-9router.js
```

기본값: `--base http://localhost:20128`, `--password 123456`, `--name "MXDAPI"`, `--prefix mxdapi`, `--base-url https://mxdapi.com/v1`. 그러면 모델은 `mxdapi/<model id>`로 제공되며 모든 키에 걸쳐 로드 밸런싱됩니다.

## 🔑 키 하나로 얻는 것

| | |
| --- | --- |
| 🏢 제공자 | **MXDAPI (模型岛)** — [mxdapi.com](https://mxdapi.com) |
| 🎁 제공자가 주는 것 | 키당 하나의 계정 — 이메일 코드 가입, 모든 키 채팅 검증됨 |
| 🔑 키 하나로 얻는 것 | 자체 계정에 범위가 지정된 하나의 API 키: 아래 엔드포인트의 4개 모델 id, 플랜 한도 내에서. 할당량은 **계정**에 있으므로, 이 도구가 키당 하나의 계정을 생성하는 것입니다 |
| 🌐 API 형태 | OpenAI 호환: `POST https://mxdapi.com/v1/chat/completions` |
| 🔒 데이터 | mxdapi.com과 설정한 inbox 백엔드만 접촉됩니다; 키는 사용자 컴퓨터에 남습니다 |

## 🐞 이슈

패널이 가입 형태, 그룹 또는 크레딧을 변경하면 도구는 해당 단계에서 멈추고 그 사실을 알립니다. 실행한 명령과 정확한 출력을 포함하여 **[이슈를 열어주세요](../../issues)**; PR도 환영합니다.

## 📄 라이선스

MIT © 2026 — [LICENSE](LICENSE) 참조.

<div align="center">

**[MIT](LICENSE)** © 2026 mxdapi-bulk-apikey contributors

</div>