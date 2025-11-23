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


// Scroll Animation
document.addEventListener("DOMContentLoaded", function () {
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

    // D-Day Calculation
    const weddingDate = new Date('2026-03-07T00:00:00');
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to midnight for accurate date diff

    const diffTime = weddingDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const dDayText = document.getElementById('d-day-text');
    if (dDayText) {
        if (diffDays > 0) {
            dDayText.innerHTML = `종민 <span class="d-day-heart">♥</span> 원희 의 결혼식이 <span id="d-day-count">${diffDays}</span>일 남았습니다.`;
        } else if (diffDays === 0) {
            dDayText.innerHTML = `종민 <span class="d-day-heart">♥</span> 원희 우리가 하나 되는 날`;
        } else {
            // diffDays is negative
            dDayText.innerHTML = `종민 <span class="d-day-heart">♥</span> 원희 우리가 하나 된 지 <span id="d-day-count">${Math.abs(diffDays)}</span>일`;
        }
    }
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


        const start = Date.now();

        // Try to open the app
        if (app === 'kakao') {
            location.href = `kakaomap://place?id=${kakaoPlaceId}`;
        } else if (app === 'naver') {
            location.href = `nmap://search?query=${encodeURIComponent(name)}&appname=WeddingInvitation`;
        } else if (app === 'tmap') {
            location.href = `tmap://route?goalname=${name}&goalx=${lng}&goaly=${lat}`;
        }

        // Fallback logic
        setTimeout(function () {
            const now = Date.now();
            // If less than 3 seconds have passed, it means the browser wasn't put in background (app didn't open)
            // So we redirect to store.
            // If more than 3 seconds passed, it means app opened and user came back, so we don't redirect.
            if (now - start < 3000) {
                if (isAndroid) {
                    location.href = STORES[app].android;
                } else if (isIOS) {
                    location.href = STORES[app].ios;
                }
            }
        }, 1000); // Check after 1 second

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
