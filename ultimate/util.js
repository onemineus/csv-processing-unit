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
