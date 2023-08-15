import { useState, useEffect, useContext } from "react";
import { Filter, ValueInTime } from "../types/chartTypes";
import { getAllImpressions, getImpressionsDataByFilter } from "../utils/getImpressions";
import { ParsedDataContext } from "../contexts/ParsedDataContext";

const useImpressionsTimeSeries = (filter: Filter): ValueInTime[] => {
  const parsedData = useContext(ParsedDataContext);
  const [timeSeries, setTimeSeries] = useState<ValueInTime[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (filter.campaigns.length === 0 && filter.dataSources.length === 0) {
          const impressionsTimeSeries: ValueInTime[] = getAllImpressions(parsedData);
          setTimeSeries(impressionsTimeSeries);
        } else {
          const impressionsTimeSeries: ValueInTime[] = getImpressionsDataByFilter(parsedData, filter);
          setTimeSeries(impressionsTimeSeries);
        }
      } catch (error) {
        console.error("Error fetching or processing the CSV data:", error);
      }
    };

    fetchData();
  }, [parsedData, filter]);

  return timeSeries;
};

export default useImpressionsTimeSeries;
