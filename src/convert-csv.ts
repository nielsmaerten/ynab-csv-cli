import DataObject from "./data_object";
import getMappings from "./get-mappings";
import * as fs from "fs";
import * as path from "path";

export default (...filePaths) => {
  console.log(filePaths);
  const dataObject = new DataObject();

  filePaths.forEach(filePath => {
    // Find out which mapping to use
    const mapping = getMappings(filePath);

    // Load CSV file
    const encoding = mapping.Encoding;
    const csvData = fs.readFileSync(filePath, { encoding });
    dataObject.parse_csv(csvData, encoding);

    // Convert to YNAB format
    const ynab = dataObject.converted_csv(false, mapping);

    // Save to output file
    const outFile = "ynab_" + path.basename(filePath);
    fs.writeFileSync(path.resolve("./" + outFile), ynab);
  });
};
