function toggleAccount(type) {
    const element = document.getElementById(`${type}-account`);
    if (element.classList.contains('expanded')) {
        element.classList.remove('expanded');
    } else {
        element.classList.add('expanded');
    }
}

function copyText(text) {
    navigator.clipboard.writeText(text).then(() => {
        showAlert(`${text} 복사 완료`);
    }).catch(err => {
        console.error('복사 실패:', err);
    });
}

function copyText2(text) {
    navigator.clipboard.writeText(text).then(() => {
        showAlert(`링크 복사 완료`);
    }).catch(err => {
        console.error('복사 실패:', err);
    });
}

// Global variables for wedding dates (will be loaded from JSON)
let weddingDate = null;
let dday100 = null;

// Load Personal Information
async function loadPersonalInfo() {
    try {
        const response = await fetch('personal-info.json');
        if (!response.ok) {
            throw new Error('개인정보 파일을 찾을 수 없습니다.');
        }
        const data = await response.json();

        // 결혼식 날짜 전역 변수 설정
        weddingDate = new Date(data.wedding.dateISO + 'T00:00:00');
        dday100 = new Date(data.wedding.dday100 + 'T00:00:00');

        // 메타 태그 업데이트
        document.title = data.meta.title;
        document.querySelector('meta[property="og:title"]').content = data.meta.title;
        document.querySelector('meta[property="og:description"]').content = data.meta.ogDescription;

        // 신랑신부 이름
        const nameElements = document.querySelectorAll('.names .name');
        if (nameElements.length >= 2) {
            nameElements[0].textContent = data.couple.groom.name;
            nameElements[1].textContent = data.couple.bride.name;
        }

        // 결혼식 날짜와 장소
        document.querySelector('.intro-text .date').textContent = data.wedding.date;
        document.querySelector('.intro-text .location').textContent = data.wedding.venue.name;
        document.querySelector('.calendar-header p').textContent = data.wedding.date;
        document.querySelector('.venue-name').textContent = data.wedding.venue.name;

        // 부모님 정보
        const groomParents = document.querySelector('.groom-info .parents');
        groomParents.innerHTML = `<span>${data.couple.groom.father.name}</span> · <span>${data.couple.groom.mother.name}</span> 의 <span class="relation">아들</span>`;

        const brideParents = document.querySelector('.bride-info .parents');
        brideParents.innerHTML = `<span>${data.couple.bride.father.name}</span> · <span>${data.couple.bride.mother.name}</span> 의 <span class="relation">딸</span>`;

        // 신랑신부 이름 (닉네임)
        document.querySelector('.groom-info .name').textContent = data.couple.groom.nickname;
        document.querySelector('.bride-info .name').textContent = data.couple.bride.nickname;

        // D-day 텍스트 및 러닝 애니메이션 업데이트
        const diffDays = calculateDDay();
        updateDDayText(data.couple.groom.nickname, data.couple.bride.nickname, diffDays);
        updateRunningCouple(diffDays);

        // 계좌 정보
        updateAccountInfo('groom', data.accounts.groom);
        updateAccountInfo('bride', data.accounts.bride);

    } catch (error) {
        console.error('개인정보 로딩 실패:', error);
        showAlert('개인정보 파일(personal-info.json)을 찾을 수 없습니다. SETUP.md를 참고하여 파일을 생성해주세요.');
    }
}

function updateAccountInfo(type, accounts) {
    const accountContainer = document.getElementById(`${type}-account`);
    accountContainer.innerHTML = '';

    accounts.forEach(account => {
        const accountRow = document.createElement('div');
        accountRow.className = 'account-row';
        accountRow.innerHTML = `
            <div class="account-info">
                <span class="bank">${account.relation}</span>
                <span class="number">${account.bank} ${account.number}</span>
            </div>
            <button class="copy-btn" onclick="copyText('${account.number}')">복사</button>
        `;
        accountContainer.appendChild(accountRow);
    });
}

function calculateDDay() {
    if (!weddingDate) return 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diffTime = weddingDate - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

function updateDDayText(groomNickname, brideNickname, diffDays) {
    const dDayText = document.getElementById('d-day-text');
    if (dDayText) {
        if (diffDays > 0) {
            dDayText.innerHTML = `${groomNickname} <span class="d-day-heart">♥</span> ${brideNickname} 의 결혼식이 <span id="d-day-count">${diffDays}</span>일 남았습니다.`;
        } else if (diffDays === 0) {
            dDayText.innerHTML = `${groomNickname} <span class="d-day-heart">♥</span> ${brideNickname} 우리가 하나 되는 날`;
        } else {
            dDayText.innerHTML = `${groomNickname} <span class="d-day-heart">♥</span> ${brideNickname} 우리가 하나 된 지 <span id="d-day-count">${Math.abs(diffDays)}</span>일`;
        }
    }
}

// Scroll Animation
document.addEventListener("DOMContentLoaded", function () {
    loadPersonalInfo();
    loadGalleryImages();

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll('.fade-in-section');
    sections.forEach(section => {
        observer.observe(section);
    });
});

// Gallery Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxTrack = document.getElementById('lightbox-track');
let currentImageIndex = 0;
let galleryImages = []; // Will be populated dynamically

// Dynamic Gallery Loading
const galleryPath = 'assets/wedding/gallery/';

function loadGalleryImages() {
    const container = document.querySelector('.gallery-scroll-wrapper');
    if (!container) return;

    container.innerHTML = ''; // Clear existing

    const maxImages = 100; // Safety limit

    function tryLoadImage(idx) {
        if (idx > maxImages) return;

        const img = new Image();
        const src = `${galleryPath}${idx}.jpg`;

        img.onload = function () {
            // Image exists
            galleryImages.push(src);

            // Create DOM element
            const imgElem = document.createElement('img');
            imgElem.src = src;
            imgElem.alt = `Gallery ${idx}`;
            imgElem.className = 'gallery-item';
            imgElem.onclick = () => openLightbox(idx - 1); // 0-based index

            container.appendChild(imgElem);

            // Try next
            tryLoadImage(idx + 1);
        };

        img.onerror = function () {
            // Stop loading
            console.log(`Loaded ${idx - 1} gallery images.`);
        };

        img.src = src;
    }

    tryLoadImage(1);
}

function openLightbox(index) {
    if (galleryImages.length === 0) return;

    currentImageIndex = index;
    updateLightboxImage();

    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('hidden');
    // Force reflow
    void lightbox.offsetWidth;
    lightbox.classList.add('visible');

    document.body.style.overflow = 'hidden';
}

function closeLightbox(e) {
    const lightbox = document.getElementById('lightbox');
    // Close if clicked on lightbox background (which is the element itself) or close button
    if (!e || e.target === lightbox || e.target.classList.contains('close-btn')) {
        lightbox.classList.remove('visible');
        setTimeout(() => {
            lightbox.classList.add('hidden');
            document.body.style.overflow = '';
        }, 300);
    }
}

function changeImage(direction, event) {
    if (event) event.stopPropagation();

    currentImageIndex += direction;

    if (currentImageIndex >= galleryImages.length) {
        currentImageIndex = 0;
    } else if (currentImageIndex < 0) {
        currentImageIndex = galleryImages.length - 1;
    }

    updateLightboxImage();
}

function updateLightboxImage() {
    const lightboxTrack = document.getElementById('lightbox-track');
    lightboxTrack.innerHTML = '';

    // Create current image slide
    const slide = document.createElement('div');
    slide.className = 'lightbox-slide';

    const img = document.createElement('img');
    img.src = galleryImages[currentImageIndex];
    img.alt = `Gallery ${currentImageIndex + 1}`;
    // Add touch-action to image as well
    img.style.touchAction = 'pan-x';

    slide.appendChild(img);
    lightboxTrack.appendChild(slide);
}

function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function showAlert(message) {
    const modal = document.getElementById('alert-modal');
    const msgElement = document.getElementById('alert-message');
    if (modal && msgElement) {
        msgElement.innerText = message;
        modal.classList.remove('hidden');
        setTimeout(() => {
            modal.classList.add('visible');
        }, 10);
    } else {
        alert(message);
    }
}

function closeAlert() {
    const modal = document.getElementById('alert-modal');
    if (modal) {
        modal.classList.remove('visible');
        setTimeout(() => {
            modal.classList.add('hidden');
        }, 300);
    }
}

// Map Navigation
function openMap(app) {
    const lat = 37.503407;
    const lng = 127.065611;
    const name = "노블발렌티 대치점";
    const kakaoPlaceId = "863978973";

    if (isMobile()) {
        // Store URLs
        const STORES = {
            kakao: {
                android: 'market://details?id=net.daum.android.map',
                ios: 'https://apps.apple.com/app/id304608425'
            },
            naver: {
                android: 'market://details?id=com.nhn.android.nmap',
                ios: 'https://apps.apple.com/app/id311867728'
            },
            tmap: {
                android: 'market://details?id=com.skt.tmap.ku',
                ios: 'https://apps.apple.com/app/id431589174'
            }
        };

        const userAgent = navigator.userAgent.toLowerCase();
        const isAndroid = userAgent.indexOf("android") > -1;
        const isIOS = /iphone|ipad|ipod/.test(userAgent);

        let appOpened = false;
        let visibilityChangeHandler;

        // Visibility API를 사용하여 페이지가 백그라운드로 갔는지 감지
        visibilityChangeHandler = function() {
            if (document.hidden) {
                // 페이지가 백그라운드로 갔음 = 앱이 열렸음
                appOpened = true;
            }
        };

        document.addEventListener('visibilitychange', visibilityChangeHandler);

        // Try to open the app
        if (app === 'kakao') {
            location.href = `kakaomap://place?id=${kakaoPlaceId}`;
        } else if (app === 'naver') {
            location.href = `nmap://search?query=${encodeURIComponent(name)}&appname=WeddingInvitation`;
        } else if (app === 'tmap') {
            location.href = `tmap://route?goalname=${name}&goalx=${lng}&goaly=${lat}`;
        }

        // 2.5초 후에 앱이 열렸는지 체크
        setTimeout(function () {
            document.removeEventListener('visibilitychange', visibilityChangeHandler);

            // 앱이 열리지 않았으면 스토어로 리다이렉트
            if (!appOpened) {
                if (isAndroid) {
                    location.href = STORES[app].android;
                } else if (isIOS) {
                    location.href = STORES[app].ios;
                }
            }
            // 앱이 열렸으면 아무것도 하지 않음
        }, 1000);

    } else {
        // Desktop fallback
        if (app === 'naver') {
            window.open('https://naver.me/G58gjjWp', '_blank');
        } else if (app === 'kakao') {
            window.open(`http://m.map.kakao.com/scheme/place?id=${kakaoPlaceId}`, '_blank');
        } else if (app === 'tmap') {
            showAlert('모바일에서 확인하실 수 있습니다.');
        }
    }
}

// Swipe Support
let touchStartX = 0;
let touchEndX = 0;

function handleSwipe() {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
        changeImage(1);
    }
    if (touchEndX > touchStartX + swipeThreshold) {
        changeImage(-1);
    }
}

// Initialize Lightbox Track and Swipe
document.addEventListener("DOMContentLoaded", function () {
    const track = document.getElementById('lightbox-track');
    if (track) {
        galleryImages.forEach(src => {
            const slide = document.createElement('div');
            slide.className = 'lightbox-slide';
            const img = document.createElement('img');
            img.src = src;
            img.draggable = false;
            slide.appendChild(img);
            track.appendChild(slide);
        });
    }

    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        });

        lightbox.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });

        // Prevent pinch zoom
        lightbox.addEventListener('touchstart', function (e) {
            if (e.touches.length > 1) {
                e.preventDefault();
            }
        }, { passive: false });

        lightbox.addEventListener('touchmove', function (e) {
            if (e.touches.length > 1) {
                e.preventDefault();
            }
        }, { passive: false });

        // Prevent iOS gesture zoom
        lightbox.addEventListener('gesturestart', function (e) {
            e.preventDefault();
        });
        lightbox.addEventListener('gesturechange', function (e) {
            e.preventDefault();
        });
        lightbox.addEventListener('gestureend', function (e) {
            e.preventDefault();
        });
    }
});

// Running Couple Animation Function
function updateRunningCouple(daysRemaining) {
    const groomRunner = document.getElementById('groom-running');
    const brideRunner = document.getElementById('bride-running');
    const coupleTogether = document.getElementById('couple-together');
    const runningTrack = document.querySelector('.running-track');

    if (!groomRunner || !brideRunner || !coupleTogether || !runningTrack) return;

    // 결혼식 당일 또는 지난 경우
    if (daysRemaining <= 0) {
        // 달리는 이미지 숨기기
        groomRunner.classList.add('hidden');
        brideRunner.classList.add('hidden');

        // 트랙, 점선, 하트 모두 숨기기
        runningTrack.classList.add('wedding-day');

        // 함께 있는 이미지 표시
        coupleTogether.classList.remove('hidden');
        setTimeout(() => {
            coupleTogether.classList.add('visible');
        }, 100);
        return;
    }

    // 프로젝트 시작일부터 결혼식까지의 총 일수를 계산
    const totalDays = Math.ceil((weddingDate - dday100) / (1000 * 60 * 60 * 24));

    // 진행률 계산 (0 ~ 1)
    const progress = Math.max(0, Math.min(1, (totalDays - daysRemaining) / totalDays));

    // 신랑: 왼쪽 0%에서 중앙으로 이동 (겹침 방지를 위해 37.3%까지만)
    // 신부: 오른쪽 0%에서 중앙으로 이동 (겹침 방지를 위해 37.3%까지만)
    const groomPosition = progress * 37.3; // left: 0% → 37.3%
    const bridePosition = progress * 37.3; // right: 0% → 37.3%

    groomRunner.style.left = `${groomPosition}%`;
    brideRunner.style.right = `${bridePosition}%`;
    brideRunner.style.left = 'auto'; // Override left positioning

    // 트랙, 점선, 하트 표시
    runningTrack.classList.remove('wedding-day');

    // 함께 있는 이미지는 숨김 상태 유지
    coupleTogether.classList.add('hidden');
    coupleTogether.classList.remove('visible');
    groomRunner.classList.remove('hidden');
    brideRunner.classList.remove('hidden');
}
