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

**자동 생성 API 키로 MXDAPI (모델섬) 계정을 대량 생성 — OpenAI 호환 추론 + 9Router 커넥터.**

[![Node](https://img.shields.io/badge/Node-%E2%89%A518-3DA639?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![Dependencies](https://img.shields.io/badge/dependencies-0-blue?style=for-the-badge)](#)
[![License](https://img.shields.io/badge/license-MIT-6ea8fe?style=for-the-badge)](LICENSE)
[![Models](https://img.shields.io/badge/models-4%20served-412991?style=for-the-badge)](https://mxdapi.com)
[![9Router](https://img.shields.io/badge/9Router-connector-8B5CF6?style=for-the-badge)](#-connect-to-9router)
[![X](https://img.shields.io/badge/X-%40bigbullapp-000000?style=for-the-badge&logo=x&logoColor=white)](https://x.com/bigbullapp)

[🛠 빠른 시작](#-quick-start) · [🎁 무료 요금제](#-free-tier--how-much-you-get) · [🤖 모델](#-models--all-4-of-them) · [🧪 API 사용](#-how-to-use-the-api) · [✅ 검증 완료](#-verified-working--every-key-is-tested) · [🧭 작동 방식](#-how-it-works) · [🔌 9Router](#-connect-to-9router) · [⚙️ 옵션](#️-cli-options) · [🛰️ 프록시](#️-behind-a-proxy) · [🐞 이슈](#-issues)

</div>

<div align="center">

**English** · [Türkçe](README.tr.md) · [中文](README.cn.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Русский](README.ru.md) · [Português](README.pt.md)

</div>




---

## ✨ 이 프로젝트가 존재하는 이유

MXDAPI (모델섬)는 일반적인 **이메일 코드 가입**을 제공하는 New API 패널입니다(Turnstile 비활성화, 비밀번호 가입 허용). 가입 크레딧은 **¥1**(“注册送1刀”, 초대된 친구마다 ¥3 추가)이며, 그룹별 모델 카탈로그를 제공합니다. 유용한 단위는 *키 하나당 계정 하나*이며, 이 도구는 이를 **모든 줄이 실제 라이브 채팅 호출을 통과한** `keys.txt`로 변환합니다.

## 🎁 무료 요금제 — 얼마나 받을 수 있나

**모든 신규 계정에는 가입 크레딧이 제공됩니다** — 카드도, 캡차도 필요 없습니다.

| 항목 | 값 |
| --- | --- |
| 가입 크레딧 | **¥1** (`注册送1刀`) |
| 초대 보너스 | 초대한 사람 ¥3 / 초대받은 사람 ¥2 (패널 공지 기준) |
| 카드 필요 여부 | **아니요** |
| 일일 체크인 | 이 패널에서는 활성화되지 않음 |
| 가입 | 이메일 코드 (점 없는 gmail은 통과하지만 **별칭은 거부됨**) |
| 확장되는 단위 | **계정 하나 = 키 하나** → `--count N`은 실제로 "무료 계정 N개"를 의미 |

> 💡 무료 요금제는 MXDAPI (모델섬)가 설정하며 변경될 수 있습니다. [mxdapi.com](https://mxdapi.com)에서 최신 수치를 확인하고 — 도구 자체의 게이트가 판단하도록 하세요:

```bash
node src/cli.js --verify-only     # keys.txt의 모든 키를 실제 채팅 호출로 다시 테스트
```

## 🤖 모델 — 총 4개

카탈로그는 **그룹에 종속**됩니다. 새 계정은 채널이 없는 `vip` 그룹에 들어가므로, 도구는 테스트 전에 각 토큰을 라이브 그룹(`deepseek`, `gemini`, `Grok`, `kiro`, `claude max`)에 연결합니다. 라이브 검증된 ID: `deepseek-v4.1-flash`, `grok-4.5`, `claude-sonnet-5`, `gemini-3.8-flash`. `GET /v1/models`는 토큰 그룹별로 제공됩니다.

## 🧪 API 사용 방법

기본 URL은 **`https://mxdapi.com/v1`** — OpenAI 호환(New API 패널)이므로 OpenAI를 지원하는 모든 도구에서 작동합니다.

```bash
curl https://mxdapi.com/v1/chat/completions \
  -H "Authorization: Bearer <your key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"deepseek-v4.1-flash","messages":[{"role":"user","content":"hi"}],"max_tokens":8}'
```

모든 에이전트 또는 SDK(Cursor, OpenCode, Kilo Code, …)에서 기본 URL을 설정하고 위 카탈로그의 모델 ID를 선택하세요.

## 🛠 빠른 시작

```bash
# 이 저장소를 clone 또는 fork한 다음:
cd mxdapi-bulk-apikey

# 1) 프록시 목록, 한 줄에 하나(http://… 또는 socks5://…)
printf 'http://127.0.0.1:8080\n' > proxies.txt

# 2) 실행
node src/launcher.js        # 대화형
# 또는 직접 실행:
node src/cli.js --host=mxdapi.com --count 50
```

`keys.txt`는 실제 라이브 채팅 완료를 통해 키가 검증된 **후에만** 작성됩니다.

### 🖱️ 런처

런처는 프록시 목록, 개수 및 검증 모델을 묻고, 이를 `launcher.config.json`에 저장한 다음 적절한 플래그와 함께 CLI를 실행합니다.

## ✅ 작동 검증 완료 — 모든 키 테스트

| 검사 | 결과 |
| --- | --- |
| `GET /api/verification?email=<gmail>` | **200** — 6자리 16진수 코드를 전송(점 없는 gmail은 통과하지만 별칭은 거부됨) |
| `POST /api/user/register` | **200** — 계정이 `vip` 그룹에 들어감 |
| `GET /api/user/groups` | **200** — 모델 그룹 목록(`deepseek`, `gemini`, `Grok`, `kiro`, `claude max`, …)을 반환 |
| `POST /api/token/ {"group":"<group>"}` | **200** — 토큰을 라이브 그룹에 연결(이 포크에서는 쓰기 요청에 `x-requested-with: XMLHttpRequest` 필요) |
| `POST /v1/chat/completions` — 기록되기 전에 **모든** 키에 대해 실행 | 실제 콘텐츠와 함께 **200** |
| 채팅 검사에 실패한 키 | `keys.txt`에 기록되지 않음 — 계정은 `accounts.json`에서 복구 가능 |

언제든 다시 확인할 수 있습니다:

```bash
node src/cli.js --verify-only
```

## 🧭 작동 방식

```
inbox (계정당 주소 하나)                                      계정당 새로운 주소
   │
   ├─▶ 가입: MXDAPI (모델섬) 페이지 → 이메일 주소 → 받은 편지함의 코드 / 링크
   ├─▶ 세션: 계정의 쿠키 또는 액세스 토큰 확보
   ├─▶ 키 발급: 계정의 키 엔드포인트 → 평문 키가 한 번 반환됨(즉시 디스크에 기록)
   └─▶ 라이브 증명: POST https://mxdapi.com/v1/chat/completions → 실제 콘텐츠 = 키가 활성 상태
```

| 단계 | 호출 | 참고 |
| --- | --- | --- |
| code | send-code (이메일) | 점 없는 gmail은 작동하며, 별칭 주소는 패널에서 거부됨 |
| signup | register | 비밀번호 가입이 허용되며 Turnstile은 꺼져 있음 |
| sign-in | login | 세션 쿠키(이 포크) |
| token | `{"group":"deepseek"}` 형식의 바인딩으로 토큰 생성 | 라이브 그룹이 없으면 키가 `503 分组 … 无可用渠道`로 응답함 |
| key | 토큰 행 / 엔드포인트에서 공개 | 평문 키 |
| check | `POST /v1/chat/completions` | `keys.txt`에 기록되기 전에 라이브 200 필요 |

## ⚙️ CLI 옵션

```bash
node src/cli.js --host=mxdapi.com --count N   # 발급(기본값 50)
node src/cli.js --verify-only                 # keys.txt의 모든 키 다시 확인
node src/cli.js --help
```

| 환경 변수 | 기본값 | 의미 |
| --- | --- | --- |
| `MXDAPI_PROXIES` | `proxies.txt` | 프록시 풀 파일, 한 줄에 하나 |

## 🛰️ 프록시 사용

모든 요청은 풀에서 가져온 프록시 줄을 통해 전송됩니다. 작동하지 않는 줄은 해당 시도를 실패 처리하고 도구는 다음으로 넘어갑니다. 패널은 주소별 코드 전송을 속도 제한하므로 실행 속도를 조절하세요(계정 사이에 약 30~60초 간격이면 충분합니다).

## 📄 파일

| 경로 | 내용 |
| --- | --- |
| `keys.txt` | 라이브 검증된 키를 한 줄에 하나씩 저장 — git에서 무시됨 |
| `accounts.json` | 계정별 사용자 이름 / 비밀번호 / 키 / 채팅 상태 |
| `proxies.txt` | 사용할 출구 프록시, 한 줄에 하나 — git에서 무시됨 |
| `outputs/` | 실행 상태 — git에서 무시됨 |

## 🔌 9Router 연결

[9Router](https://9router.com)는 자체 호스팅 OpenAI 호환 라우터입니다. 이 제공자를 한 번 등록하면 모든 키가 하나의 provider-node 아래 연결로 등록됩니다:

```bash
node src/connect-9router.js
```

기본값: `--base http://localhost:20128`, `--password 123456`, `--name "MXDAPI"`, `--prefix mxdapi`, `--base-url https://mxdapi.com/v1`. 이후 모델은 `mxdapi/<model id>`로 제공되며 모든 키에 대해 부하가 분산됩니다.

## 🔑 키 하나로 얻는 것

| | |
| --- | --- |
| 🏢 제공자 | **MXDAPI (모델섬)** — [mxdapi.com](https://mxdapi.com) |
| 🎁 제공자가 제공하는 것 | 키 하나당 계정 하나 — 이메일 코드 가입, 모든 키 채팅 검증 |
| 🔑 키 하나로 얻는 것 | 자체 계정에 한정된 API 키 하나: 아래 엔드포인트의 4개 모델 ID를 요금제 한도 내에서 사용. 할당량은 **계정**에 저장되며, 이것이 바로 이 도구가 키 하나당 계정 하나를 생성하는 이유입니다 |
| 🌐 API 형식 | OpenAI 호환: `POST https://mxdapi.com/v1/chat/completions` |
| 🔒 사용자 데이터 | mxdapi.com과 사용자가 설정한 받은 편지함 백엔드에만 연결하며, 키는 사용자 컴퓨터에 보관됨 |

## 🐞 이슈

패널의 가입 형식, 그룹 또는 크레딧이 변경되면 도구는 해당 단계에서 중단되고 그 사실을 알려줍니다. **[이슈 열기](../../issues)** 시 실행한 명령과 정확한 출력을 함께 남겨 주세요. PR도 환영합니다.

## 📄 라이선스

MIT © 2026 — [LICENSE](LICENSE)를 참조하세요.

<div align="center">

**[MIT](LICENSE)** © 2026 mxdapi-bulk-apikey 기여자

</div>