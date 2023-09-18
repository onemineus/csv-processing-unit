import Fuse from "fuse.js";

// Define your main attributes
const medicalDataFields = [
  {
    name: "Disease",
    dataType: "string",
  },
  {
    name: "TestsPerformed",
    dataType: "number",
  },
  {
    name: "TimeSpan",
    dataType: "string",
  },
  {
    name: "PreviousDiseases",
    dataType: "string",
  },
  {
    name: "BloodGroup",
    dataType: "string",
    allowedValues: (value) =>
      ["A", "B", "AB", "O"].includes(value.toUpperCase()),
  },
  {
    name: "RhFactor",
    dataType: "string",
    allowedValues: (value) =>
      ["Positive", "Negative"].includes(
        value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
      ),
  },
  {
    name: "HemoglobinCount",
    dataType: "number",
  },
  {
    name: "OxygenLevel",
    dataType: "number",
  },
  {
    name: "BloodPressure",
    dataType: "string",
  },
  {
    name: "Allergies",
    dataType: "string",
  },
  {
    name: "SugarLevel",
    dataType: "number",
  },
  {
    name: "NumberOfTests",
    dataType: "number",
  },
  {
    name: "Gender",
    dataType: "string",
    allowedValues: (value) =>
      ["Male", "Female", "Other"].includes(
        value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
      ),
  },
  {
    name: "PastMedicalConditions",
    dataType: "string",
  },
  {
    name: "Weight",
    dataType: "number",
  },
  {
    name: "Height",
    dataType: "number",
  },
  {
    name: "Bilirubin",
    dataType: "number",
  },
  {
    name: "SodiumPotassiumLevel",
    dataType: "string",
  },
  {
    name: "WBCCount",
    dataType: "number",
  },
  {
    name: "PlateletCount",
    dataType: "number",
  },
  {
    name: "RBCCount",
    dataType: "number",
  },
  {
    name: "Cholesterol",
    dataType: "number",
  },
  {
    name: "LeukocytesCount",
    dataType: "number",
  },
  {
    name: "SurgicalHistory",
    dataType: "string",
  },
  {
    name: "FamilyMedicalHistory",
    dataType: "string",
  },
  {
    name: "Medicines",
    dataType: "string",
  },
  {
    name: "RespiratoryRate",
    dataType: "number",
  },
  {
    name: "Temperature",
    dataType: "number",
  },
  {
    name: "HeartRate",
    dataType: "number",
  },
];

// Function to process and map column names
const processCsvData = (csvData) => {
  // Create an instance of Fuse with the main attributes
  const fuse = new Fuse(medicalDataFields, {
    threshold: 0.5,
    keys: ["name"],
  });

  // Process the CSV data
  const processedData = csvData
    .map((row) => {
      const processedRow = {};

      // Iterate through CSV column names
      Object.keys(row).forEach((columnName) => {
        // Use Fuse to find the closest matching main attribute
        const result = fuse.search(columnName);
        if (result.length > 0 && result[0].item) {
          const mainAttribute = result[0].item.name;
          const csvValue = row[columnName];

          // Validate attribute data type and perform attribute-specific validation
          const expectedAttribute = medicalDataFields.find(
            (attribute) => attribute.name === mainAttribute
          );

          if (expectedAttribute) {
            const expectedDataType = expectedAttribute.dataType;

            if (typeof expectedDataType === "string") {
              // Handle simple data types (string, number)
              if (
                (expectedDataType === "string" &&
                  typeof csvValue === "string" &&
                  csvValue.trim() !== "") || // Check for non-empty strings
                (expectedDataType === "number" && !isNaN(parseFloat(csvValue)))
              ) {
                // Additional validation for attributes with allowedValues
                if (
                  expectedAttribute.allowedValues &&
                  !expectedAttribute.allowedValues(csvValue)
                ) {
                  return; // Discard the row if the value is not allowed
                }

                processedRow[mainAttribute] = csvValue;
              }
            } else if (typeof expectedDataType === "function") {
              // Handle custom validation functions
              if (expectedDataType(csvValue)) {
                processedRow[mainAttribute] = csvValue;
              }
            }
          }
        }
      });

      return processedRow;
    })
    .filter((row) => Object.keys(row).length > 0); // Remove rows with no valid attributes

  return processedData;
};

export default processCsvData;
