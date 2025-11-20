// Map Integration (Kakao Map)

// Kakao Map Configuration
const MAP_CONFIG = {
    center: {
        lat: 37.4979, // 위도 (Customize this)
        lng: 127.0276  // 경도 (Customize this)
    },
    level: 3,
    marker: {
        title: '○○ 웨딩홀',
        address: '서울특별시 강남구 테헤란로 123'
    }
};

// Initialize map when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initKakaoMap();
});

/**
 * Initialize Kakao Map
 */
function initKakaoMap() {
    const mapContainer = document.getElementById('map');

    // Check if Kakao Maps SDK is loaded
    if (typeof kakao === 'undefined' || !kakao.maps) {
        console.warn('Kakao Maps SDK not loaded. Showing fallback map.');
        showFallbackMap(mapContainer);
        return;
    }

    try {
        // Create map
        const mapOption = {
            center: new kakao.maps.LatLng(MAP_CONFIG.center.lat, MAP_CONFIG.center.lng),
            level: MAP_CONFIG.level
        };

        const map = new kakao.maps.Map(mapContainer, mapOption);

        // Add marker
        const markerPosition = new kakao.maps.LatLng(
            MAP_CONFIG.center.lat,
            MAP_CONFIG.center.lng
        );

        const marker = new kakao.maps.Marker({
            position: markerPosition,
            map: map
        });

        // Add info window
        const infowindow = new kakao.maps.InfoWindow({
            content: `
                <div style="padding:10px;font-size:14px;text-align:center;">
                    <strong>${MAP_CONFIG.marker.title}</strong><br>
                    <span style="font-size:12px;color:#666;">${MAP_CONFIG.marker.address}</span>
                </div>
            `
        });

        // Show info window on marker click
        kakao.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map, marker);
        });

        // Show info window by default
        infowindow.open(map, marker);

        // Add map controls
        const zoomControl = new kakao.maps.ZoomControl();
        map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

        // Make map responsive
        window.addEventListener('resize', debounce(() => {
            map.relayout();
            map.setCenter(markerPosition);
        }, 300));

    } catch (error) {
        console.error('Error initializing Kakao Map:', error);
        showFallbackMap(mapContainer);
    }
}

/**
 * Show fallback map (static image or iframe)
 */
function showFallbackMap(container) {
    // Option 1: Use Google Maps static image
    const lat = MAP_CONFIG.center.lat;
    const lng = MAP_CONFIG.center.lng;
    const staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=15&size=600x300&markers=color:red%7C${lat},${lng}&key=YOUR_GOOGLE_MAPS_API_KEY`;

    // Option 2: Use iframe (Google Maps or Naver Maps)
    const iframeUrl = `https://www.google.com/maps?q=${lat},${lng}&output=embed`;

    container.innerHTML = `
        <iframe
            src="${iframeUrl}"
            width="100%"
            height="100%"
            style="border:0;"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
    `;
}

/**
 * Load Kakao Map SDK dynamically
 * Call this function if you want to load the SDK on demand
 */
function loadKakaoMapSDK(apiKey) {
    return new Promise((resolve, reject) => {
        // Check if already loaded
        if (typeof kakao !== 'undefined' && kakao.maps) {
            resolve();
            return;
        }

        const script = document.createElement('script');
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false`;
        script.onload = () => {
            kakao.maps.load(() => {
                resolve();
            });
        };
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

/**
 * Get directions URL for various map services
 */
function getDirectionsUrl(service = 'kakao') {
    const { lat, lng } = MAP_CONFIG.center;
    const { title, address } = MAP_CONFIG.marker;

    const urls = {
        kakao: `https://map.kakao.com/link/to/${encodeURIComponent(title)},${lat},${lng}`,
        naver: `https://map.naver.com/v5/directions/-/-/-/car?c=${lng},${lat},15,0,0,0,dh`,
        google: `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
        tmap: `tmap://route?goalname=${encodeURIComponent(title)}&goalx=${lng}&goaly=${lat}`
    };

    return urls[service] || urls.kakao;
}

// Update navigation button URLs
document.addEventListener('DOMContentLoaded', function() {
    const naviButtons = document.querySelectorAll('.btn-navi');

    naviButtons.forEach(btn => {
        const text = btn.textContent.trim();

        if (text.includes('카카오')) {
            btn.href = getDirectionsUrl('kakao');
        } else if (text.includes('네이버')) {
            btn.href = getDirectionsUrl('naver');
        } else if (text.includes('구글')) {
            btn.href = getDirectionsUrl('google');
        }
    });
});

// Alternative: Naver Map Integration
function initNaverMap() {
    const mapContainer = document.getElementById('map');

    if (typeof naver === 'undefined' || !naver.maps) {
        console.warn('Naver Maps SDK not loaded.');
        showFallbackMap(mapContainer);
        return;
    }

    const map = new naver.maps.Map(mapContainer, {
        center: new naver.maps.LatLng(MAP_CONFIG.center.lat, MAP_CONFIG.center.lng),
        zoom: 15
    });

    const marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(MAP_CONFIG.center.lat, MAP_CONFIG.center.lng),
        map: map
    });

    const infowindow = new naver.maps.InfoWindow({
        content: `
            <div style="padding:10px;font-size:14px;text-align:center;">
                <strong>${MAP_CONFIG.marker.title}</strong><br>
                <span style="font-size:12px;color:#666;">${MAP_CONFIG.marker.address}</span>
            </div>
        `
    });

    naver.maps.Event.addListener(marker, 'click', function() {
        if (infowindow.getMap()) {
            infowindow.close();
        } else {
            infowindow.open(map, marker);
        }
    });

    infowindow.open(map, marker);
}

// Export for ES6 modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initKakaoMap,
        initNaverMap,
        loadKakaoMapSDK,
        getDirectionsUrl
    };
}
