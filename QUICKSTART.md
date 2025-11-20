# 빠른 시작 가이드 🚀

5분 안에 청첩장을 완성하세요!

## 1단계: 이미지 준비 (2분)

### 필수 이미지 7개 준비

```
images/
├── main-cover.jpg      (메인 배경 - 세로형)
├── groom.jpg           (신랑 사진 - 정사각형)
├── bride.jpg           (신부 사진 - 정사각형)
└── gallery/
    ├── photo1.jpg
    ├── photo2.jpg
    ├── photo3.jpg
    ├── photo4.jpg
    ├── photo5.jpg
    └── photo6.jpg
```

### 이미지 크기 가이드
- 메인 커버: 1080 x 1920px (또는 비슷한 세로 비율)
- 프로필 사진: 600 x 600px
- 갤러리: 800 x 800px

### 빠른 이미지 압축
[TinyPNG](https://tinypng.com/)에서 한 번에 압축하세요!

---

## 2단계: 정보 수정 (2분)

### A. index.html 수정

다음 정보만 찾아서 수정하세요 (Ctrl+F로 검색):

#### 📝 이름 수정
```html
<!-- 검색: "신랑이름" → 실제 이름으로 변경 -->
신랑이름 ♥ 신부이름

<!-- 검색: "홍길동" → 신랑 이름 -->
<!-- 검색: "이몽룡" → 신부 이름 -->
```

#### 👪 부모님 성함
```html
<!-- 검색: "김철수", "이영희" → 신랑 부모님 -->
<!-- 검색: "박민수", "최순자" → 신부 부모님 -->
```

#### 📅 날짜, 시간, 장소
```html
<!-- 검색: "2025. 03. 15" → 실제 날짜 -->
<!-- 검색: "토요일 오후 2시" → 실제 요일, 시간 -->
<!-- 검색: "○○ 웨딩홀" → 실제 장소명 -->
```

#### 📞 전화번호
```html
<!-- 검색: "01012345678" → 실제 전화번호 (하이픈 없이) -->
tel:01012345678
sms:01012345678
```

#### 💰 계좌번호
```html
<!-- 검색: "123-456-789012" → 실제 계좌번호 -->
<!-- 은행명도 변경하세요 -->
```

### B. js/main.js 수정

파일 상단의 `WEDDING_INFO` 객체만 수정:

```javascript
const WEDDING_INFO = {
    groom: {
        name: '신랑이름',           // ← 수정
        father: '신랑아버지',        // ← 수정
        mother: '신랑어머니',        // ← 수정
        phone: '01012345678',      // ← 수정
        // ...
    },
    bride: {
        name: '신부이름',           // ← 수정
        father: '신부아버지',        // ← 수정
        mother: '신부어머니',        // ← 수정
        phone: '01087654321',      // ← 수정
        // ...
    },
    wedding: {
        date: '2025-03-15',        // ← 수정 (YYYY-MM-DD)
        time: '14:00',             // ← 수정 (24시간 형식)
        venue: '웨딩홀 이름',       // ← 수정
        address: '실제 주소',       // ← 수정
        hall: '3층 그랜드홀'        // ← 수정
    }
};
```

### C. js/map.js 수정

좌표만 변경하면 됩니다:

```javascript
const MAP_CONFIG = {
    center: {
        lat: 37.4979,    // ← 위도 수정
        lng: 127.0276    // ← 경도 수정
    },
    // ...
};
```

#### 좌표 찾는 법
1. [카카오맵](https://map.kakao.com) 접속
2. 결혼식 장소 검색
3. 주소 위에서 우클릭
4. "여기 어때?" 클릭
5. URL의 좌표 복사 (또는 "공유" → "URL 복사")

---

## 3단계: 테스트 (30초)

### 로컬에서 실행

#### 방법 1: 간단히 파일 열기
```bash
# index.html 파일을 브라우저로 드래그
```

#### 방법 2: Python 서버 (권장)
```bash
python -m http.server 8000
# 또는
python3 -m http.server 8000

# 브라우저에서: http://localhost:8000
```

#### 방법 3: VS Code Live Server
1. VS Code에서 프로젝트 열기
2. index.html 우클릭
3. "Open with Live Server"

### 모바일에서 테스트
같은 Wi-Fi에 연결된 스마트폰에서:
```
http://[컴퓨터IP]:8000
```

---

## 4단계: 배포 (30초)

### GitHub Pages (무료, 추천)

```bash
# 1. GitHub에서 새 저장소 생성
# 2. 코드 업로드
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/username/wedding.git
git push -u origin main

# 3. Settings → Pages → Source: main 선택
# 4. 완료! https://username.github.io/wedding
```

### Netlify (가장 쉬움)

1. [netlify.com](https://www.netlify.com) 가입
2. 프로젝트 폴더를 드래그앤드롭
3. 완료! 자동으로 URL 생성

### Vercel (빠름)

```bash
# 1회만 설치
npm i -g vercel

# 배포
vercel

# 완료! URL 자동 생성
```

---

## 선택사항: 지도 API (5분)

### 카카오맵 API 설정

1. [Kakao Developers](https://developers.kakao.com) 가입
2. "내 애플리케이션" → "애플리케이션 추가하기"
3. "앱 키" → "JavaScript 키" 복사
4. `index.html`의 `</head>` 앞에 추가:

```html
<script type="text/javascript"
    src="//dapi.kakao.com/v2/maps/sdk.js?appkey=여기에_API_KEY_붙여넣기">
</script>
```

> **참고**: API 키 없어도 Google Maps로 자동 대체됩니다!

---

## 체크리스트 ✅

배포 전 최종 확인:

- [ ] 모든 이미지가 올바르게 표시되나요?
- [ ] 이름이 모두 정확한가요?
- [ ] 날짜, 시간, 장소가 맞나요?
- [ ] 전화번호 클릭 시 전화 앱이 열리나요?
- [ ] 계좌번호 복사가 작동하나요?
- [ ] 지도가 올바른 위치를 가리키나요?
- [ ] 모바일에서 테스트했나요?
- [ ] 캘린더 추가가 작동하나요?

---

## 자주 묻는 질문 (FAQ)

### Q: 섹션을 제거하고 싶어요
A: `index.html`에서 해당 `<section>`을 주석 처리:
```html
<!-- <section id="guestbook">...</section> -->
```

### Q: 색상을 변경하고 싶어요
A: `css/variables.css` 파일의 색상값 변경

### Q: 폰트를 변경하고 싶어요
A: `css/typography.css`에서 `--font-main` 등 변경

### Q: 갤러리 사진을 더 추가하고 싶어요
A: `index.html`의 갤러리 섹션에 `.gallery-item` 복사해서 추가

### Q: 방명록이 저장되지 않아요
A: 현재는 클라이언트 전용입니다. 백엔드 연동이 필요합니다.

### Q: 커스텀 도메인을 연결하고 싶어요
A: Netlify/Vercel에서 "Domain Settings"에서 추가 가능

---

## 도움이 필요하신가요?

- 📧 이메일: support@example.com
- 💬 Issues: [GitHub Issues](링크)
- 📖 전체 문서: [README.md](./README.md) 참조

---

**축하합니다! 청첩장이 완성되었습니다! 💒✨**

이제 친구들과 가족들에게 링크를 공유하세요!
