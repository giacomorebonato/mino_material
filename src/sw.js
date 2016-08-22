self.addEventListener('install', function(event) {
  //self.skipWaiting()
  function onInstall () {
    return caches.open('offline-v1')
      .then((cache) => {
        cache.addAll([
          '/assets/bundle.js',
          '/assets/styles.css',
          '/assets/vendor.js'
        ])
      }
    )
  }

  event.waitUntil(onInstall(event))
})

self.addEventListener('activate', (event) => {
  console.log('Activated', event)
})

self.addEventListener('fetch', (event) => {
  console.log('fetch', event)
})

self.addEventListener('push', (event) => {
  console.log('Push message received', event)
})
