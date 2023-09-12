"use client";
import React, { useState } from "react";
import Papa from "papaparse";

function CSVFileInput() {
  const [csvData, setCSVData] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    Papa.parse(file, {
      complete: (result) => {
        setCSVData(result.data);
        console.log(result.data);
      },
      header: true, // Use the first row as headers
    });
  };

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
      <ul>
        {csvData.map((row, index) => (
          // <li key={index}>{JSON.stringify(row)}</li>
        ))}
      </ul>
    </div>
  );
}

export default CSVFileInput;
