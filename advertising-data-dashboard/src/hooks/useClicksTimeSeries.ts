import { useState, useEffect, useContext } from "react";
import { Filter, ValueInTime } from "../types/chartTypes";
import { getAllClicks, getClicksDataByFilter } from "../utils/getClicks";
import { ParsedDataContext } from "../contexts/ParsedDataContext";

const useClicksTimeSeries = (filter: Filter): [ValueInTime[], boolean] => {
  const { parsedData, isLoading: isParsedDataLoading } = useContext(ParsedDataContext);
  const [timeSeries, setTimeSeries] = useState<ValueInTime[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        if (!isParsedDataLoading) {
          if (filter.campaigns.length === 0 && filter.dataSources.length === 0) {
            const clicksTimeSeries: ValueInTime[] = getAllClicks(parsedData);
            setTimeSeries(clicksTimeSeries);
          } else {
            const clicksTimeSeries: ValueInTime[] = getClicksDataByFilter(parsedData, filter);
            setTimeSeries(clicksTimeSeries);
          }
        }
      } catch (error) {
        console.error("Error fetching or processing the CSV data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [parsedData, filter, isParsedDataLoading]);

  return [timeSeries, isLoading || isParsedDataLoading];
};

export default useClicksTimeSeries;
