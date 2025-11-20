// Utility Functions

/**
 * Show toast notification
 * @param {string} message - Message to display
 * @param {number} duration - Duration in milliseconds (default: 2000)
 */
function showToast(message, duration = 2000) {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, duration);
}

/**
 * Copy text to clipboard
 * @param {string} text - Text to copy
 * @returns {Promise<boolean>} - Success status
 */
async function copyToClipboard(text) {
    try {
        // Modern Clipboard API
        if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(text);
            return true;
        }

        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();
        const success = document.execCommand('copy');
        document.body.removeChild(textarea);
        return success;
    } catch (error) {
        console.error('Failed to copy text:', error);
        return false;
    }
}

/**
 * Format date for calendar event
 * @param {string} dateString - Date string (YYYY-MM-DD)
 * @param {string} time - Time string (HH:MM)
 * @returns {string} - Formatted date for ICS
 */
function formatDateForCalendar(dateString, time) {
    const [year, month, day] = dateString.split('-');
    const [hour, minute] = time.split(':');
    return `${year}${month}${day}T${hour}${minute}00`;
}

/**
 * Generate ICS file for calendar
 * @param {Object} event - Event details
 * @returns {string} - ICS file content
 */
function generateICS(event) {
    const { title, description, location, startDate, endDate } = event;

    const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Wedding Invitation//EN
BEGIN:VEVENT
UID:${Date.now()}@wedding-invitation.com
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTART:${startDate}
DTEND:${endDate}
SUMMARY:${title}
DESCRIPTION:${description}
LOCATION:${location}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    return ics;
}

/**
 * Download ICS file
 * @param {string} icsContent - ICS file content
 * @param {string} filename - File name
 */
function downloadICS(icsContent, filename = 'wedding-invitation.ics') {
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
}

/**
 * Debounce function
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} - Debounced function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} - Throttled function
 */
function throttle(func, limit) {
    let inThrottle;
    return function executedFunction(...args) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
}

/**
 * Check if element is in viewport
 * @param {HTMLElement} element - Element to check
 * @returns {boolean} - Whether element is in viewport
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Smooth scroll to element
 * @param {string} selector - Element selector
 * @param {number} offset - Offset from top (default: 0)
 */
function smoothScrollTo(selector, offset = 0) {
    const element = document.querySelector(selector);
    if (!element) return;

    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
}

/**
 * Get current date formatted
 * @param {string} format - Date format (default: 'YYYY.MM.DD')
 * @returns {string} - Formatted date
 */
function getCurrentDate(format = 'YYYY.MM.DD') {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');

    return format
        .replace('YYYY', year)
        .replace('MM', month)
        .replace('DD', day);
}

/**
 * Check if browser supports Web Share API
 * @returns {boolean} - Support status
 */
function supportsWebShare() {
    return navigator.share !== undefined;
}

/**
 * Share using Web Share API
 * @param {Object} shareData - Data to share
 * @returns {Promise<boolean>} - Success status
 */
async function shareContent(shareData) {
    if (!supportsWebShare()) {
        return false;
    }

    try {
        await navigator.share(shareData);
        return true;
    } catch (error) {
        if (error.name !== 'AbortError') {
            console.error('Error sharing:', error);
        }
        return false;
    }
}

/**
 * Load image with promise
 * @param {string} src - Image source
 * @returns {Promise<HTMLImageElement>} - Loaded image
 */
function loadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
    });
}

/**
 * Lazy load images using Intersection Observer
 * @param {string} selector - Image selector (default: 'img[loading="lazy"]')
 */
function initLazyLoad(selector = 'img[loading="lazy"]') {
    // Check if browser supports native lazy loading
    if ('loading' in HTMLImageElement.prototype) {
        return; // Browser handles it natively
    }

    // Fallback for older browsers
    const images = document.querySelectorAll(selector);

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

/**
 * Detect mobile device
 * @returns {boolean} - Whether device is mobile
 */
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
    );
}

/**
 * Detect iOS device
 * @returns {boolean} - Whether device is iOS
 */
function isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}

/**
 * Prevent body scroll (for modals)
 */
function disableBodyScroll() {
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
}

/**
 * Enable body scroll
 */
function enableBodyScroll() {
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.width = '';
}

// Export functions for ES6 modules (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showToast,
        copyToClipboard,
        formatDateForCalendar,
        generateICS,
        downloadICS,
        debounce,
        throttle,
        isInViewport,
        smoothScrollTo,
        getCurrentDate,
        supportsWebShare,
        shareContent,
        loadImage,
        initLazyLoad,
        isMobileDevice,
        isIOS,
        disableBodyScroll,
        enableBodyScroll
    };
}
