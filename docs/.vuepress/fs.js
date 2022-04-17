const fs = require("fs");
const path = require("path");
const getFilename = () => {
  const files = fs
    .readdirSync(path.resolve(__dirname, "../pages"))
    .map((dirname) => {
      const array = fs
        .readdirSync(path.resolve(__dirname, `../pages/${dirname}`))
        .filter((item) => item.includes(".md"))
        .map((item) => {
          return [
            `../pages/${dirname}/${item}`,
            item.substring(0, item.length - 3),
          ];
        });
      return {
        title: dirname,
        children: array,
        collapsable: true,
        sidebarDepth: 2,
      };
    });
  return files;
};
module.exports = getFilename();
