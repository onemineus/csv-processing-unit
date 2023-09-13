"use client";
const stringSimilarity = require("string-similarity");
import React, { useState, ChangeEvent, useEffect } from "react";
import Papa from "papaparse";

function App() {
  const [parsedData, setParsedData] = useState<any[]>([]);
  const [tableRows, setTableRows] = useState<string[]>([]);
  const [values, setValues] = useState<any[][]>([]);
  let db = [
    {
      DateOfBirth: "initial",
      Disease: "initial",
      TestsPerformed: "initial",
      TimeSpan: "initial",
      PreviousDiseases: "initial",
      BloodGroup: "initial",
      RhFactor: "initial",
      HemoglobinCount: "initial",
      OxygenLevel: "initial",
      BloodPressure: "initial",
      Allergies: "initial",
      SugarLevel: "initial",
      NumberOfTests: "initial",
      Gender: "initial",
      PastMedicalConditions: "initial",
      Weight: "initial",
      Height: "initial",
      Bilirubin: "initial",
      SodiumPotassiumLevel: "initial",
      WBCCount: "initial",
      PlateletCount: "initial",
      RBCCount: "initial",
      Cholesterol: "initial",
      LeukocytesCount: "initial",
      SurgicalHistory: "initial",
      FamilyMedicalHistory: "initial",
      Medicines: "initial",
      RespiratoryRate: "initial",
      Temperature: "initial",
      HeartRate: "initial",
    },
  ];
  const databaseAttributes: any = [
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
  const makeTable = (results: any) => {
    const rowsArray: string[] = [];
    const valuesArray: any[][] = [];
    results.data.forEach((d: any) => {
      rowsArray.push(...Object.keys(d));
      valuesArray.push(Object.values(d));
    });

    setTableRows(Array.from(new Set(rowsArray)));
    setValues(valuesArray);
  };
  const mapCsvColumnsToAttributes = (csvData: any, databaseAttributes: []) => {
    const mappedData = [];
    for (const row of csvData) {
      const mappedRow: any = {};
      for (const csvColumnHeader of Object.keys(row)) {
        const matches = stringSimilarity.findBestMatch(
          csvColumnHeader.toLowerCase(),
          databaseAttributes.map((attribute: any) => attribute.toLowerCase())
        );
        const bestMatch = matches.bestMatch;
        if (bestMatch.rating > 0.5) {
          const matchedAttribute = databaseAttributes.find(
            (attribute: any) => attribute.toLowerCase() === bestMatch.target
          );
          if (matchedAttribute) {
            mappedRow[matchedAttribute] = row[csvColumnHeader];
          }
        }
      }
      mappedData.push(mappedRow);
    }
    return mappedData;
  };
  const updateDb = () => {
    console.log(parsedData);
    console.log("-----------------------");
    console.log(databaseAttributes);
    console.log("-----------------------");
    const mappedCSV = mapCsvColumnsToAttributes(parsedData, databaseAttributes);
    db.push(...mappedCSV);
    console.log(db);
  };
  useEffect(() => {
    updateDb();
  }, [parsedData]);
  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) {
      return; // No files selected
    }
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        setParsedData(results.data);
        makeTable(results);
      },
    });
  };

  return (
    <div>
      {/* File Uploader */}
      <input
        type="file"
        name="file"
        onChange={changeHandler}
        accept=".csv"
        // style={{ display: "block", margin: "10px auto" }}
      />
      <div>{"Total rows - " + db.length}</div>
      {/* Table */}
      <table>
        <thead>
          <tr>
            {tableRows.map((columnName, index) => (
              <th key={index}>{columnName}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {values.map((valueRow, rowIndex) => (
            <tr key={rowIndex}>
              {valueRow.map((val, colIndex) => (
                <td key={colIndex}>{val}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
