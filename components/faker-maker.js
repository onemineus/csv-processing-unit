const fs = require("fs");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

// Define the database attributes
const databaseAttributes = [
  "DateOfBirth",
  "Disease",
  "TestsPerformed",
  "TimeSpan",
  "PreviousDiseases",
  "BloodGroup",
  "RhFactor",
  "HemoglobinCount",
  "OxygenLevel",
  "BloodPressure",
  "Allergies",
  "SugarLevel",
  "NumberOfTests",
  "Gender",
  "PastMedicalConditions",
  "Weight",
  "Height",
  "Bilirubin",
  "SodiumPotassiumLevel",
  "WBCCount",
  "PlateletCount",
  "RBCCount",
  "Cholesterol",
  "LeukocytesCount",
  "SurgicalHistory",
  "FamilyMedicalHistory",
  "Medicines",
  "RespiratoryRate",
  "Temperature",
  "HeartRate",
];

// Create an array to hold the data
const data = [];

// Generate 1000 rows of random data
for (let i = 0; i < 1000; i++) {
  const rowData = {};
  for (const attribute of databaseAttributes) {
    // Generate random data for each attribute
    rowData[attribute] = generateFakeData();
  }
  data.push(rowData);
}

// Function to generate fake data (string or number)
function generateFakeData() {
  // Decide whether to generate a string or number randomly
  const randomType = Math.random() < 0.5 ? "string" : "number";

  if (randomType === "string") {
    // Generate a random string
    return getRandomString();
  } else {
    // Generate a random number between 1 and 100
    return Math.floor(Math.random() * 100) + 1;
  }
}

// Function to generate a random string
function getRandomString() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const length = Math.floor(Math.random() * 10) + 1; // Random string length between 1 and 10
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
}

// Create a CSV writer
const csvWriter = createCsvWriter({
  path: "fake_data.csv",
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
