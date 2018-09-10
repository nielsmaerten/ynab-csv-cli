# YNAB-CSV-CLI

This project is a fork of https://github.com/aniav/ynab-csv

The original tool allowed you to convert your bank's CSV files to YNAB format, but:

- it had to run in Chrome
- you had to set the mappings for every new file

YNAB-CSV-CLI turns this idea into a stand-alone executable.  
You define the mappings for your bank's files once,  
then just drop files onto the tool and have them converted automatically.

## How to use

1. [Download](https://github.com/nielsmaerten/ynab-csv-cli/releases) the tool for your OS and the `mappings.js` file to a folder
2. Add a mapping for your bank's files to `mappings.js`
3. Drag-and-drop your bank's CSV file onto the executable
4. Import the newly generated CSV into YNAB
