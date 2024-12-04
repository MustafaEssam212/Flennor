const { i18n } = require('./next-i18next.config');

module.exports = {
  i18n,
  images: {
    // Define your remote image patterns
    remotePatterns: [
      {
        protocol: 'https', 
        hostname: 'flagcdn.com',
        port: '', 
        pathname: '/**', 
      },
      {
        protocol: 'http', 
        hostname: 'localhost',
        port: '3000', 
        pathname: '/**', 
      },
    ],
  },
  async headers() {
    return [
      {
        // Match for the iso.jpg image in the public folder
        source: '/iso.jpg',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',  // Enforces that the image is treated with the correct content type
          },
        ],
      },
    ];
  },
};
