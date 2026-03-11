module.exports = [
  "strapi::logger",
  "strapi::errors",
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "connect-src": ["'self'", "https:"],
          "img-src": ["'self'", "data:", "blob:", "ik.imagekit.io"],
          "media-src": ["'self'", "data:", "blob:", "ik.imagekit.io"],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  "strapi::cors",
  "strapi::poweredBy",
  "strapi::query",
  {
    name: "strapi::body",
    config: {
      formLimit: "50mb",
      jsonLimit: "50mb",
      textLimit: "50mb",
      formidable: {
        maxFileSize: 50 * 1024 * 1024,
      },
    },
  },
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];
