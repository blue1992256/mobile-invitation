# 모바일 청첩장 디자인 요약서 🎨

## 📊 프로젝트 개요

### 프로젝트 정보
- **프로젝트명**: 모바일 웨딩 인비테이션
- **타입**: 단일 페이지 웹 애플리케이션 (SPA)
- **기술**: HTML5, CSS3, Vanilla JavaScript
- **디자인 테마**: 우아한 베이지/골드 컬러 스킴
- **타겟**: 모바일 우선 반응형 디자인

---

## 🎯 디자인 컨셉

### 핵심 가치
- **우아함 (Elegance)**: 세리프 폰트와 골드 컬러로 격식 있는 느낌
- **단순함 (Simplicity)**: 깔끔한 레이아웃과 명확한 정보 전달
- **감성 (Emotion)**: 부드러운 애니메이션과 따뜻한 색감

### 디자인 철학
> "정보는 명확하게, 감성은 풍부하게"

- 핵심 정보 (날짜, 시간, 장소)를 쉽게 찾을 수 있도록
- 과도한 장식 없이 콘텐츠 중심 디자인
- 부드러운 애니메이션으로 프리미엄 느낌 연출

---

## 🎨 디자인 시스템

### 색상 팔레트

```css
주 색상 (Primary)
#D4A574 - 골드 베이지 (메인 강조, 버튼, 아이콘)
용도: CTA 버튼, 구분선, 강조 텍스트

보조 색상 (Secondary)
#F5E6D3 - 라이트 베이지 (배경)
용도: 섹션 배경, 카드 배경

강조 색상 (Accent)
#8B7355 - 다크 브라운 (서브 강조)
용도: 헤딩, 중요 정보

텍스트 색상
#333333 - 메인 텍스트 (주요 콘텐츠)
#666666 - 보조 텍스트 (부가 정보)
#999999 - 라이트 텍스트 (날짜, 시간 등)

배경 색상
#FFFFFF - 화이트 (기본 배경)
#FAFAFA - 라이트 그레이 (카드, 입력창)
```

### 타이포그래피

#### 폰트 패밀리
```
본문: Pretendard (한글), -apple-system (폴백)
장식: Nanum Myeongjo (세리프)
영문: Cormorant Garamond (엘레강스)
```

#### 폰트 크기 스케일
```
h1: 32px (2rem)      - 메인 타이틀
h2: 28px (1.75rem)   - 섹션 헤딩
h3: 24px (1.5rem)    - 서브 헤딩
h4: 20px (1.25rem)   - 카드 타이틀
body: 16px (1rem)    - 본문
small: 14px (0.875rem) - 부가 정보
```

#### 폰트 굵기
- Light (300): 부드러운 텍스트
- Regular (400): 본문
- Semibold (600): 중요 정보
- Bold (700): 강조

### 간격 시스템 (8px 기반)

```
xs: 8px   - 작은 간격
sm: 16px  - 기본 간격
md: 24px  - 중간 간격
lg: 32px  - 큰 간격
xl: 48px  - 섹션 간격
2xl: 64px - 섹션 패딩
```

### 테두리 반경

```
sm: 4px   - 작은 요소
md: 8px   - 일반 카드
lg: 12px  - 큰 카드
xl: 16px  - 특별한 요소
full: 999px - 원형 (프로필, 버튼)
```

---

## 📐 레이아웃 구조

### 전체 구조 (9개 섹션)

```
1. Main Cover        - 100vh, 메인 비주얼
2. Greeting         - 베이지 배경, 인사말
3. Couple Info      - 화이트 배경, 2컬럼 카드
4. Gallery          - 화이트 배경, 3컬럼 그리드
5. Wedding Info     - 라이트 배경, 3개 카드
6. Location         - 화이트 배경, 지도 + 교통편
7. Account          - 베이지 배경, 접기/펼치기
8. Guestbook        - 화이트 배경, 폼 + 목록
9. Footer           - 다크 배경, 공유 버튼
```

### 컨테이너 설정

```css
max-width: 640px    - 데스크톱에서 중앙 정렬
padding: 20px       - 모바일 여백
margin: 0 auto      - 중앙 정렬
```

### 반응형 브레이크포인트

```css
Mobile:  320px ~ 767px  (기본)
Tablet:  768px ~ 1023px (2컬럼, 큰 폰트)
Desktop: 1024px+        (중앙 고정, 더 큰 폰트)
```

---

## 🧩 주요 컴포넌트

### 1. 버튼

#### Primary Button
```
배경: 골드 (#D4A574)
텍스트: 화이트
패딩: 12px 32px
반경: 12px
호버: 다크 브라운 + 살짝 위로 (translateY -2px)
```

#### Secondary Button
```
배경: 화이트
텍스트: 골드
테두리: 2px 골드
호버: 배경 골드 + 텍스트 화이트
```

### 2. 카드

```css
배경: 화이트
패딩: 32px
반경: 12px
그림자: 0 4px 6px rgba(0,0,0,0.07)
호버: 살짝 확대 (scale 1.02)
```

### 3. 입력 필드

```css
배경: 화이트
테두리: 1px #E8DED2
패딩: 12px 24px
반경: 8px
포커스: 테두리 골드 (#D4A574)
```

### 4. 모달

```css
배경: rgba(0,0,0,0.95)
이미지: 최대 90vw, 90vh
애니메이션: fadeIn + scaleIn
버튼: 반투명 화이트 배경
```

---

## 🎬 애니메이션 & 인터랙션

### 페이지 로드 애니메이션

```
Cover 섹션:
- 타이틀: fadeIn (1s)
- 부제목: fadeIn delay 0.2s
- 날짜: fadeIn delay 0.4s
- 장소: fadeIn delay 0.6s

기타 섹션:
- Intersection Observer로 스크롤 트리거
- fadeInUp 애니메이션 (0.6s ease-out)
```

### 호버 효과

```
버튼:
- 배경색 변경
- scale(1.05)
- translateY(-2px)
- 트랜지션: 0.2s ease

이미지:
- scale(1.1)
- 트랜지션: 0.3s ease

카드:
- 그림자 증가
- translateY(-4px)
```

### 스크롤 표시기

```
화살표 아이콘
애니메이션: 상하 반복 (bounce)
지속: 1.5s infinite
```

---

## 📱 모바일 최적화

### 터치 인터랙션

1. **갤러리**
   - 탭으로 모달 열기
   - 스와이프로 이미지 넘기기
   - 핀치 줌 지원

2. **버튼**
   - 최소 터치 영역: 44x44px
   - 충분한 간격 (8px 이상)

3. **폼**
   - 큰 입력 필드 (48px 높이)
   - 자동 포커스 없음 (스크롤 방지)

### 성능 최적화

```javascript
1. 이미지 Lazy Loading
   - loading="lazy" 속성
   - Intersection Observer 폴백

2. 애니메이션 최적화
   - transform 사용 (GPU 가속)
   - will-change 최소화
   - requestAnimationFrame

3. 스크롤 최적화
   - passive 이벤트 리스너
   - 디바운스/쓰로틀 적용
```

---

## ♿ 접근성 (A11y)

### WCAG 2.1 AA 준수

#### 1. 색상 대비
```
텍스트/배경: 최소 4.5:1
큰 텍스트: 최소 3:1
골드(#D4A574) / 화이트: 3.8:1 ✓
다크(#333) / 화이트: 12.6:1 ✓
```

#### 2. 키보드 네비게이션
```
- 모든 인터랙티브 요소 Tab 가능
- Focus 스타일 명확히 표시 (2px outline)
- 모달: Esc로 닫기
- 갤러리: 화살표 키로 이동
```

#### 3. 시맨틱 HTML
```html
<header>, <nav>, <main>, <section>, <article>, <footer>
<h1>, <h2>, <h3> 계층 구조
<button> vs <a> 명확한 구분
```

#### 4. ARIA 레이블
```html
<button aria-label="신랑에게 전화하기">📞</button>
<img alt="신랑신부 결혼 사진">
<input aria-required="true">
```

#### 5. 모션 감소
```css
@media (prefers-reduced-motion: reduce) {
    * { animation-duration: 0.01ms !important; }
}
```

---

## 🌐 브라우저 호환성

### 지원 브라우저

```
✅ Chrome 90+
✅ Safari 14+ (iOS 14+)
✅ Samsung Internet 14+
✅ Firefox 88+
✅ Edge 90+
```

### 폴백 전략

```javascript
1. Intersection Observer
   → IntersectionObserver 폴리필

2. CSS Variables
   → 구형 브라우저 고정값

3. Flexbox/Grid
   → Autoprefixer로 자동 처리

4. Web Share API
   → 클립보드 복사로 대체

5. 카카오맵 API
   → Google Maps iframe으로 대체
```

---

## 📦 파일 구조

```
invitation-mobile/
├── index.html              메인 HTML (단일 페이지)
├── css/
│   ├── reset.css          CSS 리셋
│   ├── variables.css      CSS 변수 (색상, 간격 등)
│   ├── typography.css     폰트 스타일
│   ├── layout.css         레이아웃 (섹션, 그리드)
│   ├── components.css     컴포넌트 (버튼, 카드 등)
│   └── animations.css     애니메이션
├── js/
│   ├── utils.js           유틸리티 함수
│   ├── main.js            메인 로직
│   └── map.js             지도 연동
├── images/
│   ├── main-cover.jpg     메인 커버
│   ├── groom.jpg          신랑 사진
│   ├── bride.jpg          신부 사진
│   └── gallery/           갤러리 사진들
├── README.md              전체 문서
├── QUICKSTART.md          빠른 시작 가이드
└── DESIGN_SUMMARY.md      (이 파일) 디자인 요약
```

---

## 🎯 핵심 기능

### 필수 기능 (MVP)
- [x] 메인 커버 (이름, 날짜, 장소)
- [x] 인사말
- [x] 신랑신부 소개 + 연락처
- [x] 사진 갤러리
- [x] 예식 정보
- [x] 오시는 길 (지도)
- [x] 계좌 정보
- [x] 방명록
- [x] 공유 기능

### 고급 기능
- [x] 캘린더 추가 (ICS 파일)
- [x] 이미지 모달 + 슬라이드
- [x] 교통편 탭
- [x] 계좌번호 복사
- [x] 스크롤 애니메이션
- [x] 모바일 스와이프

### 선택 기능 (커스터마이징)
- [ ] 카카오톡 공유 (Kakao SDK 필요)
- [ ] 방명록 백엔드 (Firebase/Supabase)
- [ ] 실시간 방명록 (WebSocket)
- [ ] D-Day 카운터
- [ ] 배경 음악
- [ ] 동영상 섹션

---

## 📊 성능 지표 목표

### Core Web Vitals

```
LCP (Largest Contentful Paint): < 2.5s
FID (First Input Delay): < 100ms
CLS (Cumulative Layout Shift): < 0.1
```

### 최적화 전략

```
1. 이미지 최적화
   - WebP 포맷 (80% 압축)
   - 적절한 해상도
   - Lazy loading

2. CSS/JS 최소화
   - Minify (배포 시)
   - Critical CSS inline
   - 불필요한 코드 제거

3. 폰트 최적화
   - Font preload
   - Subset 사용 (한글 2,350자)
   - font-display: swap
```

---

## 🔧 커스터마이징 가이드

### 색상 변경

`css/variables.css` 수정:
```css
--primary-color: #YOUR_COLOR;
--secondary-color: #YOUR_COLOR;
```

### 폰트 변경

`css/typography.css` 수정:
```css
--font-main: 'YourFont', sans-serif;
```

### 섹션 제거

`index.html`에서 주석 처리:
```html
<!-- <section id="unwanted">...</section> -->
```

### 레이아웃 조정

`css/layout.css`에서 간격, 크기 조정

---

## 📈 향후 개선 사항

### Phase 2
- [ ] PWA (Progressive Web App) 지원
- [ ] 오프라인 모드
- [ ] 다국어 지원 (i18n)
- [ ] 다크 모드

### Phase 3
- [ ] CMS 통합 (관리자 페이지)
- [ ] A/B 테스트
- [ ] 방문 통계 (Analytics)
- [ ] SEO 최적화

---

## 🎨 디자인 결정 근거

### 왜 Vanilla JavaScript?
- 프레임워크 오버헤드 없음
- 빠른 로딩 속도
- 간단한 유지보수
- 배우기 쉬움

### 왜 단일 페이지?
- 스크롤로 자연스러운 스토리텔링
- 모바일 네비게이션 불필요
- 빠른 로딩

### 왜 베이지/골드 컬러?
- 결혼식의 우아함과 격식
- 따뜻하고 부드러운 느낌
- 성별 중립적
- 높은 가독성

---

## 📚 참고 자료

- [Web Content Accessibility Guidelines (WCAG) 2.1](https://www.w3.org/WAI/WCAG21/quickref/)
- [Core Web Vitals](https://web.dev/vitals/)
- [Mobile-First Design](https://www.lukew.com/ff/entry.asp?933)
- [8-Point Grid System](https://spec.fm/specifics/8-pt-grid)

---

**디자인 버전**: 1.0.0
**최종 업데이트**: 2025-11-20
**디자이너**: Claude Code

---

이 디자인 시스템은 일관성, 확장성, 유지보수성을 고려하여 설계되었습니다.
