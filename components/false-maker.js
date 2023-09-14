const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const fs = require("fs");

// Define the database attributes
const databaseAttributes = [
  "kausjhdsa",
  "keno ha kno",
  "noob29",
  "mai-chahu",
  "tujhko",
  "fida_hoon_tujhpe",
];

// Create an array to hold the data
const data = [];

for (let i = 0; i < 10; i++) {
  const rowData = {
    kausjhdsa: Math.random() < 0.5 ? "Male" : "Female", // Randomly choose Male or Female
    "keno ha kno": Math.floor(Math.random() * 50 + 150).toString(), // Random value between 150 and 199
    noob29: (Math.random() * 2 + 98).toFixed(1), // Random value between 98 and 100
    "mai-chahu": 1312,
    tujhko: "meri jane",
    fida_hoon_tujhpe: "yaddon me basa",
  };
  data.push(rowData);
}

// Create a CSV writer
const csvWriter = createCsvWriter({
  path: "false_data.csv",
  header: databaseAttributes.map((attribute) => ({
    id: attribute,
    title: attribute,
  })),
});

// Write the data to the CSV file
csvWriter
  .writeRecords(data)
  .then(() => {
    console.log("CSV file has been written successfully");
  })
  .catch((err) => {
    console.error("Error writing CSV file:", err);
  });
