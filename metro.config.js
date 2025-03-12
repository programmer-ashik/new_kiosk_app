const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname)
config.resolver = {
    ...config.resolver,
    blockList: [
        // Exclude only unnecessary files
        /\/__fixtures__\/.*/,
        /\/__tests__\/.*/,
    ],
};
module.exports = withNativeWind(config, { input: './app/global.css' })