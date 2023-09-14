const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const fs = require("fs");

// Define the database attributes
const databaseAttributes = [
  "DateOfBirth",
  "OxygenLevel",
  "BloodPressure",
  "SugarLevel",
  "NumberOfTests",
  "Gender",
  "Weight",
  "Height",
  "Temperature",
  "HeartRate",
];

// Create an array to hold the data
const data = [];

// Function to generate a random date within the last 30 years
const generateRandomDateOfBirth = () => {
  const today = new Date();
  const startDate = new Date(today.getFullYear() - 30, 0, 1).getTime();
  const endDate = today.getTime();
  const randomDate = new Date(startDate + Math.random() * (endDate - startDate));
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
    DateOfBirth: generateRandomDateOfBirth(),
    OxygenLevel: (Math.random() * 10 + 90).toFixed(1), // Random value between 90 and 100
    BloodPressure: generateRandomBloodPressure(),
    SugarLevel: (Math.random() * 80 + 70).toFixed(1), // Random value between 70 and 150
    NumberOfTests: Math.floor(Math.random() * 10).toString(), // Random value between 0 and 9
    Gender: Math.random() < 0.5 ? "Male" : "Female", // Randomly choose Male or Female
    Weight: (Math.random() * 50 + 50).toFixed(1), // Random value between 50 and 100
    Height: Math.floor(Math.random() * 50 + 150).toString(), // Random value between 150 and 199
    Temperature: (Math.random() * 2 + 98).toFixed(1), // Random value between 98 and 100
    HeartRate: Math.floor(Math.random() * 40 + 60).toString(), // Random value between 60 and 99
  };
  data.push(rowData);
}

// Create a CSV writer
const csvWriter = createCsvWriter({
  path: "fake_data.csv",
  header: databaseAttributes.map((attribute) => ({ id: attribute, title: attribute })),
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
