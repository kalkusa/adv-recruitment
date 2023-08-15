import { useContext, useEffect, useState } from "react";
import _ from "lodash";
import { ParsedDataContext } from "../contexts/ParsedDataContext";

const useCampaigns = (selectedDataSources: string[] = []): string[] => {
  const parsedData = useContext(ParsedDataContext);
  const [campaigns, setCampaigns] = useState<string[]>([]);

  useEffect(() => {
    let filteredData = parsedData;

    if (selectedDataSources.length > 0) {
      filteredData = parsedData.filter((item) => selectedDataSources.includes(item.datasource));
    }

    const uniqueCampaigns = _.uniq(filteredData.map((item) => item.campaign));
    setCampaigns(uniqueCampaigns);
  }, [parsedData, selectedDataSources]);

  return campaigns;
};

export default useCampaigns;
