"use client";

import React, { useState, ChangeEvent, useEffect } from "react";
import Papa from "papaparse";
import Fuse from "fuse.js"; // Import Fuse.js

function Small() {
  const [parsedData, setParsedData] = useState<any[]>([]);
  const [tableRows, setTableRows] = useState<string[]>([]);
  const [mappedDb, setMappedDb] = useState<any[]>([]);
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

  const databaseAttributes: string[] = [
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

  // Create a Fuse instance with your databaseAttributes
  const fuse = new Fuse(databaseAttributes, {
    includeScore: true,
    threshold: 0.5, // Adjust the threshold as needed
  });

  const processMappedData = (mappedCsv: any[]) => {
    const processedData = [];
    const isValidGender = (value: string) => {
      const lowercasedValue = value.toLowerCase();
      return lowercasedValue === "male" || lowercasedValue === "female";
    };
    for (const row of mappedCsv) {
      // Check if all database attributes have valid values
      const isValidRow = databaseAttributes.every((attribute) => {
        const value = row[attribute];

        switch (attribute) {
          case "Gender":
            return isValidGender(value);
          //   case "DateOfBirth":
          //     return isValidDateOfBirth(value);
          //   case "BloodPressure":
          //     return isValidBloodPressure(value);
          // Add more cases for other attributes
          default:
            return true; // Default to true for attributes without specific validation
        }
      });

      if (isValidRow) {
        processedData.push(row);
      }
    }

    return processedData;
  };

  // Replace mapCsvColumnsToAttributes with this function
  const mapCsvColumnsToAttributes = (
    csvData: any[],
    databaseAttributes: string[]
  ) => {
    const mappedData = [];
    for (const row of csvData) {
      const mappedRow: any = {};
      let hasMatch = false; // Flag to track if any attribute was matched
      for (const csvColumnHeader of Object.keys(row)) {
        const matches = fuse.search(csvColumnHeader.toLowerCase());
        if (matches.length > 0 && matches[0].score! <= 0.5) {
          const matchedAttribute: any = matches[0].item;
          mappedRow[matchedAttribute] = row[csvColumnHeader];
          hasMatch = true; // Set the flag to true if a match is found
        }
      }
      if (hasMatch) {
        // Add the mappedRow to mappedData only if a match was found
        mappedData.push(mappedRow);
      }
    }
    return mappedData;
  };
  const updateDb = () => {
    const mappedCSV = mapCsvColumnsToAttributes(parsedData, databaseAttributes);
    // const a = processMappedData(mappedCSV);
    setMappedDb(mappedCSV);
    setDb((prevDb: any) => [...prevDb, ...mappedCSV]);
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

  useEffect(() => {
    console.log("db - ");
    console.log(db);
    console.log("parsed data - ");
    console.log(parsedData);
  }, [db]);

  return (
    <div>
      {/* File Uploader */}
      <input type="file" name="file" onChange={changeHandler} accept=".csv" />
      <div>{"db rows - " + db.length}</div>
      <div>{"table rows - " + parsedData.length}</div>
      {!!parsedData[0] ? (
        <div>{"table columns - " + Object.keys(parsedData[0]).length}</div>
      ) : (
        <div>{"table columns - " + 0}</div>
      )}
      <div>{"mapped rows - " + mappedDb.length}</div>

      {!!mappedDb[0] ? (
        <div>{"mapped columns - " + Object.keys(mappedDb[0]).length}</div>
      ) : (
        <div>{"mapped columns - " + 0}</div>
      )}
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

export default Small;
