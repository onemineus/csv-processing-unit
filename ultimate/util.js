import Fuse from "fuse.js";

// Define your main attributes
const medicalDataFields = [
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

const expectedDataTypes = {
  Disease: "string",
  TestsPerformed: "string",
  TimeSpan: "string",
  PreviousDiseases: "string",
  BloodGroup: "string",
  RhFactor: "string",
  HemoglobinCount: "number",
  OxygenLevel: (value) =>
    !isNaN(parseFloat(value)) &&
    parseFloat(value) >= 0 &&
    parseFloat(value) <= 100,
  BloodPressure: "string",
  Allergies: "string",
  SugarLevel: "number",
  NumberOfTests: "number",
  Gender: (value) => ["male", "female"].includes(value.toLowerCase()),
  PastMedicalConditions: "string",
  Weight: "number",
  Height: "number",
  Bilirubin: "number",
  SodiumPotassiumLevel: "string",
  WBCCount: "number",
  PlateletCount: "number",
  RBCCount: "number",
  Cholesterol: "number",
  LeukocytesCount: "number",
  SurgicalHistory: "string",
  FamilyMedicalHistory: "string",
  Medicines: "string",
  RespiratoryRate: "number",
  Temperature: "number",
  HeartRate: "number",
};

// Function to process and map column names
const processCsvData = (csvData) => {
  // Create an instance of Fuse with the main attributes
  const fuse = new Fuse(medicalDataFields, {
    threshold: 0.5,
  });

  // Process the CSV data

  const processedData = csvData.map((row) => {
    const processedRow = {};

    // Map CSV column names to main attributes using Fuse
    Object.keys(row).forEach((columnName) => {
      const result = fuse.search(columnName);
      if (result.length > 0 && result[0].item) {
        const mainAttribute = result[0].item;
        processedRow[mainAttribute] = row[columnName];
      }
    });

    return processedRow;
  });

  return processedData;
};

export default processCsvData;
