import { createObjectCsvWriter as createCsvWriter } from "csv-writer";

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomDisease() {
  const diseases = [
    "Flu",
    "Common Cold",
    "Allergies",
    "Hypertension",
    "Diabetes",
    "Asthma",
    "Bronchitis",
    "Migraine",
    "Arthritis",
    "Pneumonia",
  ];

  const randomIndex = getRandomInt(0, diseases.length - 1);
  return diseases[randomIndex];
}

function generateRandomBloodGroup() {
  const bloodGroups = ["A", "B", "AB", "O"];
  const randomIndex = getRandomInt(0, bloodGroups.length - 1);
  return bloodGroups[randomIndex];
}

function generateRandomRhFactor() {
  return ["Positive", "Negative"][getRandomInt(0, 1)];
}

function generateRandomBloodPressure() {
  return `${getRandomInt(90, 140)}/${getRandomInt(60, 90)}`;
}

function generateRandomGender() {
  return ["Male", "Female"][getRandomInt(0, 1)];
}

function generateRandomSodiumPotassiumLevel() {
  return `${getRandomInt(135, 145)}/${(Math.random() * (5 - 3.5) + 3.5).toFixed(
    2
  )}`;
}

function generateMockRow() {
  return {
    Disease: generateRandomDisease(),
    TestsPerformed: getRandomInt(1, 10),
    TimeSpan: getRandomInt(1, 30),
    PreviousDiseases: generateRandomDisease(),
    BloodGroup: generateRandomBloodGroup(),
    RhFactor: generateRandomRhFactor(),
    HemoglobinCount: getRandomInt(10, 18),
    OxygenLevel: getRandomInt(90, 100),
    BloodPressure: generateRandomBloodPressure(),
    Allergies: generateRandomDisease(),
    SugarLevel: getRandomInt(70, 140),
    NumberOfTests: getRandomInt(1, 5),
    Gender: generateRandomGender(),
    PastMedicalConditions: generateRandomDisease(),
    Weight: getRandomInt(0, 100),
    Height: getRandomInt(150, 190),
    Bilirubin: getRandomInt(0, 2),
    SodiumPotassiumLevel: generateRandomSodiumPotassiumLevel(),
    WBCCount: getRandomInt(4000, 11000),
    PlateletCount: getRandomInt(150000, 450000),
    RBCCount: getRandomInt(4, 6),
    Cholesterol: getRandomInt(120, 220),
    LeukocytesCount: getRandomInt(4000, 11000),
    SurgicalHistory: generateRandomDisease(),
    FamilyMedicalHistory: generateRandomDisease(),
    Medicines: generateRandomDisease(),
    RespiratoryRate: getRandomInt(12, 20),
    Temperature: getRandomInt(96, 101),
    HeartRate: getRandomInt(60, 100),
  };
}

const csvWriter = createCsvWriter({
  path: "real_data.csv",
  header: [
    { id: "Disease", title: "Disease" },
    { id: "TestsPerformed", title: "TestsPerformed" },
    { id: "TimeSpan", title: "TimeSpan" },
    { id: "PreviousDiseases", title: "PreviousDiseases" },
    { id: "BloodGroup", title: "BloodGroup" },
    { id: "RhFactor", title: "RhFactor" },
    { id: "HemoglobinCount", title: "HemoglobinCount" },
    { id: "OxygenLevel", title: "OxygenLevel" },
    { id: "BloodPressure", title: "BloodPressure" },
    { id: "Allergies", title: "Allergies" },
    { id: "SugarLevel", title: "SugarLevel" },
    { id: "NumberOfTests", title: "NumberOfTests" },
    { id: "Gender", title: "Gender" },
    { id: "PastMedicalConditions", title: "PastMedicalConditions" },
    { id: "Weight", title: "Weight" },
    { id: "Height", title: "Height" },
    { id: "Bilirubin", title: "Bilirubin" },
    { id: "SodiumPotassiumLevel", title: "SodiumPotassiumLevel" },
    { id: "WBCCount", title: "WBCCount" },
    { id: "PlateletCount", title: "PlateletCount" },
    { id: "RBCCount", title: "RBCCount" },
    { id: "Cholesterol", title: "Cholesterol" },
    { id: "LeukocytesCount", title: "LeukocytesCount" },
    { id: "SurgicalHistory", title: "SurgicalHistory" },
    { id: "FamilyMedicalHistory", title: "FamilyMedicalHistory" },
    { id: "Medicines", title: "Medicines" },
    { id: "RespiratoryRate", title: "RespiratoryRate" },
    { id: "Temperature", title: "Temperature" },
    { id: "HeartRate", title: "HeartRate" },
  ],
});

const records = [];

for (let i = 0; i < 10; i++) {
  records.push(generateMockRow());
}

csvWriter
  .writeRecords(records)
  .then(() => {
    console.log("CSV file generated successfully.");
  })
  .catch((error) => {
    console.error("Error generating CSV:", error);
  });
