import convertCsv from "./convert-csv";

process.argv.shift();
process.argv.shift();
convertCsv(...process.argv);
