module.exports = {
  // ...other vue-cli plugin options...
  pwa: {
    name: "theNews",
    themeColor: "#111827",
    msTileColor: "#000000",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",
    workboxOptions: {
      skipWaiting: true,
    },
    manifestOptions: {
      icons: [
        {
          src: "/android-chrome-192x192.png",
          src: "public/img/icons/android-chrome-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "public/img/icons/android-chrome-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
    },
  },
};
