import { useState, useEffect, useContext } from "react";
import { Filter, ValueInTime } from "../types/chartTypes";
import { getAllClicks, getClicksDataByFilter } from "../utils/getClicks";
import { ParsedDataContext } from "../contexts/ParsedDataContext";

const useClicksTimeSeries = (filter: Filter): ValueInTime[] => {
  const parsedData = useContext(ParsedDataContext);
  const [timeSeries, setTimeSeries] = useState<ValueInTime[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
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
  }, [parsedData, filter]);

  return timeSeries;
};

export default useClicksTimeSeries;
