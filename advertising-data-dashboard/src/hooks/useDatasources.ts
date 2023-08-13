import _ from "lodash";
import { useEffect, useState } from "react";
import { AdvertisingDataRow } from "../types/chartTypes";
import parseCSV from "../utils/parseCsv";

const useDatasources = (): string[] => {
  const [datasources, setDatasources] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(process.env.PUBLIC_URL + "/assets/data.csv");
      const csvData = await response.text();
      const parsedData = parseCSV<AdvertisingDataRow>(csvData);
      const uniqueDatasources = _.uniq(parsedData.map((item) => item.Datasource));
      setDatasources(uniqueDatasources);
    };

    fetchData();
  }, []);

  return datasources;
};

export default useDatasources;
