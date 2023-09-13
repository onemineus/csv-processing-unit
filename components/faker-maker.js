const faker = require("faker");
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

// Generate 1000 rows of fake data
for (let i = 0; i < 1000; i++) {
  const rowData = {};
  for (const attribute of databaseAttributes) {
    // Generate fake data for each attribute using faker.js
    rowData[attribute] = faker.fake("{{random.word}}");
  }
  data.push(rowData);
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
