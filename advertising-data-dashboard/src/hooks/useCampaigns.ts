import _ from "lodash";
import { useContext, useEffect, useMemo, useState } from "react";
import { ParsedDataContext } from "../contexts/ParsedDataContext";

const useCampaigns = (selectedDataSources: string[] = []): string[] => {
  const parsedData = useContext(ParsedDataContext);
  const [campaigns, setCampaigns] = useState<string[]>([]);

  const memoizedSelectedDataSources = useMemo(() => selectedDataSources, [selectedDataSources]);

  useEffect(() => {
    let filteredData = parsedData;

    if (memoizedSelectedDataSources.length > 0) {
      filteredData = parsedData.filter((item) => memoizedSelectedDataSources.includes(item.datasource));
    }

    const uniqueCampaigns = _.uniq(filteredData.map((item) => item.campaign));
    setCampaigns(uniqueCampaigns);
  }, [parsedData, memoizedSelectedDataSources]);

  return campaigns;
};

export default useCampaigns;
