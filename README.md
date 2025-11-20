# 모바일 웨딩 인비테이션 💒

우아하고 현대적인 모바일 청첩장 웹사이트입니다.

## 📋 목차

- [특징](#특징)
- [기술 스택](#기술-스택)
- [시작하기](#시작하기)
- [커스터마이징](#커스터마이징)
- [배포](#배포)
- [브라우저 지원](#브라우저-지원)

## ✨ 특징

- 📱 **모바일 최적화**: 모바일 우선 반응형 디자인
- 🎨 **우아한 디자인**: 베이지/골드 컬러 테마의 세련된 디자인
- 🖼️ **사진 갤러리**: 터치/클릭으로 이미지 확대 및 슬라이드
- 🗺️ **지도 통합**: 카카오맵 API 연동 및 네비게이션 링크
- 📅 **캘린더 추가**: ICS 파일 생성으로 캘린더 앱에 일정 추가
- 💬 **방명록**: 하객들의 축하 메시지 수집
- 💰 **계좌 정보**: 펼침/접기 기능과 원클릭 복사
- 📤 **공유 기능**: 링크 복사, 네이티브 공유 API 지원
- ⚡ **성능 최적화**: 이미지 lazy loading, 애니메이션 최적화
- ♿ **접근성**: 시맨틱 HTML, 키보드 네비게이션, ARIA 레이블

## 🛠️ 기술 스택

- **HTML5**: 시맨틱 마크업
- **CSS3**: CSS Variables, Flexbox, Grid, Animations
- **JavaScript (Vanilla)**: 프레임워크 없는 순수 자바스크립트
- **Kakao Maps API**: 지도 연동 (선택사항)
- **Google Fonts**: Pretendard, Nanum Myeongjo, Cormorant Garamond

## 🚀 시작하기

### 1. 프로젝트 다운로드

```bash
# Git clone (if using Git)
git clone [repository-url]

# Or download ZIP and extract
```

### 2. 이미지 준비

`images/` 폴더에 다음 이미지들을 추가하세요:

- `main-cover.jpg` - 메인 커버 이미지 (권장: 1080x1920px)
- `groom.jpg` - 신랑 사진 (권장: 600x600px, 정사각형)
- `bride.jpg` - 신부 사진 (권장: 600x600px, 정사각형)
- `gallery/photo1.jpg` ~ `photo6.jpg` - 갤러리 사진들 (권장: 800x800px)

### 3. 정보 수정

#### `index.html` 수정
- 신랑/신부 이름
- 부모님 성함
- 날짜, 시간, 장소
- 전화번호
- 계좌번호

#### `js/main.js` 수정
`WEDDING_INFO` 객체의 정보를 수정하세요:

```javascript
const WEDDING_INFO = {
    groom: {
        name: '홍길동',
        father: '김철수',
        mother: '이영희',
        phone: '01012345678',
        // ...
    },
    bride: {
        name: '이몽룡',
        // ...
    },
    wedding: {
        date: '2025-03-15',
        time: '14:00',
        venue: '○○ 웨딩홀',
        address: '서울특별시 강남구 테헤란로 123',
        hall: '3층 그랜드홀'
    }
};
```

#### `js/map.js` 수정
지도 좌표를 수정하세요:

```javascript
const MAP_CONFIG = {
    center: {
        lat: 37.4979, // 위도
        lng: 127.0276  // 경도
    },
    // ...
};
```

> **좌표 찾기**: [카카오맵](https://map.kakao.com)에서 장소 검색 → 우클릭 → "여기 어때?" 클릭

### 4. 지도 API 설정 (선택사항)

#### Kakao Maps 사용시

1. [Kakao Developers](https://developers.kakao.com/)에서 앱 생성
2. JavaScript 키 발급
3. `index.html`의 `<head>`에 추가:

```html
<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=YOUR_APP_KEY"></script>
```

지도 API를 사용하지 않으면 자동으로 Google Maps iframe으로 대체됩니다.

### 5. 로컬 실행

```bash
# Python 사용
python -m http.server 8000

# Node.js 사용
npx serve

# VS Code Live Server 확장 사용
# 또는 그냥 index.html 파일을 브라우저로 열기
```

브라우저에서 `http://localhost:8000` 접속

## 🎨 커스터마이징

### 색상 변경

`css/variables.css` 파일에서 CSS 변수를 수정:

```css
:root {
    --primary-color: #D4A574;      /* 메인 강조색 */
    --secondary-color: #F5E6D3;    /* 배경색 */
    --accent-color: #8B7355;       /* 텍스트 강조 */
    /* ... */
}
```

### 폰트 변경

`css/typography.css` 파일에서 폰트 설정 수정:

```css
:root {
    --font-main: 'Pretendard', sans-serif;
    --font-decorative: 'Nanum Myeongjo', serif;
    --font-english: 'Cormorant Garamond', serif;
}
```

### 섹션 추가/제거

`index.html`에서 필요 없는 섹션을 주석 처리하거나 삭제:

```html
<!-- 방명록 섹션이 필요 없다면 -->
<!-- <section id="guestbook" class="section-guestbook">...</section> -->
```

### 갤러리 사진 개수 변경

`index.html`의 갤러리 섹션에서 `.gallery-item` 추가/제거:

```html
<div class="gallery-item" data-index="6">
    <img src="./images/gallery/photo7.jpg" alt="갤러리 사진 7" loading="lazy">
</div>
```

## 📦 배포

### GitHub Pages

1. GitHub 저장소 생성
2. 코드 푸시
3. Settings → Pages → Source를 `main` 브랜치로 설정
4. `https://username.github.io/repository-name`에서 확인

### Netlify

1. [Netlify](https://www.netlify.com/) 가입
2. "New site from Git" 클릭
3. 저장소 연결 또는 폴더 드래그앤드롭
4. 자동 배포 완료

### Vercel

1. [Vercel](https://vercel.com/) 가입
2. "Import Project" 클릭
3. 저장소 연결
4. 자동 배포 완료

### 커스텀 도메인 연결

대부분의 호스팅 서비스에서 커스텀 도메인 연결을 지원합니다:

1. 도메인 구매 (가비아, 호스팅케이알 등)
2. 호스팅 서비스의 DNS 설정 안내 따라하기
3. HTTPS 자동 활성화

## 🌐 브라우저 지원

- ✅ Chrome (최신 2버전)
- ✅ Safari (iOS 12+)
- ✅ Samsung Internet
- ✅ Firefox (최신 2버전)
- ✅ Edge (최신 2버전)

## 📱 모바일 최적화

- 터치 제스처 지원 (갤러리 스와이프)
- 뷰포트 최적화
- 이미지 lazy loading
- 반응형 폰트 크기
- 모바일 네비게이션 앱 연동

## 🔒 개인정보 보호

- 방명록 데이터는 로컬에만 저장됩니다 (백엔드 미포함)
- 계좌번호는 펼침/접기로 기본 숨김
- 전화번호는 클릭 시에만 앱 실행

## 🐛 문제 해결

### 이미지가 보이지 않아요
- 이미지 파일 경로 확인
- 이미지 파일명이 `index.html`과 일치하는지 확인
- 브라우저 캐시 삭제 후 새로고침

### 지도가 표시되지 않아요
- Kakao Maps API 키 확인
- 좌표값이 올바른지 확인
- API 키가 없으면 자동으로 Google Maps iframe 사용

### 캘린더 추가가 작동하지 않아요
- 날짜 형식 확인 (YYYY-MM-DD)
- 브라우저가 다운로드를 차단하는지 확인

### 모바일에서 레이아웃이 깨져요
- 뷰포트 메타 태그 확인
- 브라우저 캐시 삭제
- CSS 파일 로드 확인

## 📝 라이선스

개인적, 비상업적 용도로 자유롭게 사용 가능합니다.

## 💝 제작 정보

- 디자인: Mobile First Responsive Design
- 컬러: Elegant Beige & Gold
- 폰트: Pretendard, Nanum Myeongjo, Cormorant Garamond

---

**행복한 결혼을 축하합니다! 💒✨**

궁금한 점이나 문제가 있으시면 Issues를 등록해주세요.
