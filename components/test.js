const stringSimilarity = require("string-similarity");

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

// Sample CSV data as a list of objects
const csvData = [
  {
    DateOfBirth: "1988-06-20",
    Disease: "Hypertension",
    TestsPerformed: "ECG",
    TimeSpan: "2 weeks",
    PreviousDiseases: "Diabetes",
    BloodGroup: "B-",
    RhFactor: "Negative",
    HemoglobinCount: "12.5",
    OxygenLevel: "96",
    BloodPressure: "140/90",
    Allergies: "None",
    SugarLevel: "120",
    NumberOfTests: 2,
    Gender: "Female",
    PastMedicalConditions: "Asthma",
    Weight: "65",
    Height: "160",
    Bilirubin: "1.2",
    SodiumPotassiumLevel: "137/4.0",
    WBCCount: "8,500",
    PlateletCount: "300,000",
    RBCCount: "4.8",
    Cholesterol: "200",
    LeukocytesCount: "7,500",
    SurgicalHistory: "None",
    FamilyMedicalHistory: "Cancer",
    Medicines: "Lisinopril 10mg (1x/day)",
    RespiratoryRate: "18",
    Temperature: "98.2",
    HeartRate: "80",
  },
  {
    DateOfBirth: "1995-02-10",
    Disease: "Asthma",
    TestsPerformed: "Spirometry",
    TimeSpan: "3 months",
    PreviousDiseases: "None",
    BloodGroup: "O+",
    RhFactor: "Positive",
    HemoglobinCount: "13.2",
    OxygenLevel: "97",
    BloodPressure: "110/70",
    Allergies: "Dust",
    SugarLevel: "85",
    NumberOfTests: 1,
    Gender: "Male",
    PastMedicalConditions: "High Cholesterol",
    Weight: "80",
    Height: "180",
    Bilirubin: "0.9",
    SodiumPotassiumLevel: "138/4.2",
    WBCCount: "6,800",
    PlateletCount: "280,000",
    RBCCount: "5.0",
    Cholesterol: "220",
    LeukocytesCount: "8,200",
    SurgicalHistory: "Tonsillectomy",
    FamilyMedicalHistory: "Diabetes",
    Medicines: "Albuterol 100mcg (2x/day)",
    RespiratoryRate: "20",
    Temperature: "98.5",
    HeartRate: "75",
  },
  {
    DateOfBirth: "1990-03-15",
    Disease: "Common Cold",
    TestsPerformed: "CBC",
    TimeSpan: "5 days",
    PreviousDiseases: "None",
    BloodGroup: "A+",
    RhFactor: "Positive",
    HemoglobinCount: "14",
    OxygenLevel: "98",
    BloodPressure: "120/80",
    Allergies: "Pollen",
    SugarLevel: "90",
    NumberOfTests: 3,
    Gender: "Male",
    PastMedicalConditions: "None",
    Weight: "70",
    Height: "175",
    Bilirubin: "0.8",
    SodiumPotassiumLevel: "135/4.5",
    WBCCount: "7,000",
    PlateletCount: "250,000",
    RBCCount: "5.2",
    Cholesterol: "180",
    LeukocytesCount: "8,000",
    SurgicalHistory: "Appendectomy",
    FamilyMedicalHistory: "Heart disease",
    Medicines: "Ibuprofen 200mg (2x/day)",
    RespiratoryRate: "16",
    Temperature: "98.6",
    HeartRate: "72",
  },
];

// Function to map CSV column headers to database attributes
function mapCsvColumnsToAttributes(csvData, databaseAttributes) {
  const mappedData = [];

  // Iterate through each CSV row
  for (const row of csvData) {
    const mappedRow = {};

    // Iterate through each CSV column header
    for (const csvColumnHeader of Object.keys(row)) {
      // Use fuzzy matching to find the closest matching database attribute
      const matches = stringSimilarity.findBestMatch(
        csvColumnHeader.toLowerCase(),
        databaseAttributes.map((attribute) => attribute.toLowerCase())
      );

      const bestMatch = matches.bestMatch;
      if (bestMatch.rating > 0.5) {
        // If a match with a sufficient similarity rating is found, map the CSV column
        const matchedAttribute = databaseAttributes.find(
          (attribute) => attribute.toLowerCase() === bestMatch.target
        );
        if (matchedAttribute) {
          mappedRow[matchedAttribute] = row[csvColumnHeader];
        }
      }
    }

    mappedData.push(mappedRow);
  }

  return mappedData;
}

// Map CSV columns to database attributes
const mappedCSV = mapCsvColumnsToAttributes(csvData, databaseAttributes);

console.log(mappedCSV);
