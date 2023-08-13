import { useState, useEffect } from "react";
import { AdvertisingDataRow, ValueInTime } from "../types/chartTypes";
import parseCSV from "../utils/parseCsv";
import { getAllClicks } from "../utils/getClicks";
import useDataUrl from "./useDataUrl";

const useTimeSeries = (): ValueInTime[] => {
  const dataUrl = useDataUrl();
  const [timeSeries, setTimeSeries] = useState<ValueInTime[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(dataUrl);
        const csvData = await response.text();
        const parsedData: AdvertisingDataRow[] = parseCSV(csvData);
        const clicksTimeSeries: ValueInTime[] = getAllClicks(parsedData);
        setTimeSeries(clicksTimeSeries);
      } catch (error) {
        console.error("Error fetching or processing the CSV data:", error);
      }
    };

    fetchData();
  }, [dataUrl]);

  return timeSeries;
};

export default useTimeSeries;
