// Main JavaScript for Wedding Invitation

// Wedding Information (Customize these values)
const WEDDING_INFO = {
    groom: {
        name: '홍길동',
        father: '김철수',
        mother: '이영희',
        phone: '01012345678',
        fatherPhone: '01011111111',
        motherPhone: '01022222222',
        account: '123-456-789012',
        bank: '○○은행'
    },
    bride: {
        name: '이몽룡',
        father: '박민수',
        mother: '최순자',
        phone: '01087654321',
        fatherPhone: '01033333333',
        motherPhone: '01044444444',
        account: '987-654-321098',
        bank: '○○은행'
    },
    wedding: {
        date: '2025-03-15',
        time: '14:00',
        venue: '○○ 웨딩홀',
        address: '서울특별시 강남구 테헤란로 123',
        hall: '3층 그랜드홀'
    }
};

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
    initScrollReveal();
    initGalleryModal();
    initCalendar();
    initTransportationTabs();
    initAccountToggles();
    initCopyButtons();
    initShareButtons();
    initGuestbook();
    initLazyLoad();
});

// Scroll Reveal Animation
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');

    if (reveals.length === 0) {
        // If no .reveal classes, add them to sections
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            section.classList.add('reveal');
        });
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        },
        {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        }
    );

    document.querySelectorAll('.reveal').forEach((element) => {
        observer.observe(element);
    });
}

// Gallery Modal
function initGalleryModal() {
    const modal = document.getElementById('gallery-modal');
    const modalImg = document.getElementById('modal-image');
    const closeBtn = modal.querySelector('.modal-close');
    const prevBtn = modal.querySelector('.modal-prev');
    const nextBtn = modal.querySelector('.modal-next');
    const galleryItems = document.querySelectorAll('.gallery-item');

    let currentIndex = 0;

    // Open modal
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            modalImg.src = img.src;
            modal.classList.add('active');
            currentIndex = index;
            disableBodyScroll();
        });
    });

    // Close modal
    function closeModal() {
        modal.classList.remove('active');
        enableBodyScroll();
    }

    closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Previous image
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        const img = galleryItems[currentIndex].querySelector('img');
        modalImg.src = img.src;
    });

    // Next image
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % galleryItems.length;
        const img = galleryItems[currentIndex].querySelector('img');
        modalImg.src = img.src;
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('active')) return;

        if (e.key === 'Escape') {
            closeModal();
        } else if (e.key === 'ArrowLeft') {
            prevBtn.click();
        } else if (e.key === 'ArrowRight') {
            nextBtn.click();
        }
    });

    // Touch swipe for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    modalImg.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    modalImg.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            nextBtn.click();
        }
        if (touchEndX > touchStartX + 50) {
            prevBtn.click();
        }
    }
}

// Calendar Integration
function initCalendar() {
    const addToCalendarBtn = document.getElementById('add-to-calendar');

    addToCalendarBtn.addEventListener('click', () => {
        const startDate = formatDateForCalendar(WEDDING_INFO.wedding.date, WEDDING_INFO.wedding.time);
        const endDate = formatDateForCalendar(
            WEDDING_INFO.wedding.date,
            String(parseInt(WEDDING_INFO.wedding.time.split(':')[0]) + 2).padStart(2, '0') + ':00'
        );

        const event = {
            title: `${WEDDING_INFO.groom.name} ♥ ${WEDDING_INFO.bride.name} 결혼식`,
            description: '소중한 날에 함께해 주세요',
            location: `${WEDDING_INFO.wedding.venue} ${WEDDING_INFO.wedding.hall}`,
            startDate: startDate,
            endDate: endDate
        };

        const icsContent = generateICS(event);
        downloadICS(icsContent);
        showToast('캘린더 파일이 다운로드되었습니다');
    });
}

// Transportation Tabs
function initTransportationTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            const targetTab = btn.dataset.tab;

            // Remove active class from all buttons and contents
            tabBtns.forEach((b) => b.classList.remove('active'));
            tabContents.forEach((c) => c.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            btn.classList.add('active');
            document.getElementById(`tab-${targetTab}`).classList.add('active');
        });
    });
}

// Account Toggles
function initAccountToggles() {
    const toggleBtns = document.querySelectorAll('.account-toggle');

    toggleBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            const targetId = btn.dataset.target;
            const content = document.getElementById(targetId);

            // Toggle active class
            btn.classList.toggle('active');
            content.classList.toggle('active');
        });
    });
}

// Copy Buttons
function initCopyButtons() {
    // Address copy
    const copyAddressBtn = document.getElementById('copy-address');
    if (copyAddressBtn) {
        copyAddressBtn.addEventListener('click', async () => {
            const success = await copyToClipboard(WEDDING_INFO.wedding.address);
            if (success) {
                showToast('주소가 복사되었습니다');
            } else {
                showToast('복사에 실패했습니다');
            }
        });
    }

    // Account number copy
    const copyBtns = document.querySelectorAll('.btn-copy');
    copyBtns.forEach((btn) => {
        btn.addEventListener('click', async () => {
            const accountNumber = btn.dataset.account;
            const success = await copyToClipboard(accountNumber);
            if (success) {
                showToast('계좌번호가 복사되었습니다');
            } else {
                showToast('복사에 실패했습니다');
            }
        });
    });
}

// Share Buttons
function initShareButtons() {
    const shareKakaoBtn = document.getElementById('share-kakao');
    const shareLinkBtn = document.getElementById('share-link');
    const shareNativeBtn = document.getElementById('share-native');

    const shareData = {
        title: `${WEDDING_INFO.groom.name} ♥ ${WEDDING_INFO.bride.name} 결혼합니다`,
        text: `${WEDDING_INFO.wedding.date} ${WEDDING_INFO.wedding.time} | ${WEDDING_INFO.wedding.venue}`,
        url: window.location.href
    };

    // Kakao Share (requires Kakao SDK)
    shareKakaoBtn.addEventListener('click', () => {
        if (typeof Kakao !== 'undefined' && Kakao.Link) {
            Kakao.Link.sendDefault({
                objectType: 'feed',
                content: {
                    title: shareData.title,
                    description: shareData.text,
                    imageUrl: window.location.origin + '/images/main-cover.jpg',
                    link: {
                        mobileWebUrl: shareData.url,
                        webUrl: shareData.url
                    }
                },
                buttons: [
                    {
                        title: '청첩장 보기',
                        link: {
                            mobileWebUrl: shareData.url,
                            webUrl: shareData.url
                        }
                    }
                ]
            });
        } else {
            showToast('카카오톡 공유는 준비중입니다');
        }
    });

    // Link Copy
    shareLinkBtn.addEventListener('click', async () => {
        const success = await copyToClipboard(shareData.url);
        if (success) {
            showToast('링크가 복사되었습니다');
        } else {
            showToast('복사에 실패했습니다');
        }
    });

    // Native Share
    shareNativeBtn.addEventListener('click', async () => {
        if (supportsWebShare()) {
            const success = await shareContent(shareData);
            if (!success) {
                // Fallback to copy
                const copied = await copyToClipboard(shareData.url);
                if (copied) {
                    showToast('링크가 복사되었습니다');
                }
            }
        } else {
            // Fallback to copy
            const success = await copyToClipboard(shareData.url);
            if (success) {
                showToast('링크가 복사되었습니다');
            }
        }
    });
}

// Guestbook
function initGuestbook() {
    const form = document.getElementById('guestbook-form');
    const messagesList = document.getElementById('messages-list');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nameInput = document.getElementById('guest-name');
        const messageInput = document.getElementById('guest-message');

        const name = nameInput.value.trim();
        const message = messageInput.value.trim();

        if (!name || !message) {
            showToast('이름과 메시지를 입력해주세요');
            return;
        }

        // Create message card
        const messageCard = createMessageCard(name, message, getCurrentDate());

        // Add to list (prepend)
        messagesList.insertBefore(messageCard, messagesList.firstChild);

        // Animate
        messageCard.classList.add('fade-in-up');

        // Clear form
        nameInput.value = '';
        messageInput.value = '';

        showToast('메시지가 등록되었습니다');

        // TODO: Send to backend
        // await sendMessageToBackend({ name, message, date: new Date() });
    });
}

// Create Message Card
function createMessageCard(name, message, date) {
    const card = document.createElement('div');
    card.className = 'message-card';

    card.innerHTML = `
        <div class="message-header">
            <span class="message-author">${escapeHtml(name)}</span>
            <span class="message-date">${date}</span>
        </div>
        <p class="message-content">${escapeHtml(message)}</p>
    `;

    return card;
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, (m) => map[m]);
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            e.preventDefault();
            smoothScrollTo(href);
        }
    });
});

// Console message
console.log('%c💒 Wedding Invitation', 'font-size: 20px; font-weight: bold; color: #D4A574;');
console.log('%cMade with ♥', 'font-size: 14px; color: #666;');
