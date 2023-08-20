import { useState, useEffect } from "react";
import parseCSV from "../utils/parseCsv";
import useDataUrl from "./useDataUrl";
import { AdvertisingDataRow } from "../types/chartTypes";

const useParsedData = (): [AdvertisingDataRow[], boolean] => {
  const dataUrl = useDataUrl();
  const [parsedData, setParsedData] = useState<AdvertisingDataRow[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(dataUrl);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const csvData = await response.text();
        const data = parseCSV(csvData);
        setParsedData(data);
      } catch (error) {
        console.error("Error fetching the CSV data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [dataUrl]);

  return [parsedData, isLoading];
};

export default useParsedData;
