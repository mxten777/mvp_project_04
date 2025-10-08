const CACHE_NAME = 'baikal-systems-v1';
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/images/baikal_logo.png',
  '/images/baikal_logo_white.png',
  '/images/baikal_logo_trans.png'
];

// Service Worker 설치
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// 캐시된 리소스 제공
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // 캐시에서 찾았으면 반환
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

// 백그라운드 동기화
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    console.log('Background sync triggered');
    event.waitUntil(doBackgroundSync());
  }
});

// 푸시 알림 처리
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'Default notification message',
    icon: '/images/baikal_logo.png',
    badge: '/images/baikal_logo.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: '1'
    },
    actions: [
      {
        action: 'explore',
        title: 'View Details',
        icon: '/images/baikal_logo.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/images/baikal_logo.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Baikal Systems', options)
  );
});

// 알림 클릭 처리
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// 백그라운드 동기화 함수
async function doBackgroundSync() {
  try {
    // 오프라인 상태에서 저장된 데이터 동기화
    const pendingRequests = await getPendingRequests();
    
    for (const request of pendingRequests) {
      try {
        await fetch(request.url, request.options);
        await removePendingRequest(request.id);
      } catch (error) {
        console.log('Failed to sync request:', error);
      }
    }
  } catch (error) {
    console.log('Background sync failed:', error);
  }
}

// IndexedDB에서 대기 중인 요청 가져오기
async function getPendingRequests() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('BaikalSystemsDB', 1);
    
    request.onerror = () => reject(request.error);
    
    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction(['pendingRequests'], 'readonly');
      const objectStore = transaction.objectStore('pendingRequests');
      const getAllRequest = objectStore.getAll();
      
      getAllRequest.onsuccess = () => resolve(getAllRequest.result);
      getAllRequest.onerror = () => reject(getAllRequest.error);
    };
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('pendingRequests')) {
        db.createObjectStore('pendingRequests', { keyPath: 'id', autoIncrement: true });
      }
    };
  });
}

// 대기 중인 요청 제거
async function removePendingRequest(id) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('BaikalSystemsDB', 1);
    
    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction(['pendingRequests'], 'readwrite');
      const objectStore = transaction.objectStore('pendingRequests');
      const deleteRequest = objectStore.delete(id);
      
      deleteRequest.onsuccess = () => resolve();
      deleteRequest.onerror = () => reject(deleteRequest.error);
    };
  });
}