workbox.precaching.precacheAndRoute(self.__precacheManifest || [])

workbox.routing.registerRoute(
  /https:\/\/api\.exchangeratesapi\.io\/latest/,
  new workbox.strategies.NetworkFirst({
    cacheName: "exchanges",
    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: 10 * 60 // 10 minutes
      })
    ]
  })
)
