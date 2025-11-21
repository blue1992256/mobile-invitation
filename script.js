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
        showAlert(`복사 완료`);
    }).catch(err => {
        console.error('복사 실패:', err);
    });
}


// Scroll Animation
document.addEventListener("DOMContentLoaded", function () {
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
    const weddingDate = new Date('2026-03-07T14:00:00');
    const today = new Date();
    const diffTime = weddingDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const dDayElement = document.getElementById('d-day-count');
    if (dDayElement) {
        dDayElement.innerText = diffDays;
    }
});

// Lightbox
let currentImageIndex = 0;
const galleryImages = [
    "assets/gallery/1.jpg", "assets/gallery/2.jpg", "assets/gallery/3.jpg",
    "assets/gallery/4.jpg", "assets/gallery/5.jpg", "assets/gallery/6.jpg",
    "assets/gallery/7.jpg", "assets/gallery/8.jpg", "assets/gallery/9.jpg",
    "assets/gallery/10.jpg", "assets/gallery/11.jpg", "assets/gallery/12.jpg",
    "assets/gallery/13.jpg", "assets/gallery/14.jpg", "assets/gallery/15.jpg"
];

function updateTrackPosition() {
    const track = document.getElementById('lightbox-track');
    track.style.transform = `translateX(-${currentImageIndex * 100}%)`;
}

function openLightbox(index) {
    const lightbox = document.getElementById('lightbox');

    currentImageIndex = index;
    updateTrackPosition();

    // Fade in
    lightbox.classList.remove('hidden');
    setTimeout(() => {
        lightbox.classList.add('visible');
    }, 10);

    document.body.style.overflow = 'hidden';
}

function closeLightbox(event) {
    if (event && (event.target.id === 'lightbox' || event.target.classList.contains('close-btn') || event.target.classList.contains('lightbox-slide'))) {
        // Allow closing if clicking outside image (on slide padding) or on close btn
        // But wait, clicking on slide padding might be accidental. 
        // Let's stick to close btn or background (lightbox container).
        // The lightbox container covers everything. The track is inside.
        // If we click the track/slide but not the image? 
        // Actually, let's just keep it simple: close btn or explicit background click if possible.
        // But track covers background. 
        // Let's allow closing if clicking the slide wrapper (which is full screen) but not the image?
        // The event target will be 'lightbox-slide' if clicked on padding.

        const lightbox = document.getElementById('lightbox');
        lightbox.classList.remove('visible');

        setTimeout(() => {
            lightbox.classList.add('hidden');
            document.body.style.overflow = '';
        }, 400);
    } else if (!event) {
        const lightbox = document.getElementById('lightbox');
        lightbox.classList.remove('visible');
        setTimeout(() => {
            lightbox.classList.add('hidden');
            document.body.style.overflow = '';
        }, 400);
    }
}

// Update close logic to handle the new structure
// If user clicks on 'lightbox', it might be behind the track.
// The track is full width.
// So clicks will hit 'lightbox-slide' or 'img'.
// We should probably add a click listener to 'lightbox-slide' to close?
// Or just rely on the close button. User experience: clicking outside image usually closes.
// 'lightbox-slide' is the container of the image. If I click the padding, it's 'lightbox-slide'.
// If I click the image, it's 'img'.
// So: if target is 'lightbox-slide', close.

function changeImage(direction, event) {
    if (event) event.stopPropagation();

    currentImageIndex += direction;

    // Loop navigation
    if (currentImageIndex >= galleryImages.length) {
        currentImageIndex = 0;
    } else if (currentImageIndex < 0) {
        currentImageIndex = galleryImages.length - 1;
    }

    updateTrackPosition();
}

// Initialize Kakao SDK
if (typeof Kakao !== 'undefined' && !Kakao.isInitialized()) {
    Kakao.init('013f1af4df9c7d9bb3137518e5efb00d');
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
    }
});
