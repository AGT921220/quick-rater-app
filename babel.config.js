// module.exports = function(api) {
//   api.cache(true);
//   return {
//     presets: ['babel-preset-expo'],
//   };
// };

// module.exports = {
//   presets: ["module:metro-react-native-babel-preset",'babel-preset-expo'],
//   plugins: [
//     "react-native-reanimated/plugin",
//   ],
// };
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin'
    ],
  };
};
