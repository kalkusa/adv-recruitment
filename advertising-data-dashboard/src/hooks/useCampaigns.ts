import _ from "lodash";
import { useContext, useEffect, useState } from "react";
import { ParsedDataContext } from "../contexts/ParsedDataContext";

const useCampaigns = (selectedDataSources: string[] = []): string[] => {
  // const useCampaigns = (selectedDataSources: string[]): string[] => {
  const parsedData = useContext(ParsedDataContext);
  const [campaigns, setCampaigns] = useState<string[]>([]);

  console.log(parsedData);

  useEffect(() => {
    // let filteredData = parsedData;

    // if (selectedDataSources.length > 0) {
    //   filteredData = parsedData.filter((item) => selectedDataSources.includes(item.datasource));
    // }

    const uniqueCampaigns = _.uniq(parsedData.map((item) => item.campaign));
    setCampaigns(uniqueCampaigns);
  }, [parsedData, selectedDataSources]);

  return campaigns;
};

export default useCampaigns;
