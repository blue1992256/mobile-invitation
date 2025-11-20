# 시작하기 - 완벽 가이드 📘

처음 웹 개발을 접하시는 분도 따라할 수 있는 상세 가이드입니다.

## 목차
1. [프로젝트 이해하기](#1-프로젝트-이해하기)
2. [파일 구조 살펴보기](#2-파일-구조-살펴보기)
3. [이미지 준비하기](#3-이미지-준비하기)
4. [정보 수정하기](#4-정보-수정하기)
5. [로컬 테스트](#5-로컬-테스트)
6. [배포하기](#6-배포하기)
7. [문제 해결](#7-문제-해결)

---

## 1. 프로젝트 이해하기

### 이 프로젝트는 무엇인가요?

모바일 웨딩 인비테이션은 **결혼식 청첩장 웹사이트**입니다.

- 📱 스마트폰에 최적화
- 💻 PC에서도 잘 보임
- 🎨 우아한 디자인
- ⚡ 빠른 로딩
- 🆓 완전 무료

### 어떤 기능이 있나요?

1. **메인 화면**: 신랑신부 이름, 날짜, 장소
2. **인사말**: 하객에게 전하는 메시지
3. **연락처**: 전화/문자 버튼
4. **사진 갤러리**: 여러 장의 사진
5. **지도**: 오시는 길 안내
6. **계좌번호**: 축의금 안내
7. **방명록**: 축하 메시지
8. **공유**: 링크 복사, SNS 공유

### 기술적 배경

- **HTML**: 내용 구조
- **CSS**: 디자인과 스타일
- **JavaScript**: 동작과 인터랙션

프레임워크나 복잡한 도구 없이 순수한 코드만 사용합니다.

---

## 2. 파일 구조 살펴보기

```
invitation-mobile/          ← 프로젝트 폴더
│
├── index.html             ← 메인 페이지 (이것만 열면 됨!)
│
├── css/                   ← 디자인 파일들
│   ├── reset.css
│   ├── variables.css     ← 색상, 크기 설정
│   ├── typography.css    ← 폰트 스타일
│   ├── layout.css        ← 배치
│   ├── components.css    ← 버튼, 카드 등
│   └── animations.css    ← 애니메이션
│
├── js/                    ← 기능 구현 파일들
│   ├── utils.js
│   ├── main.js           ← 메인 기능
│   └── map.js            ← 지도 기능
│
├── images/                ← 이미지 폴더
│   ├── main-cover.jpg    ← 메인 사진
│   ├── groom.jpg         ← 신랑 사진
│   ├── bride.jpg         ← 신부 사진
│   └── gallery/          ← 갤러리 사진들
│       ├── photo1.jpg
│       ├── photo2.jpg
│       └── ...
│
└── README.md              ← 설명서
```

### 수정해야 할 파일

✅ **반드시 수정**:
- `index.html` - 내용 (이름, 날짜 등)
- `js/main.js` - 정보 설정
- `js/map.js` - 지도 좌표

📸 **이미지 추가**:
- `images/` 폴더에 사진 넣기

🎨 **선택적 수정**:
- `css/variables.css` - 색상 변경
- `css/typography.css` - 폰트 변경

---

## 3. 이미지 준비하기

### 필요한 이미지 목록

| 파일명 | 설명 | 권장 크기 | 비율 |
|--------|------|-----------|------|
| `main-cover.jpg` | 메인 배경 | 1080×1920px | 세로형 |
| `groom.jpg` | 신랑 사진 | 600×600px | 정사각형 |
| `bride.jpg` | 신부 사진 | 600×600px | 정사각형 |
| `gallery/photo1.jpg` | 갤러리 1 | 800×800px | 정사각형 |
| `gallery/photo2.jpg` | 갤러리 2 | 800×800px | 정사각형 |
| ... | 갤러리 3~6 | 800×800px | 정사각형 |

### 이미지 준비 단계별 가이드

#### Step 1: 사진 선택
1. 스마트폰이나 카메라에서 사진 선택
2. 가로보다 세로 사진이 메인에 좋습니다
3. 밝고 선명한 사진 권장

#### Step 2: 크기 조정

**방법 1: 온라인 도구** (추천)
1. [ImageResizer.com](https://imageresizer.com/) 접속
2. 이미지 업로드
3. 크기 입력 (예: 600x600)
4. 다운로드

**방법 2: 스마트폰 앱**
- iOS: "단축어" 앱 사용
- Android: "Photo Resizer" 앱 다운

**방법 3: 포토샵**
- 이미지 → 이미지 크기 → 너비/높이 입력

#### Step 3: 압축

파일 크기를 줄여 빠른 로딩 보장:

1. [TinyPNG.com](https://tinypng.com/) 접속
2. 이미지 드래그앤드롭 (최대 20개)
3. "Download All" 클릭
4. 평균 70% 압축 (화질 저하 없음)

#### Step 4: 파일명 변경

```
Before:
IMG_20250101_123456.jpg
KakaoTalk_20250102_135959.jpg

After:
main-cover.jpg
groom.jpg
bride.jpg
photo1.jpg
photo2.jpg
```

⚠️ **주의사항**:
- 영문 소문자 사용
- 공백 없이 (하이픈 사용)
- 특수문자 금지

#### Step 5: 폴더에 넣기

```
images/
├── main-cover.jpg      ← 여기에
├── groom.jpg           ← 여기에
├── bride.jpg           ← 여기에
└── gallery/
    ├── photo1.jpg      ← 여기에
    ├── photo2.jpg      ← 여기에
    └── ...
```

### 테스트용 임시 이미지

아직 사진이 없다면 임시로 테스트:

**온라인 Placeholder 사용**:
`index.html`에서 이미지 경로를 임시로 변경:

```html
<!-- 임시 테스트용 (나중에 원래대로 복원) -->
<img src="https://via.placeholder.com/600x600/D4A574/FFFFFF?text=Groom" alt="신랑">
<img src="https://via.placeholder.com/600x600/F5E6D3/333333?text=Bride" alt="신부">
```

---

## 4. 정보 수정하기

### A. index.html 수정

텍스트 에디터로 `index.html` 열기:
- Windows: 메모장, Notepad++
- Mac: TextEdit, VS Code
- 추천: [VS Code](https://code.visualstudio.com/) (무료)

#### 수정 항목 체크리스트

**1. 페이지 제목 (상단)**
```html
<!-- Line 14 -->
<title>신랑 ♥ 신부 결혼식 초대장</title>
↓
<title>홍길동 ♥ 이몽룡 결혼식 초대장</title>
```

**2. 메인 커버 (Line 50~60)**
```html
<h1 class="cover-title fade-in-delay-1">
    신랑이름 <span class="heart">♥</span> 신부이름
</h1>
<p class="cover-date fade-in-delay-2">2025. 03. 15</p>
<p class="cover-time fade-in-delay-2">토요일 오후 2시</p>
<p class="cover-location fade-in-delay-3">○○ 웨딩홀</p>
```
↓
```html
<h1 class="cover-title fade-in-delay-1">
    홍길동 <span class="heart">♥</span> 이몽룡
</h1>
<p class="cover-date fade-in-delay-2">2025. 12. 25</p>
<p class="cover-time fade-in-delay-2">일요일 오후 3시</p>
<p class="cover-location fade-in-delay-3">서울 웨딩홀</p>
```

**3. 인사말 (Line 70~90)**

원하는 문구로 수정:
```html
<p>
    서로가 마주보며 다져온 사랑을<br>
    이제 함께 한 곳을 바라보며<br>
    걸어갈 수 있는 큰 사랑으로 키우고자 합니다.
</p>
```

**4. 부모님 성함 (Line 100~110)**
```html
<span class="parent-name">김철수·이영희</span>
<strong>홍길동</strong>

<span class="parent-name">박민수·최순자</span>
<strong>이몽룡</strong>
```

**5. 전화번호 (Line 130~150)**

⚠️ **중요**: 하이픈 없이 입력
```html
<a href="tel:01012345678" ...>
<a href="sms:01012345678" ...>
```

**6. 날짜/시간/장소 (Line 250~270)**
```html
<p class="info-content">2025년 3월 15일</p>
<p class="info-content-sub">토요일</p>

<p class="info-content">오후 2시</p>

<p class="info-content">○○ 웨딩홀</p>
<p class="info-content-sub">3층 그랜드홀</p>
```

**7. 주소 (Line 300)**
```html
<p class="address-text">서울특별시 강남구 테헤란로 123</p>
```

**8. 교통 정보 (Line 320~350)**

실제 교통편으로 수정

**9. 계좌번호 (Line 380~450)**
```html
<span class="account-number">123-456-789012</span>
<span class="account-holder">예금주: 홍길동</span>
```

### B. js/main.js 수정

파일 상단 `WEDDING_INFO` 객체만 수정:

```javascript
const WEDDING_INFO = {
    groom: {
        name: '홍길동',           // 신랑 이름
        father: '김철수',          // 신랑 아버지
        mother: '이영희',          // 신랑 어머니
        phone: '01012345678',     // 신랑 연락처
        fatherPhone: '01011111111',
        motherPhone: '01022222222',
        account: '123-456-789012',  // 계좌번호
        bank: '○○은행'            // 은행명
    },
    bride: {
        name: '이몽룡',           // 신부 이름
        father: '박민수',          // 신부 아버지
        mother: '최순자',          // 신부 어머니
        phone: '01087654321',     // 신부 연락처
        fatherPhone: '01033333333',
        motherPhone: '01044444444',
        account: '987-654-321098',
        bank: '○○은행'
    },
    wedding: {
        date: '2025-03-15',       // YYYY-MM-DD 형식
        time: '14:00',            // 24시간 형식 (오후 2시 = 14:00)
        venue: '○○ 웨딩홀',        // 장소명
        address: '서울특별시 강남구 테헤란로 123',
        hall: '3층 그랜드홀'       // 층/홀 정보
    }
};
```

### C. js/map.js 수정

지도 좌표만 변경:

```javascript
const MAP_CONFIG = {
    center: {
        lat: 37.4979,    // 위도
        lng: 127.0276    // 경도
    },
    // 나머지는 수정 안 함
};
```

#### 좌표 찾는 방법

**방법 1: 카카오맵**
1. [map.kakao.com](https://map.kakao.com) 접속
2. 웨딩홀 검색
3. 주소 위에서 우클릭
4. "여기 어때?" 클릭
5. URL에서 좌표 확인

**방법 2: 네이버 지도**
1. [map.naver.com](https://map.naver.com) 접속
2. 웨딩홀 검색
3. 주소 클릭
4. "공유" → URL 복사
5. URL에서 좌표 확인

**방법 3: 구글 지도**
1. [google.com/maps](https://google.com/maps) 접속
2. 웨딩홀 검색
3. 위치 클릭
4. URL의 `@` 뒤 숫자가 좌표

---

## 5. 로컬 테스트

수정 완료 후 반드시 테스트!

### 방법 1: 브라우저로 직접 열기

**가장 간단함**:
1. `index.html` 파일 찾기
2. 더블클릭 또는
3. 파일 우클릭 → "연결 프로그램" → Chrome/Safari

⚠️ **제한사항**:
- 일부 기능 작동 안 함 (CORS 정책)
- 지도가 안 보일 수 있음

### 방법 2: Python 서버 (권장)

**Python 설치 확인**:
```bash
python --version
# 또는
python3 --version
```

**서버 실행**:
```bash
# 프로젝트 폴더에서
python -m http.server 8000
# 또는
python3 -m http.server 8000
```

**접속**:
브라우저에서 `http://localhost:8000`

**종료**:
터미널에서 `Ctrl + C`

### 방법 3: VS Code Live Server

**확장 설치**:
1. VS Code 열기
2. Extensions (Ctrl+Shift+X)
3. "Live Server" 검색
4. Install

**실행**:
1. `index.html` 우클릭
2. "Open with Live Server"
3. 자동으로 브라우저 열림
4. 파일 저장하면 자동 새로고침!

### 방법 4: Node.js serve

**Node.js 설치 후**:
```bash
npx serve
```

### 모바일에서 테스트

같은 Wi-Fi 연결 필수!

**컴퓨터 IP 확인**:

**Windows**:
```cmd
ipconfig
```
→ IPv4 주소 확인 (예: 192.168.0.10)

**Mac**:
```bash
ifconfig | grep "inet "
```
→ 192.168로 시작하는 주소

**스마트폰 브라우저에서**:
```
http://192.168.0.10:8000
```

### 체크리스트

테스트 시 확인사항:

- [ ] 모든 이미지가 보이나요?
- [ ] 이름이 정확한가요?
- [ ] 날짜, 시간이 맞나요?
- [ ] 전화번호 클릭 시 전화 앱 열리나요?
- [ ] 계좌번호 복사가 되나요?
- [ ] 지도가 올바른 위치를 가리키나요?
- [ ] 갤러리 사진 클릭 시 확대되나요?
- [ ] 모바일에서 잘 보이나요?

---

## 6. 배포하기

테스트 완료 후 인터넷에 공개!

### A. GitHub Pages (무료, 추천)

#### 1단계: GitHub 가입
[github.com](https://github.com) 가입

#### 2단계: 새 저장소 생성
1. 오른쪽 상단 "+" → "New repository"
2. Repository name: `wedding` (또는 원하는 이름)
3. Public 선택
4. "Create repository"

#### 3단계: 코드 업로드

**방법 A: 웹에서 업로드**
1. "uploading an existing file" 클릭
2. 프로젝트 파일들 드래그앤드롭
3. "Commit changes"

**방법 B: Git 사용** (고급)
```bash
# 터미널에서 프로젝트 폴더로 이동
cd /path/to/invitation-mobile

# Git 초기화
git init

# 파일 추가
git add .

# 커밋
git commit -m "Initial commit"

# GitHub와 연결
git branch -M main
git remote add origin https://github.com/username/wedding.git

# 업로드
git push -u origin main
```

#### 4단계: GitHub Pages 활성화
1. 저장소 → Settings
2. 왼쪽 메뉴 → Pages
3. Source: "main" 선택
4. Save
5. 5분 정도 대기
6. 완료! `https://username.github.io/wedding`

### B. Netlify (가장 쉬움)

#### 1단계: 가입
[netlify.com](https://www.netlify.com) 가입

#### 2단계: 배포
1. "Sites" → "Add new site" → "Deploy manually"
2. 프로젝트 폴더를 드래그앤드롭
3. 완료! 자동으로 URL 생성 (예: `random-name-123.netlify.app`)

#### 3단계: 도메인 변경 (선택)
1. Site settings → Domain management
2. "Change site name"
3. 원하는 이름 입력 (예: `mywedding`)
4. 완료! `mywedding.netlify.app`

### C. Vercel

```bash
# 1회만 설치
npm i -g vercel

# 배포
vercel

# 질문에 답변
# - Set up and deploy? Y
# - Which scope? (Enter)
# - Link to existing project? N
# - Project name? wedding
# - Directory? ./
```

완료! 자동으로 URL 생성

---

## 7. 문제 해결

### 문제: 이미지가 안 보여요

**원인 1: 파일 경로 오류**
```html
<!-- 잘못된 예 -->
<img src="Images/Main-Cover.jpg">

<!-- 올바른 예 -->
<img src="images/main-cover.jpg">
```
→ 대소문자 구분, 경로 확인

**원인 2: 파일명 불일치**
- `index.html`의 경로와 실제 파일명 일치 확인
- 공백, 특수문자 제거

**원인 3: 파일이 없음**
- `images/` 폴더에 실제 이미지 있는지 확인

**해결**:
1. 브라우저 개발자 도구 (F12)
2. Console 탭 → 에러 메시지 확인
3. Network 탭 → 어떤 파일이 404인지 확인

### 문제: 지도가 안 보여요

**원인 1: API 키 없음**
- 카카오맵 API 키가 필요
- 또는 자동으로 Google Maps 표시

**원인 2: 좌표 오류**
- `js/map.js`의 좌표 재확인

**해결**:
API 키 없이 사용하려면 자동 Google Maps 사용 (별도 설정 불필요)

### 문제: 전화/문자 버튼이 작동 안 해요

**원인**: 로컬 파일로 열 때 제한
**해결**: Python 서버 또는 Live Server로 실행

### 문제: 캘린더 추가가 안 돼요

**원인 1**: 날짜 형식 오류
```javascript
// 잘못된 예
date: '2025/03/15'

// 올바른 예
date: '2025-03-15'
```

**원인 2**: 브라우저 다운로드 차단
- 브라우저 설정 → 다운로드 허용

### 문제: 모바일에서 레이아웃이 깨져요

**원인**: 뷰포트 메타 태그 없음
**해결**: `index.html`의 `<head>`에 있는지 확인:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

### 문제: 폰트가 이상해요

**원인**: 폰트 로딩 실패
**해결**:
1. 인터넷 연결 확인 (Google Fonts 사용)
2. 브라우저 캐시 삭제

### 문제: CSS/JS가 적용 안 돼요

**원인**: 파일 경로 오류
**해결**: `index.html`에서 경로 확인:
```html
<!-- 올바른 예 -->
<link rel="stylesheet" href="./css/reset.css">
<script src="./js/main.js"></script>
```

**브라우저 캐시 삭제**:
- Chrome: Ctrl+Shift+Delete
- Safari: Cmd+Option+E

---

## 추가 도움말

### 에디터 추천

**VS Code** (강력 추천):
- 무료, 가볍고 빠름
- 자동완성, 오류 표시
- Live Server 확장
- [다운로드](https://code.visualstudio.com/)

**Sublime Text**:
- 빠르고 심플
- 무료 (계속 사용 가능)

**Notepad++** (Windows):
- 가볍고 간단

### 학습 자료

**HTML/CSS 배우기**:
- [MDN Web Docs](https://developer.mozilla.org/)
- [W3Schools](https://www.w3schools.com/)

**JavaScript 배우기**:
- [JavaScript.info](https://javascript.info/)

### 커뮤니티

질문이 있으시면:
- [Stack Overflow](https://stackoverflow.com/)
- [GitHub Issues](저장소 링크)

---

**축하합니다! 준비가 완료되었습니다! 🎉**

이제 멋진 청첩장을 공유하세요!
