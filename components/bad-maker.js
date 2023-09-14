const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const fs = require("fs");

// Define the database attributes
const databaseAttributes = [
  "Date - Of - Birth",
  "Oxygen_Level",
  "BP",
  "Sugar_Level",
  "Tests",
  "Gender",
  "Weight",
  "Height",
  "Temp",
  "Heart-Rate",
  "mai-chahu",
  "tujhko",
  "fida_hoon_tujhpe",
];

// Create an array to hold the data
const data = [];

// Function to generate a random date within the last 30 years
const generateRandomDateOfBirth = () => {
  const today = new Date();
  const startDate = new Date(today.getFullYear() - 30, 0, 1).getTime();
  const endDate = today.getTime();
  const randomDate = new Date(
    startDate + Math.random() * (endDate - startDate)
  );
  return randomDate.toLocaleDateString();
};

// Function to generate a random blood pressure value (e.g., "120/80")
const generateRandomBloodPressure = () => {
  const systolic = Math.floor(Math.random() * 60) + 90; // Random value between 90 and 150
  const diastolic = Math.floor(Math.random() * 30) + 60; // Random value between 60 and 90
  return `${systolic}/${diastolic}`;
};

// Generate 10 rows of fake data
for (let i = 0; i < 10; i++) {
  const rowData = {
    "Date - Of - Birth": generateRandomDateOfBirth(),
    Oxygen_Level: (Math.random() * 10 + 90).toFixed(1), // Random value between 90 and 100
    BP: generateRandomBloodPressure(),
    Sugar_Level: (Math.random() * 80 + 70).toFixed(1), // Random value between 70 and 150
    Tests: Math.floor(Math.random() * 10).toString(), // Random value between 0 and 9
    Gender: Math.random() < 0.5 ? "Male2" : "Female4", // Randomly choose Male or Female
    Weight: (Math.random() * 50 + 50).toFixed(1), // Random value between 50 and 100
    Height: Math.floor(Math.random() * 50 + 150).toString(), // Random value between 150 and 199
    Temp: (Math.random() * 2 + 98).toFixed(1), // Random value between 98 and 100
    "Heart-Rate": Math.floor(Math.random() * 40 + 60).toString(), // Random value between 60 and 99
    "mai-chahu": 1312,
    tujhko: "meri jane",
    fida_hoon_tujhpe: "yaddon me basa",
  };
  data.push(rowData);
}

// Create a CSV writer
const csvWriter = createCsvWriter({
  path: "bad_data.csv",
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
