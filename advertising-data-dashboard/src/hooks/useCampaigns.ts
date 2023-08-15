import { useContext, useEffect, useState } from "react";
import _ from "lodash";
import { ParsedDataContext } from "../contexts/ParsedDataContext";

const useCampaigns = (): string[] => {
  const parsedData = useContext(ParsedDataContext);
  const [campaigns, setCampaigns] = useState<string[]>([]);

  useEffect(() => {
    const uniqueCampaigns = _.uniq(parsedData.map((item) => item.campaign));
    setCampaigns(uniqueCampaigns);
  }, [parsedData]);

  return campaigns;
};

export default useCampaigns;
