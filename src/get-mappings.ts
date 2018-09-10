import * as path from "path";

export default (filePath: string) => {
  let mappingsFile = "./mappings.js";
  const mappings = require(mappingsFile);
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
