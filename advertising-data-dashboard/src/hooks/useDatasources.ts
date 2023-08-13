import _ from "lodash";
import { useEffect, useState } from "react";
import parseCSV from "../utils/parseCsv";
import useDataUrl from "./useDataUrl";

const useDatasources = (): string[] => {
  const dataUrl = useDataUrl();
  const [datasources, setDatasources] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(dataUrl);
      const csvData = await response.text();
      const parsedData = parseCSV(csvData);
      const uniqueDatasources = _.uniq(parsedData.map((item) => item.datasource));
      setDatasources(uniqueDatasources);
    };

    fetchData();
  }, [dataUrl]);

  return datasources;
};

export default useDatasources;
