

/** @type {import('next').NextConfig} */
module.exports = {
  generateEtags: false,
    async headers() {
        return [
          {
            // matching all API routes
            source: "/:path*",
            headers: [
              // { key: 'Cache-Control',value: 'no cache, no-store, must-revalidate'},
            ]
          }
        ]
      }
}


