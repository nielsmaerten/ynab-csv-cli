/**!
 * The MIT License (MIT)

Copyright (c) 2014 Ryan Hall

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import * as Papa from "papaparse";

// These are the columns that YNAB expects
var ynab_cols;

ynab_cols = ["Date", "Payee", "Memo", "Outflow", "Inflow"];

// This class does all the heavy lifting.
// It takes the and can format it into csv
export default class DataObject {
  base_json: any;
  constructor() {
    this.base_json = null;
  }

  // Parse base csv file as JSON. This will be easier to work with.
  // It uses http://papaparse.com/ for handling parsing
  parse_csv(csv, encoding) {
    return (this.base_json = Papa.parse(csv, {
      skipEmptyLines: true,
      header: true
    }));
  }

  fields() {
    return this.base_json.meta.fields;
  }

  rows() {
    return this.base_json.data;
  }

  // This method converts base_json into a json file with YNAB specific fields based on
  //   which fields you choose in the dropdowns in the browser.

  // --- parameters ----
  // limit: expects and integer and limits how many rows get parsed (specifically for preview)
  //     pass in false or null to do all.
  // lookup: hash definition of YNAB column names to selected base column names. Lets us
  //     convert the uploaded CSV file into the columns that YNAB expects.
  converted_json(limit, lookup) {
    var value;
    if (this.base_json === null) {
      return null;
    }
    value = [];
    // TODO: You might want to check for errors. Papaparse has an errors field.
    if (this.base_json.data) {
      this.base_json.data.forEach(function(row, index) {
        var tmp_row;
        if (!limit || index < limit) {
          tmp_row = {};
          ynab_cols.forEach(function(col) {
            var cell;
            cell = row[lookup[col]];
            // Some YNAB columns need special formatting,
            //   the rest are just returned as they are.
            switch (col) {
              case "Outflow":
                if (lookup["Outflow"] == lookup["Inflow"]) {
                  tmp_row[col] = cell.startsWith("-") ? cell.slice(1) : "";
                } else {
                  tmp_row[col] = cell;
                }
                break;
              case "Inflow":
                if (lookup["Outflow"] == lookup["Inflow"]) {
                  tmp_row[col] = cell.startsWith("-") ? "" : cell;
                } else {
                  tmp_row[col] = cell;
                }
                break;
              default:
                tmp_row[col] = cell;
            }
          });
          value.push(tmp_row);
        }
      });
    }
    return value;
  }

  converted_csv(limit, lookup) {
    var string;
    if (this.base_json === null) {
      return null;
    }
    // Papa.unparse string
    string = '"' + ynab_cols.join('","') + '"\n';
    this.converted_json(limit, lookup).forEach(function(row) {
      var row_values;
      row_values = [];
      ynab_cols.forEach(function(col) {
        return row_values.push(row[col]);
      });
      return (string += '"' + row_values.join('","') + '"\n');
    });
    return string;
  }
}
