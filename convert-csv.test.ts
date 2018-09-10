import convertCsv from "./convert-csv";

describe("convert-csv", () => {
  it("reads a CSV file", () => {
    convertCsv(
      "C:/Users/niels/Downloads/export_BE00000000000000_00000000_0000.csv"
    );
  });
});
