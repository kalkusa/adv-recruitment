import _ from "lodash";

const parseCSV = <T>(data: string): T[] => {
  const [headers, ...lines] = data.split("\n");

  const result = lines.map((line) => {
    const values = line.split(",");
    // Zip object creates object with keys from CSV headers and put values from parsed row
    return _.zipObject(headers.split(","), values) as unknown as T;
  });

  return result;
};

export default parseCSV;
