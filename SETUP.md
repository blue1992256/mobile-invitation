# 모바일 청첩장 설정 가이드

## 개요

이 프로젝트는 개인정보(이름, 부모님 성함, 계좌번호 등)를 별도 파일로 분리하여 관리합니다.
오픈소스로 공유할 수 있도록 개인정보는 Git 저장소에서 제외되며, 사용자가 직접 설정 파일을 생성해야 합니다.

## 설정 방법

### 1. 개인정보 파일 생성

프로젝트 루트 디렉토리에 `personal-info.json` 파일을 생성하세요.

```bash
cp personal-info.template.json personal-info.json
```

### 2. 개인정보 입력

`personal-info.json` 파일을 열어서 실제 정보로 수정하세요.

```json
{
  "couple": {
    "groom": {
      "name": "홍길동",
      "nickname": "길동",
      "father": {
        "name": "홍아버지"
      },
      "mother": {
        "name": "홍어머니"
      }
    },
    "bride": {
      "name": "김영희",
      "nickname": "영희",
      "father": {
        "name": "김아버지"
      },
      "mother": {
        "name": "김어머니"
      }
    }
  },
  "wedding": {
    "date": "2026년 3월 7일 토요일 오후 2시",
    "dateISO": "2026-03-07",
    "dday100": "2025-11-27",
    "venue": {
      "name": "예식장 이름"
    }
  },
  "accounts": {
    "groom": [
      {
        "relation": "신랑",
        "bank": "은행명",
        "number": "계좌번호"
      },
      {
        "relation": "아버지",
        "bank": "은행명",
        "number": "계좌번호"
      },
      {
        "relation": "어머니",
        "bank": "은행명",
        "number": "계좌번호"
      }
    ],
    "bride": [
      {
        "relation": "신부",
        "bank": "은행명",
        "number": "계좌번호"
      },
      {
        "relation": "아버지",
        "bank": "은행명",
        "number": "계좌번호"
      },
      {
        "relation": "어머니",
        "bank": "은행명",
        "number": "계좌번호"
      }
    ]
  },
  "meta": {
    "title": "홍길동 ❤️ 김영희 결혼합니다",
    "ogDescription": "2026년 3월 7일 토요일 오후 2시 | 예식장 이름"
  }
}
```

### 3. 날짜 정보 설정

결혼식 날짜 관련 필드:
- `date`: 화면에 표시될 날짜 텍스트 (예: "2026년 3월 7일 토요일 오후 2시")
- `dateISO`: D-Day 계산에 사용되는 ISO 형식 날짜 (예: "2026-03-07")
- `dday100`: 러닝 애니메이션 시작일 (결혼식 100일 전, 예: "2025-11-27")

**중요**: `dateISO`와 실제 결혼식 날짜가 일치해야 D-Day 카운터가 정확히 작동합니다.

**dday100 계산 방법**:
결혼식 날짜에서 100일을 뺀 날짜를 입력하세요.
```javascript
// 예시: 2026년 3월 7일 결혼식인 경우
// 2026-03-07에서 100일 전 = 2025-11-27
```

### 4. 계좌 정보 추가/제거

각 측(신랑/신부)의 계좌는 배열 형태로 관리됩니다. 필요에 따라 항목을 추가하거나 제거할 수 있습니다.

**예시: 신랑측 계좌 1개만 표시**
```json
"groom": [
  {
    "relation": "신랑",
    "bank": "카카오뱅크",
    "number": "3333-12-3456789"
  }
]
```

### 5. 파일 구조

- `personal-info.json` - 실제 개인정보 (Git에서 제외됨)
- `personal-info.template.json` - 예시 템플릿 (Git에 포함됨)
- `.gitignore` - `personal-info.json`을 제외하도록 설정됨

## 로컬 테스트

### 방법 1: Python 서버 (권장)

```bash
python3 -m http.server 8000
```

브라우저에서 `http://localhost:8000` 접속

### 방법 2: 직접 열기

일부 브라우저에서는 보안상의 이유로 `file://` 프로토콜에서 fetch API가 작동하지 않을 수 있습니다.
로컬 서버 사용을 권장합니다.

## 문제 해결

### "개인정보 파일을 찾을 수 없습니다" 알림이 뜨는 경우

1. `personal-info.json` 파일이 프로젝트 루트 디렉토리에 있는지 확인
2. 파일 이름이 정확한지 확인 (대소문자 구분)
3. 로컬 서버를 통해 접속하고 있는지 확인

### 정보가 표시되지 않는 경우

1. 브라우저 개발자 도구(F12) → Console 탭에서 에러 확인
2. `personal-info.json` 파일의 JSON 형식이 올바른지 확인
3. 모든 필드가 템플릿과 동일한 구조로 작성되었는지 확인

### JSON 유효성 검사

온라인 JSON 검증 도구를 사용하여 형식을 확인할 수 있습니다:
- https://jsonlint.com/
- 개발자 도구 Console에서: `JSON.parse(파일내용)`

## 배포 시 주의사항

### 주의: personal-info.json 파일 포함하기

서버에 배포할 때는 반드시 `personal-info.json` 파일을 함께 업로드해야 합니다.

**배포 체크리스트:**
- [ ] `personal-info.json` 파일 생성 완료
- [ ] 모든 개인정보 입력 완료
- [ ] 로컬에서 테스트 완료
- [ ] 서버에 `personal-info.json` 파일 업로드

### Git 저장소에 푸시 전 확인

```bash
# 개인정보 파일이 Git에서 제외되었는지 확인
git status

# personal-info.json이 목록에 없어야 정상입니다
```

만약 `personal-info.json`이 git status에 나타난다면:
```bash
# .gitignore가 올바른지 확인
cat .gitignore | grep personal-info.json

# 캐시 제거 (이미 추가된 경우)
git rm --cached personal-info.json
```

## 추가 정보

- 개인정보 파일은 절대 Git 저장소에 커밋하지 마세요
- 템플릿 파일(`personal-info.template.json`)은 예시 데이터를 포함하므로 안전하게 공유할 수 있습니다
- 다른 사람이 이 프로젝트를 사용할 때는 본인의 정보로 `personal-info.json`을 새로 생성하면 됩니다
