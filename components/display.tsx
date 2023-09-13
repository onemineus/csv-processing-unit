import React from "react";

interface KeyValueObject {
  [key: string]: any;
}

interface DisplayKeyValuePairsProps {
  data: KeyValueObject;
}

const DisplayKeyValuePairs: React.FC<DisplayKeyValuePairsProps> = ({
  data,
}) => {
  // Convert the object's key-value pairs into an array of React elements
  const keyValuePairs = Object.entries(data).map(([key, value], index) => (
    <div key={index}>
      <strong>{key}:</strong> {value}
    </div>
  ));

  return <div>{keyValuePairs}</div>;
};

export default DisplayKeyValuePairs;
