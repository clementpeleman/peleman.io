// Geldt voor `npm run studio`. De scripts in scripts/ geven dezelfde instellingen zelf mee.
import { Config } from "@remotion/cli/config";
import { webpackOverride } from "./webpack.ts";

Config.setPublicDir("publiek");
Config.setChromiumOpenGlRenderer("angle");
Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.overrideWebpackConfig(webpackOverride);
