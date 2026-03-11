module.exports = (plugin) => {
  const originalDelete = plugin.controllers.upload.destroy;

  plugin.controllers.upload.destroy = async (ctx) => {
    const { id } = ctx.params;

    // Get file info before deleting
    const file = await strapi.plugins.upload.services.upload.findOne(id);

    // Delete from ImageKit if it has an ImageKit URL
    if (file && file.url && file.url.includes("ik.imagekit.io")) {
      const ImageKit = require("imagekit");
      const imagekit = new ImageKit({
        publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
        privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
        urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
      });

      try {
        await imagekit.deleteFile(file.provider_metadata.fileId);
        console.log(`Deleted from ImageKit: ${file.name}`);
      } catch (err) {
        console.error(`ImageKit delete failed:`, err.message);
      }
    }

    // Proceed with normal Strapi delete
    return originalDelete(ctx);
  };

  return plugin;
};
