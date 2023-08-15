import _ from "lodash";
import { useContext, useEffect, useState } from "react";
import { ParsedDataContext } from "../contexts/ParsedDataContext";

const useDatasources = (): string[] => {
  const parsedData = useContext(ParsedDataContext);
  const [datasources, setDatasources] = useState<string[]>([]);

  useEffect(() => {
    const uniqueDatasources = _.uniq(parsedData.map((item) => item.datasource));
    setDatasources(uniqueDatasources);
  }, [parsedData]);

  return datasources;
};

export default useDatasources;
