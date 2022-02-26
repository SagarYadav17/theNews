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
    iconPaths: {
      msTileImage: "img/icons/mstile-150x150.png",
    },
  },
};
