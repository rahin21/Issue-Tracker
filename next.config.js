

/** @type {import('next').NextConfig} */
module.exports = {
    async headers() {
        return [
          {
            // matching all API routes
            source: "/api/auth/:path*",
            headers: [
              { key: 'Cache-Control',value: 'no cache, no-store, must-revalidate'},
            ]
          }
        ]
      }
}


