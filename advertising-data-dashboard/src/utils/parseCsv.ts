import _ from "lodash";
import { parse, startOfDay } from "date-fns";
import { AdvertisingDataRow } from "../types/chartTypes";

const parseCSV = (data: string): AdvertisingDataRow[] => {
  const [headers, ...lines] = data.split("\n");

  const isDate = (value: string): boolean => {
    const datePattern = /^\d{2}\.\d{2}\.\d{4}$/;
    return datePattern.test(value);
  };

  const convertToTypes = (value: string): string | number | Date => {
    if (isDate(value)) {
      return startOfDay(parse(value, "dd.MM.yyyy", new Date()));
    }

    return isNaN(Number(value)) ? value : Number(value);
  };

  const result = lines.map((line) => {
    const values = line.split(",").map(convertToTypes);

    // Zip object creates object with keys from CSV headers and put values from parsed row
    return _.zipObject(
      headers.split(",").map((header) => header.toLowerCase()),
      values
    ) as AdvertisingDataRow;
  });

  return result;
};

export default parseCSV;
