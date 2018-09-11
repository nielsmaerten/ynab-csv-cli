module.exports = {
  // BE, KBC
  "export_BE\\d{14}_\\d{8}_\\d{4}\\.csv": {
    Date: "Datum",
    Memo: "Omschrijving",
    Inflow: "Bedrag"
  },
  // BE, KBC Credit cards
  "export_KBC-[a-zA-Z ]+_\\d{8}_\\d{4}\\.csv": {
    Date: "datum verrichting",
    Memo: "Handelaar",
    Inflow: "bedrag in EUR"
  }
};
