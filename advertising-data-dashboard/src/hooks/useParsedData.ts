import { useState, useEffect } from "react";
import parseCSV from "../utils/parseCsv";
import useDataUrl from "./useDataUrl";
import { AdvertisingDataRow } from "../types/chartTypes";

const useParsedData = () => {
  const dataUrl = useDataUrl();
  const [parsedData, setParsedData] = useState<AdvertisingDataRow[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(dataUrl);
      const csvData = await response.text();
      const data = parseCSV(csvData);
      setParsedData(data);
    };

    fetchData();
  }, [dataUrl]);

  return parsedData;
};

export default useParsedData;
