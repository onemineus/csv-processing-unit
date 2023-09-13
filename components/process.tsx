"use client";

import React, { useState, ChangeEvent, useEffect } from "react";
import Papa from "papaparse";
import Fuse from "fuse.js"; // Import Fuse.js

function Appi() {
  const [parsedData, setParsedData] = useState<any[]>([]);
  const [tableRows, setTableRows] = useState<string[]>([]);
  const [values, setValues] = useState<any[][]>([]);
  const [db, setDb] = useState<any>([
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
  ]);

  const databaseAttributes: any = [
    // "DateOfBirth",
    // "Disease",
    // "TestsPerformed",
    // "TimeSpan",
    // "PreviousDiseases",
    // "BloodGroup",
    // "RhFactor",
    // "HemoglobinCount",
    // "OxygenLevel",
    // "BloodPressure",
    // "Allergies",
    // "SugarLevel",
    // "NumberOfTests",
    // "Gender",
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

  // Create a Fuse instance with your databaseAttributes
  const fuse = new Fuse(databaseAttributes, {
    includeScore: true,
    threshold: 0.5, // Adjust the threshold as needed
  });

  // Replace mapCsvColumnsToAttributes with this function
  const mapCsvColumnsToAttributes = (
    csvData: any[],
    databaseAttributes: string[]
  ) => {
    const mappedData = [];
    for (const row of csvData) {
      const mappedRow: any = {};
      for (const csvColumnHeader of Object.keys(row)) {
        const matches = fuse.search(csvColumnHeader.toLowerCase());
        if (matches.length > 0 && matches[0].score! <= 0.5) {
          const matchedAttribute: any = matches[0].item;
          mappedRow[matchedAttribute] = row[csvColumnHeader];
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
    setDb((prevDb: any) => [...prevDb, ...mappedCSV]);
    console.log(db);
  };
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
  useEffect(() => {
    updateDb();
  }, [parsedData]);
  // ... (the rest of your code)

  return (
    <div>
      {/* File Uploader */}
      <input type="file" name="file" onChange={changeHandler} accept=".csv" />
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

export default Appi;
