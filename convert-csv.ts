import DataObject from "./data_object";
import getMappings from "./get-mappings";
import * as fs from "fs";
import * as path from "path";

export default (
  filePath: string,
  outFile?: string,
  encoding: string = "UTF-8"
) => {
  const dataObject = new DataObject();

  // Load CSV file
  const csvData = fs.readFileSync(filePath, { encoding });
  dataObject.parse_csv(csvData, encoding);

  // Find out which mapping to use
  const mapping = getMappings(filePath);

  // Convert to YNAB format
  const ynab = dataObject.converted_csv(false, mapping);

  // Save to output file
  outFile = outFile || "ynab_" + path.basename(filePath);
  fs.writeFileSync(outFile, ynab);
};
