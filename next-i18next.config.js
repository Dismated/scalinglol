const path = require("path");

module.exports = {
  i18n: {
    defaultLocale: "en",
    locales: ["en", "de"],
  },
  ns: "common",
  localePath: path.resolve("./public/locales"),
};
