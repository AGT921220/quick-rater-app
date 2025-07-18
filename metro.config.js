// // Learn more https://docs.expo.io/guides/customizing-metro
// const { getDefaultConfig } = require('expo/metro-config');

// /** @type {import('expo/metro-config').MetroConfig} */
// const config = getDefaultConfig(__dirname);

// module.exports = config;


// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
module.exports = (async () => {
  const config = await getDefaultConfig(__dirname);

  // Añadimos soporte para extensiones web
  config.resolver.sourceExts.push('web.js', 'web.tsx');

  return config;
})();
