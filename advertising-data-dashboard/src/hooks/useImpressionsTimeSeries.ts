import { useState, useEffect } from "react";
import { AdvertisingDataRow, Filter, ValueInTime } from "../types/chartTypes";
import parseCSV from "../utils/parseCsv";
import useDataUrl from "./useDataUrl";
import { getAllImpressions, getImpressionsDataByFilter } from "../utils/getImpressions";

const useImpressionsTimeSeries = (filter: Filter): ValueInTime[] => {
  const dataUrl = useDataUrl();
  const [timeSeries, setTimeSeries] = useState<ValueInTime[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(dataUrl);
        const csvData = await response.text();
        const parsedData: AdvertisingDataRow[] = parseCSV(csvData);
        if (filter.campaigns.length === 0 && filter.dataSources.length === 0) {
          const clicksTimeSeries: ValueInTime[] = getAllImpressions(parsedData);
          setTimeSeries(clicksTimeSeries);
        } else {
          const clicksTimeSeries: ValueInTime[] = getImpressionsDataByFilter(parsedData, filter);
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

export default useImpressionsTimeSeries;
