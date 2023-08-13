import { useState, useEffect } from "react";
import { AdvertisingDataRow, Filter, ValueInTime } from "../types/chartTypes";
import parseCSV from "../utils/parseCsv";
import { getAllClicks, getClicksDataByFilter } from "../utils/getClicks";
import useDataUrl from "./useDataUrl";

const useClicksTimeSeries = (filter: Filter): ValueInTime[] => {
  const dataUrl = useDataUrl();
  const [timeSeries, setTimeSeries] = useState<ValueInTime[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(dataUrl);
        const csvData = await response.text();
        const parsedData: AdvertisingDataRow[] = parseCSV(csvData);
        if (filter.campaigns.length === 0 && filter.dataSources.length === 0) {
          const clicksTimeSeries: ValueInTime[] = getAllClicks(parsedData);
          setTimeSeries(clicksTimeSeries);
        } else {
          const clicksTimeSeries: ValueInTime[] = getClicksDataByFilter(parsedData, filter);
          setTimeSeries(clicksTimeSeries);
        }
      } catch (error) {
        console.error("Error fetching or processing the CSV data:", error);
      }
    };

    fetchData();
  }, [dataUrl, filter]);

  return timeSeries;
};

export default useClicksTimeSeries;
