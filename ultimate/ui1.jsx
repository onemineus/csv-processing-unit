"use client";

import React, { useState } from "react";
import Papa from "papaparse";
import processCsvData from "./util.js";
const CsvTable = () => {
  const [csvData, setCsvData] = useState([]);
  const [processedData, setProcessedData] = useState([]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        const data = result.data;
        setCsvData(data);
        const processed = processCsvData(data); // Process the CSV data
        setProcessedData(processed);
        console.log(processed);
      },
    });
  };

  return (
    <div>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="border p-2"
      />
      {csvData.length > 0 && (
        <table className="table-auto mt-4">
          <thead>
            <tr>
              {Object.keys(csvData[0]).map((header) => (
                <th key={header} className="border px-4 py-2">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {csvData.map((row, index) => (
              <tr key={index}>
                {Object.keys(row).map((header) => (
                  <td key={header} className="border px-4 py-2">
                    {row[header]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="text-xl">modified</div>
      {processedData.length > 0 && (
        <table className="table-auto mt-4">
          <thead>
            <tr>
              {Object.keys(processedData[0]).map((header) => (
                <th key={header} className="border px-4 py-2">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {processedData.map((row, index) => (
              <tr key={index}>
                {Object.keys(row).map((header) => (
                  <td key={header} className="border px-4 py-2">
                    {row[header]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CsvTable;
