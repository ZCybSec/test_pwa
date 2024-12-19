const CACHE_NAME = 'zcybsec-cache-v1';
const urlsToCache = [
  // ملفات HTML
  '/test_pwa/',
  '/test_pwa/index.html',
  '/test_pwa/portfolio-details.html',
  '/test_pwa/service-details.html',
  '/test_pwa/starter-page.html',
  
  // ملفات CSS
  '/test_pwa/assets/css/main.css',
  
  // ملفات JS
  '/test_pwa/assets/js/main.js',
  
  // صور
  '/test_pwa/assets/img/apple-touch-icon.png',
  '/test_pwa/assets/img/favicon.png',
  '/test_pwa/assets/img/hero-bg.gif',
  '/test_pwa/assets/img/logo.png',
  '/test_pwa/assets/img/my-profile-img.jpg',
  '/test_pwa/assets/img/portfolio/app-1.jpg',
  '/test_pwa/assets/img/portfolio/app-2.jpg',
  '/test_pwa/assets/img/portfolio/app-3.jpg',
  '/test_pwa/assets/img/portfolio/books-1.jpg',
  '/test_pwa/assets/img/portfolio/books-2.jpg',
  '/test_pwa/assets/img/portfolio/books-3.jpg',
  '/test_pwa/assets/img/portfolio/branding-1.jpg',
  '/test_pwa/assets/img/portfolio/branding-2.jpg',
  '/test_pwa/assets/img/portfolio/branding-3.jpg',
  '/test_pwa/assets/img/portfolio/product-1.jpg',
  '/test_pwa/assets/img/portfolio/product-2.jpg',
  '/test_pwa/assets/img/portfolio/product-3.jpg',
  
  // ملفات الخطوط
  '/test_pwa/assets/vendor/bootstrap-icons/fonts/bootstrap-icons.woff',
  '/test_pwa/assets/vendor/bootstrap-icons/fonts/bootstrap-icons.woff2',

  // ملفات مكتبات الطرف الثالث
  '/test_pwa/assets/vendor/aos/aos.css',
  '/test_pwa/assets/vendor/bootstrap/css/bootstrap.min.css',
  '/test_pwa/assets/vendor/bootstrap-icons/bootstrap-icons.css',
  '/test_pwa/assets/vendor/glightbox/css/glightbox.min.css',
  '/test_pwa/assets/vendor/swiper/swiper-bundle.min.css',

  // ملفات JS الخاصة بالمكتبات
  '/test_pwa/assets/vendor/aos/aos.cjs.js',
  '/test_pwa/assets/vendor/bootstrap/js/bootstrap.bundle.min.js',
  '/test_pwa/assets/vendor/glightbox/js/glightbox.min.js',
  '/test_pwa/assets/vendor/swiper/swiper-bundle.min.js',

  // ملفات أخرى مهمة
  '/test_pwa/manifest.json',
  '/test_pwa/service-worker.js',
  '/test_pwa/forms/contact.php',
];

// تثبيت الكاش
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Caching all files');
        return cache.addAll(urlsToCache);
      })
  );
});

// تفعيل الخدمة
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// التعامل مع الطلبات
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
