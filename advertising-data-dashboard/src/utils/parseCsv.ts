import { parse, startOfDay } from "date-fns";
import { AdvertisingDataRow } from "../types/chartTypes";

const parseCSV = (data: string): AdvertisingDataRow[] => {
  const normalizedCsvData = data.replace(/\r\n/g, "\n");
  const [headersRow, ...lines] = normalizedCsvData.split("\n");
  const headers = headersRow.split(",").map((header) => header.toLowerCase());
  const datePattern = /^\d{2}\.\d{2}\.\d{4}$/;

  const result = lines.map((line) => {
    const values = line.split(",").map((value) => {
      if (datePattern.test(value)) {
        return startOfDay(parse(value, "dd.MM.yyyy", new Date()));
      }

      return isNaN(Number(value)) ? value : Number(value);
    });

    const rowObject: any = {};

    headers.forEach((header, index) => {
      rowObject[header] = values[index];
    });

    return rowObject as AdvertisingDataRow;
  });

  return result;
};

export default parseCSV;
