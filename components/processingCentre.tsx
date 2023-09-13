"use client";
import React, { useState, ChangeEvent } from "react";
import Papa from "papaparse";

function App() {
  // State to store parsed data
  const [parsedData, setParsedData] = useState<any[]>([]);

  // State to store table Column name
  const [tableRows, setTableRows] = useState<string[]>([]);

  // State to store the values
  const [values, setValues] = useState<any[][]>([]);

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) {
      return; // No files selected
    }

    // Passing file data (event.target.files[0]) to parse using Papa.parse
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const rowsArray: string[] = [];
        const valuesArray: any[][] = [];

        // Iterating data to get column name and their values
        results.data.forEach((d: any) => {
          rowsArray.push(...Object.keys(d));
          valuesArray.push(Object.values(d));
        });

        // Parsed Data Response in array format
        setParsedData(results.data);
        console.log(results.data);
        // Filtered Column Names (unique)
        setTableRows(Array.from(new Set(rowsArray)));

        // Filtered Values
        setValues(valuesArray);
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
    <div>{"Total rows - " +parsedData.length}</div>
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
