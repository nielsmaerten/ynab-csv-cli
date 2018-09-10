import * as path from "path";

export default (filePath: string) => {
  const mappings = require(path.resolve("./mappings.js"));
  const fileName = path.basename(filePath);

  for (const regex in mappings) {
    if (mappings.hasOwnProperty(regex)) {
      if (fileName.match(regex)) {
        return mappings[regex];
      }
    }
  }
  throw new Error(`Did not find a mapping that matches ${fileName}`);
};
