module.exports = ({ env }) => ({
  imagekit: {
    enabled: true,
    config: {
      publicKey: env("IMAGEKIT_PUBLIC_KEY"),
      privateKey: env("IMAGEKIT_PRIVATE_KEY"),
      urlEndpoint: env("IMAGEKIT_URL_ENDPOINT"),
      enabled: true,
      useTransformUrls: true,
      uploadEnabled: true,
      uploadOptions: {
        folder: "/strapi-uploads/",
        tags: ["strapi", "media"],
      },
    },
  },
});
